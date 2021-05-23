import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import { BuyerStore } from "../../store/buyer";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: "#6181f7",
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
  },
}));

const Home = () => {
  const classes = useStyles();
  console.log(BuyerStore.buyers)

  const history = useHistory();

  return (
    <Grid
      container
      direction="column"
      className={classes.root}
      wrap={"nowrap"}
    ></Grid>
  );
};

export default Home;
