// Initial State
const initialState = {
    token : null,
};

// Reducers (Modifies The State And Returns A New State)
const tokenReducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOGIN' : {
            return {
                // State
                ...state,
                // Redux Store
                token: action.tokenAction,
            }
        }
        // reset store
        case 'RESET' : {
            return initialState
        }
        default: {
            return state;
        }
    }
}

export default tokenReducer 