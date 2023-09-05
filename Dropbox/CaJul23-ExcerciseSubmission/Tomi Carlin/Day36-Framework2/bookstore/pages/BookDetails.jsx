import { bookService } from "../services/book.service.js"
import { LongText } from "../cmps/LongText.jsx"
const { useState, useEffect } = React
const { useParams, useNavigate, Link, Outlet } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('bookID', bookId);
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
            })
    }

    function onAddReview(reviewToAdd) {
        bookService.addReview(bookId, reviewToAdd)
            .then(updatedBook => {
                setBook(updatedBook)
                showSuccessMsg('Review saved successfully')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Error saving review')
            })
    }

    function onDeleteReview(reviewId) {
        bookService
            .deleteReview(bookId, reviewId)
            .then(savedBook => {
                setBook(savedBook)
                showSuccessMsg('Review deleted successfully')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Error deleting review')
                navigate('/book')
            })
    }

    function bookLevel(pages) {
        if (pages < 100) return 'Light Reading'
        else if (pages < 200) return 'Descent Reading'
        else return 'Serious Reading'
    }
    function bookAge(published) {
        if (published < 2013) return '-Vintage-'
        else if (published >= 2022) return '-New-'
    }

    function onBack() {
        navigate('/book')
    }

    if (!book) return <div>Loading...</div>
    const mode = book.listPrice.amount > 150 ? 'red' :
        book.listPrice.amount < 20 ? 'green' : ''

    const onSale = (book.listPrice.isOnSale) ? 'discount' : ''
    const { reviews } = book
    console.log('Reviews in BOOKDETAILS: ', reviews);
    return (
        <section className="book-details">
            <h1>Title: {book.title.toUpperCase()}</h1>
            <h4>Author/s: {book.authors.join(',')}</h4>
            <h3>Page Length: -{bookLevel(book.pageCount)}-({book.pageCount}), Published: {bookAge(book.publishedDate)}({book.publishedDate})</h3>
            <h2 className={`price ${mode}`}>Price: {`${book.listPrice.currencyCode} ${book.listPrice.amount}`}</h2>
            <h3> Categories: {book.categories.join(',')}, Language: {book.language}</h3>
            <h4>Description: </h4>
            <LongText text={book.description} length={6} />
            <h1 className={`on-sale ${onSale}`}>=== ON SALE! ===</h1>
            <div className="next-prev">
                <button><Link to={`/book/${book.prevBookId}`}>Previous Book</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </div>

            <button onClick={onBack}>Back</button>

            <nav className="nav-review">
                <button><Link to={`/book/${bookId}/view-reviews`}>Reviews</Link></button>
                <button><Link to={`/book/${bookId}/add-review`}>Add-Review</Link></button>
            </nav>

            <section>
                <Outlet context={[onAddReview, onDeleteReview, reviews]} />
            </section>

        </section>
    )
}