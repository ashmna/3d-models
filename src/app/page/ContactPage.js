import React from "react";
import {Row, Col} from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {hashHistory} from "react-router";

export class ContactPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    send() {

    }

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                hintText="Name"
                                fullWidth={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                hintText="Email"
                                fullWidth={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                hintText="Message"
                                fullWidth={true}
                                multiLine={true}
                                rows={4}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <RaisedButton label="Cancel" onTouchTap={() => hashHistory.goBack()}/>
                        </Col>
                        <Col xs={6}>
                            <RaisedButton className="pull-right" label="Send" onTouchTap={this.send.bind(this)}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}
