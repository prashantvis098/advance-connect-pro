from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME")
LEAD_NOTIFY_EMAIL = os.environ.get("LEAD_NOTIFY_EMAIL")

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    phone: str
    email: EmailStr
    business_name: str
    marketplace: str
    monthly_sales: Optional[str] = None
    challenge: Optional[str] = None
    source: str = "hero_form"
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadCreate(BaseModel):
    full_name: str = Field(min_length=2)
    phone: str = Field(min_length=7)
    email: EmailStr
    business_name: str = Field(min_length=1)
    marketplace: str
    monthly_sales: Optional[str] = None
    challenge: Optional[str] = None
    source: str = "hero_form"


def lead_email_html(lead: Lead) -> str:
    rows = [
        ("Full Name", lead.full_name),
        ("Phone", lead.phone),
        ("Email", lead.email),
        ("Business Name", lead.business_name),
        ("Marketplace", lead.marketplace),
        ("Monthly Sales", lead.monthly_sales or "—"),
        ("Biggest Challenge", lead.challenge or "—"),
        ("Source", lead.source),
        ("Received", lead.created_at.strftime("%d %b %Y, %H:%M UTC")),
    ]
    trs = "".join(
        f'<tr><td style="padding:10px 16px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;">{k}</td>'
        f'<td style="padding:10px 16px;border-bottom:1px solid #e2e8f0;color:#0b1220;font-size:14px;font-weight:600;">{v}</td></tr>'
        for k, v in rows
    )
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr><td style="background:#0b1220;padding:24px 32px;">
            <span style="color:#ffffff;font-size:18px;font-weight:bold;">Advance Connect</span>
            <span style="color:#2563eb;font-size:18px;font-weight:bold;"> — New Lead</span>
          </td></tr>
          <tr><td style="padding:16px 16px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0">{trs}</table>
          </td></tr>
          <tr><td style="padding:16px 32px 24px;">
            <a href="https://wa.me/{lead.phone.lstrip('+').replace(' ', '')}" style="background:#22c55e;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:bold;">Reply on WhatsApp</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def send_lead_notification(lead: Lead):
    if not EMAIL_KEY or not LEAD_NOTIFY_EMAIL:
        logger.warning("Email not configured; skipping lead notification")
        return
    payload = {
        "to": [LEAD_NOTIFY_EMAIL],
        "subject": f"New Lead: {lead.full_name} ({lead.marketplace}) — {lead.business_name}",
        "html": lead_email_html(lead),
        "from_name": EMAIL_FROM_NAME,
        "contact_email": lead.email,
    }
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        logger.info(f"Lead notification sent for {lead.id}")
    except Exception as e:
        logger.error(f"Lead notification email failed: {e}")


@api_router.get("/")
async def root():
    return {"message": "Advance Connect API"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    doc = lead.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.leads.insert_one(doc)
    asyncio.create_task(send_lead_notification(lead))
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def get_leads():
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            d["created_at"] = datetime.fromisoformat(d["created_at"])
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
