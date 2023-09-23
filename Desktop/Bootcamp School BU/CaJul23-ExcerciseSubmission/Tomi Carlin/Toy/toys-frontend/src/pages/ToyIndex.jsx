import { Loader } from '../cmps/common/Loader.jsx'
import { ErrorMessage } from '../cmps/common/ErrorMessage.jsx'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { generateRandomToy, loadToys } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service.js'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const isLoading = useSelector(
    (storeState) => storeState.toyModule.flag.isLoading
  )
  const error = useSelector((storeState) => storeState.toyModule.flag.error)

  useEffect(() => {
    loadToys()
  }, [])

  if (isLoading) return <Loader />
  if (error) return <ErrorMessage />

  return (
    <main className="toy-main-index">
      <h2>Mister Toys R US Store</h2>
      <button onClick={generateRandomToy}>Generate Random Toy</button>
      {toys.length ? (
        <ToyList toys={toys} />
      ) : (
        <p>There are currently no toys at the store to display :(</p>
      )}
    </main>
  )
}
