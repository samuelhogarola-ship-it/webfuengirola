import { useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { ProductViewer } from "./components/ProductViewer";
import { featuredProduct, products, type Product } from "./data/products";

const brandLogo = "/images/brand/logo-madame-1024x1024.png";

const trustItems = [
  "Authenticated & Curated",
  "Worldwide Shipping",
  "Monaco Based",
  "Private Enquiries",
];

const principles = [
  {
    title: "Authentication-focused review",
    text: "Each reference is approached through careful review, condition context and measured private discussion.",
  },
  {
    title: "Documentation discussed per piece",
    text: "Available paperwork, provenance context and supporting material are reviewed privately with each client.",
  },
  {
    title: "Private handling",
    text: "Enquiries are managed discreetly, with availability, condition and pricing discussed privately.",
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleDiscussPrivately() {
    setSelectedProduct(null);
    window.setTimeout(() => scrollToSection("appointments"), 0);
  }

  return (
    <main className="site-shell">
      <header className="site-header" aria-label="Main navigation">
        <a className="brand-lockup" href="#top" aria-label="Madame Bleue home">
          <img className="brand-logo" src={brandLogo} alt="" aria-hidden="true" />
          <span>
            <span className="brand-name">Madame Bleue | Monaco</span>
            <span className="brand-place">Private appointments</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Page sections">
          <a href="#maison">Maison</a>
          <a href="#selection">Selection</a>
          <a href="#appointments">Private consultation</a>
        </nav>
      </header>

      <section className="hero-section" id="top" aria-labelledby="hero-title">
        <img className="hero-image" src={featuredProduct.image} alt="" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-wordmark" aria-hidden="true">
            <span className="wordmark-line" />
            <span>Madame Bleue | Monaco</span>
          </div>
          <h1 id="hero-title">Curated pre-owned timepieces in Monaco</h1>
          <p className="hero-subtitle">
            A private, appointment-led approach to authenticated pre-owned timepieces, curated for collectors worldwide.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <button type="button" className="button button-primary" onClick={() => scrollToSection("appointments")}>
              Request a private consultation
            </button>
            <button type="button" className="button button-secondary" onClick={() => scrollToSection("selection")}>
              View selected references
            </button>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Trust signals">
        {trustItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="section editorial-section" id="maison" aria-labelledby="maison-title">
        <div className="section-copy">
          <p className="section-label">Private Monaco sourcing desk</p>
          <h2 id="maison-title">Collector relationships, handled privately.</h2>
        </div>
        <div className="editorial-text">
          <p>
            Madame Bleue is a private point of contact for pre-owned luxury timepieces: curated,
            discreet and shaped around appointment-led collector conversations.
          </p>
          <p>
            Each reference is discussed privately, with availability, condition, documentation and
            pricing handled directly with collectors.
          </p>
        </div>
      </section>

      <section className="section featured-section" aria-labelledby="featured-title">
        <div className="featured-media">
          <img src={featuredProduct.image} alt={featuredProduct.alt} />
        </div>
        <div className="featured-copy">
          <p className="section-label">Featured Reference</p>
          <h2 id="featured-title">{featuredProduct.brand}</h2>
          <h3>{featuredProduct.model}</h3>
          <p>
            A refined annual calendar in yellow gold, selected for collectors seeking understated
            complication and classic elegance.
          </p>
          <p>Details, condition and availability are handled by private conversation.</p>
          <button type="button" className="text-link" onClick={() => scrollToSection("appointments")}>
            Discuss privately
          </button>
        </div>
      </section>

      <section className="section selection-section" id="selection" aria-labelledby="selection-title">
        <div className="section-heading">
          <p className="section-label">Selected References</p>
          <h2 id="selection-title">Selected references for private collectors.</h2>
          <p>
            A concise view into Madame Bleue's curatorial direction. Availability, documentation and
            pricing are discussed privately.
          </p>
        </div>

        <div className="selection-grid">
          {products.map((product) => (
            <ProductCard product={product} onOpen={setSelectedProduct} key={product.slug} />
          ))}
        </div>
        <div className="selection-consultation">
          <button type="button" className="button button-secondary" onClick={() => scrollToSection("appointments")}>
            Discuss a reference privately
          </button>
        </div>
      </section>

      <section className="section sourcing-section" aria-labelledby="sourcing-title">
        <div className="sourcing-panel">
          <div>
            <p className="section-label">Authentication & sourcing</p>
            <h2 id="sourcing-title">Careful review, private handling.</h2>
            <p>
              Each reference is approached through authentication-focused review, careful sourcing and
              per-piece documentation discussion, with commercial details handled privately.
            </p>
          </div>
          <div className="principles-list">
            {principles.map((principle) => (
              <article key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section appointment-section" id="appointments" aria-labelledby="appointments-title">
        <div className="appointment-copy">
          <p className="section-label">Private appointments</p>
          <h2 id="appointments-title">Private Appointments in Monaco</h2>
          <p>
            For collectors seeking a specific reference or wishing to discuss availability, Madame Bleue
            handles enquiries privately and directly.
          </p>
        </div>
        <address>
          3-5 Avenue Des Citronniers<br />
          (Prince des Galles), Monaco 98000
        </address>
        <div className="contact-links">
          <a href="https://www.instagram.com/madamebleuewatches/" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <span>Private consultation by appointment</span>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src={brandLogo} alt="" aria-hidden="true" />
          <span>Madame Bleue | Monaco</span>
        </div>
        <p>
          Madame Bleue is an independent pre-owned timepieces dealer. Brand names are used only to
          describe available references.
        </p>
        <a href="https://www.instagram.com/madamebleuewatches/" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <span>Private concept preview by KI-SIEBEN</span>
      </footer>

      <ProductViewer product={selectedProduct} onClose={() => setSelectedProduct(null)} onDiscuss={handleDiscussPrivately} />
    </main>
  );
}

export default App;
