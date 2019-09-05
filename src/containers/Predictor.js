import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PredictInput from './Input'
import PredictResult from './PredictResult'

export default () =>{
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper>
                    <PredictInput />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <PredictResult />              </Paper>
            </Grid>
        </Grid>
    );
}