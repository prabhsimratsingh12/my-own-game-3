    var player,bg,bgImg,shooterImg,shooter_shooting;
    var zombie,zombieimg,zombiegroup;
    var heart1,heart2,heart3,heart1img,heart2img,heart3img;
    var bullets = 70,bulletgroup;
    var gameState = "fight";


    function preload(){

      bgImg = loadImage("assets/bg.jpeg");

      shooterImg = loadImage("assets/shooter_2.png")

      shooter_shooting = loadImage("assets/shooter_3.png")

      zombieimg = loadImage("assets/zombie.png")

      heart1img = loadImage("assets/heart_1.png")

      heart2img = loadImage("assets/heart_2.png")

      heart3img = loadImage("assets/heart_3.png")

    }


    function setup(){

      createCanvas(windowWidth,windowHeight);

      bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
      bg.addImage(bgImg)
      bg.scale = 1.1

      player = createSprite(displayWidth-1150,displayHeight-300,50,50)
      player.addImage(shooterImg)
      player.scale = 0.5

      heart1 = createSprite(displayWidth-150,40,20,20)
      heart1.visible = false
      heart1.addImage(heart1img)
      heart1.scale = 0.4

      heart2 = createSprite(displayWidth-100,40,20,20)
      heart2.visible = false
      heart2.addImage(heart2img)
      heart2.scale = 0.4

      heart3 = createSprite(displayWidth-150,40,20,20)
      heart3.addImage(heart3img)
      heart3.scale = 0.4

      zombiegroup = new Group()

      bulletgroup = new Group()

    }

    function draw(){

      background("black")

      if(gameState === "fight"){

        if(keyWentDown("space")){

          player.addImage(shooter_shooting)
  
          bullet = createSprite(displayWidth-1150,player.y-30,20,10)
          bullet.velocityX = 20
  
          bulletgroup.add(bullet)
          player.depth = bullet.depth
          player.depth = player.depth+2
          bullets = bullets-1
  
        }
        else if(keyWentUp("space")){
  
          player.addImage(shooterImg)
  
        }
  
        if(bullets === 0){
          gameState = "bullet"
        }
  
        if(keyDown("UP_ARROW")){
  
          player.y = player.y -30
  
        }
  
        if(keyDown("DOWN_ARROW")){
  
          player.y = player.y +30
  
        }
  
        if(keyDown("RIGHT_ARROW")){
  
          player.x = player.x +30
  
        }
  
        if(keyDown("LEFT_ARROW")){
  
          player.x = player.x -30
  
        }

        if(zombiegroup.isTouching(bulletgroup)){
          for(var i=0;i<zombiegroup.length;i++){
            if(zombiegroup[i].isTouching(bulletgroup)){
              zombiegroup[i].destroy()
              bulletgroup.destroyEach()
            }
          }
        }
  
        if(zombiegroup.isTouching(player)){
           
          for(var i=0;i<zombiegroup.length;i++){
  
            if(zombiegroup[i].isTouching(player)){
  
              zombiegroup[i].destroy()
  
            }
          }
        }
        enemy();
      }

      drawSprites();

      if(gameState === "lost"){
        textSize(100)
        fill("red")
        text("You Lost",400,400)
        zombiegroup.destroyEach()
        player.destroy()
      }
      else if(gameState === "won"){
        textSize(100)
        fill("yellow")
        text("You Won ",400,400)
        zombiegroup.destroyEach()
        player.destroy()
      }
      else if(gameState === "bullet"){
        textSize(50)
        fill("red")
        text("You Ran Out Of Bullets!!!",470,50)
        zombiegroup.destroyEach()
        player.destroy()
        bulletgroup.destroyEach()
      }

    }

    function enemy(){
      if(frameCount%50===0){

        zombie=createSprite(random(500,5000),random(700,800),40,50)
        zombie.addImage(zombieimg)
        zombie.scale = 0.15;
        zombie.velocityX = -3
        zombie.debug = true
        zombie.setCollider("rectangle",0,0,400,400)
        zombie.lifetime = 400
        zombiegroup.add(zombie)
      }
    }