import { utilService } from "../services/util.service.js"

export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Book Title: {book.title}</h2>
            <h4>Book Categories: {book.categories}</h4>
            <img src={`../assets/BooksImages/${utilService.getRandomIntInclusive(1, 20)}.jpg`} alt="" />
        </article>
    )
}
