import React from 'react';
import {Button, Grid, makeStyles} from "@material-ui/core";
import moment from 'moment';
import _ from 'lodash';
import {SlotsStore} from "../../store/slots";
import {SellerStore} from "../../store/seller";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react";
import {AppointmentsStore} from "../../store/appoitment";
import {Popup} from "../popup";

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: '#f7f7f7',
        padding: '24px',
        margin: '0 auto 25px',
        borderRadius: '2px',
        boxShadow: '0 2px 2px rgb(0 0 0 / 30%)',
    },
    sellerName: {
        margin: theme.spacing(2),
    },
    date: {
        margin: theme.spacing(2),
        color: theme.palette.text.secondary,
        fontWeight: 700
    },
    item: {
        width: '100%'
    },
    btnContainer: {
        margin: theme.spacing(2, 0),
        width: '100%'
    },
    btn: {
        padding: theme.spacing(2),
        background: theme.palette.error.main,
        color: '#fff',
    },
    label: {
        margin: theme.spacing(2),
        color: theme.palette.text.secondary,
        fontWeight: 700
    },
    cancel: {
        color: `${theme.palette.error.main} !important`,
    },
    confirmBtn: {
        background: theme.palette.error.main,
        color: '#fff'
    },
}))


const Appointment = observer(({appointment}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const seller = _.find(SellerStore.sellers, (seller) => seller.id === appointment.seller)
    const slot = _.find(SlotsStore.slots, slot => slot.id === appointment.slot)
    const history = useHistory();

    const onDelete = () => {
        setOpen(true)
    }

    const onConfirmDelete = () => {
        AppointmentsStore.updateAppointment(appointment.id);
        SlotsStore.updateSlots(appointment.slot, 'available')
        setOpen(false)
        history.push('/appointment')
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Grid container className={classes.card} alignItems={'center'} justify={'center'}>
            <Grid item className={classes.sellerName}>
                {` with ${seller.firstName} ${seller.lastName} `}
            </Grid>
            <Grid item className={classes.date}>
                {`On ${moment(slot.data).format('lll')}`}
            </Grid>
            <Grid item className={classes.item}>
                <Grid container direction='column' justify={'center'}>
                    <Grid item className={classes.btnContainer}>
                        <Button variant={'contained'} fullWidth className={classes.btn} onClick={onDelete}>
                            Delete
                        </Button>
                    </Grid>
                    <Grid item>
                        {appointment.status === 'pending' ?
                            'Waiting Seller approved to proceed'
                            :
                            'The seller is waiting you :)'
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Popup open={open} onClose={handleClose} >
                <Grid item className={classes.label}>
                    Are you sure you want to delete this
                </Grid>
                <Grid item>
                    <Grid container direction='row' justify={'space-between'} alignItems={'center'} wrap={'nowrap'}>
                        <Grid item className={classes.btnContainer}>
                            <Button variant={'contained'} color={'primary'} className={classes.confirmBtn} onClick={onConfirmDelete}>
                                Yes
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant={'outlined'} className={classes.cancel} onClick={handleClose}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Popup>
        </Grid>


    )

})

export default Appointment;
