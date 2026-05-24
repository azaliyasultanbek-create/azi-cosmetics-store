import { useState, useEffect } from "react";
import { productsApi } from "../../app/services/api";
import Loader from "../../app/components/Loader";
import { BEAUTY_CATEGORIES } from "../../app/hooks/useProducts";

function isBeautyCategory(cat) {
  const name = (cat.name || cat.slug || cat || "").toLowerCase().trim();
  return BEAUTY_CATEGORIES.some((bc) => name.includes(bc));
}

const fallbackCategories = [
  { name: "Skincare", description: "Moisturizers, cleansers, and treatments" },
  { name: "Makeup", description: "Foundation, lipstick, eyeshadow and more" },
  { name: "Fragrance", description: "Perfumes and colognes" },
  { name: "Hair Care", description: "Shampoos, conditioners, and styling" },
  { name: "Body Care", description: "Lotions, oils, and body wash" },
];

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    productsApi
      .getCategories()
      .then((data) => {
        if (!cancelled) {
          const beautyCats = data.filter((cat) => isBeautyCategory(cat));
          setCategories(beautyCats);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  if (loading) return <Loader text="Loading categories..." />;

  if (error) {
    return (
      <div className="categories-page">
        <h2>Beauty Categories</h2>
        <p className="error-text">Could not load categories. Showing defaults.</p>
        <div className="categories-grid">
          {fallbackCategories.map((cat, index) => (
            <div key={index} className="category-card">
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="categories-page">
      <h2>Beauty Categories</h2>
      <p className="categories-subtitle">
        Browse our cosmetic collection by category
      </p>

      <div className="categories-grid">
        {displayCategories.map((cat) => (
          <div key={cat.slug || cat.name} className="category-card">
            <h3>{cat.name || cat}</h3>
            {cat.description && <p>{cat.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
