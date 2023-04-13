var ship, ship_img,shipRight_img,shipLeft_img,ship_damaged;
var explosion1,explosion2,explosion3;
var ufo1,ufo1_img,enemy1,enemy1_img;
var borderRight,borderLeft;
var ufoGroup, bulletsGroup,enemyBulletsGroup;
var life = 5;
var score = 0;
var gameState =  "play";
var dificultad = 30;
var enemyLife = 0;


function preload(){
    ship_img = loadImage("assets/ship.png");
    shipRight_img = loadImage("assets/ship_right.png");
    shipLeft_img = loadImage("assets/ship_left.png");
    ship_damaged = loadImage("assets/ship-damaged.png");

    ufo1_img = loadImage("assets/ufo1.png");
    enemy1_img = loadImage("assets/enemy1.png");

    explosion1 = loadSound("sounds/explosion1.mp3");
    explosion2 = loadSound("sounds/explosion2.mp3");
    explosion3 = loadSound("sounds/explosion3.mp3");
}

function setup(){
    createCanvas(500,700);

    borderRight = createSprite(499,250,5,1000);
    borderLeft = createSprite(1,250,5,1000);
    borderRight.shapeColor = "orange";
    borderLeft.shapeColor = "orange";
    

    ship = createSprite(250,600);
    ship.addImage("ship",ship_img);
    ship.addImage("shipRight",shipRight_img);
    ship.addImage("shipLeft",shipLeft_img);
    ship.addImage("shipDamage",ship_damaged);
    ship.scale = 2;

   

    ufoGroup = new Group();
    bulletsGroup = new Group();
    enemyBulletsGroup = new Group();
}

function draw(){
    background("black");
    fill("white");  
    text(mouseX + " - " + mouseY, mouseX,mouseY);

    if(gameState === "play"){

    if(keyDown(UP_ARROW)){
        ship.position.y =ship.position.y - 9;
        ship.changeAnimation("ship", ship_img);
    }
    if(keyDown(DOWN_ARROW)){
        changePosition(ship,0,5);
        ship.changeAnimation("ship", ship_img);
    }
    if(keyDown(RIGHT_ARROW)){
        changePosition(ship,7,0);
        ship.changeAnimation("shipRight", shipRight_img);
    }
    if(keyDown(LEFT_ARROW)){
        changePosition(ship,-7,0);
        ship.changeAnimation("shipLeft", shipLeft_img);
    }

    if(keyWentUp(RIGHT_ARROW)){
        ship.changeAnimation("ship", ship_img);
    }
    if(keyWentUp(LEFT_ARROW)){
        ship.changeAnimation("ship", ship_img);
    }
    if(keyDown("space") && frameCount%10 === 0){
        var bullets = createSprite(ship.position.x,ship.position.y,10,30);
        bullets.velocity.y = -15;
        bullets.shapeColor=rgb(random(1,255),random(1,255),random(1,255));
        ship.depth = bullets.depth;
        ship.depth = ship.depth+1;
        bulletsGroup.add(bullets);
    }



    if(ufoGroup.isTouching(bulletsGroup)){
        for(var i=0; i < ufoGroup.length; i++){
            for(var j=0; j < bulletsGroup.length; j++){
                if(ufoGroup[i].isTouching(bulletsGroup[j])){
                    ufoGroup[i].destroy();
                    bulletsGroup[j].destroy();
                    score = score + 1;
                    explosion1.play();
                }
            }
        }
    }

    if(ufoGroup.isTouching(ship)){
        for(var i=0; i <ufoGroup.length; i++){
            if(ufoGroup[i].isTouching(ship)){
                ufoGroup[i].destroy();
                var cuenta = World.seconds;
                while(cuenta < 3){
                    console.log(",ak");
                    ship.changeAnimation("shipDamage",ship_damaged);
                }
                

                life = life - 1;
            }

        }
        
    }
    
    /*if(score > 5){
        dificultad = dificultad - 29;
        //spawnUfos();
    }*/
    if(score === 1){
        score = 11;
        enemyLife = 1;
    
    }

    if(enemyLife === 1 ){
        enemy1 = createSprite(250,0);
        enemy1.addImage("enemy_1",enemy1_img);
        enemy1.scale = 7;
        enemy1.velocity.y = 1.5;
        if(frameCount%10 === 0){
           var enemyBullets = createSprite(0,0,20,20);
           enemyBullets.velocity.y = 10;
           enemyBullets.x = enemy1.x;
           enemyBullets.y = enemy1.y;
        }
    }
  

    ship.collide(borderLeft);
    ship.collide(borderRight);
    ufoGroup.bounceOff(borderRight);
    ufoGroup.bounceOff(borderLeft);

    spawnUfos();    
    }

    if(life <= 0){
        gameState = "end";
        textSize(70);
        text("GAME OVER",25,350);
        textSize(15);
        text("Presiona ESPACIO para reiniciar",150,400);
    }
    if(gameState === "end" && keyDown("space")){
        gameState = "play";
        life = 5;
        score = 0;
        ship.x = 250;
        ship.y = 600;
        //ship.changeAnimation("shipParpadeando",....);
    }
    
    textSize(22);
    text("VIDAS "+life, 400,50);
    text("SCORE "+score,390,100);
    drawSprites();

}


function changePosition(sprite,x,y){
    sprite.position.x = sprite.position.x + x;
    sprite.position.y = sprite.position.y + y; 
}

function spawnUfos(){
    if(frameCount%dificultad === 0){
        ufo1 =createSprite(random(1,500),0,50,50);
        ufo1.setCollider("circle",0,0,10);
        ufo1.debug = false;
        ufo1.addImage("ufo1", ufo1_img);
        ufo1.scale= 3
        ufo1.velocity.y = random(1,5);
        ufo1.velocity.x = random(-5,5);
        ufo1.lifetime=800;
        ufoGroup.add(ufo1);
        //console.log(ufo1.velocity.y,ufo1.velocity.x);
    }
}   