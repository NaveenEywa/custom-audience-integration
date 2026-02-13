import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState([
    { id: 1, rating: 5, text: "" },
    { id: 2, rating: 5, text: "" },
    { id: 3, rating: 5, text: "" },
  ]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  const addReview = () => {
    const newId =
      reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1;
    setReviews([...reviews, { id: newId, rating: 5, text: "" }]);
  };

  const removeReview = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const updateReview = (id, field, value) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  };

  const summarizeReviews = async () => {
    const validReviews = reviews.filter((r) => r.text.trim() !== "");

    if (validReviews.length === 0) {
      setError("Please enter at least one review!");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await axios.post("http://localhost:3001/api/summarize", {
        reviews: validReviews,
      });

      if (response.data.success) {
        setSummary(response.data.summary);
        setReviewCount(response.data.reviewCount);
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError(`Failed to connect to server: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>🌟 GMB Review Summarizer</h1>
          <p>AI-powered insights from customer reviews</p>
        </div>

        <div className="card">
          <h2>Enter Reviews</h2>
          <div className="reviews-container">
            {reviews.map((review, index) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <label>Review {index + 1}</label>
                  <button
                    className="remove-btn"
                    onClick={() => removeReview(review.id)}
                  >
                    Remove
                  </button>
                </div>

                <label>Rating:</label>
                <select
                  value={review.rating}
                  onChange={(e) =>
                    updateReview(review.id, "rating", parseInt(e.target.value))
                  }
                  className="rating-select"
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
                  <option value="4">⭐⭐⭐⭐ (4 stars)</option>
                  <option value="3">⭐⭐⭐ (3 stars)</option>
                  <option value="2">⭐⭐ (2 stars)</option>
                  <option value="1">⭐ (1 star)</option>
                </select>

                <label>Review Text:</label>
                <textarea
                  value={review.text}
                  onChange={(e) =>
                    updateReview(review.id, "text", e.target.value)
                  }
                  placeholder="Enter customer review here..."
                  className="review-text"
                />
              </div>
            ))}
          </div>

          <div className="button-group">
            <button className="add-btn" onClick={addReview}>
              + Add Review
            </button>
            <button
              className="summarize-btn"
              onClick={summarizeReviews}
              disabled={loading}
            >
              {loading ? "🤖 Analyzing..." : "✨ Summarize Reviews"}
            </button>
          </div>
        </div>

        {(summary || error) && (
          <div className="card">
            <h2>📊 AI Summary</h2>
            {error && <div className="error">❌ {error}</div>}
            {summary && (
              <>
                <div className="summary">{summary}</div>
                <p className="review-count">
                  ✅ Analyzed {reviewCount} reviews
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
