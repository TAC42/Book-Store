import { ToyPreview } from './ToyPreview'

export function ToyList({ toys }) {
  return (
    <section className="toy-list-container">
      {toys.map((toy) => (
        <ToyPreview toy={toy} key={toy._id} />
      ))}
    </section>
  )
}
