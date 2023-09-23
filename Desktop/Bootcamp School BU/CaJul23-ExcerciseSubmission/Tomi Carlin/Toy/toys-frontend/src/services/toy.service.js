import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getRandomToy,
  toggleToyMemberInTeam,
  getToysMembersInTeam,
}

const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
]
const toyExample = {
  _id: 't101',
  name: 'Talking Doll',
  price: 123,
  labels: ['Doll', 'Battery Powered', 'Baby'],
  createdAt: 1631031801011,
  inStock: true,
}

function query() {
  return storageService.query(STORAGE_KEY)
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  const method = toy._id ? 'put' : 'post'
  return storageService[method](STORAGE_KEY, toy)
}

function getEmptyToy() {
  return {
    _id: '',
    name: '',
    price: '',
    labels: [],
    description: '',
    createdAt: '',
    inStock: true,
  }
}

function getRandomToy() {
  const toy = getEmptyToy()
  toy.name = utilService.getRandomToyName()
  toy.price = utilService.getRandomPrice()
  toy.labels = getRandomLabels()
  toy.createdAt = new Date()
  toy.description = utilService.makeLorem(40)

  return save(toy)
}
