var cenariu,run1,rock
var cenarioo
var pisoinvisivel
var PLAY=1
var END=0
var gameState=PLAY
var piso 
var score=0
var pedrasdano
function preload() {
cenariu=loadImage("cenario.PNG")
run1=loadAnimation("Run+(1).png","Run+(2).png","Run+(3).png","Run+(4).png","Run+(5).png","Run+(6).png","Run+(7).png","Run+(8).png")
rock=loadImage("pedra.png")
gameOver=loadImage("gameover.png")
restarT=loadImage("restart.png")
stopmenino=loadAnimation("Run+(1).png")
}
function setup() {
  createCanvas(400, 400);
  cenarioo=createSprite(600,0)
  cenarioo.addImage(cenariu)
  cenarioo.velocityX=-3
  cenarioo.scale=2
  piso=createSprite(75,400,100,10)
  pisoinvisivel=createSprite(75,380,100,20)
  menino=createSprite(50,350)
  menino.addAnimation("Run",run1)
  menino.addAnimation("stop",stopmenino)
  menino.changeAnimation("Run")
  menino.scale=0.2
  pedrasdano=new Group()
  piso.visible=false
  pisoinvisivel.visible=false
  gameover=createSprite(200,150)
  restart=createSprite(200,260)
  restart.addImage(restarT)
  gameover.addImage(gameOver)
  gameover.scale=0.3
  menino.setCollider("rectangle",0,0,30,500)
}

function draw() {
  background(220);
  drawSprites()
  fill("white")
  textSize(24)
  stroke("black")
  strokeWeight(5)
  text("score: "+score,250,50)
  
  if(gameState===PLAY){
  score=score+Math.round(getFrameRate()/60)
  pedraa()
  menino.changeAnimation("Run")
  cenarioo.velocityX=-3
  if(keyWentDown("space")&&menino.isTouching(pisoinvisivel) ){
    menino.velocityY=-12
  }
  gameover.visible=false
  restart.visible=false
  if(cenarioo.x<0){
    cenarioo.x=600

  }
   if(menino.isTouching(pedrasdano)){
   gameState=END
  }
  }
  else if(gameState===END){
    gameover.visible=true
    restart.visible=true
  pedrasdano.setVelocityXEach(0)
  menino.changeAnimation("stop")
  cenarioo.velocityX=0
  if(mousePressedOver(restart)){
    reset()
  }
  }
  
 
  
  menino.velocityY = menino.velocityY +0.7;
  menino.collide(piso)
}
function pedraa() {
  if(frameCount%100===0){
    pedra=createSprite(420,370)
    pedra.addImage(rock)
    pedra.velocityX=-3
    pedra.scale=0.3
    pedra.lifeTime=140
    pedrasdano.add(pedra)
    pedra.setCollider("rectangle",0,0,30,30)
  }
  
}
function reset(){
  
  pedrasdano.destroyEach()
  score=0
  gameState=PLAY
}