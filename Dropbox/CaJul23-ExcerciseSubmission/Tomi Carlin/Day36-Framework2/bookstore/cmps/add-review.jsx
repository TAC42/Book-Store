const { useState , useEffect } = React
import { bookService } from "../services/book.service.js"
const { useParams } = ReactRouterDOM

export function AddReview() {
    const [review, setReview] = useState(bookService.getDefaultReview())
    const params = useParams()

    useEffect( ()=> {
        console.log('params.bookId', params.bookId );
        bookService.setReview(params.bookId, review)
    }, [review])

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

        setReview(prevReviews => ({ ...prevReviews, [field]: value }))
    }

    const {fullName, rating, readAt} = review

    return (
        <div className="add-review">
            <h2>Add a Review</h2>
            <form>
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
