

export function ReviewList({ reviews }) {
    return (
      <div className="review-list">
        <h2>Reviews</h2>
        {!reviews ? (
          <p>No reviews available.</p>
        ) : (
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <strong>{review.fullName}</strong> - Rating: {review.rating}, Read at: {review.readAt}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }