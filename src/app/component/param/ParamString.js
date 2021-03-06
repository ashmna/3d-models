import React from "react";
import {Row, Col} from "react-bootstrap";
import TextField from "material-ui/TextField";
import * as colors from "material-ui/styles/colors";


export class ParamString extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.data = props.param;
        this.state = {
            textValue: this.data.value,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.data = nextProps.param;
        this.setState({
            textValue: this.data.value,
        });
    }

    changeValue(event, value) {
        this.data.value = value;
        this.setState({
            textValue: value,
        });
    }

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <label style={{color: colors.grey400}}>{this.data.label}</label>
                </Col>
                <Col xs={12}>
                    <TextField ref="text"
                               id={this.data.name}
                               name={this.data.name}
                               fullWidth={true}
                               value={this.state.textValue}
                               onChange={this.changeValue.bind(this)}
                    />
                </Col>
            </Row>
        );
    }
}
