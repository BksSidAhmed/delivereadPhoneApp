// Imports: Dependencies 
import { combineReducers } from 'redux';

// Imports: Reducers
import tokenReducer from '../redux/reducers/tokenReducer';
import idUserReducer from '../redux/reducers/idUserReducer';
import idRoleReducer from '../redux/reducers/idRoleReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
    tokenReducer: tokenReducer,
    idUserReducer: idUserReducer,
    idRoleReducer:idRoleReducer
});

// Exports
export default rootReducer;