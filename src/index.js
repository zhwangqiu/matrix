import React, { Component } from 'react'
import {render} from 'react-dom';
import configureStore from './stores/configureStore'
import { Provider } from 'react-redux'
import Root from './containers'

const store = configureStore(window.__INITIAL_STATE__)

const App = ()=>(
   <Provider store={store}>
       <Root/>
   </Provider> 
)

render(<App/>,document.getElementById("root"));