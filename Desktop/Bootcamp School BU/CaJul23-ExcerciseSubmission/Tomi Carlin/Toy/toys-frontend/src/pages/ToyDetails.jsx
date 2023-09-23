import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service'
import { saveToy } from '../store/actions/toy.actions'
import { removeToy } from '../store/actions/toy.actions'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const params = useParams()
  const navigate = useNavigate()

  const { toyId } = params

  useEffect(() => {
    _loadToy.finally(() => setIsLoading(false))
  })

  function _loadToy() {
    return toyService
      .getById(toyId)
      .then((toy) => {
        setToy(toy)
      })
      .catch(setError)
  }

  function onBlurEdit({ target }) {
    const field = target.dataset.name
    const value = target.innerText
    const editedToy = { ...toy, [field]: value }

    const isEdited = !_.isEqual(editedToy, toy)

    if (isEdited) {
      saveToy(editedToy)
        .then(() => {
          setToy(editedToy)
          showSuccessMsg('Toy saved successfully')
        })
        .catch(() => {
          target.innerText = toy[field]
          showErrorMsg('An error occurred while saving toy')
        })
    }
  }

  function onRemoveToy() {
    removeToy(toy._id)
      .then(() => {
        navigate('/')
        showSuccessMsg('Toy deleted successfully')
      })
      .catch(() => {
        showErrorMsg('An error occurred while saving toy')
      })
  }

  if (isLoading) return <Loader />
  if (error) return <ErrorMessage />

  return (
    <main className="toy-details-container">
      <section className="toy-details" onBlur={onBlurEdit}>
        <div className="toy-name">
          <h2>
            <span
              contentEditable
              suppressContentEditableWarning
              data-name="name"
            >
              {toy.name}
            </span>
          </h2>
          <button onClick={onRemoveToy}>remove</button>
        </div>
        <div>
          <div className="detail">
            <span className="title">Price</span>
            <span
              contentEditable
              suppressContentEditableWarning
              data-name="price"
            >
              {toy.price}
            </span>
          </div>
        </div>
        <p
          contentEditable
          suppressContentEditableWarning
          data-name="description"
        >
          {toy.description}
        </p>
      </section>

      <section className="in-stock">
        <div>
          {toy.inStock
            ? 'Currently in stock!'
            : 'Sorry this item is out of stock!'}
        </div>
      </section>

      <section className="created-at">
        <div>{`First released at: ${toy.createdAt}`}</div>
      </section>

      <section className="toy-labels">
        <h3>{toy.name}'s labels:</h3>
        {toy.labels.forEach((label, idx) => (
          <div key={idx}>{`${idx + 1}. ${label}`}</div>
        ))}
      </section>
    </main>
  )
}
