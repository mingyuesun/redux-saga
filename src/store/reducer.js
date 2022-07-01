import { ADD, MINUS } from "./action-types"
const initialState = { number: 0 }
export default function Counter(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + 1 }
    case MINUS:
      return { number: state.number - 1 }
    default:
      return state
  }
}
