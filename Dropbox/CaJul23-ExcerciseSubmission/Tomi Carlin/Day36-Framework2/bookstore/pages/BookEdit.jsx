import { bookService } from "../services/book.service.js"
const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBookToEdit)
            .then( ()=> showSuccessMsg(`book Added! ${params.bookId}`))
            .catch(err => console.log('err:', err))
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }
        if (field === 'amount')  setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, listPrice:{...prevBookToEdit.listPrice, [field]:value} }))
        else setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
    }


    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => navigate('/book'))
            .catch(err => console.log('err:', err))

    }
    console.log('from line 58', bookToEdit);

    const { title, listPrice } = bookToEdit
    const { amount } = listPrice
    return (
        <section className="book-edit">
            <form onSubmit={onSaveBook} >
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="amount">Price:</label>
                <input onChange={handleChange} value={amount} type="number" name="amount" id="amount" />

                <button>Save</button>
            </form>
        </section>
    )
}