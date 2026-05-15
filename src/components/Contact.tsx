"use client";

import { useState } from "react";
import { Mail, Send, Sun, Smartphone, Home, CheckCircle } from "lucide-react";

const interests = [
  { id: "solar",      label: "Solar Shelters",  icon: Sun,        border: "border-orange-500/50", bg: "bg-orange-500/15", text: "text-orange-300" },
  { id: "heat-app",   label: "Heat Relief App", icon: Smartphone, border: "border-red-500/50",    bg: "bg-red-500/15",    text: "text-red-300" },
  { id: "family-hub", label: "Family Hub",      icon: Home,       border: "border-blue-500/50",   bg: "bg-blue-500/15",   text: "text-blue-300" },
  { id: "partner",    label: "Partnership",     icon: Mail,       border: "border-purple-500/50", bg: "bg-purple-500/15", text: "text-purple-300" },
];

export default function Contact() {
  const [selected,  setSelected]  = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const toggleInterest = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-[#020408] circuit-grid relative overflow-hidden"
    >
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-orange-900/12 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-900/12 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 glass-card border border-white/10 text-slate-400 rounded-full px-4 py-1.5 text-sm font-mono tracking-wider mb-5">
            <Mail className="w-4 h-4" />
            GET IN TOUCH
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Let&rsquo;s Build Something
            <br />
            <span className="gradient-text">Meaningful Together</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Whether you&rsquo;re a community partner, investor, potential user, or just
            someone who cares about the mission, we&rsquo;d love to hear from you.
          </p>
        </div>

        {/* Form */}
        {submitted ? (
          <div className="glass-card border border-cyan-500/20 rounded-3xl p-12 text-center neon-border-animated reveal">
            <div className="w-16 h-16 bg-green-500/15 border border-green-500/25 rounded-full flex items-center justify-center mx-auto mb-5 glow-cyan">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Thanks for reaching out!</h3>
            <p className="text-slate-400">
              We&rsquo;ll get back to you at{" "}
              <span className="text-cyan-400 font-mono">{form.email}</span>{" "}
              within 2 business days.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="glass-card border border-white/8 rounded-3xl p-8 lg:p-12 space-y-6 hud-corners reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { id: "name",  label: "Full Name",      type: "text",  placeholder: "Jane Smith",       value: form.name,  onChange: (v: string) => setForm({ ...form, name: v }) },
                { id: "email", label: "Email Address",  type: "email", placeholder: "jane@example.com", value: form.email, onChange: (v: string) => setForm({ ...form, email: v }) },
              ].map((field) => (
                <div key={field.id}>
                  <label className="block text-slate-400 text-sm font-mono tracking-wider mb-2 uppercase text-xs" htmlFor={field.id}>
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/6 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all text-sm font-mono"
                  />
                </div>
              ))}
            </div>

            {/* Interest selector */}
            <div>
              <label className="block text-slate-400 text-xs font-mono tracking-wider mb-3 uppercase">
                I&rsquo;m interested in... (select all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {interests.map((interest) => {
                  const isSelected = selected.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleInterest(interest.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? `${interest.border} ${interest.bg} ${interest.text}`
                          : "border-white/8 bg-white/3 text-slate-500 hover:bg-white/6 hover:border-white/15"
                      }`}
                    >
                      <interest.icon className="w-5 h-5" />
                      {interest.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-slate-400 text-xs font-mono tracking-wider mb-2 uppercase" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us about yourself and how you'd like to get involved..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/6 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all text-sm resize-none font-mono"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 btn-neon-orange text-white py-4 rounded-2xl font-bold text-base cursor-pointer"
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>

            <p className="text-slate-700 text-xs text-center font-mono">
              We respect your privacy and never share your information.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
