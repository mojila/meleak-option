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
    case actions.UPDATE_LEAKS:
      return {
        ...state,
        leaks: action.payload.leaks
      }
    case actions.UPDATE_PAGE_LEAKS:
      return {
        ...state,
        page_leaks: action.payload.page_leaks
      }
    case actions.UPDATE_PAGE_SCRIPTS:
      return {
        ...state,
        page_scripts: action.payload.page_scripts
      }
    default:
      return state
  }
}

export default Reducer