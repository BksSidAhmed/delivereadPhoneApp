// Initial State
const initialState = {
    books : 0,
};

// Reducers (Modifies The State And Returns A New State)
const booksReducer = (state = initialState, action) => {
    switch (action.type){
        case 'INCREMENT_BOOKS' : {
            return {
                // State
                ...state,
                // Redux Store
                books: state.books + 1,
            }
        }
        case 'DECREMENT_BOOKS' : {
            return {
                // State
                ...state,
                // Redux Store
                books: state.books - 1,
            }
        }
    
        // reset store
        case 'RESET_BOOKS' : {
            return initialState
        }
        default: {
            return state;
        }
    }
}

export default booksReducer 