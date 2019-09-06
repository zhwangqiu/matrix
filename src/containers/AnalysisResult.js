import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List,ListItem, Chip, Avatar, Slider} from '@material-ui/core'
import {newColor} from './util'
import AXChart from './PlanChart';

export class AnalysisResult extends Component {
    render() {
        const {result} = this.props;
        const {plan,distribution} = result;
        const weight = distribution.map(it=>it.weight)
        const best = Math.min(...weight)
        const index = weight.indexOf(best)
        const bestDays = distribution.length==0?0:distribution[index].days
        return (
            <div>   
            <label>Best Seat Count: {bestDays}</label>
                     <div style={{display:'flex',flexWrap:'wrap'}}>
            <AXChart data={plan.map((it,i)=>({name:i+1,count:it}))} dataKey="count"/>
            <AXChart data={distribution.map(it=>({name:it.days,count:it.count}))} dataKey="count"/>
            <AXChart data={distribution.map(it=>({name:it.days,percent:it.percent}))} dataKey="percent"/>
            <AXChart data={distribution.map(it=>({name:it.days,overCount:plan.filter(k=>k>=it.days).length}))} dataKey="overCount"/>
            <AXChart data={distribution.map(it=>({name:it.days,weight:it.weight}))} dataKey="weight"/>
            </div></div>

        )
    }
}

const mapStateToProps = (state) => ({
   result:state.analysisResult,
   employeeCount:state.predictInput.employeeCount 
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisResult)
