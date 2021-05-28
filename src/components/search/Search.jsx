import React from 'react';
import {Grid, makeStyles, Paper, InputBase, IconButton} from "@material-ui/core";
import _ from 'lodash';
import SearchIcon from '@material-ui/icons/Search';
import {SellerStore} from "../../store/seller";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: 'solid 1.5px #c2c2c2',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        color: '#989898s'
    },
    iconButton: {
        padding: 10,
    },
}));

const Search = ({sellers, onChange}) => {
    const classes = useStyles();

    const handleChange = (event) => {
        const str = event.target.value.toLowerCase()
        if (str) {
            const filterList = _.filter(sellers, (seller) => {
                const name = `${seller.firstName} ${seller.lastName}`.trim().toLowerCase()
                if (name.includes(str.trim())) return true;
                return seller.firstName.toLowerCase().includes(str) || seller.lastName.toLowerCase().includes(str)
            })
            onChange(filterList)
        }else{
            onChange(SellerStore.sellers)
        }
    }

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search for seller"
                onChange={handleChange}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon/>
            </IconButton>
        </Paper>
    )
}

export default Search;