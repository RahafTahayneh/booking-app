import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import React from 'react';
import {makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root:{
        width: '100%',
        height: '100%'
    },
    icon:{
        width: 50,
        height: 50,
        color: theme.palette.secondary.main
    },
    label:{
        fontSize: 24,
        textAlign: 'center',
        color: '#6c757d'
    }
}));

const Empty = () => {
    const classes = useStyles();
    return (
        <Grid container direction={'column'} alignItems={'center'} className={classes.root}>
            <Grid item>
                <SentimentVeryDissatisfiedIcon className={classes.icon} />
            </Grid>
            <Grid item className={classes.label}>
                Unfortunately, No seller with this name
            </Grid>
        </Grid>
    )

}

export default Empty;