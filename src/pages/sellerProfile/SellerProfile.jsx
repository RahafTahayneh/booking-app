import React from 'react';
import {Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
import {useHistory, useParams} from 'react-router-dom';
import moment from 'moment';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {SellerStore} from "../../store/seller";
import {CategoriesStore} from "../../store/category";
import {SlotsStore} from "../../store/slots";
import {AppointmentsStore} from "../../store/appoitment";
import {Popup} from "../../components/popup";
import {SocialIcons} from "../../components/socialIcon";
import {UserStore} from "../../store/user";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        color: '#000',
        position: 'relative',
        backgroundColor: '#f5f5f5',
        padding: '8% 0 0',
    },
    container: {
        height: '100%',
        width: '100%'
    },
    content: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    card: {
        maxWidth: 600,
        width: '100%',
        maxHeight: '70%',
        //background: 'linear-gradient(180deg, #000 37%, #FFF 25%)',
        padding: theme.spacing(10, 2)
    },
    formControl: {},
    iconContainer: {
        position: 'absolute',
        top: 5,
        left: 10,
        cursor: 'pointer'
    },
    icon: {
        fontSize: '2rem',
        color: theme.palette.secondary.main
    },
    img: {
        borderRadius: '50%',
        width: 200,
        height: 200,
        marginBottom: theme.spacing(2)
    },
    business: {
        margin: theme.spacing(2),
        fontSize: 18,
        color: '#000',
        background: 'lightgray',
        textAlign: 'center'
    },
    label: {
        fontSize: 12,
        color: '#000'
    },
    name: {
        fontSize: 24,
    },
    appointment: {
        width: '100%'
    },
    select: {
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2)
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
    confirm: {
        fontSize: 14,
        color: '#192233',
    },
    btnContainer: {
        position: 'relative',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    btns: {
        width: '100%',
        marginTop: theme.spacing(1.5)
    },
    selected: {
        fontWeight: 'bold'
    },
    noSlot:{
        fontSize: '15px',
        textAlign: 'center',
        color: '#192233',
        fontWeight: 600
    },
    socialIcons:{
        marginTop: theme.spacing(10)
    }


}));

const SellerProfile = observer(() => {
    const {id} = useParams();
    const history = useHistory();
    const [selected, setSelected] = React.useState();
    const [date, setDate] = React.useState();
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const seller = _.find(SellerStore.sellers, (seller) => seller.id === id);

    const category = _.filter(CategoriesStore.categories, (category) => category.id === seller.category);

    const availableSolts = SlotsStore.getAvailableSlotsPerSeller(id);

    const handleChange = (event) => {
        setSelected(event.target.value)
        setOpen(true);
    }
    React.useEffect(()=> {
        if(!UserStore.isLoggedIn)
            history.push('/landing')
    }, [UserStore.isLoggedIn]);

    React.useEffect(() => {
        if (selected)
            setDate(moment(_.find(SlotsStore.slots, slot => slot.id === selected).data).format('lll'))
    }, [selected])

    const handleClose = () => {
        setOpen(false)
    }

    const confirmAppoitment = () => {
        if (selected) {
            const appoitmentData = {
                id: Math.random().toString(16).slice(2),
                user: localStorage.getItem('userId'),
                seller: seller.id,
                slot: selected,
                status: 'pending'
            }
            SlotsStore.updateSlots(selected, 'reserved');

            AppointmentsStore.addNewAppointment(appoitmentData)
            handleClose()
            history.push('/appointment')

        }
    }

    return (
        <Grid container direction={'column'} alignItems={'center'} className={classes.root} wrap={'nowrap'}>
            <Grid item  container justify={'center'} className={classes.container}>
                <Grid container direction={'column'} alignItems={'center'} wrap='nowrap' className={classes.card}>
                    <Grid item>
                        <img src={seller.imageUrl} className={classes.img}/>
                    </Grid>
                    <Grid item className={classes.name}>
                        {`${seller.firstName} ${seller.lastName}`}
                    </Grid>
                    <Grid item className={classes.business}>
                        Business <span className={classes.label}> {category[0].name}</span>
                    </Grid>
                    <Grid item className={classes.appointment}>
                        {availableSolts.length !== 0 ?
                            <FormControl className={classes.appointment}>
                                <InputLabel>Select you appointment </InputLabel>
                                <Select
                                    placeholder={' Select an appointment'}
                                    className={classes.select}
                                    id="demo-simple-select"
                                    onChange={handleChange}
                                >
                                    {
                                        _.map(availableSolts, (slot, index) =>
                                            <MenuItem value={slot.id}
                                                      key={index}> {moment(slot.data).format('lll')}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                            :
                            <Grid item className={classes.noSlot}>
                                No available Slots for this seller, please back again or check other sellers
                            </Grid>
                        }
                    </Grid>
                    <Grid item className={classes.socialIcons}>
                        <SocialIcons />
                    </Grid>
                </Grid>
            </Grid>
            <Popup open={open} onClose={handleClose}>
                <Grid container direction={'column'} alignItems={'center'}>
                    <Grid item className={classes.confirm}>
                        Are you sure you want to book this appoitment <span
                        className={classes.selected}> {date}</span>
                    </Grid>
                    <Grid item className={classes.btns}>
                        <Grid container direction={'row'} justify={'space-between'}>
                            <Grid item>
                                <Button variant={'contained'} color={'primary'} onClick={confirmAppoitment}>
                                    Yes
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant={'outlined'} onClick={handleClose}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Popup>
        </Grid>)

});

export default SellerProfile;