import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchQueryTypes, submitContactMe } from "../api/supportApi";
import logo from "../assets/branding/buspe-icon-256.png";

export default function SupportPage() {
  const [searchParams] = useSearchParams();

  const [queryTypes, setQueryTypes] = useState([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [form, setForm] = useState({
    queryTypeId: "",
    name: "",
    mobile: searchParams.get("mobile") || "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
  const backToWhatsAppUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}` : null;

  useEffect(() => {
    fetchQueryTypes()
      .then((types) => {
        setQueryTypes(types);
        setForm((prev) => ({ ...prev, queryTypeId: prev.queryTypeId || types[0]?.id || "" }));
      })
      .catch((err) => setLoadError(err.message || "Failed to load query types"))
      .finally(() => setIsLoadingTypes(false));
  }, []);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await submitContactMe(form);
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
          <h1 className="text-xl font-extrabold text-brand-900 mb-2">Message received!</h1>
          <p className="text-slate-500 text-sm mb-6">
            Thanks for reaching out. Our team will get back to you on WhatsApp shortly.
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
          <h1 className="text-2xl font-extrabold text-brand-900">Contact Support</h1>
          <p className="text-accent-700 text-sm font-semibold mt-1">
            Type, Tap, Travel — we're here to help
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="queryType" className="block text-sm font-semibold text-slate-700 mb-1">
              What's this about?
            </label>
            {isLoadingTypes ? (
              <p className="text-sm text-slate-400">Loading options…</p>
            ) : loadError ? (
              <p className="text-sm text-red-600">{loadError}</p>
            ) : (
              <select
                id="queryType"
                value={form.queryTypeId}
                onChange={(event) => updateField("queryTypeId", event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              >
                {queryTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">
              Your name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Your full name"
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

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
              Email <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[100px]"
              placeholder="Tell us what's going on…"
              required
            />
          </div>

          {submitError && (
            <div className="rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">{submitError}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isLoadingTypes}
            className="mt-2 rounded-xl bg-gradient-to-br from-brand-900 to-brand-500 text-white font-bold py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending…" : "Send message"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">Powered by ServerPe App Solutions</p>
      </div>
    </div>
  );
}
