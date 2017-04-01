import * as React from "react";
import {Row, Col} from "react-bootstrap";
import FileDownload from "material-ui/svg-icons/file/file-download";
import RaisedButton from "material-ui/RaisedButton";


export class BayStepContent extends React.Component {


    render() {
        return (

        <Row>
            <Col xs={12} className="text-center">
                <Row>
                    <Col xs={12}>
                        <h1> Download stl file for your 3D printer</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <br/>
                        <RaisedButton label="Download" icon={<FileDownload/>}/>
                        <br/>
                    </Col>
                </Row>
                <br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <Row>
                    <Col xs={12}>
                        <p>For more information, please contact us <a href="mailto:hovavet@gamil.com?Subject=About%203D%20Models" target="_top">hovavet@gamil.com</a></p>
                    </Col>
                </Row>
                <br/><br/><br/><br/>
            </Col>

        </Row>

        );
    }
}
