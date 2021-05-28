import React from "react";
import {
  Grid,
  makeStyles,
  TextField,
  Button,
  CircularProgress,
  Typography,
  MenuItem,
  InputLabel,
  Select,
} from "@material-ui/core";
import Classnames from "classnames";
import { isMobile } from "react-device-detect";
import { useHistory, useParams } from "react-router";
import signup from "./assets/signup.png";
import { isEmail, isEmailExist, isEmpty } from "../../utils/validation";
import { SellerStore } from "../../store/seller";
import { BuyerStore } from "../../store/buyer";
import { IMAGES, LOCATIONS } from "./constants";
import { CategoriesStore } from "../../store/category";
import {UserStore} from "../../store/user";
import {Header} from "../../components/header";

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: "center",
    height: "100%",
    width: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    padding: theme.spacing(3),
  },
  desktopForm: {
    padding: "10% 25%", 
  },
  image: {
    margin: "20px auto 20px auto",
    height: "50px",
  },
  pageTitle: {
    margin: "5px auto 10px auto",
    fontSize: "1.6rem",
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
  select: {
    width: "100%",
  },
  location: {
    textAlign: "left",
    width: "100%",
    fontSize: "12px",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [loading, setLoading] = React.useState();
  const [emailError, setEmailError] = React.useState();
  const [generalError, setGeneralError] = React.useState();
  const [passwordError, setPasswordError] = React.useState();
  const [nameError, setNameError] = React.useState();
  const [firstNameError, setFirstNameError] = React.useState();
  const [errors, setErros] = React.useState([]);

  const history = useHistory();
  const { type } = useParams();

  React.useEffect(()=> {
    if(UserStore.isLoggedIn){
      history.push('/')
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      id: Math.random(16).toString().slice(2),
      email,
      password,
      firstName,
      lastName,
      imageUrl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
      location: LOCATIONS[location],
    };

    switch (type) {
      case "seller":
        const category =
          CategoriesStore.categories[
            Math.floor(Math.random() * CategoriesStore.categories.length)
          ];
        SellerStore.registerNewSeller(userData, category.id);
        history.push("/");
        break;
      case "buyer":
        BuyerStore.registerNewBuyer(userData);
        history.push("/");
        break;
      default:
        break;
    }
    setGeneralError("Something went wrong, Please check again");
  };

  const handleEmailChange = (event) => {
    setGeneralError("");
    setEmail(event.target.value);
    if (isEmpty(event.target.value)) {
      setEmailError("Must not be empry");
      setErros([...errors, emailError]);
    } else if (!isEmail(event.target.value)) {
      setEmailError("Please Enter a valid email");
      errors.push(emailError);
    } else setEmailError("");
    if (isEmailExist(event.target.value)) {
      
      setEmailError(
        "This email already exist, please enter another email or login"
      );
      errors.push(emailError);
    } 
  };

  const handlePasswordChange = (event) => {
    setGeneralError("");
    setPassword(event.target.value);
    if (isEmpty(event.target.value)) {
      setPasswordError("Must not be empry");
      errors.push(passwordError);
    } else {
      setPasswordError("");
    }
  };

  const handleFirstNameChange = (event) => {
    setGeneralError("");
    setFirstName(event.target.value);
    if (isEmpty(event.target.value)) {
      setFirstNameError("Must not be empry");
      setErros([...errors, firstNameError]);
    } else setFirstNameError("");
  };

  const handleLastNameChange = (event) => {
    setGeneralError("");
    setLastName(event.target.value);
    if (isEmpty(event.target.value)) {
      setNameError("Must not be empry");
      setErros([...errors, nameError]);
    } else setNameError("");
  };

  const handleLocation = (event) => {
    if (event.target.value=== undefined) {
      setGeneralError("the locathion should not be empty");
      setErros([...errors, generalError]);
    } else {

      setLocation(event.target.value);
    }
  };

  React.useEffect(() => {
    if (!!firstName && !!lastName && !!password && !!email ) {
      setErros([]);
    }
  }, [firstName, lastName, password, email]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={Classnames(classes.form, { [classes.desktopForm]: !isMobile })}
    >
      <Header />
      <Grid item sm />
      <Grid item sm>
        <img src={signup} alt="signUp" className={classes.image} />
        <Grid item className={classes.pageTitle}>
          Sign Up for {type}
        </Grid>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="firstName"
            name="firstName"
            type="name"
            label="First Name"
            className={classes.textField}
            helperText={firstNameError}
            error={firstNameError ? true : false}
            value={firstName}
            onChange={handleFirstNameChange}
            fullWidth
          />
          <TextField
            id="lastName"
            name="lastName"
            type="name"
            label="Last Name"
            className={classes.textField}
            helperText={nameError}
            error={nameError ? true : false}
            value={lastName}
            onChange={handleLastNameChange}
            fullWidth
          />
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
          <Grid item>
            <InputLabel className={classes.location}> Location</InputLabel>
            <Select
                className={classes.select}
                value={location}
                onChange={handleLocation}
            >
              <MenuItem value={0}>{LOCATIONS[0]}</MenuItem>
              <MenuItem value={1}>{LOCATIONS[1]}</MenuItem>
              <MenuItem value={2}>{LOCATIONS[2]}</MenuItem>
              <MenuItem value={3}>{LOCATIONS[3]}</MenuItem>
              <MenuItem value={4}>{LOCATIONS[4]}</MenuItem>
            </Select>
          </Grid>
          {generalError && (
            <Typography variant="body2" className={classes.customError}>
              {generalError}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={errors.length !== 0}
            className={classes.button}
          >
            Sign Up
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            already have an account ?{" "}
            <Button
              variant="text"
              className={classes.signUp}
              onClick={() => history.push(`/login/${type}`)}
            >
              {" "}
              Login{" "}
            </Button>{" "}
            here
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default SignUp;
