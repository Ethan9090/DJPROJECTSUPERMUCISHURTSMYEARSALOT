
    var Msound1 = "";
    var Msound2 = "";

    var leftsoundhandy = 0;
    var leftsoundhandx = 0;

    var rightsoundhandy = 0;
    var rightsoundhandx = 0;

    var leftscore = 0;
    var rightscore = 0;

    var songPlaying = "";


function preload(){

    Msound1 = loadSound("mysong.mp3");
    Msound2 = loadSound("mysong2.mp3");

}

function playSound1(){

    Msound1.play()

}

function playSound2(){

    Msound2.play()

}

function setup(){

    canvas = createCanvas(500,500);
    canvas.center();

    camera = createCapture(VIDEO);
    camera.hide();

    MyModel = ml5.poseNet(camera,modelLoaded);

    MyModel.on('pose', gotposes);
    
}

function modelLoaded(){
    console.log("Posenet works now");
    
}

function gotposes(results){
    if(results.length > 0){
        
        console.log(results);
    
        leftsoundhandy = results[0].pose.leftWrist.y;
        leftsoundhandx = results[0].pose.leftWrist.x;

        rightsoundhandy = results[0].pose.rightWrist.y;
        rightsoundhandx = results[0].pose.rightWrist.x;

        console.log("left hand x is " + leftsoundhandx + " left handy is " + leftsoundhandy);
        console.log("right hand x is " + rightsoundhandx + " right handy is " + rightsoundhandy);

        leftscore = results[0].pose.leftWrist.confidence;
        rightscore = results[0].pose.rightWrist.confidence;

       
        if(leftscore > 0.2){
            Msound2.stop()
            Msound1.play()
        }
        else{
            Msound1.stop()
            Msound2.play()
        }
       
    }
}
function draw(){

    image(camera,0,0,500,500);

    circle(leftsoundhandy,leftsoundhandx,10);
    fill("red");

    circle(rightsoundhandx,rightsoundhandy,10);
    fill("blue");

}
