import React from "react";
import {ModelService} from "../service/ModelService";
import {Row, Col} from "react-bootstrap";
import {Params} from "../component/Params";
import {Viewer3D} from "../component/Viewer3D";
import RaisedButton from "material-ui/RaisedButton";


export class EditorPage extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
        };
        this.modelService = new ModelService();
        this.modelData = null;


        this.modelService.getModel().then((modelData) => {
            this.modelData = modelData;
            this.setState({loading: false});
        });
    }

    generateModelByParams() {
        let code = this.modelData.code;
        let params = this.refs.params.getParams();
        this.modelService
            .generateModel(code, params)
            .then(data => {
                console.log(data)
            });
    }

    render() {
        if (this.state.loading) {
            return (<h1>Loading......</h1>);
        }
        return (
            <Row>
                <Col md={8}>
                    <Viewer3D ref="viewer"/>
                </Col>
                <Col md={4}>
                    <Row>
                        <Col xs={12}>
                            <Params ref="params" params={this.modelData.params}/>
                        </Col>
                        <Col xs={12}>
                            <RaisedButton label="Generate" onTouchTap={() => this.generateModelByParams()}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}
