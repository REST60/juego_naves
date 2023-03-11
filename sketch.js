var ship, ship_img,shipRight_img,shipLeft_img;

function preload(){
    ship_img = loadImage("assets/ship.png");
    shipRight_img = loadImage("assets/ship_right.png");
    shipLeft_img = loadImage("assets/ship_left.png");
}

function setup(){
    createCanvas(500,700);
    ship = createSprite(250,600);
    ship.addImage("ship",ship_img);
    ship.addImage("shipRight",shipRight_img);
    ship.addImage("shipLeft",shipLeft_img);
    ship.scale = 2;
}

function draw(){
    background("black");
    fill("white");
    text(mouseX + " - " + mouseY, mouseX,mouseY);

    if(keyDown(UP_ARROW)){
        ship.position.y =ship.position.y - 5;
        //changePosition(ship,0,-5);
    }
    if(keyDown(DOWN_ARROW)){
        changePosition(ship,0,5);
    }
    if(keyDown(RIGHT_ARROW)){
        changePosition(ship,5,0);
    }
    if(keyDown(LEFT_ARROW)){
        changePosition(ship,-5,0);
        //changeImage("shipLeft");
    }


    drawSprites();
}


function changePosition(sprite,x,y){
    sprite.position.x = sprite.position.x + x;
    sprite.position.y = sprite.position.y + y; 
}