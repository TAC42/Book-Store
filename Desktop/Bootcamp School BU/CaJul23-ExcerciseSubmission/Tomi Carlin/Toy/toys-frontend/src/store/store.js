import { contactReducer } from './reducers/toy.reducer.js'

const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
  toyModule: contactReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : compose

export const store = createStore(rootReducer, middleware)

window.gStore = store
