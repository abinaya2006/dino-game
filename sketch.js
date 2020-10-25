var trex,trex_running,trex_collided;
var ground,groundimage,invisibleground;
var cloudsGroup, cloudimg;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
 //load animation for trex
  trex_running=loadAnimation("trex_1.png","trex_2.png");
  
  //load image for trexcollided
  trex_collided=loadAnimation("trexcollided.png");
  
  //load image for trexjump
  trex_jump=loadAnimation("trex_2.png")
  
  //load image for ground
 groundimage=loadImage("desert.jpg");
  
  //loadimage for clouds
  cloudimg=loadImage("cloud.png");
  
  //loadimage for obstacles
   obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
   
}
function setup(){
  createCanvas(600,400);
 
  
  //createSprite for ground
  ground=createSprite(200,200,600,10)
  ground.addImage("gr",groundimage)
  ground.scale=4.5;
  
  
  
  //createSprite for trex
  trex=createSprite(50,350,10,10)
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.addAnimation("jump", trex_jump);
  trex.scale=1.5
   edges = createEdgeSprites();
  
  trex.setCollider("rectangle",0,0,10,trex.height)
  //trex.setCollider("circle",5,0,20);
 // trex.debug=true
  
  //createSprite for invisibleground
  invisibleground=createSprite(50,393,600,10);
  invisibleground.visible=false;
  
 
  
  
  //new group
  obstaclesGroup=new Group()
  cloudsGroup=new Group()
  
  
}

function draw(){
  background("white")
  
  
  
  
 
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
   
    //velocityX to ground
    ground.velocityX = -(6 + 3*score/100);
  
 
  
  if(ground.x<195){
    ground.x=ground.width
    
  }
  
  
  
  //jump when space is pressed
  if(keyDown("space")&&trex.y>=305){
    trex.velocityY=-15
  }
  
  
  //gravity for trex
  trex.velocityY=trex.velocityY+0.8
  
  //trex collide with the invisibleground
  trex.collide(invisibleground)
  
  spawnObstacles()
  spawnClouds() 
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
     // trex.velocityY = -12;
    }
    
     drawSprites();
  }
  
 else if (gameState === END) {
   //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
   
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
   
   //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  
    drawSprites();
   
   fill("red");
   stroke("yellow")
   textSize(50)
   text("GAME OVER ",200,200);
   text("press r to restart",150,270);
   
  
   
   
   }
    if(keyDown("r")){
     gameState=PLAY;
      obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
      trex.changeAnimation("running",trex_running)
      score=0
      
    }
  
 
  fill("red")
  textSize(30)
   text("Score: "+ score, 400,40);
  

 

function spawnClouds() {
  
  if (frameCount % 90 === 0) {
   var  cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(20,180));
    cloud.addImage(cloudimg);
    cloud.scale = 0.06;
    cloud.velocityX = -7;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
 }

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,335,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6+ 3*score/100) ;
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
    case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.45;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstacle.collide(invisibleground);
  //  obstacle.debug=true;
    obstacle.setCollider("circle",5,0,20);
  }
}
