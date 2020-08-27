// Initial State
const initialState = {
    idRole : null,
};

// Reducers (Modifies The State And Returns A New State)
const idRoleReducer = (state = initialState, action) => {
    switch (action.type){
        case 'ID_role' : {
            return {
                // State
                ...state,
                // Redux Store
                idRole: action.idAction,
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

export default idRoleReducer 