import {createStore, applyMiddleware, compose} from 'redux'
import {createLogger} from 'redux-logger';
// import createSagaMiddleware, {END} from 'redux-saga'
import rootReducer from '../reducers'
// import rootSagas from '../sagas'

export default (initState) =>{
    // const saga = createSagaMiddleware();
    const logger = createLogger();
    const enhancer = compose(applyMiddleware(logger))
    const store = createStore(rootReducer,enhancer)

    if(module.hot){
        module.hot.accept('../reducers',()=>{
            const next = require('../reducers').default;
            store.replaceReducer(next);
        })
    }

    // saga.run(rootSagas)
    // store.close = ()=>store.dispatch(END)
    return store
}