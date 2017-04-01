import * as React from "react";
import {Row, Col} from "react-bootstrap";
import {ModelService} from "../service/ModelService";
import {Steps} from "./builder/Steps";
import {Link} from "react-router";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import * as colors from "material-ui/styles/colors";


export class Builder extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.modelService = new ModelService();
        this.modelData = null;
        this.state = {
            loading: true,
        };
        this.getModelData(props.params["modelCode"]);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params["modelCode"] !== nextProps.params["modelCode"]) {
            this.getModelData(nextProps.params["modelCode"]);
        }
        this.props = nextProps;
    }

    getModelData(modelCode) {
        this.modelService.getModelData(modelCode)
            .then(modelData => {
                this.modelData = modelData;
                CONFIG.setThemByName(this.modelData.color);
                CONFIG.changeBgColor(colors[this.modelData.color + '300'], colors[this.modelData.color + '700']);
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
                    <Row>
                        <Col xs={11}>
                            <h5>{this.modelData.name} <Link to={"/model/" + this.modelData.code}>#{this.modelData.code}</Link></h5>
                        </Col>
                        <Col xs={1}>
                            <Link to="/" className="pull-right">
                                <IconButton iconStyle={{color: colors.grey500}}>
                                    <CloseIcon/>
                                </IconButton>
                            </Link>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <Steps modelCode={this.modelData.code} modelParams={this.modelData.params} steps={this.modelData.steps}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}
