import React from "react";
import {Grid, makeStyles} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Sellers} from "../../components/sellers";
import {UserStore} from "../../store/user";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
        overflow: "hidden",
        position: "relative",
        padding: theme.spacing(2)
    },
}));

const Buyer = () => {
    const classes = useStyles();

    const history = useHistory();
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
                <Sellers/>
        </Grid>
    );
};

export default Buyer;
