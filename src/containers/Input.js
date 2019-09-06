import { makeStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Select, TextField, Paper, FormControl, InputLabel, Popper, MenuItem, Button } from '@material-ui/core';
import { Refresh } from '@material-ui/icons'
import Axios from 'axios';

const predict = (input,setResult)=>{
        const url = "https://fvab8qre63.execute-api.us-east-1.amazonaws.com/default/Hello?uc=150&rc=1&doy=200&doh=11"
        //"https://4dddamvt54.execute-api.us-east-1.amazonaws.com/dev/predict?uc=150&rc=1&doy=200&doh=11"
        Axios.get(url)
        .then(resp=>console.log(resp))
        .catch(err=>console.log(err))
        .finally(()=>{
            setResult({max:184, avg:141.75, min:149})
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
                    label="Simulate Times"
                    value={input.simulateTimes}
                    onChange={e => setInput({ simulateTimes: e.target.value })}
                    variant="outlined"
                    style={inputStyle}
                    margin="normal"
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

      <TextField
        id="outlined-select-currency"
        select
        label="model"
        style={inputStyle}
        value={input.model}
        onChange={e=>setInput({model:e.target.value})}
        helperText="Please select your model"
        margin="normal"
        variant="outlined"
      >
          <MenuItem key="Month" value="Month">
         Month 
          </MenuItem>    <MenuItem key="random" value="random">
          random
          </MenuItem>
      </TextField>                            </form>
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
    setResult:payload => dispatch({type:'set_predict_result',payload})
})

export default connect(mapStateToProps, mapDispatchToProps)(Input)
