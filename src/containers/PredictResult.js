import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List,ListItem, Chip, Avatar, Slider} from '@material-ui/core'
import {newColor} from './util'

const ResultItem = ({value, employeeCount,type})=>(
    <Chip style={{backgroundColor:newColor(100)}} label={`${type} - Pct: ${value/employeeCount*100}%`} avatar={<Avatar style={{backgroundColor:newColor(120)}}>{value}</Avatar>}/>
        )

export class PredictResult extends Component {
    render() {
        const {result, employeeCount} = this.props;
        return (
            <div>
               <List>
                   <ListItem><ResultItem value={result.max} type="max" employeeCount={employeeCount}/></ListItem>
                   <ListItem><ResultItem value={result.avg} type="avg" employeeCount={employeeCount}/></ListItem>
                   <ListItem><ResultItem value={result.min} type="min" employeeCount={employeeCount}/></ListItem>
               </List> 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
   result:state.predictResult,
   employeeCount:state.predictInput.employeeCount 
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PredictResult)
