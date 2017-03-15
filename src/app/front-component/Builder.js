import * as React from "react";
import {Row, Col} from "react-bootstrap";
import {ModelService} from "../service/ModelService";
import {Steps} from "./builder/Steps";
import {Link} from "react-router";


export class Builder extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.modelService = new ModelService();
        this.modelData = null;
        this.state = {
            loading: true,
        };
        this.getModelData();
    }

    getModelData() {
        this.modelService.getModelData(this.props.params["modelCode"])
            .then(modelData => {
                this.modelData = modelData;
                CONFIG.setThemByName(this.modelData.color);
                this.setState({loading: false});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>)
        }
        return (
            <Row>
                <Col xs={12}>
                    <h5>{this.modelData.name} <Link to={"/" + this.modelData.code}>#{this.modelData.code}</Link></h5>
                    <Steps modelParams={this.modelData.params} steps={this.modelData.steps}/>
                </Col>
            </Row>
        );
    }
}
