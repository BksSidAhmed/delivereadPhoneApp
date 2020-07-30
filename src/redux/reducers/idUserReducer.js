// Initial State
const initialState = {
    idUser : null,
};

// Reducers (Modifies The State And Returns A New State)
const idUserReducer = (state = initialState, action) => {
    switch (action.type){
        case 'ID' : {
            return {
                // State
                ...state,
                // Redux Store
                idUser: action.idAction,
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

export default idUserReducer 