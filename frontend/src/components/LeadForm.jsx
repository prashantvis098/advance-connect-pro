import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = {
  full_name: "",
  phone: "",
  email: "",
  business_name: "",
  marketplace: "",
  monthly_sales: "",
  challenge: "",
};

const SALES_OPTIONS = ["Just Starting", "Under ₹1 Lakh", "₹1–5 Lakhs", "₹5–20 Lakhs", "₹20 Lakhs+"];

export const LeadForm = () => {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.marketplace) {
      toast.error("Please select your marketplace");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, form);
      setDone(true);
      toast.success("Audit request received. Our team will reach out shortly.");
    } catch (err) {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-form p-10 flex flex-col items-center text-center gap-4"
        data-testid="lead-form-success"
      >
        <span className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
          <CheckCircle2 size={34} className="text-green-400" />
        </span>
        <h3 className="font-heading text-2xl font-bold text-white">Request Received</h3>
        <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
          Thank you, {form.full_name.split(" ")[0]}. Our marketplace expert will contact you within a few hours with your free audit.
        </p>
        <button
          onClick={() => { setForm(initial); setDone(false); }}
          className="text-blue-400 text-sm font-medium mt-2 hover:text-blue-300 transition-colors duration-200"
          data-testid="lead-form-submit-another"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-form p-6 sm:p-8" data-testid="hero-lead-form">
      <div className="flex items-center gap-2.5 mb-6">
        <ShieldCheck size={18} className="text-green-400" />
        <h3 className="font-heading text-lg font-bold text-white tracking-tight">
          Get Your Free Marketplace Audit
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <input required minLength={2} className="glass-input" placeholder="Full Name" value={form.full_name} onChange={set("full_name")} data-testid="lead-input-name" />
        <input required minLength={7} type="tel" className="glass-input" placeholder="Phone Number" value={form.phone} onChange={set("phone")} data-testid="lead-input-phone" />
        <input required type="email" className="glass-input" placeholder="Email" value={form.email} onChange={set("email")} data-testid="lead-input-email" />
        <input required className="glass-input" placeholder="Business Name" value={form.business_name} onChange={set("business_name")} data-testid="lead-input-business" />
        <select required className="glass-input glass-select" value={form.marketplace} onChange={set("marketplace")} data-testid="lead-select-marketplace">
          <option value="" disabled>Marketplace</option>
          <option>Amazon</option>
          <option>Flipkart</option>
          <option>Meesho</option>
          <option>Multiple Marketplaces</option>
        </select>
        <select className="glass-input glass-select" value={form.monthly_sales} onChange={set("monthly_sales")} data-testid="lead-select-sales">
          <option value="" disabled>Monthly Sales</option>
          {SALES_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <textarea
        rows={2}
        className="glass-input w-full mt-3.5 resize-none"
        placeholder="Your biggest challenge right now…"
        value={form.challenge}
        onChange={set("challenge")}
        data-testid="lead-input-challenge"
      />

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full mt-5 py-3.5 text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
        data-testid="lead-form-submit-button"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        Get Free Marketplace Audit
      </button>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-5" data-testid="lead-form-trust-badges">
        {["9+ Years Experience", "Marketplace Experts", "Free Consultation", "Fast Response"].map((t) => (
          <span key={t} className="flex items-center gap-1.5 text-[13px] text-slate-300">
            <CheckCircle2 size={14} className="text-green-400 shrink-0" /> {t}
          </span>
        ))}
      </div>
    </form>
  );
};
