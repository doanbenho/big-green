import { useReducer } from 'react'
import Context from './Context'
import React from 'react'
import reducer, { initialState } from './Reducer'

const Provider = ({children}) => {

     const [ state, dispatch ] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={[state, dispatch]}>
         {children}
    </Context.Provider>
  )
}

export default Provider
