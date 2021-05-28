import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import {Redirect, Link, useHistory} from 'react-router-dom';
import _ from 'lodash';
import {SocialIcons} from "../../socialIcon";
import {CategoriesStore} from "../../../store/category";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#ffffff',
        padding: theme.spacing(2),
        cursor: 'pointer',
        height: '100%',
        position: 'relative',
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.1)'
        },
    },
    imgContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        width: 200,
        height: 200,
    },
    img: {
        width: '100%',
        height: '100%',
        maxWidth: 200,
        maxHeight: 200,
        borderRadius: '50%'
    },
    name: {
        fontSize: 24,
        color: '#090909',
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    category: {
        textAlign: 'center',
        fontSize: 18,
        color: '#6c757d',
        fontWeight: 700,
        margin: theme.spacing(1)
    },
    label: {
        fontSize: 14,
        fontWeight: 500
    }
}));

const SellerCard = ({seller}) => {
    const classes = useStyles();
    const history = useHistory();
    const category = _.find(CategoriesStore.categories, (category) => category.id === seller.category);

    return (
        <Grid container direction={'column'} soacing={2} alignItems={'center'} className={classes.root} onClick={() => history.push(`/sellers/${seller.id}`)} >
            <Grid item className={classes.imgContainer}>
                <img src={seller.imageUrl} alt={seller.firstName} className={classes.img}/>
            </Grid>
            <Grid item className={classes.name}>
                {`${seller.firstName} ${seller.lastName}`}
            </Grid>
            <Grid item className={classes.category}>
                Business:
                <span className={classes.label}> {category.name}</span>
            </Grid>
            <Grid item>
                <SocialIcons/>
            </Grid>
        </Grid>

    );
};

export default SellerCard;
