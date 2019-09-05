import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Root extends Component {
    render() {
        const {data} = this.props;
        return (
            <div>
               {data} 
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
