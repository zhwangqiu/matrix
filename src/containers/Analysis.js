import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Input from './AnalysisInput';
import Result from './AnalysisResult'

export default () =>{
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper>
               <Input/> 
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                <Result/>
                    </Paper>
            </Grid>
        </Grid>
    );
}