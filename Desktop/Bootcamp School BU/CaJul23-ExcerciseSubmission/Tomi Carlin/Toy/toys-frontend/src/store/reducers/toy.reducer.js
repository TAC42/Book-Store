export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_ERROR = 'SET_ERROR'

const initialState = {
  toys: [],
  flag: {
    isLoading: false,
    error: null,
  },
}

export function contactReducer(state = initialState, action = {}) {
  let toys

  // Toys
  switch (action.type) {
    case SET_TOYS:
      return { ...state, toys: action.toys }

    case REMOVE_TOY:
      toys = state.toys.filter((toy) => toy._id !== action.toyId)
      return { ...state, toys }

    case ADD_TOY:
      toys = [...state.toys, action.toy]
      return { ...state, toys }

    case UPDATE_TOY:
      toys = state.toys.map((toy) =>
        toy._id === action.toy._id ? action.toy : toy
      )
      return { ...state, toys }

    // Is loading
    case SET_IS_LOADING:
      return { ...state, flag: { ...state.flag, isLoading: action.isLoading } }

    // Error
    case SET_ERROR:
      return { ...state, flag: { ...state.flag, error: action.error } }

    default:
      return state
  }
}
