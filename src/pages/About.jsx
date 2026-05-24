export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About AZI Cosmetics Store</h1>
        <p className="about-tagline">
          Your destination for quality beauty products
        </p>
      </section>

      <section className="about-content">
        <div className="about-card">
          <h2>Our Story</h2>
          <p>
            Welcome to our beauty store! We offer a wide range of cosmetic products
            designed to help you feel confident and express your unique style.
          </p>
          <p>
            Our catalog includes skincare, makeup, and everyday beauty essentials.
            We carefully select products that are high quality, trendy, and suitable
            for different skin types.
          </p>
          <p>
            Our goal is to make beauty simple and accessible for everyone.
            Whether you are looking for daily care or something special,
            you can find it here.
          </p>
        </div>

        <div className="about-card">
          <h2>What We Offer</h2>
          <ul className="about-list">
            <li>✨ Skincare products</li>
            <li>💄 Makeup essentials</li>
            <li>🌺 Popular beauty trends</li>
            <li>🧴 Body care</li>
            <li>🌟 Premium brands</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Our Values</h2>
          <ul className="about-list">
            <li>✅ Quality over quantity</li>
            <li>💖 Customer satisfaction first</li>
            <li>🌍 Cruelty-free products</li>
            <li>♻️ Sustainable packaging</li>
          </ul>
        </div>
      </section>
    </div>
  );
}