import React from 'react';
import {Grid, makeStyles, Button} from "@material-ui/core";
import _ from 'lodash';
import {AppointmentsStore} from "../../store/appoitment";
import {Card} from "../../components/appointment";
import {useHistory} from "react-router-dom";
import {SlotsStore} from "../../store/slots";
import {observer} from "mobx-react";
import {UserStore} from "../../store/user";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        overflow: 'auto',
        padding: '10% 16px 0',
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
    iconContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        cursor: 'pointer'
    },
    icon: {
        fontSize: '2rem',
        color: theme.palette.secondary.main
    },
    notify: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 600,
        paddingTop: theme.spacing(8)
    },
    btn:{
        color: theme.palette.primary.main,
        textAlign: 'center'
    }
}))


const Appointment = observer(() => {
    const classes = useStyles();
    const history = useHistory();
    const userId = localStorage.getItem('userId');
    const appointments = AppointmentsStore.getAppointments(userId);

    React.useEffect(() => {
        SlotsStore.init()
    }, []);

    React.useEffect(()=> {
        if(!UserStore.isLoggedIn)
            history.push('/landing')
    }, [UserStore.isLoggedIn]);

    return (
        <Grid container direction={'column'} alignItems={'center'} wrap='nowrap' className={classes.root}>
            <Grid item className={classes.label}>
                Appointments
            </Grid>
            <Grid item>
                {appointments.length === 0 ?
                    <Grid item className={classes.notify} container alignItems={'center'} justify={'center'}>
                        No Appointmets for you, you want to pick one <Button className={classes.btn} variant={'text'} onClick={()=> history.push('/')}> go to home page </Button>
                    </Grid>
                    :
                    <Grid container direction={'column'} alignItems={'center'}>
                        {
                            _.map(appointments, (appointment) =>
                                <Grid item className={classes.card}>
                                    <Card appointment={appointment}/>
                                </Grid>
                            )
                        }
                    </Grid>
                }
            </Grid>
        </Grid>

    )

});

export default Appointment;
