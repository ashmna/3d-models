import * as React from "react";
import {Row, Col} from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import SwipeableViews from 'react-swipeable-views';
import {Builder} from './Builder';
import {Link} from "react-router";



export class ChooseModel extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showBuilder: false,
        };
        //
        // setInterval(() => {
        //     this.setState({
        //         viewMode: this.state.viewMode === "card" ? "full" : "card"
        //     });
        // }, 5000);
    }

    customize() {
        this.setState({
            showBuilder: true,
        });
    }

    handelChangeIndex(newIndex, oldIndex) {
        if (newIndex === 0) {
            CONFIG.changeBgColor("#d33f34", "#a61322");
        }
        if (newIndex === 1) {
            CONFIG.changeBgColor("#87B3D3", "#0F78D3");
        }
        if (newIndex === 2) {
            CONFIG.changeBgColor("#FFCD55", "#A6920B");
        }
    }

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <SwipeableViews onChangeIndex={this.handelChangeIndex.bind(this)}>
                        <div>
                            <img src="/images/model_0001.jpg" className="img-responsive center-block"/>
                        </div>
                        <div >
                            slide n°2
                        </div>
                        <div >
                            slide n°3
                        </div>

                    </SwipeableViews>
                    <Link to="/0001" className="pull-right">
                        <RaisedButton label="Customize" />
                    </Link>
                </Col>
            </Row>
        );
    }
}
