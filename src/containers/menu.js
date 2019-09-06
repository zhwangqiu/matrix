import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Computer, EventSeat, ShowChart} from '@material-ui/icons'

export class menu extends Component {
    render(){
        const {activeMenuItem,setActiveMenu} = this.props;
                return (
   <div>
    <ListItem button onClick={e=>setActiveMenu("analysis")} selected={activeMenuItem==="analysis"}>
      <ListItemIcon>
        <ShowChart/>
      </ListItemIcon>
      <ListItemText primary="Aanlysis" />
    </ListItem><ListItem button onClick={e=>setActiveMenu("predictor")} selected={activeMenuItem==="predictor"}>
      <ListItemIcon>
        <Computer/>
      </ListItemIcon>
      <ListItemText primary="Predictor" />
    </ListItem>
    <ListItem button onClick={e=>setActiveMenu("allocator")} selected={activeMenuItem==="allocator"}>
      <ListItemIcon>
        <EventSeat/>
      </ListItemIcon>
      <ListItemText primary="Allocator" />
    </ListItem>

     </div>
        )
    }
}

const mapStateToProps = (state) => ({
    activeMenuItem:state.activeMenuItem
})

const mapDispatchToProps = dispatch=>({
   setActiveMenu:payload=>dispatch({type:'set_active_menu_item',payload}) 
})

export default connect(mapStateToProps, mapDispatchToProps)(menu)
