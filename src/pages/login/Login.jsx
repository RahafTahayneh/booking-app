import React from "react";
import {
  Grid,
  makeStyles,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import {isMobile} from 'react-device-detect';
import Classnames from 'classnames'
import login from "./assets/login.png";
import { isEmail, isEmpty } from "../../utils/validation";
import { SellerStore } from "../../store/seller";
import { BuyerStore } from "../../store/buyer";
import {UserStore} from "../../store/user";
import {Header} from "../../components/header";

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: "center",
    height: "100%",
    width: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    padding: theme.spacing(5),
  },
  desktopForm:{
    padding: '10%'
  },
  image: {
    margin: "20px auto 20px auto",
    height: "50px",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
    fontSize: "2rem",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 40,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
  signUp: {
    color: theme.palette.secondary.main,
    textTransform: "capitalize",
  },
}));

const Login = () => {
  const classes = useStyles({isMobile});
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState();
  const [emailError, setEmailError] = React.useState();
  const [generalError, setGeneralError] = React.useState();
  const [passwordError, setPasswordError] = React.useState();
  const history = useHistory();
  const { type } = useParams();

  React.useEffect(()=> {
    if(UserStore.isLoggedIn){
      history.push('/')
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
    };
   
    switch (type) {
      case "seller":
        if (SellerStore.authoraizeSeller(userData)) history.push("/");
        break;
      case "buyer":
        if (BuyerStore.authoraizeBuyer(userData)) history.push("/");
        break;
      default:
          break;    
    }
    setGeneralError('Email or Password is wrong, Please check again')
  };

  const handleEmailChange = (event) => {
    setGeneralError('')
    setEmail(event.target.value);
    if (isEmpty(event.target.value)) {
      setEmailError("Must not be empry");
    } else if (!isEmail(event.target.value))
      setEmailError("Please Enter a valid email");
    else setEmailError("");
  };

  const handlePasswordChange = (event) => {
    setGeneralError('')
    setPassword(event.target.value);
    if (isEmpty(event.target.value)) {
      setPasswordError("Must not be empry");
    } else setPasswordError("");
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={Classnames(classes.form, {[classes.desktopForm]: !isMobile})}
    >
      <Header />
      <Grid item sm />
      <Grid item sm>
        <img src={login} alt="login" className={classes.image} />
        <Grid item className={classes.pageTitle}>
          Login for {type}
        </Grid>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={emailError}
            error={emailError ? true : false}
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={passwordError}
            error={passwordError ? true : false}
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
          {generalError && (
            <Typography variant="body2" className={classes.customError}>
              {generalError}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            dont have an account ?{" "}
            <Button
              variant="text"
              className={classes.signUp}
              onClick={() => history.push(`/signup/${type}`)}
            >
              {" "}
              Signup{" "}
            </Button>{" "}
            here
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Login;
