import React, { useState, useEffect } from "react";

/*
  Najma Al Khautar — App.jsx
  - Full single-file React component (Tailwind classes used)
  - This file is a complete, runnable React component that exports a valid App() function
  - Fixes the previous error (Minified React error #130) by ensuring a valid component is exported
    and by avoiding rendering raw objects as JSX children.

  Instructions:
  - Paste this file into src/App.jsx of your React project
  - Tailwind is optional but recommended for styling; the component will still render without it
  - Replace /public/images and /public/videos placeholders with your real media files
*/

const PRODUCTS = [
  { id: "rhodes", title: "Rhodes Grass (Bales)", desc: "Green, nutritious and long-lasting bales — export-ready." },
  { id: "wheat", title: "Wheat", desc: "High-quality wheat for feed and processing." },
  { id: "corn", title: "Corn", desc: "Moisture-tested corn for premium feed." },
  { id: "barley", title: "Barley", desc: "Fresh barley with consistent quality." },
];

const TRUST_LOGOS = [
  "images/Trusted logo.jpg"

];


function ProductCard({ product, onQuote }) {
  // product is an object but we render only its primitive fields (title/desc)
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-2xl transition transform hover:-translate-y-1">
      <h3 className="font-bold text-lg text-green-900">{product.title}</h3>
      <p className="text-sm text-green-700 mt-2">{product.desc}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onQuote(product.title)} className="px-3 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800">Get Quote</button>
        <a href={`mailto:najmaalkauthar@gmail.com?subject=Inquiry about ${encodeURIComponent(product.title)}`} className="px-3 py-2 border rounded-lg">Email</a>
      </div>
    </div>
  );
}

function Counter({ end, label }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    if (!Number.isFinite(end) || end <= 0) return;
    const duration = 1400; // ms
    const stepTime = Math.max(10, Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setValue(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center p-4">
      <div className="text-3xl md:text-4xl font-extrabold text-green-900">{value}{end >= 100 ? "+" : ""}</div>
      <div className="text-sm text-green-700">{label}</div>
    </div>
  );
}

export default function App() {
  // App state
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");

  useEffect(() => {
    // set a helpful title and meta description for SEO (optional)
    document.title = "Najma Al Khautar — Rhodes Grass & Premium Animal Feed";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = "Najma Al Kauthar supplies premium Rhodes Grass, wheat, corn and tailored feed mixes — export-ready and trusted across multiple countries.";
  }, []);

  function openQuote(productTitle) {
    setQuoteProduct(productTitle || "General Inquiry");
    setQuoteOpen(true);
  }
  function closeQuote() {
    setQuoteOpen(false);
    setQuoteProduct("");
  }

  async function subscribeNewsletter(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    // Basic network submit to Formspree endpoint
    try {
      const res = await fetch("https://formspree.io/f/xdkwebkn", { method: "POST", body: data });
      if (res.ok) setNewsletterMsg("✅ Subscribed — thank you!");
      else setNewsletterMsg("❌ Subscription failed. Try again later.");
    } catch (err) {
      setNewsletterMsg("❌ Network error.");
    }
    setTimeout(() => setNewsletterMsg(""), 4000);
    form.reset();
  }

  return (
    <div className="min-h-screen bg-fixed text-gray-900 p-6" style={{
      backgroundImage: "linear-gradient(180deg, rgba(242,253,245,0.95), rgba(225,249,235,0.9)), url('/images/logo512.png.png')",
      backgroundBlendMode: 'overlay',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>

      {/* Floating WhatsApp + Call */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-50">
        <a href="https://wa.me/971524050997" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full flex items-center justify-center bg-green-600 text-white shadow-xl hover:scale-105 transform transition" aria-label="WhatsApp">💬</a>
        <a href="tel:+971524050997" className="w-14 h-14 rounded-full flex items-center justify-center bg-amber-500 text-white shadow-xl hover:scale-105 transform transition" aria-label="Call">📞</a>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          {/* replace the NK box with your logo */}
          <img src="\logo512.png.png" alt="Najma logo" className="w-14 h-14 rounded-2xl object-cover shadow-md" />
          <div>
            <h1 className="text-2xl font-extrabold">Najma Al Khautar</h1>
            <p className="text-sm text-gray-700">Premium Rhodes Grass & Animal Feed — Export Ready</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <a href="#products" className="text-sm font-semibold hover:underline">Products</a>
          <a href="#why" className="text-sm font-semibold hover:underline">Why Us</a>
          <a href="#testimonials" className="text-sm font-semibold hover:underline">Testimonials</a>
          <button onClick={() => openQuote('General Inquiry')} className="px-4 py-2 bg-green-700 text-white rounded-lg font-bold shadow hover:bg-green-800">Get Quote</button>
        </nav>
      </header>







      {/* Hero */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center mb-10">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">Fresh. Green. Trusted — Najma Al Khautar</h2>
          <p className="mt-4 text-lg text-green-800">Export-quality Rhodes Grass bales, wheat, corn and tailored feed mixes — backed with certificates and fast logistics. Everyone chooses us once — and never looks back.</p>
          <div className="mt-6 flex gap-4">
            <button onClick={() => openQuote('Rhodes Grass')} className="px-6 py-3 bg-green-700 text-white rounded-lg font-bold shadow hover:bg-green-800">Request Quote</button>
            <a href="#contact" className="px-6 py-3 border border-green-700 rounded-lg font-bold hover:bg-green-100">Contact</a>
          </div>
          <div className="mt-6 flex gap-6 items-center text-sm text-green-900">
            <div>📞 +971524050997</div>
            <div>✉️ najmaalkauthar@gmail.com</div>
          </div>

          {/* Trust logos */}
            <div className="mt-6 flex justify-center items-center gap-6">
            {TRUST_LOGOS.map((logo, idx) => (
              <img key={idx} src={logo} alt={`partner-${idx}`} className="h-24 md:h-25 w-auto object-contain" />
            ))}
          </div>
        </div>


        <div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <video className="w-full h-auto" autoPlay muted loop playsInline>
              <source src="/videos/rhode-grass-video.mp4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-4 text-sm text-gray-600">Quality checked · Export documentation provided · Flexible shipping</div>
        </div>
      </section>

{/* About Section */}
<section id="about" className="max-w-7xl mx-auto mb-12">
  <div className="bg-white/90 p-8 rounded-2xl shadow-md">
    <h3 className="text-3xl font-extrabold text-green-900 mb-4">About Najma Al Kauthar</h3>
    <p className="text-green-800 text-lg mb-4">
      Najma Al Kauthar is a trusted name in the export of Rhodes Grass, wheatstraw, corn, and animal feed across the Middle East and Africa. With 10 years of agricultural experience and a passion for quality, we bring you products that are not only rich in nutrition but also meet international export standards.
    </p>
    <p className="text-green-800 text-lg">
      Our mission is simple: deliver high-quality, natural feed with honesty, transparency, and a commitment to long-term partnerships. Whether you're a distributor, farmer, or feed supplier — we're here to support your success.
    </p>
  </div>
</section>

      {/* Why Choose Us */}
      <section id="why" className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-4">
          <h3 className="text-3xl font-extrabold text-green-900">Why Choose Najma Al Khautar</h3>
          <p className="text-green-800">Because every farmer and buyer deserves a partner they can trust. We don’t just supply feed — we deliver confidence. Below are the reasons almost everyone chooses us as their first and final choice.</p>

          <ul className="mt-4 space-y-3">
            <li className="bg-white/90 p-4 rounded-2xl shadow">✅ <strong>100% Natural & Premium Quality</strong> — carefully harvested, sorted, and packed to preserve freshness and color.</li>
            <li className="bg-white/90 p-4 rounded-2xl shadow">✅ <strong>Proven Export Track Record</strong> — trusted by buyers across the Middle East and Africa with full export documentation.</li>
            <li className="bg-white/90 p-4 rounded-2xl shadow">✅ <strong>Timely & Transparent Delivery</strong> — real-time updates, flexible shipping (sea, air, road), and clear quotes.</li>
            <li className="bg-white/90 p-4 rounded-2xl shadow">✅ <strong>Relationship-first Business</strong> — we support repeat buyers with priority allocations and custom mixes.</li>
          </ul>

          <blockquote className="mt-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-green-700">“Everyone chooses us once — and never looks back.”</blockquote>

          <div className="mt-6">
            <button onClick={() => openQuote('Partnership')} className="px-5 py-3 bg-amber-500 text-white rounded-lg font-bold shadow hover:bg-amber-600">Partner With Us</button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white/90 p-6 rounded-2xl shadow-md text-center">
            <div className="text-4xl mb-3">🌱</div>
            <h4 className="font-bold text-lg text-green-900">Quality Produce</h4>
            <p className="text-sm text-green-700 mt-2">Sustainably harvested and tested.</p>
          </div>

          <div className="bg-white/90 p-6 rounded-2xl shadow-md text-center">
            <div className="text-4xl mb-3">🚚</div>
            <h4 className="font-bold text-lg text-green-900">Fast Delivery</h4>
            <p className="text-sm text-green-700 mt-2">Sea, air and land — insured shipping.</p>
          </div>

          <div className="bg-white/90 p-6 rounded-2xl shadow-md text-center">
            <div className="text-4xl mb-3">🌍</div>
            <h4 className="font-bold text-lg text-green-900">Global Reach</h4>
            <p className="text-sm text-green-700 mt-2">Export compliance and trade experience.</p>
          </div>

          <div className="bg-white/90 p-6 rounded-2xl shadow-md text-center">
            <div className="text-4xl mb-3">💰</div>
            <h4 className="font-bold text-lg text-green-900">Competitive Pricing</h4>
            <p className="text-sm text-green-700 mt-2">Transparent quotes and flexible contracts.</p>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-10 bg-white/70 p-6 rounded-2xl shadow-md">
        <Counter end={10} label={'Years Experience'} />
        <Counter end={30000} label={'Tons Exported'} />
        <Counter end={15} label={'Countries Served'} />
      </section>

      {/* Products */}
      <section id="products" className="max-w-7xl mx-auto mb-10">
        <h3 className="text-2xl font-bold text-green-900 mb-4">Our Products</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} onQuote={openQuote} />
          ))}
        </div>
      </section>

      {/* Gallery slider (CSS only) */}
      <section id="gallery" className="max-w-7xl mx-auto mb-10">
        <h3 className="text-2xl font-bold text-green-900 mb-4">Gallery</h3>
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <div className="flex w-[300%] animate-slide">
             <img src="/images/Rhode Grass 3.jpg" className="w-1/3 object-cover h-64" alt="g2" />
             <img src="/images/Rhode Grass 4.jpg" className="w-1/3 object-cover h-64" alt="g4" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-green-800">“Great quality and timely shipment — highly recommended!”</p>
          <div className="mt-4 text-sm text-gray-600">— Ahmed, UAE</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-green-800">“Excellent communication and export docs — smooth process.”</p>
          <div className="mt-4 text-sm text-gray-600">— Fatima, Oman</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-green-800">“Good price and consistent quality.”</p>
          <div className="mt-4 text-sm text-gray-600">— Khalid, Qatar</div>
        </div>
      </section>

      {/* CTA / Newsletter */}
      <section className="max-w-7xl mx-auto bg-green-900 text-white rounded-2xl p-6 mb-10">
        <div className="md:flex md:justify-between md:items-center">
          <div>
            <h4 className="text-2xl font-extrabold">Get Export-Ready Quotes — Fast</h4>
            <p className="mt-2 text-sm text-green-200">Send us your requirements and we will reply with a clear export quote within 24 hours.</p>
          </div>
          <form onSubmit={subscribeNewsletter} className="mt-4 md:mt-0 md:flex gap-2">
            <input name="email" type="email" placeholder="Your email for quote & updates" required className="p-3 rounded-lg text-gray-800" />
            <button type="submit" className="px-4 py-3 bg-amber-400 text-green-900 rounded-lg font-bold">Send</button>
          </form>
        </div>
        {newsletterMsg && <div className="mt-3 text-sm">{newsletterMsg}</div>}
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-12 border-t py-6">
        <div className="max-w-7xl mx-auto px-4 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between">
          <div>© {new Date().getFullYear()} Najma Al Khautar — All rights reserved.</div>
          <div className="mt-2 md:mt-0">Phone: +92 318 0155643 · Email: ubaidraza1890@gmail.com</div>
        </div>
      </footer>

      {/* Quote Modal (Formspree) */}
      {quoteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-11/12 md:w-1/2 relative">
            <button onClick={closeQuote} className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-lg font-bold">✕</button>
            <h3 className="text-2xl font-bold text-green-900 mb-4">Request a Quote — {quoteProduct}</h3>
            <form action="https://formspree.io/f/xdkwebkn" method="POST" className="space-y-3">
              <input type="hidden" name="product" value={quoteProduct} />
              <input name="company" type="text" placeholder="Company (optional)" className="w-full p-3 border rounded-lg" />
              <input name="name" type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" required />
              <input name="email" type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg" required />
              <input name="phone" type="text" placeholder="Phone Number" className="w-full p-3 border rounded-lg" />
              <textarea name="message" placeholder="Your Message" className="w-full p-3 border rounded-lg" rows="4"></textarea>
              <button type="submit" className="w-full py-3 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800 transition-all duration-300">Send Request</button>
            </form>
          </div>
        </div>
      )}

      {/* Styling for slider and animations */}
      <style>{`
        html { scroll-behavior: smooth }
        @keyframes slide { 0% { transform: translateX(0%) } 33% { transform: translateX(-33.333%) } 66% { transform: translateX(-66.666%) } 100% { transform: translateX(0%) } }
        .animate-slide { animation: slide 14s linear infinite; }
      `}</style>
    </div>
  );
}
