import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { submitSearchRequest } from "../api/searchApi";
import logo from "../assets/branding/buspe-icon-256.png";

const today = new Date().toISOString().split("T")[0];

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    mobile: searchParams.get("mobile") || "",
    fromLocation: "",
    toLocation: "",
    travelDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
  const backToWhatsAppUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}` : null;

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await submitSearchRequest(form);
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-900 to-brand-500 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-10 text-center">
          <img src={logo} alt="BusPe" className="w-16 h-16 rounded-2xl mx-auto mb-5 shadow-lg" />
          <h1 className="text-xl font-extrabold text-brand-900 mb-2">Searching buses for you!</h1>
          <p className="text-slate-500 text-sm mb-6">
            {form.fromLocation} → {form.toLocation} on {form.travelDate}. We'll send the best options
            to your WhatsApp shortly.
          </p>
          {backToWhatsAppUrl && (
            <a
              href={backToWhatsAppUrl}
              className="block rounded-xl bg-gradient-to-br from-brand-900 to-brand-500 text-white font-bold py-3 text-sm"
            >
              ← Back to WhatsApp
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 to-brand-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-10">
        {backToWhatsAppUrl && (
          <a
            href={backToWhatsAppUrl}
            className="inline-block text-xs font-semibold text-brand-700 mb-4 hover:underline"
          >
            ← Back to WhatsApp
          </a>
        )}
        <div className="text-center mb-8">
          <img src={logo} alt="BusPe" className="w-16 h-16 rounded-2xl mx-auto mb-4 shadow-lg" />
          <h1 className="text-2xl font-extrabold text-brand-900">Search Buses</h1>
          <p className="text-accent-700 text-sm font-semibold mt-1">Type, Tap, Travel</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="fromLocation" className="block text-sm font-semibold text-slate-700 mb-1">
              From
            </label>
            <input
              id="fromLocation"
              type="text"
              value={form.fromLocation}
              onChange={(event) => updateField("fromLocation", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Bengaluru"
              required
            />
          </div>

          <div>
            <label htmlFor="toLocation" className="block text-sm font-semibold text-slate-700 mb-1">
              To
            </label>
            <input
              id="toLocation"
              type="text"
              value={form.toLocation}
              onChange={(event) => updateField("toLocation", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Davanagere"
              required
            />
          </div>

          <div>
            <label htmlFor="travelDate" className="block text-sm font-semibold text-slate-700 mb-1">
              Date of travel
            </label>
            <input
              id="travelDate"
              type="date"
              min={today}
              value={form.travelDate}
              onChange={(event) => updateField("travelDate", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-semibold text-slate-700 mb-1">
              Mobile number
            </label>
            <input
              id="mobile"
              type="tel"
              value={form.mobile}
              onChange={(event) => updateField("mobile", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="98xxxxxxxx"
              required
            />
          </div>

          {submitError && (
            <div className="rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">{submitError}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-xl bg-gradient-to-br from-brand-900 to-brand-500 text-white font-bold py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Searching…" : "Search buses"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">Powered by ServerPe App Solutions</p>
      </div>
    </div>
  );
}
