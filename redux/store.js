import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
export default createStore(rootReducer, composedEnhancer);
// export default createStore(rootReducer, applyMiddleware(thunkMiddleware));