import React from 'react';
import {Button, Dialog, Grid, makeStyles} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {observer} from 'mobx-react';
import Classnames from "classnames";


const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    label: {
        fontSize: 12,
        color: '#000'
    },
    paper: {
        padding: theme.spacing(2),
        background: '#fff'
    },
    clseicon: {
        verticalAlign: 'bottom',
        color: '#a1c1f5',
    },
    btn: {
        backgroundColor: '#f7f7f7',
        borderRadius: 5,
        border: 'solid 1px #ebebeb',
        textTransform: 'none',
        position: 'absolute',
        right: 0
    },
    text: {
        fontSize: 12,
        fontWeight: 600,
        color: '#192233',
        lineHeight: 1.56,
    },
    btnContainer: {
        position: 'relative',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: 'flex',
        justifyContent: 'flex-end'
    },
}));

const Popup = observer(({open, hideClose, onClose, className, children}) => {
    const classes = useStyles();
    return (
            <Dialog open={open} classes={{paperWidthSm: Classnames(className, classes.paper)}}>
                <Grid container direction={'column'}>
                    {!hideClose && <Grid item className={classes.btnContainer}>
                        <Button onClick={onClose} className={classes.btn} variant="outlined">
                            <Grid container direction="row" wrap="nowrap" alignItems="center" spacing={1}>
                                <Grid item>
                                    <CloseIcon className={classes.clseicon}/>
                                </Grid>
                                <Grid item className={classes.text}>
                                    Close
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>}
                    <Grid item className={classes.content}>
                        {children}
                    </Grid>
                </Grid>
            </Dialog>
    )

});

export default Popup;