var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var survivalTime = 0;
var score = 0; 

function preload(){
  backImage=loadImage("images/jungle.png");
  player_running = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png");
  bananaImg = loadImage("images/banana.png");
  stoneImg = loadImage("images/stone.png");
  overImg = loadImage("images/over.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  foodGroup = new Group();
  stoneGroup = new Group();
  
  over = createSprite(windowWidth/2,windowHeight/2,10,10);
  over.addImage(overImg);
  over.scale = 2;

  backgr = createSprite(windowWidth/2,windowHeight/2,10,10);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width/2;
  backgr.velocityX = -8;

  player = createSprite(100,windowHeight/2 + 200,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
  ground = createSprite(400,windowHeight/2 + 250,800,10);
  ground.x = ground.width/2;
  ground.visible = false;
  
}

function draw() { 
  background(0);
  
  if(gameState === PLAY){
    if(backgr.x < 100){
      backgr.x = backgr.width/2;
    }
  
    if(keyDown("space") && player.y > windowHeight/2 - 100) {
      player.velocityY = -12;
    }

    player.velocityY = player.velocityY + 1.2;

    survivalTime = survivalTime + Math.round(getFrameRate()/40);
  
    player.debug = true;
    player.collide(ground);

    spawnFood();
    spawnStone();

  drawSprites();

  textSize(30);
  textAlign(CENTER);
  fill("Red");
  textFont('jokerman')
  text("Survival Time : " + survivalTime,1250,100)
  text("Eaten Bananas : " + score,1250,150)

  if(player.isTouching(foodGroup)){
    foodGroup[0].destroy();
    score = score + 1;
    player.scale = player.scale + 0.01;

    if(player.scale === 0.5){
      player.scale = 0.2
    }
  }
  
  if(player.isTouching(stoneGroup)){
    gameState = END;
  }

}

  if(gameState === END){
    ground.velocityX = 0;
    backgr.velocityX = 0;
    survivalTime = survivalTime + 0;
    over.depth = player.depth + 1;

    textSize(60);
    textAlign(CENTER);
    fill("Red");
    textFont('Lobster');
    text("Game Over",windowWidth/2,windowHeight/2 - 100);
    textFont('Jokerman');
    text("Eaten Bananas : " + score,windowWidth/2,windowHeight/2);
    text("Survival time : " + survivalTime,windowWidth/2,windowHeight/2 + 100);
  }
}

function spawnFood(){
  if(frameCount % 100 === 0){
    var banana = createSprite(windowWidth,0,30,15);
    banana.y = Math.round(random(windowHeight/2 - 150,windowHeight/2 + 270));
    banana.addImage(bananaImg);
    banana.scale = 0.07;
    banana.velocityX = -10;

    banana.lifetime = 180;
    player.depth = banana.depth + 1;
    banana.debug = false;
    banana.setCollider("rectangle",0,0,1000,550);
    foodGroup.add(banana);
  }
}

function spawnStone(){
  if(frameCount % 150 === 0){
    var stone = createSprite(windowWidth,windowHeight/2 + 200,30,15);
    stone.addImage(stoneImg);
    stone.scale = random(0.1,0.4);
    stone.velocityX = -12;

    stone.lifetime = 180;
    player.depth = stone.depth + 1;
    stone.debug = true;
    stone.setCollider("rectangle",0,0,400,400);
    stoneGroup.add(stone);
  }
}