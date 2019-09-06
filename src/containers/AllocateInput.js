import { makeStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import clsx from 'clsx';
import { Select, TextField, Paper, FormControl, InputLabel, Popper, MenuItem, Button, List, ListItem, Chip } from '@material-ui/core';
import { Delete, Add, Refresh } from '@material-ui/icons'
import Axios from 'axios';
import randomData from '../data/randomData.json'
import groupData from '../data/groupData.json'

const randomColor = ()=>Math.floor(Math.random()*150)+100

const newColor =()=>{
    return 'rgb('+randomColor()+','+randomColor()+','+randomColor()+')'
}

const allocate = (input,setResult)=>{
    Axios.get("https://4dddamvt54.execute-api.us-east-1.amazonaws.com/dev/allocate?strategy=bygroup")
    .then(resp=>console.log(resp))
    .catch(err=>console.log(err))
    .finally(()=>{
        // const randomData = [["User 1@Dev 1", "User 2@Dev 1"], []]
        // const groupData = [["User 9@Dev 4", "User 4@Dev 4", "User 1@Dev 4", "User 2@Dev 4", "User 3@Dev 2", "User 2@RTB 1", "User 1@Dev 1", "User 9@Dev 2", "User 6@RTB 1", "User 3@Dev 1", "User 7@Dev 4", "User 5@Dev 2", "User 2@Dev 3", "User 6@Dev 2", "User 12@Dev 4", "User 2@Dev 2", "User 8@Dev 4", "User 10@Dev 4", "User 3@Dev 4", "User 8@Dev 2", "User 1@RTB 1", "User 1@Dev 2", "User 4@Dev 2", "User 1@HR", "User 5@Dev 4", "User 6@Dev 4", "User 4@RTB 1", "User 7@Dev 2", "User 11@Dev 4", "User 3@RTB 1", "User 5@RTB 1", "User 7@RTB 1", "User 1@Dev 3", "User 2@Dev 1"], ["User 2@HR", "User 3@HR", "User 4@HR"]]
        const data = input.strategy=='random'?randomData:groupData;
        setResult({allocateUsers:convertUsers(data[0]),workFromHomeUsers:convertUsers(data[1])});
    })
}
const groupColorMap = []
const convertUsers = (data)=>data.map(it=>{
            const arr = it.split('@')
            const user = {
                userId:arr[0],
                groupName:arr[1]
            }
            var colorMap = groupColorMap.filter(it=>it.groupName == user.groupName)
            if(colorMap.length==0){
                const color = {groupName:user.groupName,c:newColor()}
                groupColorMap.push(color)
                user.backgroundColor = color.c;
            }else{
               user.backgroundColor = colorMap[0].c;
            }
            return user;
        })

export class Input extends Component {
    render() {
        const { input, setInput, setResult} = this.props;
        return (
            <div><form noValidate autoComplete="off">
      <TextField
        id="outlined-select-currency"
        select
        label="strategy"
        value={input.strategy}
        onChange={e=>setInput({strategy:e.target.value})}
        helperText="Please select your strategy"
        margin="normal"
        fullWidth
        variant="outlined"
      >
          <MenuItem key="random" value="random">
         random
          </MenuItem>    <MenuItem key="byGroup" value="byGroup">
        By Group 
          </MenuItem>
      </TextField>              </form>
                <Button onClick={e=>allocate(input,setResult)}><Refresh /></Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    input: state.allocateInput
})

const mapDispatchToProps = dispatch => ({
    setInput: payload => dispatch({ type: 'set_allocate_input', payload }),
    setResult:payload => dispatch({type:'set_allocate_result',payload})
})

export default connect(mapStateToProps, mapDispatchToProps)(Input)
