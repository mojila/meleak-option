import React from 'react'
import store from './stores'
import reducer from './reducers'
import actions from './actions'

const Context = React.createContext()

export const Provider = Context.Provider
export const Consumer = Context.Consumer
export const Stores = store
export const Actions = actions
export const Reducers = reducer

export default Context
