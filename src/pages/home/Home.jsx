import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import {UserStore} from "../../store/user";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(()=> {
      if(UserStore.isLoggedIn)
      {
        const type = localStorage.getItem('type');
        switch (type){
          case 'seller':
            history.push('/seller');
            break;
          case 'buyer':
            history.push('/buyer');
            break;
        }
      }else{
        history.push('/landing')
      }
  }, [])
  return (
    <Grid />
  );
};

export default Home;
