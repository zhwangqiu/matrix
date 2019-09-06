import React, { Component } from 'react'
import { connect } from 'react-redux'
import AXChart from './PlanChart';
import PChart from '../components/PChart'
import {getBest} from '../calculator'
export class AnalysisResult extends Component {
    render() {
        const {result, employeeCount} = this.props;
        const {plan,distribution,trend} = result;
        const bestSeatCount = getBest(distribution)
        return (
            <div>   
            {plan.length==0?null:(<label>Best Seat Count: {bestSeatCount}</label>)}
                     <div style={{display:'flex',flexWrap:'wrap'}}>
            {plan.length==0?null:(<PChart data={[{name:1,value:bestSeatCount},{name:2,value:employeeCount -bestSeatCount}]}/>)}
            <AXChart data={plan.map((it,i)=>({name:i+1,count:it}))} dataKey="count"/>
            <AXChart data={distribution.map(it=>({name:it.days,count:it.count}))} dataKey="count"/>
            <AXChart data={distribution.map(it=>({name:it.days,percent:it.days*100.0/employeeCount}))} dataKey="percent"/>
            <AXChart data={distribution.map(it=>({name:it.days,overCount:plan.filter(k=>k>=it.days).length}))} dataKey="overCount"/>
            <AXChart data={distribution.map(it=>({name:it.days,weight:it.weight}))} dataKey="weight"/>
            <AXChart data={trend} dataKey="percent"/>
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
