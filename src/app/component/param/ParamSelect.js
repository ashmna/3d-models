import React from "react";
import {Row, Col} from "react-bootstrap";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export class ParamSelect extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.data = props.param;
        this.state = {
            value: this.data.value,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.data = nextProps.param;
        this.setState({
            value: this.data.value,
        });
    }

    changeValue(event, index, value) {
        this.data.value = value;
        this.setState({
            value: value,
        });
    }

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <label>{this.data.label}</label>
                </Col>
                <Col xs={12}>
                    <SelectField ref="select"
                                 id={this.data.name}
                                 name={this.data.name}
                                 value={this.state.value}
                                 onChange={this.changeValue.bind(this)}
                    >
                        {this.data.options.map((option, i) => {
                            return (<MenuItem key={i} value={option.value} primaryText={option.text}/>)
                        })}
                    </SelectField>
                </Col>
            </Row>
        );
    }
}
