import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import Classnames from 'classnames';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react";

const useStyles = makeStyles((theme) => ({
    iconContainer: {
        position: 'absolute',
        width: '100%',
        padding: theme.spacing(2),
        top: 10,
        left: 10
    },
    icon: {
        fontSize: '2rem',
        cursor: 'pointer',
        color: theme.palette.secondary.main
    },
}))


const Header = observer(({hideBack, className}) => {
    const classes = useStyles();
    const history = useHistory();


    return (
        <Grid item className={Classnames(classes.iconContainer, className)} container alignItems={'center' } justify={'space-between'} >
            {!hideBack && <Grid item onClick={() => history.push('/')}>
                <ArrowBackIcon className={classes.icon}/>
            </Grid>}
        </Grid>

    )

});

export default Header;
