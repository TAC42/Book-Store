
export function BookPreview({ book }) {
    console.log(book);
    return (
        <article className="book-preview">
            <h2>{book.title.toUpperCase()}</h2>
            <h4>{`${book.listPrice.currencyCode} ${book.listPrice.amount}`}</h4>
            <img src={book.thumbnail} alt=""/>
        </article>
    )
}
