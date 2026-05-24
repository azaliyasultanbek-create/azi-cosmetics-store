import { useEffect, useState } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem("reviews");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    try {
      localStorage.setItem("reviews", JSON.stringify(reviews));
    } catch (e) {
      console.log("Storage error:", e);
    }
  }, [reviews]);
  const handleSubmit = () => {
    if (!text.trim()) return;

    if (editingId !== null) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === editingId ? { ...r, body: text } : r
        )
      );
      setEditingId(null);
    } else {
      const newReview = {
        id: Date.now(),
        body: text,
      };
      setReviews((prev) => [newReview, ...prev]);
    }

    setText("");
  };
  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };
  const handleEdit = (review) => {
    setText(review.body);
    setEditingId(review.id);
  };

  return (
    <div>
      <h2>Reviews</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write review"
      />

      <button onClick={handleSubmit}>
        {editingId !== null ? "Update" : "Add"}
      </button>

      {reviews.length === 0 && <p>No reviews</p>}

      {reviews.map((r) => (
        <div key={r.id} style={{ border: "1px solid gray", margin: 10 }}>
          <p>{r.body}</p>

          <button onClick={() => handleEdit(r)}>Edit</button>
          <button onClick={() => handleDelete(r.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}