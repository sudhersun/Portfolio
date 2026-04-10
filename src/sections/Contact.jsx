const cards = [
  {
    icon: '✉',
    label: 'Email us',
    value: 'sudhersun346@gmail.com',
    href: 'mailto:sudhersun346@gmail.com',
  },
  {
    icon: '📞',
    label: 'Call us',
    value: '+91 94863 58317',
    href: 'tel:+919486358317',
  },
  {
    icon: '📍',
    label: 'Our location',
    value: 'Tirunelveli, Tamil Nadu',
    href: 'https://maps.google.com/?q=Tirunelveli',
  },
];

export default function Contact() {
  const onSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const name = f.name.value.trim();
    const email = f.email.value.trim();
    const phone = f.phone.value.trim();
    const message = f.message.value.trim();

    const subject = `Portfolio inquiry from ${name}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n\n` +
      `Message:\n${message}\n`;

    const mailto = `mailto:sudhersun346@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact">
      <div className="sec-inner ct-inner">
        <div className="ct-grid">
          {/* LEFT */}
          <div className="ct-left">
            <div className="ct-badge"><span className="ct-badge-dot">◉</span>Contact</div>
            <h2 className="ct-title">Get in touch</h2>
            <p className="ct-sub">Have questions or ready to ship a product? Let's design and build something meaningful together.</p>

            <div className="ct-cards">
              {cards.map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="ct-card">
                  <div className="ct-card-ic">{c.icon}</div>
                  <div className="ct-card-tx">
                    <div className="ct-card-lb">{c.label}</div>
                    <div className="ct-card-vl">{c.value}</div>
                  </div>
                  <div className="ct-card-ar">↗</div>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <form className="ct-form" onSubmit={onSubmit}>
            <div className="ct-field">
              <input type="text" name="name" placeholder="Name" required />
            </div>
            <div className="ct-field">
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <div className="ct-field">
              <input type="tel" name="phone" placeholder="Phone" pattern="[0-9+\-\s()]{7,}" required />
            </div>
            <div className="ct-field ct-field-area">
              <textarea name="message" placeholder="Message" rows="6" required />
            </div>
            <button type="submit" className="ct-submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}
