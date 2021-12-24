var monkey , banana,rock,monkeyAnim ,groundAnim, ground ,PLAY=0;
var bananaIMG,obstacleIMG,obstacleGroup,score=0,bgImg,bg,foodGroup,END=1,collidedIMG,gameoverIMG,restartIMG, restart, gameover;
var gamestate =PLAY;
function preload() {
  monkeyAnim=loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png");
  //groundAnim = loadAnimation("ground2.png");
  bananaIMG = loadImage("images/banana.png");
  obstacleIMG = loadImage("images/stone.png");
  bgImg = loadImage("images/jungle.jpg");
  collidedIMG = loadAnimation("images/collided.png");
  gameoverIMG = loadImage("images/Gameover.PNG");
  restartIMG = loadImage("images/restart.jpg");
  
      
}


function setup() {
  createCanvas(displayHeight, displayWidth);
  //bg = createSprite(300,200,600,400);
  //bg.addAnimation("jungle",bgImg);
  
  //bg.scale = 1.16;
  //bg.setVelocity(-4,0);
  monkey = createSprite(100,displayHeight-20,20,20);
  monkey.addAnimation("running",monkeyAnim);
   monkey.addAnimation("stop",collidedIMG,);
  monkey.scale = 0.2;
  monkey.velocityX=4.0;
  console.log("monkey");
  monkey.setCollider("circle",0,0,200);
  gameover = createSprite(100,70,50,50);
  gameover.addImage("gameover",gameoverIMG);
  console.log("mesh");
  gameover.scale = 0.2;
  gameover.visible = false;
  gameover.position.x = monkey.position.x-100;
  gameover.position.y = monkey.position.y-700;
  //monkey.debug = true;
  ground = createSprite(displayWidth/2,displayHeight,displayWidth*10,10);
  //ground.setVelocity(-3,0);
  ground.visible = false;
  obstacleGroup = new Group();
  foodGroup = new Group();
  
}

function draw() {
  //edges = createEdgeSprites;
 // monkey.collide(edge(4))
  
  background("white");
  image(bgImg,0,0,displayWidth*10,displayHeight);
  if(gamestate === PLAY){
    camera.position.x = monkey.position.x;
    camera.position.y = monkey.position.y;
    console.log("cam");
    textSize(20);
    fill("black");
    text("Press the Space key to make the monkey jump",monkey.x-100,500);
    /*if(ground.position.x <0) 
      ground.position.x =ground.width/2;*/
    //if(bg.position.x<0)
    //bg.position.x = bg.width/2;   
    if(keyDown('space') && monkey.position.y>315){ 
      monkey.velocityY = -12; 
    }
    monkey.velocityY = monkey.velocityY+(0.4);
  console.log("love");
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach(); 
      score++;
    }
      switch (score){
        case 5 :
          monkey.scale = 0.3;
          break;
          case 10:
          monkey.scale = 0.4;
          break;
          case 15:
          monkey.scale = 0.5;
          break;
          case 20:
          monkey.scale = 0.6;
          break;
          default:
          monkey.scale = 0.2;
      
    }
    food();
  obstacle();
    if(monkey.isTouching(obstacleGroup)){
      //monkey.velocityX = 0;
      //monkey.velocityY = 0;
      gamestate = END;
    }
    if(monkey.x>displayWidth*7){
      gamestate = END;
    }
  
  }
    
    if(gamestate === END){
      textSize(20);
      fill("black");
      text("Game Over!",monkey.x,400);
      text("Press the up arrow to restart the game",monkey.x-100,500);
      monkey.scale = 0.2;
      monkey.changeAnimation("stop",collidedIMG);
      ground.velocityX = 0;
      monkey.velocityX = 0;
      monkey.velocityY = 0;
      gameover.visible = true;
      //bg.velocityX = 0;
      
      obstacleGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityYEach(0);
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setVelocityXEach(0);
      foodGroup.setLifetimeEach(-1);
      
      console.log("true");
    }
  
  if(keyDown(UP_ARROW)){
    reset();
  }
  monkey.collide(ground);
  
  drawSprites();
  //strokeWeight(15);
  stroke("white");
  textSize(20);
  fill("red");
  text("Score :"+score,monkey.x,300);
  
}
function food (){
  if(frameCount%50 ===0){
banana= createSprite(random(550,displayWidth*7),random(displayHeight-100,displayHeight),10,10);
banana.addImage("banana",bananaIMG) ;
 banana.scale = 0.08; 
    banana.setVelocity(-5,0);
    foodGroup.add(banana);
    banana.lifetime= 1000;
  }
}
function obstacle (){
  if(frameCount%50 ===0){
  rock= createSprite(random(550,displayWidth*7),displayHeight-100,10,10);
  rock.addImage("banana",obstacleIMG) ;
  rock.scale = 0.2; 
    rock.setVelocity(-5,0);
   obstacleGroup.add(rock);
    rock.debug=false;
    rock.setCollider("circle",0,0,200);
    rock.lifetime= 1000;
  }
}
function reset(){
  console.log("furyborn");
  gamestate = PLAY;
  gameover.visible = false;
  camera.position.x = monkey.x;
    camera.position.y = monkey.position.y;
  //restart.visible = false;
  monkey.changeAnimation("running",monkeyAnim);
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  //bg.setVelocity(-4,0);
  score = 0;
  monkey.velocityX=4.0;
  monkey.velocityY = -12;
  
  //ground.x = 0;

}