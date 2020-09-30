// Initial State
const initialState = {
    idAbonnement : null,
};

// Reducers (Modifies The State And Returns A New State)
const idAbonementReducer = (state = initialState, action) => {
    switch (action.type){
        case 'ID_ABONNEMENT' : {
            return {
                // State
                ...state,
                // Redux Store
                idAbonnement: action.idAbonementAction,
            }
        }
        default: {
            return state;
        }
    }
}

export default idAbonementReducer 