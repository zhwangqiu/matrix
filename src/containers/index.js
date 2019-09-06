import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from './layout'
export class Root extends Component {
    render() {
        const {data} = this.props;
        return (
            <div>
               <Layout/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
 data:state.data
})

const mapDispatchToProps = dispatch=>({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)
