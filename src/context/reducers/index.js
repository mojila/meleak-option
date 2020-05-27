import stores from "../stores";
import actions from "../actions";

const Reducer = (state = stores, action) => {
  switch (action.type) {
    case actions.UPDATE_PAGES:
      return {
        ...state,
        pages: action.payload.pages
      }
    default:
      return state
  }
}

export default Reducer