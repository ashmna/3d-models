import React from "react";
import {
    AmbientLight,
    BufferAttribute,
    BufferGeometry,
    DefaultLoadingManager,
    Face3,
    FileLoader,
    FlatShading,
    Geometry,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    Vector3,
    WebGLRenderer
} from "three";
import TrackballControls from "three-trackballcontrols";
import ThreeStlLoader from "three-stl-loader";
import $ from "jquery";

const STLLoader = ThreeStlLoader({
    DefaultLoadingManager: DefaultLoadingManager,
    XHRLoader: FileLoader,
    BufferGeometry: BufferGeometry,
    BufferAttribute: BufferAttribute,
    Geometry: Geometry,
    Vector3: Vector3,
    Face3: Face3,
});

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
        const viewer3d = $("#viewer-3d");
        const width = viewer3d[0].offsetWidth;
        const height = window.innerHeight / 4 * 3; //viewer3d.offsetHeight;


        // if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
        setTimeout(() => {
            this.init(width, height);
            this.animate();
        }, 300);
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    createMaterial(color) {
        return new MeshPhongMaterial({
            color: color,
            specular: 0x222222,
            shininess: 15,
            shading: FlatShading
        });
    }

    loadStl(fileName) {
        let loader = new STLLoader();
        loader.load(fileName, (geometry) => {
            if (this.lastLoadedMesh) {
                this.scene.remove(this.lastLoadedMesh);
            }
            let material = this.createMaterial(0x00FF00);
            let mesh = new Mesh(geometry, material);
            // mesh.position.set( 0, - 0.25, 0.6 );
            // mesh.rotation.set(-Math.PI / 2, 0, 0);
            this.scene.add(mesh);
            this.lastLoadedMesh = mesh;
        });
        // this.threeRender();
    }


    disableZoom() {
        this.trackballControls.noZoom = true;
    }

    enableZoom() {
        this.trackballControls.noZoom = false;
    }

    animate() {
        // const e = 0.01;
        // const x = this.camera.position.x;
        // const y = this.camera.position.y;
        // const z = this.camera.position.z;
        //
        // this.camera.position.x = x * Math.cos(e) + z * Math.sin(e);
        // this.camera.position.z = z * Math.cos(e) - x * Math.sin(e);
        // this.camera.lookAt(this.scene.position);

        requestAnimationFrame(this.animate.bind(this));

        this.trackballControls.update();
        this.renderer.render(this.scene, this.camera);
    }

    init(width, height) {

        this.container = document.getElementById("viewer-3d");

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(45, width / height, 0.1, 1e3);
        this.scene.add(this.camera);
        this.camera.position.set(50, 5, 275);

        this.renderer = new WebGLRenderer({
            // canvas: n.children("#canvasRenderer")[0],
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: true,
        });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0, 0);

        this.trackballControls = new TrackballControls(this.camera);
        // this.trackballControls.minDistance = 50;
        // this.trackballControls.maxDistance = 500;
        this.trackballControls.rotateSpeed = 5;
        this.trackballControls.zoomSpeed = 0.1;
        this.trackballControls.noZoom = false;
        this.trackballControls.noPan = true;
        // this.trackballControls.staticMoving = true;
        // this.trackballControls.dynamicDampingFactor = 0.3;

        this.scene.add(new AmbientLight(0x222222));
        const pointLight = new PointLight(0xEEEEEE);
        pointLight.position.set(100, 80, 0);
        this.camera.add(pointLight);

        this.loadStl('0103070090118.stl');

        this.container.appendChild(this.renderer.domElement);
        // this.renderer.domElement

        // this.camera.position.set(3, 0.15, 3);
        // this.cameraTarget = new THREE.Vector3(0, -0.25, 0);

        //this.scene.fog = new THREE.Fog(0x72645b, 2, 15);
        // Ground
        // let plane = new THREE.Mesh(
        //     new THREE.PlaneBufferGeometry(40, 40),
        //     new THREE.MeshPhongMaterial({color: 0x999999, specular: 0x101010})
        // );
        // plane.rotation.x = -Math.PI / 2;
        // plane.position.y = -0.5;
        // this.scene.add(plane);
        // plane.receiveShadow = true;

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
        // this.scene.add(new THREE.HemisphereLight(0x443333, 0x111122));
        // this.addShadowedLight(1, 1, 1, 0xffffff, 1.35);
        // this.addShadowedLight(0.5, 1, -1, 0xffaa00, 1);

        // renderer
        // this.renderer = new THREE.WebGLRenderer({antialias: true});
        //this.renderer.setClearColor(this.scene.fog.color);
        // this.renderer.setPixelRatio(window.devicePixelRatio);
        // let width = $("#viewer-3d").innerWidth();
        // let height = window.innerHeight / 4 * 3;
        // this.renderer.setSize(width, height);
        // this.renderer.gammaInput = true;
        // this.renderer.gammaOutput = true;
        // this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.renderReverseSided = false;
        // this.container.appendChild(this.renderer.domElement);


        // CONTROLS
        // this.cameraControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        // this.cameraControls.target.set(0, 0, 0);
        // this.cameraControls.addEventListener('change', () => this.threeRender());
    }


    onWindowResize() {
        // let width = $("#viewer-3d").innerWidth();
        // let height = window.innerHeight / 4 * 3;
        // this.camera.aspect = width / height;
        // this.camera.updateProjectionMatrix();
        // this.renderer.setSize(width, height);
        // this.threeRender();
    }


    render() {
        return (
            <div id="viewer-3d"></div>
        );
    }
}
