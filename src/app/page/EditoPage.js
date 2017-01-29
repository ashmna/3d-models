import React from "react";
import {ModelService} from "../service/ModelService";
import {Row, Col} from "react-bootstrap";
import {Params} from "../component/Params";
import $ from "jquery"


export class EditorPage extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
        };
        this.modelService = new ModelService();
        this.modelData = null;

        this.script();
        this.modelService.getModel().then((modelData) => {
            this.modelData = modelData;
            this.setState({loading: false});
        });
    }

    main() {

    }

    script() {
        // if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
        var container;
        var camera, cameraTarget, scene, renderer;
        var cameraControls;

        setTimeout(function () {
            init();
            animate();
        }, 100);

        function init() {
            container = document.createElement( 'div' );
            document.getElementById("editor").appendChild( container );

            camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
            camera.position.set( 3, 0.15, 3 );
            cameraTarget = new THREE.Vector3( 0, -0.25, 0 );
            scene = new THREE.Scene();
            scene.fog = new THREE.Fog( 0x72645b, 2, 15 );
            // Ground
            var plane = new THREE.Mesh(
                new THREE.PlaneBufferGeometry( 40, 40 ),
                new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
            );
            plane.rotation.x = -Math.PI/2;
            plane.position.y = -0.5;
            scene.add( plane );
            plane.receiveShadow = true;
            // ASCII file
            var loader = new THREE.STLLoader();
            loader.load( '0103070090118.stl', function ( geometry ) {
                // var material = new THREE.MeshPhongMaterial( { color: 0x00FF00, specular: 0xFFFFFF, shininess: 0 } );
                var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) ;
                var mesh = new THREE.Mesh( geometry, wireMaterial);
                // mesh.position.set( 0, - 0.25, 0.6 );
                mesh.rotation.set( - Math.PI / 2, 0, 0 );
                mesh.scale.set( 0.02, 0.02, 0.02 );
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                scene.add( mesh );
            } );
            // Binary files
            /*
            var material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );
            loader.load( './models/stl/binary/pr2_head_pan.stl', function ( geometry ) {
                var mesh = new THREE.Mesh( geometry, material );
                mesh.position.set( 0, - 0.37, - 0.6 );
                mesh.rotation.set( - Math.PI / 2, 0, 0 );
                mesh.scale.set( 2, 2, 2 );
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                scene.add( mesh );
            } );
            loader.load( './models/stl/binary/pr2_head_tilt.stl', function ( geometry ) {
                var mesh = new THREE.Mesh( geometry, material );
                mesh.position.set( 0.136, - 0.37, - 0.6 );
                mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
                mesh.scale.set( 2, 2, 2 );
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                scene.add( mesh );
            } );
            // Colored binary STL
            loader.load( './models/stl/binary/colored.stl', function ( geometry ) {
                var meshMaterial = material;
                if (geometry.hasColors) {
                    meshMaterial = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
                }
                var mesh = new THREE.Mesh( geometry, meshMaterial );
                mesh.position.set( 0.5, 0.2, 0 );
                mesh.rotation.set( - Math.PI / 2, Math.PI / 2, 0 );
                mesh.scale.set( 0.3, 0.3, 0.3 );
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                scene.add( mesh );
            } );
            */
            // Lights
            scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
            addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
            addShadowedLight( 0.5, 1, -1, 0xffaa00, 1 );

            // renderer
            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setClearColor( scene.fog.color );
            renderer.setPixelRatio( window.devicePixelRatio );
            var width = $("#editor").innerWidth();
            var height = window.innerHeight / 4 * 3;
            renderer.setSize(width, height);
            renderer.gammaInput = true;
            renderer.gammaOutput = true;
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.renderReverseSided = false;
            container.appendChild( renderer.domElement );
            window.addEventListener( 'resize', onWindowResize, false );


            // CONTROLS
            cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
            cameraControls.target.set( 0, 0, 0 );
            cameraControls.addEventListener( 'change', render );
        }
        function addShadowedLight( x, y, z, color, intensity) {
            var directionalLight = new THREE.DirectionalLight( color, intensity );
            directionalLight.position.set( x, y, z );
            scene.add( directionalLight );
            directionalLight.castShadow = true;
            var d = 1;
            directionalLight.shadow.camera.left = -d;
            directionalLight.shadow.camera.right = d;
            directionalLight.shadow.camera.top = d;
            directionalLight.shadow.camera.bottom = -d;
            directionalLight.shadow.camera.near = 1;
            directionalLight.shadow.camera.far = 4;
            directionalLight.shadow.mapSize.width = 1024;
            directionalLight.shadow.mapSize.height = 1024;
            directionalLight.shadow.bias = -0.005;
        }
        function onWindowResize() {
            var width = $("#editor").innerWidth();
            var height = window.innerHeight / 4 * 3;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize( width, height );
        }
        function animate() {
            // requestAnimationFrame( animate );
            render();
        }
        function render() {
            // var timer = Date.now() * 0.00001;
            // camera.position.x = Math.cos( timer ) * 3;
            // camera.position.z = Math.sin( timer ) * 3;
            // camera.lookAt( cameraTarget );
            renderer.render( scene, camera );
        }
    }

    render() {
        if (this.state.loading) {
            return (<h1>Loading......</h1>);
        }
        return (
            <Row>
                <Col md={8}>
                    <div id="editor"></div>
                </Col>
                <Col md={4}>
                    <Params params={this.modelData.params}/>
                </Col>
            </Row>
        );
    }
}
