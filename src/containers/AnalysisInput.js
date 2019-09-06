import { makeStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Select, TextField, Paper, FormControl, InputLabel, Popper, MenuItem, Button } from '@material-ui/core';
import { Refresh } from '@material-ui/icons'
import Axios from 'axios';
import {generateAbsent as generatePlan, distribute, calculateBest, getBest }from '../calculator';

const predict = (input,setResult)=>{
        Axios.get("https://fvab8qre63.execute-api.us-east-1.amazonaws.com/default/Hello?uc=150&rc=1&doy=200&doh=11")
        .then(resp=>console.log(resp))
        .catch(err=>console.log(err))
        .finally(()=>{
            const plan = generatePlan(input.employeeCount,input.avgLeaveDays,input.totalWorkDays) 
            const distribution = distribute(plan,input.w);
            const trend = [200,500,1000,3000,10000,20000].map(it=>{
                const p = generatePlan(it,input.avgLeaveDays,input.totalWorkDays)
                const bestCount = getBest(distribute(p,input.w))
                return {name:it,percent:(it-bestCount)*100.0/it}
            })
            setResult({plan,distribution,trend})
        })
    }
const inputStyle = {
    margin:'3px',
    padding:'1px',
}
export class Input extends Component {
       
    render() {
        const { input, setInput ,setResult} = this.props;
        return (
            <div><form noValidate autoComplete="off" style={{display:'flex',flexWrap:'wrap'}}>
                <TextField id="standard-name"
                    label="Avg leave days"
                    value={input.avgLeaveDays}
                    onChange={e => setInput({ avgLeaveDays: e.target.value })}
                    margin="normal"
                    style={inputStyle}
                    variant="outlined"
                />
               <TextField id="standard-name"
                    label="Employee count"
                    value={input.employeeCount}
                    onChange={e => setInput({ employeeCount: e.target.value })}
                    margin="normal"
                    style={inputStyle}
                    variant="outlined"
                />
                <TextField id="standard-name"
                    label="Total work days"
                    value={input.totalWorkDays}
                    onChange={e => setInput({ totalWorkDays: e.target.value })}
                    margin="normal"
                    style={inputStyle}
                    variant="outlined"
                />
               <TextField id="standard-name"
                    label="Weight"
                    value={input.w}
                    onChange={e => setInput({ w: e.target.value })}
                    margin="normal"
                    style={inputStyle}
                    variant="outlined"
                />
</form>
               <Button onClick={e=>predict(input,setResult)}><Refresh /></Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    input: state.predictInput
})

const mapDispatchToProps = dispatch => ({
    setInput: payload => dispatch({ type: 'set_predict_input', payload }),
    setResult:payload => dispatch({type:'set_analysis_result',payload})
})

export default connect(mapStateToProps, mapDispatchToProps)(Input)
