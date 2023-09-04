import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/book-list.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


    useEffect(() => {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }, [filterBy])

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
        })
        .then(() => {
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            showSuccessMsg(`book Removed! ${bookId}`)
        })
        .catch(err => {
            console.log('err:', err)
            showErrorMsg('Problem Removing ' + bookId)
        })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    // function onSelectBookId(bookId) {
    //     setSelectedBookId(bookId)
    // }



    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <Link to="/book/edit" >Add Book</Link>
            <BookList books={books} onRemoveBook={onRemoveBook} />
            {/* <BookDetails onBack={() => onSelectBookId(null)} bookId={selectedBookId} />} */}
        </section>
    )
}