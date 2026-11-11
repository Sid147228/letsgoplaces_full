import Link from "next/link";

const destinations = [
  { name: "Kyoto", country: "Japan", tag: "Culture & calm", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85" },
  { name: "Amalfi Coast", country: "Italy", tag: "Coastal escapes", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85" },
  { name: "Bali", country: "Indonesia", tag: "Nature & wellness", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85" },
  { name: "Paris", country: "France", tag: "Art & romance", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=85" }
];

export default function Home() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="shell header-inner">
          <Link href="/" className="brand" aria-label="letsg0places home"><span className="brand-symbol">✳</span>lets<span className="brand-accent">g0</span>places<span className="brand-period">.</span></Link>
          <nav className="header-nav" aria-label="Main navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#destinations">Explore destinations</a>
          </nav>
          <Link href="/plan" className="header-button">Plan my trip <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <main>
        <section className="hero-new">
          <div className="hero-photo" role="img" aria-label="Sunlit Mediterranean coastline with colorful buildings and blue sea" />
          <div className="hero-shade" />
          <div className="shell hero-inner">
            <div className="hero-copy">
              <div className="hero-kicker"><span className="kicker-dot" /> YOUR PERSONAL AI TRAVEL PLANNER</div>
              <h1>Go somewhere<br/><em>wonderful.</em></h1>
              <p>Less planning, more exploring. Tell Aero where you dream of going and create a trip that feels like you.</p>
              <Link href="/plan" className="hero-primary">Plan your trip for free <span aria-hidden="true">↗</span></Link>
              <div className="hero-note"><span aria-hidden="true">✦</span> Thoughtful itineraries, made simple</div>
            </div>
            <div className="hero-location"><span className="location-pin">⌖</span> The Amalfi Coast, Italy</div>
          </div>
        </section>

        <section className="intro-section shell" id="how-it-works">
          <div className="section-eyebrow">THE EASIER WAY TO EXPLORE</div>
          <div className="intro-heading"><h2>Your next adventure,<br/><em>without the overwhelm.</em></h2><p>From the first idea to your day-by-day plan, Aero helps you organize the essentials in a few simple steps.</p></div>
          <div className="steps-grid">
            <article className="step-card"><div className="step-icon">⌖</div><div className="step-number">01 / DREAM</div><h3>Pick your place</h3><p>Choose a destination and the dates you want to get away.</p></article>
            <article className="step-card"><div className="step-icon">☷</div><div className="step-number">02 / PERSONALIZE</div><h3>Make it yours</h3><p>Set your budget, pace, and the things you love doing.</p></article>
            <article className="step-card"><div className="step-icon">✧</div><div className="step-number">03 / EXPLORE</div><h3>See your itinerary</h3><p>Get a simple day-by-day starting point for your adventure.</p></article>
          </div>
        </section>

        <section className="dest-section" id="destinations"><div className="shell">
          <div className="section-eyebrow">A LITTLE INSPIRATION</div>
          <div className="dest-heading"><div><h2>Where will you <em>go next?</em></h2><p>Incredible places. Endless possibilities.</p></div><Link href="/plan" className="text-link">Start planning <span aria-hidden="true">↗</span></Link></div>
          <div className="destination-grid">{destinations.map((d)=><Link href="/plan" className="destination-card" key={d.name}><div className="destination-photo" style={{backgroundImage:`url("${d.image}")`}}/><div className="destination-overlay"/><div className="destination-content"><span className="destination-tag">{d.tag}</span><h3>{d.name}</h3><p>{d.country}</p></div><span className="destination-arrow" aria-hidden="true">↗</span></Link>)}</div>
        </div></section>

        <section className="closing-section shell"><div className="closing-panel"><div className="closing-decoration">✳</div><div className="section-eyebrow">READY WHEN YOU ARE</div><h2>Great trips start<br/>with a <em>little curiosity.</em></h2><p>Make space for the moments you'll remember.</p><Link href="/plan" className="closing-button">Let's plan your trip <span aria-hidden="true">↗</span></Link></div></section>
      </main>
      <footer className="footer-new"><div className="shell footer-inner"><Link href="/" className="brand"><span className="brand-symbol">✳</span>lets<span className="brand-accent">g0</span>places<span className="brand-period">.</span></Link><span>Explore more. Plan less.</span><span>© {new Date().getFullYear()} letsg0places</span></div></footer>
    </div>
  );
}
