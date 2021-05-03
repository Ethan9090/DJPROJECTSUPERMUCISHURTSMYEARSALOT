
    var Msound1 = "";
    var Msound2 = "";

    var leftsoundhandy = 0;
    var leftsoundhandx = 0;

    var rightsoundhandy = 0;
    var rightsoundhandx = 0;

    var leftscore = 0;
    var rightscore = 0;

    var songPlaying1 = "";
    var songPlaying2 = "";


function preload(){

    Msound1 = loadSound("mysong.mp3");
    Msound2 = loadSound("mysong2.mp3");

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

        leftscore = results[0].pose.keypoints[9].score;
        rightscore = results[0].pose.keypoints[10].score;
       
    }
}

function draw(){

    image(camera,0,0,500,500);

    songPlaying1 = Msound1.isPlaying();
    songPlaying2 = Msound2.isPlaying();

    if(leftscore > 0.2){
        circle(leftsoundhandyx,leftsoundhandy,10);
        fill("red");
        Msound2.stop();
        if(songPlaying1==false){
            Msound1.play();
        }
    }


    if(rightscore > 0.2){
        circle(rightsoundhandx,rightsoundhandy,10);
        fill("red");
        Msound1.stop();
        if(songPlaying2==false){
        Msound2.play();
        }
    }
}

function stopallmysongs(){
    Msound1.stop();
    Msound2.stop();
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1)
}