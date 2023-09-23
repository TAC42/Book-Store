export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  loadFromStorage,
  saveToStorage,
  getRandomToy,
  getRandomPrice,
  getRandomLabels,
  debounce,
}

function makeId(length = 6) {
  let txt = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  let txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomToy() {
  const toyNames = [
    'Teddy Bear',
    'LEGO Set',
    'Doll',
    'Action Figure',
    'Toy Car',
    'Puzzle',
    'Board Game',
    'Stuffed Animal',
    'Play-Doh',
    'Yo-Yo',
    'Building Blocks',
    'Jump Rope',
    'Kite',
    "Rubik's Cube",
    'Slinky',
    'Remote-Controlled Car',
    'Bicycle',
    'Trampoline',
    'Train Set',
    'Art Supplies',
  ]

  return toyNames[getRandomIntInclusive(0, toyNames.length - 1)]
}

function getRandomLabels() {
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

  const uniqueLabels = []

  while (uniqueLabels.length < 3) {
    const randomIndex = getRandomIntInclusive(0, labels.length - 1)
    const randomLabel = labels[randomIndex]

    if (!uniqueLabels.includes(randomLabel)) {
      uniqueLabels.push(randomLabel)
    }
  }

  return uniqueLabels
}

function getRandomPrice() {
  return getRandomIntInclusive(1, 200)
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
