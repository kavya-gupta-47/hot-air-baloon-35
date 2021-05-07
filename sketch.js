var ball;
var database;
var hImg,cityImageImg
function preload(){
    hImg = loadAnimation("h1.png","h2.png","h3.png")
    cityImageImg = loadImage("cityImage.png")
}

function setup(){
    var canvas = createCanvas(1300,600);
    canvas.position(50,50)
     database = firebase.database()
     var location = database.ref("baloon/position")
     location.on("value",readPosition)

    baloon = createSprite(250,250,10,10);
    baloon.addAnimation("city",hImg)
    baloon.scale = 0.4
    
}   


function draw(){
    background(cityImageImg);
    fill("black")
    textSize(22)
    text("use arrow keys to move the baloon",100,100)

    if(keyDown(LEFT_ARROW)){
        changePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-10);
        baloon.scale = baloon.scale-0.01
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+10);
        baloon.scale = baloon.scale+0.01
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("baloon/position").set({
        x:baloon.x+x,
        y:baloon.y+y
    })
    baloon.x = baloon.x + x;
    baloon.y = baloon.y + y;
}
function readPosition(data){
var position = data.val()
baloon.x = position.x
baloon.y = position.y
}