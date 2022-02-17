var path,player,redCar,blueCar,yellowCar,leftBoundary,rightBoundary,bottomBoundary,topBoundary;
var pathImg,playerImg,redCarImg,blueCarImg,yellowCarImg;
var gameState = "serve";
var lifes = 3;
var KM = 0;

function preload(){
  pathImg = loadImage("path.png");
  playerImg = loadImage("carro.jpg");
  redCarImg = loadImage("carrovermelho.png");
  blueCarImg = loadImage("carroazul.jpg");
  yellowCarImg = loadImage("carroamarelo0.png");
}

function setup(){  
  createCanvas(400,600);
  path = createSprite(200,200);
  path.addImage(pathImg);
  path.scale = 1.2;
  player = createSprite(203,450,30,30);
  player.scale = 0.06;
  player.addAnimation("CarroRunning",playerImg);
  redCar = createSprite(93,-200,30,30);
  redCar.scale = 0.18;
  redCar.addAnimation("CarroRedStop",redCarImg);
  blueCar = createSprite(315,200,30,30);
  blueCar.scale = 0.3;
  blueCar.addAnimation("CarroBlueStop",blueCarImg);
  yellowCar = createSprite(203,100,30,30);
  yellowCar.scale = 0.18;
  yellowCar.addAnimation("CarroRedStop",yellowCarImg);
  leftBoundary = createSprite(0,200,100,800);
  leftBoundary.visible = false;
  rightBoundary = createSprite(410,200,100,800);
  rightBoundary.visible = false;
  bottomBoundary = createSprite(200,648,800,100);
  bottomBoundary.visible = false;
  topBoundary = createSprite(200,-48,800,100);
  topBoundary.visible = false;
}

function draw(){
  background(0);
  if(gameState == "serve"){
    path.velocityY = 0;
    redCar.velocityY = 0;
    blueCar.velocityY = 0;
    yellowCar.velocityY = 0;
    if(keyDown("W")){
      gameState = "play";
    }
    if(keyDown("UP")){
      gameState = "play";
    }
  }
  if(gameState == "play"){
    borda();
    redCar.velocityY = - 7;
    blueCar.velocityY = - 5;
    yellowCar.velocityY = - 4;
    if(keyDown("LEFT")){
      player.x = player.x - 7;
    }
    if(keyDown("RIGHT")){
      player.x = player.x + 7;
    }
    if(keyDown("UP")){
      KM = KM + 2;
      path.y = path.y + 7;
      player.y = player.y - 4;
      redCar.y = redCar.y + 7;
      blueCar.y = blueCar.y + 7;
      yellowCar.y = yellowCar.y + 7;
    } else(player.velocityY = + 2);
    if(keyDown("DOWN")){
      player.y = player.y + 7;
      //redCar.y = redCar.y - 7;
      //blueCar.y = blueCar.y - 7;
    }
    if(keyDown("A")){
      player.x = player.x - 7;
    }
    if(keyDown("D")){
      player.x = player.x + 7;
    }
    if(keyDown("W")){
      KM = KM + 2;
      path.y = path.y + 12;
      redCar.y = redCar.y + 10;
      blueCar.y = blueCar.y + 10;
      yellowCar.y = yellowCar.y + 10;
    }
    if(keyDown("S")){
      player.y = player.y + 2;
      path.y = path.y - 12;
      redCar.y = redCar.y - 7;
      blueCar.y = blueCar.y - 7;
      yellowCar.y = yellowCar.y - 7;
    }
    if(player.collide(redCar)){
      lifes = lifes - 1;
      gameState = "end";
      player.velocityY = 0;
    }
    if(player.collide(blueCar)){
      lifes = lifes - 1;
      gameState = "end";
      player.velocityY = 0;
    }
    if(player.collide(yellowCar)){
      lifes = lifes - 1;
      gameState = "end";
      player.velocityY = 0;
    }
    player.collide(bottomBoundary);
    player.collide(topBoundary);
    player.collide(leftBoundary);
    player.collide(rightBoundary);
    if(path.y > 300 ){
      path.y = height/3.95;
    }
    if(lifes === 0){
      gameState = "gameOver";
    }
  }
  if(gameState == "end"){
    borda();
    KM = 0;
    if(keyDown("SPACE")){
      gameState = "serve";
    }
  }
  if(gameState == "gameOver"){
    KM = 0;
    if(keyDown("ENTER")){
      lifes = 3;
      redCar.x = 93;
      redCar.y = 100;
      blueCar.x = 315;
      blueCar.y = 400;
      yellowCar.x = 203;
      yellowCar.y = -200;
      player.x = 203;
      player.y = 450;
      gameState = "serve";
    }
  }
  //console.log(gameState);
  drawSprites();
  
  //////////TEXTOS//////////
  textSize(20);
  fill("lightgrey");
  text("Lifes: " + lifes,57,590);
  textSize(20);
  fill("lightgrey");
  text("Free Street",153,590);
  if(gameState == "serve"){
    SeeKM();
    textSize(20);
    fill("lightgrey");
    text("Press W or UP for start!",100,200);
  }
  if(gameState == "play"){
    SeeKM();
    if(KM > 218){
      KM = 218;
    }
    if(KM < 3){
      KM = 2;
    }
    KM = KM - 1
  }
  if(gameState == "end"){
    SeeKM();
    textSize(20);
    fill("lightgrey");
    text("OH NO!",167,180);
    textSize(20);
    fill("lightgrey");
    text("Press SPACE to continue!",90,200);
  }
  if(gameState == "gameOver"){
    SeeKM();
    textSize(20);
    fill("lightgrey");
    text("Oh no... It's GameOver...",94,180);
    textSize(20);
    fill("lightgrey");
    text("Press ENTER new game!",90,200);
  }
}

function borda(){
  if(path.y < 0 ){
    path.y = height/3.95;
  }
  if(redCar.y < -250 ){
    redCar.y = 700;
  }
  if(redCar.y > 800 ){
    redCar.y = -250;
  }
  if(blueCar.y < -250 ){
    blueCar.y = 700;
  }
  if(blueCar.y > 800 ){
    blueCar.y = -250;
  }
  if(yellowCar.y < -250 ){
    yellowCar.y = 700;
  }
  if(yellowCar.y > 700 ){
    yellowCar.y = -150;
  }
}

function SeeKM(){
  if(KM => 0){
    textSize(20);
    fill("white");
    text(KM + "Km/h",275,575,150,100);
  }
  if(KM > 20){
    textSize(20);
    fill("green");
    text(KM + "Km/h",275,575,150,100);
  }
  if(KM > 40){
    textSize(20);
    fill("darkgreen");
    text(KM + "Km/h",275,575,150,100);
  }
  if(KM > 60){
    textSize(20);
    fill("yellow");
    text(KM + "Km/h",275,575,150,100);
  }
  if(KM > 80){
    textSize(20);
    fill("orange");
    text(KM + "Km/h",275,575,150,100);
  }
  if(KM > 100){
    textSize(20);
    fill("red");
    text(KM + "Km/h",275,575,150,100);
  }
}
