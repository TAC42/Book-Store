import { store } from '../store.js'
import {
  ADD_TOY,
  REMOVE_TOY,
  SET_TOYS,
  SET_ERROR,
  SET_IS_LOADING,
  UPDATE_TOY,
} from '../reducers/toy.reducer.js'
import { toyService } from '../../services/toy.service.js'
import {
  showErrorMsg,
  showSuccessMsg,
} from '../../services/event-bus.service.js'

export function loadToys() {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return toyService
    .query()
    .then((toys) => {
      store.dispatch({ type: SET_TOYS, toys })
    })
    .catch((err) => {
      console.log('toy action -> Cannot load toys', err)
      store.dispatch({ type: SET_ERROR, error: err })
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function generateRandomToy() {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  toyService
    .getRandomToy()
    .then((toy) => {
      store.dispatch({ type: ADD_TOY, toy })
      showSuccessMsg('Toy generated Successfully')
    })
    .catch((err) => {
      console.log('Toy action -> Cannot generate random toy', err)
      showErrorMsg('An error occured while generating contact')
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function saveToy(toy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return toyService
    .save(toy)
    .then((toy) => {
      store.dispatch({ type: UPDATE_TOY, toy })
      return toy
    })
    .catch((err) => {
      console.log('toy action -> Cannot save toy', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function removeToy(toyId) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return toyService
    .remove(toyId)
    .then(() => {
      store.dispatch({ type: REMOVE_TOY, toyId })
    })
    .catch((err) => {
      console.log('toy action -> Cannot remove toy', err)
      store.dispatch({ type: SET_ERROR, error: err })
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}
