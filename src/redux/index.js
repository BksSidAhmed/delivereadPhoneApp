// Imports: Dependencies 
import { combineReducers } from 'redux';

// Imports: Reducers
import tokenReducer from '../redux/reducers/tokenReducer';
import idUserReducer from '../redux/reducers/idUserReducer';
import idRoleReducer from '../redux/reducers/idRoleReducer'
import booksReducer from '../redux/reducers/booksReducer'
// Redux: Root Reducer
const rootReducer = combineReducers({
    tokenReducer: tokenReducer,
    idUserReducer: idUserReducer,
    idRoleReducer:idRoleReducer,
    booksReducer : booksReducer
});

// Exports
export default rootReducer;