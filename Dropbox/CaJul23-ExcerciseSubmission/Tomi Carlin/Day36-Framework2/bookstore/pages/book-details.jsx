import { bookService } from "../services/book.service.js"
import { LongText } from "../cmps/long-text.jsx"
// import { AddReview } from "../cmps/add-review.jsx"
// import { ReviewList } from '../cmps/review-list.jsx';


const { useState, useEffect } = React
const { useParams, useNavigate, Link, Outlet } = ReactRouterDOM



export function BookDetails() {
    const [book, setBook] = useState(null)
    const [reviews, setReviews] = useState([
        // Replace this with your actual list of reviews for the book
        { fullname: 'John Doe', rating: 4, readAt: '2023-01-15' },
        { fullname: 'Jane Smith', rating: 5, readAt: '2023-02-20' },
        // Add more reviews as needed
    ])

    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        console.log('bookID' , params.bookId);
        loadBook()
    }, [params.bookId])
    useEffect(() => {
       loadReviews()
    }, [reviews])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
                // navigate('/book')
            })
    }

    function loadReviews() {
        bookService.get(params.bookId)
            .then({ reviews } )
            .then(setReviews)
            .catch(err => {
                console.log('err:', err)
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

    return (
        <section className="book-details">
            <h1>Title: {book.title.toUpperCase()}</h1>
            <h4>Author/s: {book.authors.join(',')}</h4>
            <h3>Page Length: -{bookLevel(book.pageCount)}-({book.pageCount}), Published: {bookAge(book.publishedDate)}({book.publishedDate})</h3>
            <h2 className={`price ${mode}`}>Price: {`${book.listPrice.currencyCode} ${book.listPrice.amount}`}</h2>
            <h3> Categories: {book.categories.join(',')}, Language: {book.language}</h3>
            <h4>Description: </h4>
            <LongText text={book.description} length={6} />
            {/* <p>{book.description}</p> */}
            <h1 className={`on-sale ${onSale}`}>=== ON SALE! ===</h1>
            <button><Link to="/book">Next Book</Link></button>
            <button onClick={onBack}>Back</button>
            {/* <AddReview onAddReview={handleAddReview} /> */}

            <nav className="nav-review">
                <button><Link to={`/book/${params.bookId}/view-reviews`}>Reviews</Link></button>
                <button><Link to={`/book/${params.bookId}/add-review`}>Add-Review</Link></button>
            </nav>

            <section>
                <Outlet reviews={reviews}/>
            </section>

        </section>
    )
}