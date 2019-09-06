import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, List, ListItem, Chip, Avatar, Container, Typography, Divider } from '@material-ui/core'
import {randomData,groupData} from '../components/data'

const SeatItem = ({ user, seatId, style: itemStyle, bkg }) => (
    <Chip label={`${user.userId}`} avatar={<Avatar>{seatId}</Avatar>} style={{ backgroundColor: bkg }} />
)

export class AllocateResult extends Component {
    render() {
        const { result } = this.props;
        return (
            <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', justifyContent: 'center', alignContent: 'center' }}>
                {result.allocateUsers.map((it, i) => (<div key={i} style={{ padding: '3px' }}>
                    <SeatItem user={it} bkg={it.backgroundColor} seatId={i} />
                </div>))}
            </div>
            <Divider/>
                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', justifyContent: 'center', alignContent: 'center' }}>
                    {result.workFromHomeUsers.map((it, i) => (<div key={i} style={{ padding: '3px' }}>
                        <SeatItem user={it} bkg={it.backgroundColor} seatId={i} />
                    </div>))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    result: state.allocateResult
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AllocateResult)
