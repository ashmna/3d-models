import React from "react";
import ReactDom from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Router, IndexRoute, Route, hashHistory} from "react-router";
import {Front} from "./Front";
import {Builder} from "./front-component/Builder";
import {ChooseModel} from "./front-component/ChooseModel";

injectTapEventPlugin();

// <Route path="/" component={Dashboard}>
//     <IndexRoute component={DashboardPage}/>
//     <Route path="issues" component={IssuePage}/>
//     <Route path="users-statistics" component={UsersStatisticsPage}/>
// </Route>



ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={Front}>
            <IndexRoute  component={ChooseModel}/>
            <Route path="/:modelCode" component={Builder}/>
        </Route>
    </Router>,
    document.getElementById("app")
);
