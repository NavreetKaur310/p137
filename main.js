status = "";
objects = [];

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    webcam = createCapture(480, 380);
    webcam.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value; 
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
}

function draw(){
    image(webcam, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(webcam, gotResult);
        for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Detecting Objects";
        document.getElementById("number_of_objects").innerHTML = "Number of objects dtecte are :" +objects.length;

        fill("#FF0000");
        percent = floor(objects[i].cofidence * 100);
        text(objects[i].label + "" + percent +"%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}