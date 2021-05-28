import React from 'react';
import {Button, Grid, makeStyles} from "@material-ui/core";
import moment from 'moment';
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react";
import DateTimePicker from 'react-datetime-picker';
import {Popup} from "../../../components/popup";
import {SlotsStore} from "../../../store/slots";

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: '#f7f7f7',
        padding: '24px',
        margin: '0 auto 25px',
        borderRadius: '2px',
        boxShadow: '0 2px 2px rgb(0 0 0 / 30%)',
    },
    label: {
        margin: theme.spacing(2),
        color: theme.palette.text.secondary,
        fontWeight: 700
    },
    item: {
        width: '100%'
    },
    btnContainer: {
        margin: `${theme.spacing(2, 0)} !important`,
        width: '100%'
    },
    editButton: {
        padding: theme.spacing(2),
        background: theme.palette.primary.main,
        color: '#fff',
    },
    deleteBtn: {
        padding: theme.spacing(2),
        color: `${theme.palette.error.main} !important`,
    },
    calender: {
        margin: `${theme.spacing(3)} !important`,
        color: theme.palette.text.secondary,
        fontWeight: 700
    },
    confirmBtn: {},
    cancel: {
        color: `${theme.palette.error.main} !important`,
    }
}))


const Card = observer(({slot}) => {
    const classes = useStyles();
    const history = useHistory();
    const [date, setDate] = React.useState(slot.data);
    const [openEdit, setOpenEdit] = React.useState(false)
    const [openDelete, setOpenDelete] = React.useState(false)

    const onEdit = () => {
        setOpenEdit(true)
    }

    const onDelete = () => {
        setOpenDelete(true)
    }

    const handleEditClose = () => {
        setOpenEdit(false);
    }

    const onConfirmEdit = () => {
        SlotsStore.updateSlot(slot.id, date);
        setOpenEdit(false)
        history.push('/slots')
    }

    const handleDeleteClose = () => {
        setOpenDelete(false);
    }

    const onConfirmDelete = () => {
        SlotsStore.deleteSlot(slot.id);
        setOpenDelete(false)
        history.push('/slots')
    }


    return (
        <Grid container className={classes.card} alignItems={'center'} justify={'center'}>
            <Grid item className={classes.label}>
                {`${moment(slot.data).format('lll')}`}
            </Grid>
            <Grid item className={classes.item}>
                <Grid container direction='row' justify={'space-between'} alignItems={'center'} wrap={'nowrap'}>
                    <Grid item className={classes.btnContainer}>
                        <Button variant={'contained'} className={classes.editButton} onClick={onEdit}>
                            Edit
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant={'outlined'} className={classes.deleteBtn} onClick={onDelete}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Popup open={openEdit} onClose={handleEditClose}>
                <Grid container direction={'column'} className={classes.content}>
                    <Grid item className={classes.calender}>
                        <DateTimePicker
                            onChange={(value) => setDate(value)}
                            value={date}
                        />
                    </Grid>
                    <Grid item>
                        <Grid container direction='row' justify={'space-between'} alignItems={'center'} wrap={'nowrap'}>
                            <Grid item className={classes.btnContainer}>
                                <Button variant={'contained'} className={classes.confirmBtn} onClick={onConfirmEdit}>
                                    Confirm
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant={'outlined'} className={classes.cancel} onClick={handleEditClose}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Popup>
            <Popup open={openDelete} onClose={handleDeleteClose}>
                <Grid item className={classes.label}>
                    Are you sure you want to delete this
                </Grid>
                <Grid item>
                    <Grid container direction='row' justify={'space-between'} alignItems={'center'} wrap={'nowrap'}>
                        <Grid item className={classes.btnContainer}>
                            <Button variant={'contained'} className={classes.confirmBtn} onClick={onConfirmDelete}>
                                Yes
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant={'outlined'} className={classes.cancel} onClick={handleDeleteClose}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Popup>
        </Grid>
    )

})

export default Card;
