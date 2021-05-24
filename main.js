song = "";


function preload() {

    song = loadSound("music.mp3");
}
leftWirstX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
ScorerightWrist=0;

function setup() {

    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {

    console.log('posenet is Initialized')
}

function gotPoses(results) {

    if(results.length > 0) 
    {
        console.log(results);
        ScorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist= results[0].pose.keypoints[9].score;
        console.log("ScorerightWrist =" + ScorerightWrist + "scoreleftWrist = " + scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX = " + leftWristX +"leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = " + rightWristY);
    }
}

function draw(){
    
    image(video, 0, 0,600, 500);

    fill("FF0000");
    stroke("FF0000");

    if(ScorerightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);

    if( rightWristY >0 && rightWristY <= 100)
    {
        document.getElementById("Speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5)
    }
    else if(rightWristY >100 && rightWristY <=200)
    {
        document.getElementById("Speed").innerHTML = "Speed = 1x";
        song.rate(1)
    }
    else if(rightWristY >100 && rightWristY <=300)
    {
        document.getElementById("Speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5)
    }
    else if(rightWristY >100 && rightWristY <=400)
    {
        document.getElementById("Speed").innerHTML = "Speed = 2x";
        song.rate(2)
    }
    else if(rightWristY >100 && rightWristY <=500)
    {
        document.getElementById("Speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5)
    }

    }

    if (scoreleftWrist > 0.2) {

        circle(leftwristX,leftWristY,20);
        InNumberleftwristY = Number(leftWristY);
        remove_decimals = floor (InNumberleftwristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "volume =" + volume;
        song.setVolume(volume);
    }
}

function play() {

    song.play();
    song.setVolume(1);
    song.rate(1);
}

