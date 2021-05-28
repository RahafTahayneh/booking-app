import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import history from "./history";
import {Home} from "../pages/home";
import {Landing} from "../pages/landing";
import {Login} from "../pages/login";
import {SignUp} from "../pages/signup";
import {Buyer} from "../pages/buyer";
import {Seller} from "../pages/seller";
import {SellerProfile} from "../pages/sellerProfile";
import {Appointment} from "../pages/appoitement";
import {Slots} from "../pages/slots";
import {NewSlot} from "../pages/new";
import Layout from "../layout/Layout";


const RouterComponent = () => {
    return (
        <Router history={history}>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/landing" component={Landing}/>
                    <Route exact path="/login/:type" component={Login}/>
                    <Route exact path="/signUp/:type" component={SignUp}/>
                    <Route exact path="/buyer" component={Buyer}/>
                    <Route exact path="/seller" component={Seller}/>
                    <Route exact path="/sellers/:id" component={SellerProfile}/>
                    <Route exact path="/appointment" component={Appointment}/>
                    <Route exact path="/slots" component={Slots}/>
                    <Route exact path="/slots/new" component={NewSlot}/>
                </Switch>
            </Layout>
        </Router>
    )

}

export default RouterComponent