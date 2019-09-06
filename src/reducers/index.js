import { combineReducers } from 'redux'

const predictInput = (state={avgLeaveDays:20,totalWorkDays:225,simulateTimes:1000,employeeCount:200,mode:"random",w:10},{type,payload})=>{
    switch(type){
        case "set_predict_input":
            return {...state,...payload};
        default:
            return state;
    }
}

const predictResult = (state={max:130,avg:183,min:190},{type,payload})=>{
    switch(type){
        case "set_predict_result":
            return {...state,...payload}
            default:
                return state;
    }
}

const allocateInput = (state = {strategy:"random"},{type,payload})=>{
    switch(type){
        case "set_allocate_input":
            return {...state,...payload}
        default:
            return state;
    }
}

const allocateResult = (state = {allocateUsers:[],workFromHomeUsers:[]},{type,payload})=>{
    switch(type){
        case "set_allocate_result":
            return {...state,...payload}
        default:
            return state;
    }
}

const activeMenuItem = (state="analysis",{type,payload})=>{
    switch(type){
        case "set_active_menu_item":
            return payload
        default:
            return state;
    }
}

const analysisResult = (state = {plan:[],distribution:[],trend:[]},{type,payload})=>{
    switch(type){
        case "set_analysis_result":
            return payload;
        default:
            return state;
    }
}
export default combineReducers({
    predictInput,
    predictResult,
    allocateInput,
    allocateResult,
    activeMenuItem,
    analysisResult
})