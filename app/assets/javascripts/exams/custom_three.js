var lxy = [];
var scene,camera,cameraControls,renderer,line;
var render = function(){
    requestAnimationFrame( render );

    cameraControls.update();
    renderer.render( scene, camera );
};

Exams.Canvas = class{
    constructor(){
        this.scene;
        this.camera;
        this.cameraControls;
        this.renderer;
        this.render;
        this.line;
        this.lxy;
    }


    


    initThree() {

        var points = JSON.parse($("[data-exam='draw']").val());
        
        lxy.push(
            (points["a"]["x"]/100),
            (points["a"]["y"]/100),
            (points["n"]["x"]/100),
            (points["n"]["y"]/100),
            (points["or"]["x"]/100),
            (points["or"]["y"]/100),
            (points["po"]["x"]/100),
            (points["po"]["y"]/100),
            points["angle"]
        )
        

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 100, $("[data-view3d='wrapper']").innerWidth() / ($("[data-view3d='wrapper']").innerWidth()/1.77), 0.1, 1000 );

        renderer = new THREE.WebGLRenderer({login: false});
        console.log($("[data-view3d='wrapper']").innerWidth()+" x "+$("[data-view3d='wrapper']").innerHeight()+" - "+window.innerWidth+" x "+window.innerHeight);
        renderer.setSize( $("[data-view3d='wrapper']").innerWidth(), ($("[data-view3d='wrapper']").innerWidth()/1.77) );
        
        $("[data-view3d='wrapper']").append(renderer.domElement)

       

        this.createCircle();
        
        this.createLine(lxy[0],lxy[1],lxy[2],(lxy[3]*(-1)),"blue");
        this.createLine((lxy[4] - (4*lxy[3])),(lxy[5] + (lxy[3]*(-1))),(lxy[6]+(lxy[0] - lxy[6])),(lxy[7] + (lxy[3]*(-1))),"red");

        
        camera.position.z = 6;

        cameraControls = new THREE.TrackballControls(camera);
        

        scene.add( new THREE.AxisHelper() );
        render();

    };

    

    createLine(x1,y1,x2,y2,color) {
        var points = [];
        points.push( new THREE.Vector3( x1, y1, 0 ) );
        points.push( new THREE.Vector3( x2, y2, 0 ) );
    
        var geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        var material = new THREE.MeshBasicMaterial( { color: color } );
        line = new THREE.Line( geometry, material );
        scene.add( line );
    };

    createCircle(){

        var curve = new THREE.EllipseCurve(
            (lxy[0]-0.20),  (lxy[7] + ((lxy[3]*(-1)))-0.20),
            0.4, 0.4,
            1, (lxy[8]),
            true,
            180
        );
        
        var points = curve.getPoints( 50 );
        var geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        var material = new THREE.MeshBasicMaterial({ color: 0x5F5F00, side: THREE.DoubleSide });
        
        
        var ellipse = new THREE.Line( geometry, material );
        
        scene.add( ellipse );

        
    }


}







