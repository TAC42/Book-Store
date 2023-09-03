import { bookService } from "../services/book.service.js"
import { LongText } from "../cmps/longText.jsx"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)
    function bookLevel(pages) {
        if (pages < 100) return 'Light Reading'
        else if (pages < 200) return 'Descent Reading'
        else return 'Serious Reading'
    }
    function bookAge(published){
        if (published < 2013 ) return '-Vintage-'
        else if (published >= 2022) return '-New-'
    }

    useEffect(() => {
        bookService.get(bookId).then(setBook)
    }, [])

    if (!book) return <div>Loading...</div>
    let mode = (book.listPrice.amount > 150) ? 'red' : ''
    mode = (book.listPrice.amount < 20) ? 'green' : mode

    const onSale = (book.listPrice.isOnSale) ? 'discount' : ''

    return (
        <section className="book-details">
            <h1>Title: {book.title.toUpperCase()}</h1>
            <h4>Author/s: {book.authors}</h4>
            <h3>Page Length: -{bookLevel(book.pageCount)}-({book.pageCount}), Published: {bookAge(book.publishedDate)}({book.publishedDate})</h3>
            <h2 className={`price ${mode}`}>Price: {`${book.listPrice.currencyCode} ${book.listPrice.amount}`}</h2>
            <h3> Categories: {book.categories}, Language: {book.language}</h3>
            <h4>Description: </h4>
            <LongText text={book.description} length={6} />
            {/* <p>{book.description}</p> */}
            <h1 className={`on-sale ${onSale}`}>=== ON SALE! ===</h1>
            <button onClick={onBack}>Back</button>
        </section>
    )
}