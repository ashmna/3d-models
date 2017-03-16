import React from "react";
import $ from "jquery";

export class Viewer3D extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.params = props.params;

        // this.container;
        // this.camera;
        // this.cameraTarget;
        // this.scene;
        // this.renderer;
        // this.cameraControls;
        this.lastLoadedMesh = null;
    }

    componentDidMount() {
        // if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
        this.init();
        this.animate();
    }


    animate() {
        // requestAnimationFrame( animate );
        this.threeRender();
    }

    threeRender() {
        // let timer = Date.now() * 0.00001;
        // this.camera.position.x = Math.cos( timer ) * 3;
        // this.camera.position.z = Math.sin( timer ) * 3;
        this.camera.lookAt(this.cameraTarget);
        this.renderer.render(this.scene, this.camera);
    }

    loadStl(fileName) {
        let loader = new THREE.STLLoader();
        loader.load(fileName, (geometry) => {
            if (this.lastLoadedMesh) {
                this.scene.remove(this.lastLoadedMesh);
            }
            let material = new THREE.MeshPhongMaterial({color: 0x00FF00, specular: 0xFFFFFF, shininess: 0});
            // let wireMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
            let mesh = new THREE.Mesh(geometry, material);
            // mesh.position.set( 0, - 0.25, 0.6 );
            mesh.rotation.set(-Math.PI / 2, 0, 0);
            mesh.scale.set(0.02, 0.02, 0.02);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.scene.add(mesh);
            this.lastLoadedMesh = mesh;
        });
        this.threeRender();
    }


    init() {
        this.container = document.getElementById("viewer-3d");

        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 15);
        this.camera.position.set(3, 0.15, 3);
        this.cameraTarget = new THREE.Vector3(0, -0.25, 0);
        this.scene = new THREE.Scene();
        //this.scene.fog = new THREE.Fog(0x72645b, 2, 15);
        // Ground
        let plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(40, 40),
            new THREE.MeshPhongMaterial({color: 0x999999, specular: 0x101010})
        );
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.5;
        this.scene.add(plane);
        plane.receiveShadow = true;

        // Binary files
        /*
         let material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );
         loader.load( './models/stl/binary/pr2_head_pan.stl', function ( geometry ) {
         let mesh = new THREE.Mesh( geometry, material );
         mesh.position.set( 0, - 0.37, - 0.6 );
         mesh.rotation.set( - Math.PI / 2, 0, 0 );
         mesh.scale.set( 2, 2, 2 );
         mesh.castShadow = true;
         mesh.receiveShadow = true;
         scene.add( mesh );
         } );
         loader.load( './models/stl/binary/pr2_head_tilt.stl', function ( geometry ) {
         let mesh = new THREE.Mesh( geometry, material );
         mesh.position.set( 0.136, - 0.37, - 0.6 );
         mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
         mesh.scale.set( 2, 2, 2 );
         mesh.castShadow = true;
         mesh.receiveShadow = true;
         scene.add( mesh );
         } );
         // Colored binary STL
         loader.load( './models/stl/binary/colored.stl', function ( geometry ) {
         let meshMaterial = material;
         if (geometry.hasColors) {
         meshMaterial = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
         }
         let mesh = new THREE.Mesh( geometry, meshMaterial );
         mesh.position.set( 0.5, 0.2, 0 );
         mesh.rotation.set( - Math.PI / 2, Math.PI / 2, 0 );
         mesh.scale.set( 0.3, 0.3, 0.3 );
         mesh.castShadow = true;
         mesh.receiveShadow = true;
         scene.add( mesh );
         } );
         */
        // Lights
        this.scene.add(new THREE.HemisphereLight(0x443333, 0x111122));
        this.addShadowedLight(1, 1, 1, 0xffffff, 1.35);
        this.addShadowedLight(0.5, 1, -1, 0xffaa00, 1);

        // renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        //this.renderer.setClearColor(this.scene.fog.color);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        let width = $("#viewer-3d").innerWidth();
        let height = window.innerHeight / 4 * 3;
        this.renderer.setSize(width, height);
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.renderReverseSided = false;
        this.container.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () => this.onWindowResize(), false);


        // CONTROLS
        this.cameraControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.cameraControls.target.set(0, 0, 0);
        this.cameraControls.addEventListener('change', () => this.threeRender());
    }

    addShadowedLight(x, y, z, color, intensity) {
        let directionalLight = new THREE.DirectionalLight(color, intensity);
        directionalLight.position.set(x, y, z);
        this.scene.add(directionalLight);
        directionalLight.castShadow = true;
        let d = 1;
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

    onWindowResize() {
        let width = $("#viewer-3d").innerWidth();
        let height = window.innerHeight / 4 * 3;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.threeRender();
    }


    render() {
        return (
            <div id="viewer-3d"></div>
        );
    }
}
