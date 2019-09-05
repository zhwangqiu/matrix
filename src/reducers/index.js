import { combineReducers } from 'redux'

const data = (state,{type,payload})=>{
    return "hello world"
}

export default combineReducers({
    data
})