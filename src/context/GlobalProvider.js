import React, { createContext, useReducer } from 'react'
import AppReducer from '../Reducer/AppReducer'

// initial state
const initialState = {
    users: [],
    exercises: []
} 

// create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    const deleteTransaction = (id) => {
        dispatch({
            type:'DELETE_TRANASCTION',
            payload: id
        })
    }

    const addTransaction = (transaction) => {
        dispatch({
            type:'ADD_TRANSACTION',
            payload: transaction
        })
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions, 
            deleteTransaction: deleteTransaction, 
            addTransaction: addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )

}