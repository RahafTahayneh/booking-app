import React from "react";
import {Grid, makeStyles, Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {AppointmentsStore} from "../../store/appoitment";
import _ from "lodash";
import {ReservationCard} from "../../components/reservation";
import {observer} from "mobx-react";
import {UserStore} from "../../store/user";
import {toJS} from "mobx";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        overflow: 'auto',
        padding: '10% 16px 0',
      position: 'relative'
    },
    label: {
        fontSize: '24px'
    },
    card: {
        padding: '16px',
        margin: '0 auto 25px',
        marginTop: 10,
        borderRadius: '2px',
    },
    notify: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 600,
        paddingTop: theme.spacing(8)
    },
    btnContainer: {
      width: '100%',
      position: 'absolute',
      left: 0,
      padding: theme.spacing(1.2),
      bottom: 0,
    },
    btn: {
      background: theme.palette.primary.main,
      color: '#fff'
    },
    icon:{
        justifyContent: 'flex-end',
        top: 2,
        right: 5
    }
}))


const Seller = observer(() => {
    const classes = useStyles();
    const history = useHistory();
    const userId = localStorage.getItem('userId');
    const reservations = AppointmentsStore.getAppointmentsBySeller(userId)

    const onClick = () => {
        history.push('/slots/new')
    }
    React.useEffect(() => {
        if(!UserStore.isLoggedIn)
            history.push('/landing')
    }, [UserStore.isLoggedIn])

    return (
        <Grid
            container
            direction="column"
            className={classes.root}
            wrap={"nowrap"}
        >
            <Grid item className={classes.label}>
                Reservation
            </Grid>
            <Grid item>
                {reservations.length === 0 ?
                    <Grid item className={classes.notify} container alignItems={'center'}>
                        No new Reservations for you
                    </Grid>
                    :
                    <Grid container direction={'column'} alignItems={'center'}>
                        {
                            _.map(reservations, (reservation) =>
                                <Grid item className={classes.card}>
                                    <ReservationCard reservation={reservation}/>
                                </Grid>
                            )
                        }
                    </Grid>
                }
            </Grid>
            <Grid item className={classes.btnContainer}>
              <Button variant={'contained'} fullWidth className={classes.btn} onClick={onClick}>
                Add new Slots
              </Button>
            </Grid>

        </Grid>
    );
});

export default Seller;
