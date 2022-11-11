var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(84,457,21,12);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw() {
  background(200);

if(gameState === "play"){  
  

  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("up_arrow")){
    ghost.velocityY = -3;
  }
   
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+2;
  }

  if(keyDown("left_arrow")){
    ghost.x = ghost.x-2;
  }

   ghost.velocityY = ghost.velocityY+1;

   if(climbersGroup.isTouching(ghost)){

    ghost.velocityY = 0;
    ghost.velocityX = 0;

   }

    spawnDoor();

  drawSprites();
  


if(invisibleBlockGroup.isTouching(ghost)||(ghost.y > 600)){

  gameState = "end";
  ghost.destroy();
   
}

}

if (gameState === "end"){
 
  background("red");
  stroke("yellow")
  textSize(24);
  text("gameOver",290,200,)
 
}

}

function spawnDoor(){
  
   if (frameCount % 240 == 0){

  door = createSprite(Math.round(random(20,540)),0);
  climber = createSprite(302,65);
  climber.x = door.x;
   
  invisibleBlock = createSprite(302,68,0,0.1);
  invisibleBlock.width = climber.width;
  invisibleBlock.x =  climber.x;
  

  door.addImage(doorImg);
  climber.addImage(climberImg);

  door.velocityY = 2;
  climber.velocityY = 2;
  invisibleBlock.velocityY = 2;

  door.lifetime = 800;
  climbersGroup.lifetime = 800;
  invisibleBlock.lifetime = 800;

  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);

  ghost.depth = door.depth;
  ghost.depth = ghost.depth +1;

   }

}






