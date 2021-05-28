import React from 'react';
import {Button, Grid, makeStyles, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react";
import {SlotsStore} from "../../store/slots";
import {Popup} from "../../components/popup";
import DateTimePicker from 'react-datetime-picker';
import {UserStore} from "../../store/user";

const useStyles = makeStyles((theme) => ({
    root:{
      padding: theme.spacing(10, 4),
        width: '100%',
        height:'100%'
    },
    card: {
        backgroundColor: '#f7f7f7',
        padding: '24px 16px',
        margin: '0 auto 25px',
        borderRadius: '2px',
        boxShadow: '0 2px 2px rgb(0 0 0 / 30%)',
    },
    label: {
        margin: theme.spacing(2),
        fontSize: '20px',
        textAlign: 'center'
    },
    date: {
        margin: `${theme.spacing(3)}px !important`,
        color: theme.palette.text.secondary,
        fontWeight: 700
    },
    item: {
        width: '100%'
    },
    btn: {
        padding: theme.spacing(2),
        background: theme.palette.primary.main,
        color: '#fff',
    },
    popup:{
        color: theme.palette.success.main,
        fontSize: 16,
        textAlign: 'center',
        padding: theme.spacing(2)
    }
}))


const NewSlot = observer(() => {
    const classes = useStyles();
    const [date, setDate] = React.useState();
    const [open, setOpen] = React.useState();

    const history = useHistory();

    const onAdd  = () => {
        const slotData = {
            id: Math.random().toString(16).slice(2),
            seller: localStorage.getItem('userId'),
            data: date,
            status: 'available'
        }

        SlotsStore.addNewSlot(slotData)
        setOpen(true)
    }
    const handleClose = ()=>{
        setOpen(false)
        history.push('/slots')
    }
    React.useEffect(()=> {
        if(open){
            setTimeout(() => {
                handleClose()
            }, 2000)
        }
    }, [open])

    React.useEffect(()=> {
        if(!UserStore.isLoggedIn)
            history.push('/landing')
    }, [UserStore.isLoggedIn]);


    return (
        <Grid container className={classes.root} alignItems={'center'} justify={'center'}>
            <Grid item container direction={'column'} alignItems={'center'} className={classes.card}>
                <Grid item className={classes.label}>
                    Choose the date
                </Grid>
                <Grid item className={classes.date}>
                    <DateTimePicker
                        onChange={(value) => setDate(value)}
                        value={date}
                    />
                </Grid>
                <Grid item className={classes.item}>
                    <Button variant={'contained'} fullWidth className={classes.btn}  disabled={!date} onClick={onAdd}>
                       Add new Slot
                    </Button>
                </Grid>
            </Grid>
            <Popup open={open} onClose={handleClose} hideClose>
                <Grid item container className={classes.popup}>
                    Congratulations! you added a new slots
                </Grid>
            </Popup>
        </Grid>
    )
})

export default NewSlot;
