import stores from "../stores";
import actions from "../actions";

const Reducer = (state = stores, action) => {
  switch (action.type) {
    case actions.UPDATE_PAGES:
      return {
        ...state,
        pages: action.payload.pages
      }
    case actions.UPDATE_ACTIVE:
      return {
        ...state,
        active: action.payload.active
      }
    case actions.UPDATE_INFO:
      return {
        ...state,
        info: action.payload.info
      }
    default:
      return state
  }
}

export default Reducer