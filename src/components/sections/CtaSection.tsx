'use client';

import { useState } from 'react';

const ACTIONS = [
  {
    icon: '☀️',
    title: 'Partner with Us',
    description:
      "Are you a business, organization, or city agency? Let's build something meaningful together.",
    cta: 'Start a conversation',
    type: 'partner',
  },
  {
    icon: '📱',
    title: 'Join the App Beta',
    description:
      'Be among the first to use the Heat Relief App when it launches. Your feedback shapes the product.',
    cta: 'Get early access',
    type: 'beta',
  },
  {
    icon: '🤝',
    title: 'Volunteer or Donate',
    description:
      "Help us expand our reach. Whether it's time, skills, or resources — every contribution matters.",
    cta: 'Get involved',
    type: 'volunteer',
  },
];

export default function CtaSection() {
  const [form, setForm] = useState({ name: '', email: '', interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="cta" className="py-24 lg:py-36 bg-deep-slate overflow-hidden relative">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-heat-amber/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-blue/8 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-heat-amber/25 bg-heat-amber/8 mb-6">
            <span className="font-body text-heat-amber text-[11px] font-semibold tracking-widest uppercase">
              Get Involved
            </span>
          </div>
          <h2
            className="display-text text-white mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            Let's build something{' '}
            <span className="display-italic text-heat-amber">meaningful</span>{' '}
            together
          </h2>
          <p className="font-body text-white/50 max-w-xl mx-auto leading-relaxed">
            Whether you're a community partner, investor, future user, or just
            someone who cares — we'd love to hear from you.
          </p>
        </div>

        {/* Action cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {ACTIONS.map((action, i) => (
            <div
              key={action.type}
              className="p-7 rounded-3xl bg-white/5 border border-white/8 hover:border-heat-amber/25 hover:bg-white/8 transition-all duration-200 card-lift reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="text-3xl mb-4">{action.icon}</div>
              <h3 className="font-body text-white font-semibold text-lg mb-3">
                {action.title}
              </h3>
              <p className="font-body text-white/50 text-sm leading-relaxed mb-6">
                {action.description}
              </p>
              <span className="font-body text-heat-amber-light text-sm font-medium">
                {action.cta} →
              </span>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div
          className="max-w-2xl mx-auto reveal"
          style={{ transitionDelay: '0.2s' }}
        >
          {submitted ? (
            <div className="text-center py-12 px-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-display text-white text-2xl mb-3">
                Message received
              </h3>
              <p className="font-body text-white/50">
                We'll get back to{' '}
                <span className="text-heat-amber-light">{form.email}</span> within
                two business days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-8 lg:p-10 rounded-3xl bg-white/5 border border-white/8"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:border-heat-amber/40 focus:bg-white/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-body text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:border-heat-amber/40 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">
                  I'm interested in...
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Solar Shelters', 'Heat Relief App', 'Family Hub', 'Partnering'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, interest: opt }))}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-body font-medium transition-all duration-150 cursor-pointer ${
                        form.interest === opt
                          ? 'border-heat-amber bg-heat-amber/15 text-heat-amber-light'
                          : 'border-white/10 bg-white/4 text-white/40 hover:border-white/20 hover:text-white/60'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-body text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about yourself and how you'd like to get involved..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:border-heat-amber/40 focus:bg-white/10 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-heat-amber hover:bg-heat-amber-light text-white rounded-xl font-body font-semibold text-sm transition-colors duration-200 cursor-pointer shadow-lg"
              >
                Send Message →
              </button>

              <p className="text-center font-body text-white/25 text-xs">
                We respect your privacy and never share your information.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
