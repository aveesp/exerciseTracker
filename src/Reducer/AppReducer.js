export default (state, action) => {
    switch(action.type){
        case "ADD_USER":
            return{
                ...state,
                exercises: [...state.exercises, action.payload]
            }
        case "ADD_EXERCISE":
            return{
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        
        default: 
            return state;
    }
}