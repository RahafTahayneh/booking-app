import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { observer, Provider as MOBXProvider } from "mobx-react";
import { Landing } from "./pages/landing";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import "./App.css";
import theme from "./theme";
import { history } from "./router";
import { Home } from "./pages/home";
import { mobxStores } from "./store";
import { Buyer } from "./pages/buyer";
import { Seller } from "./pages/seller";

const App = () => {
  return (
    <MOBXProvider {...mobxStores}>
      <ThemeProvider theme={createMuiTheme(theme)}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/landing" component={Landing} />
            <Route exact path="/login/:type" component={Login} />
            <Route exact path="/signUp/:type" component={SignUp} />
            <Route exact path="/buyer" component={Buyer} />
            <Route exact path="/seller" component={Seller} />
          </Switch>
        </Router>
      </ThemeProvider>
    </MOBXProvider>
  );
};

export default App;
