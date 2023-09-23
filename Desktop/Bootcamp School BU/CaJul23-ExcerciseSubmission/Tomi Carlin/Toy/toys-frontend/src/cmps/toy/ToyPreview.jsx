import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
  return (
    <article className="toy-preview-container">
      <span className="toy-name">{toy.name}</span>
      <span className="toy-price">{`$${toy.price}`}</span>
      <img
        src="../../assets/todo_favicon.png"
        className="toy-image"
        alt="toy image"
      ></img>
      <Link to={`/toy/${toy._id}`}>Toy Details</Link>
    </article>
  )
}
