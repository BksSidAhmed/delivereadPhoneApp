// Imports: Dependencies 
import { combineReducers } from 'redux';

// Imports: Reducers
import tokenReducer from '../redux/reducers/tokenReducer';
import idUserReducer from '../redux/reducers/idUserReducer';


// Redux: Root Reducer
const rootReducer = combineReducers({
    tokenReducer: tokenReducer,
    idUserReducer: idUserReducer,
});

// Exports
export default rootReducer;