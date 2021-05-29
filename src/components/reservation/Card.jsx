import React from 'react';
import {Button, Grid, makeStyles} from "@material-ui/core";
import moment from 'moment';
import _ from 'lodash';
import {SlotsStore} from "../../store/slots";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react";
import {AppointmentsStore} from "../../store/appoitment";
import {BuyerStore} from "../../store/buyer";

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
    acceptBtn: {
        padding: theme.spacing(2),
        background: theme.palette.success.main,
        color: '#fff',
    },
    rejectBtn: {
        padding: theme.spacing(2),
        color: theme.palette.error.main,
    }
}))


const ReservationCard = observer(({reservation}) => {
    const classes = useStyles();
    const buyer = _.find(BuyerStore.buyers, (buyer) => buyer.id === reservation.user)
    const slot = _.find(SlotsStore.slots, slot => slot.id === reservation.slot)
    const history = useHistory();

    const onAccept = () => {
        AppointmentsStore.acceptAppointment(reservation.id)
        history.push('/');
    }

    const onReject = () => {
        AppointmentsStore.updateAppointment(reservation.id);
        SlotsStore.updateSlots(reservation.slot, 'available')
        history.push('/');
    }


    return (
        <Grid container className={classes.card} alignItems={'center'} justify={'center'}>
            <Grid item className={classes.sellerName}>
                {`Booking by ${buyer.firstName} ${buyer.lastName}`}
            </Grid>
            <Grid item className={classes.date}>
                {`On ${moment(slot.data).format('lll')}`}
            </Grid>
            <Grid item className={classes.item}>
                {
                    reservation.status === 'pending' ?
                        <Grid container direction='row' justify={'space-between'} alignItems={'center'} wrap={'nowrap'}>
                            <Grid item className={classes.btnContainer}>
                                <Button variant={'contained'} className={classes.acceptBtn} onClick={onAccept}>
                                    Accept
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant={'outlined'} className={classes.rejectBtn} onClick={onReject}>
                                    Reject
                                </Button>
                            </Grid>
                        </Grid>
                        : null
                }
            </Grid>
        </Grid>


    )

})

export default ReservationCard;
