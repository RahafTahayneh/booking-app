import React from "react";
import {Grid, makeStyles, Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import _ from "lodash";
import {observer} from "mobx-react";
import {SlotsStore} from "../../store/slots";
import Card from './components/Card';
import {UserStore} from "../../store/user";

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
    add:{
        color: theme.palette.secondary.main,
        textAlign: 'center',
        textTransform: "capitalize",
    }
}))


const Slots = observer(() => {
    const classes = useStyles();
    const history = useHistory();
    const userId = localStorage.getItem('userId');
    const availableSlots = SlotsStore.getAvailableSlotsPerSeller(userId)

    const onClick = () => {
        history.push('/slots/new')
    }
    React.useEffect(()=> {
        if(!UserStore.isLoggedIn)
            history.push('/landing')
    }, [UserStore.isLoggedIn])
    return (
        <Grid
            container
            direction="column"
            className={classes.root}
            wrap={"nowrap"}
            alignItems={'center'}
        >
            <Grid item className={classes.label}>
               Your Available Slots
            </Grid>
            <Grid item>
                {availableSlots.length === 0 ?
                    <Grid item className={classes.notify} container alignItems={'center'} justify={'center'}>
                       You didn't add any new slot, <Button variant={'text'} className={classes.add} onClick={()=> history.push('/slots/new')}> Add new slot here</Button>
                    </Grid>
                    :
                    <Grid container direction={'column'} alignItems={'center'}>
                        {
                            _.map(availableSlots, (slot) =>
                                <Grid item className={classes.card}>
                                    <Card slot={slot}/>
                                </Grid>
                            )
                        }
                    </Grid>
                }
            </Grid>
            { availableSlots.length !== 0 &&<Grid item className={classes.btnContainer}>
                <Button variant={'contained'} fullWidth className={classes.btn} onClick={onClick}>
                    Add new Slots
                </Button>
            </Grid>}

        </Grid>
    );
});

export default Slots;
