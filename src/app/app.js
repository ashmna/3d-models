import React from "react";
import ReactDom from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Router, IndexRoute, Route, hashHistory} from "react-router";
import {Dashboard} from "./Dashboard";
import {EditorPage} from "./page/EditoPage";

injectTapEventPlugin();

// <Route path="/" component={Dashboard}>
//     <IndexRoute component={DashboardPage}/>
//     <Route path="issues" component={IssuePage}/>
//     <Route path="users-statistics" component={UsersStatisticsPage}/>
// </Route>



ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={Dashboard}>
            <IndexRoute component={EditorPage}/>
            <Route path="editor" component={EditorPage}/>
        </Route>
    </Router>,
    document.getElementById("app")
);
