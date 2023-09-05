import { bookService } from "../services/book.service.js"
const { useState } = React
const { useOutletContext } = ReactRouterDOM
export function AddReview() {
    const [reviewToEdit, setReviewToEdit] = useState(bookService.getDefaultReview())
    const [onAddReview] = useOutletContext()
    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setReviewToEdit(prevReviews => ({ ...prevReviews, [field]: value }))
    }

    function onSubmitReview(ev) {
        ev.preventDefault()
        onAddReview(reviewToEdit)
    }

    const {fullName, rating, readAt} = reviewToEdit

    return (
        <div className="add-review">
            <h2>Add a Review</h2>
            <form onSubmit={onSubmitReview}>
                <div className="form-group">
                    <label htmlFor="fullName">fullName:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        name="fullName"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        name="rating"
                        value={rating}
                        onChange={(e) => handleChange(e)}
                    >
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="readAt">Read At:</label>
                    <input
                        type="date"
                        id="readAt"
                        name="readAt"
                        value={readAt}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button>Add Review</button>
            </form>
        </div>
    )
}
