import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import bg from "../../assets/bg.png";
import logo from "../../assets/logo.png";
import buyer1 from "./assets/buyer1.png";
import seller from "./assets/seller.png";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundColor: "#6181f7",
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
  },
  container: {
    width: "60%",
    textAlign: "center",
  },
  logoContainer: {
    width: "100%",
    position: "fixed",
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  body: {
    marginTop: theme.spacing(10),
  },
  logo: {
    height: "40px",
    width: "40px",
  },
  title: {
    color: theme.palette.text.main,
    fontSize: "2rem",
    marginBottom: theme.spacing(2),
  },
  subTitle: {
    color: theme.palette.text.main,
    fontSize: "1.2rem",
  },
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2)
  },
  optionContainer: {
    margin: theme.spacing(2),
  },
  option: {
    width: "10rem",
    height: "12rem",
    borderRadius: 10,
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.08)",
    padding: "1.6rem",
    cursor: "pointer",
    position: "relative",
    paddingTop: theme.spacing(3),
    backgroundColor: "#ffffff",
    "&:hover": {
      border: `solid 3px ${theme.palette.primary.main}`,
    },
  },
  image: {
    maxWidth: "100%",
  },
  optionText: {
    fontSize: "1.2rem",
    textAlign: "center",
    color: theme.palette.primary.main,
    marginTop: "1.6rem",
    textTransform: "capitalize",
  },
}));

const Landing = () => {
  const classes = useStyles();

  const history = useHistory();

  return (
    <Grid container direction="column" className={classes.root} wrap={"nowrap"}>
      <Grid item className={classes.logoContainer}>
        <img src={logo} alt="" className={classes.logo} />
      </Grid>
      <Grid item className={classes.body}>
        <Grid container direction="column" alignItems="center">
          <Grid item className={classes.content}>
            <Grid
              container
              direction="column"
              alignItems="center"
              className={classes.container}
            >
              <Grid item className={classes.title}>
                We make the world of booking more easier to you
              </Grid>
              <Grid item className={classes.subTitle}>
                Choose who you are
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item className={classes.optionContainer}>
                <Grid className={classes.option} container justify="center" onClick={()=> history.push('/login/seller')}>
                  <Grid item xs={12}>
                    <img className={classes.image} src={seller} alt="" />
                  </Grid>
                  <Grid item xs={12} className={classes.optionText}>
                    Seller
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.optionContainer}>
                <Grid className={classes.option} container justify="center" onClick={()=> history.push('/login/buyer')}>
                  <Grid item xs={12}>
                    <img className={classes.image} src={buyer1} alt="" />
                  </Grid>
                  <Grid item xs={12} className={classes.optionText}>
                    Buyer
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default Landing;
