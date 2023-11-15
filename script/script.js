    var player = {
        x: 200,
        y: 200,
        x_v: 0,
        y_v: 0,
        jump: true,
        height: 120,
        width: 90
    };

    var keys = {
        right: false,
        left: false,
        up: false,
    };

    var gravity = 0.6;
    var friction = 0.7;

    var num = 2;

    var platforms = [];

    var playerSprite = new Image();
    playerSprite.src = "./sprites/lili.png";
    var playerFrame = 0;
    var animationSpeed = 100; // higher it is, slower it will be
    var framesPerUpdate = 1;


    var projectiles = [];


    function rendercanvas(){
        //ctx.fillStyle = "#F0F88F";
        //ctx.fillRect(0, 0, 1000, 500);

        var backgroundImg = new Image();
        backgroundImg.src = "./sprites/pixel_background.jpg";
        var bgWidth = 1000;
        var bgHeight = 500;

        ctx.drawImage(backgroundImg, 0, -100, bgWidth, bgHeight);
    }

    function renderplayer() {
        //ctx.fillStyle = "#F08080";
        //ctx.fillRect((player.x)-50, (player.y)-80, player.width, player.height);

        var frameWidth = playerSprite.width / 2;
        ctx.drawImage(playerSprite, frameWidth * playerFrame, 0, frameWidth, playerSprite.height, (player.x) - 90, (player.y) - 120, player.width, player.height);
    }

    function startAnimation() {
        setInterval(updatePlayerFrame, animationSpeed);
    }
    function updatePlayerFrame() {
        if (keys.left || keys.right) {
            playerFrame = (playerFrame + framesPerUpdate) % 2;
        } else {
            playerFrame = 0;
        }
    }

    function createplatform() {
        for (i = 0; i < num; i++) {
            platforms.push(
                {
                x: 0 * i,
                y: 200 + (200 * i),
                width: 200000,
                height: 300,
                speed: 5,
                }
            );
        }
    }

    function renderplatform() {
        var groundImg = new Image();
        groundImg.src = "./sprites/ground.png";

        groundImg.onload = function() {
            for (var i = 0; i < platforms.length; i++) {
                var platform = platforms[1];
                var imageWidth = groundImg.width;

                // displaying problems may come from this loop
                for (var x = platform.x; x < platform.x + platform.width; x += imageWidth) {
                    var widthToDraw = Math.min(imageWidth, platform.x + platform.width - x);
                    var heightToDraw = Math.min(groundImg.height, platform.height);
                    ctx.drawImage(groundImg, x, platform.y, widthToDraw, heightToDraw);
                }
            }
        };
    }


    function createProjectile() {
        var randomX = Math.random() * ctx.canvas.width;
        var projectileSize = 30;

        projectiles.push({
            x: randomX,
            y: 0,
            speed: 6,
            size: projectileSize,
            color: 'red'
        });
    }

    function renderProjectiles() {
        for (var i = 0; i < projectiles.length; i++) {
            var proj = projectiles[i];

            var bombImg = new Image();
            bombImg.src = "./sprites/bomb.png";

            ctx.drawImage(bombImg, proj.x, proj.y, proj.size, proj.size);

            proj.y += proj.speed;

            if (proj.y + proj.size > platforms[1].y) {
                proj.y = platforms[1].y - proj.size;
                proj.speed *= -1;
            }
        }
    }

    function increaseProjectileSpeed() {
        for (var i = 0; i < projectiles.length; i++) {
            projectiles[i].speed *= 1.001;
        }
    }

    setInterval(createProjectile, 1000);


//    function checkCollisions() {
    //        var playerLeft = player.width;
    //        var playerRight = player.width;
    //        var playerTop = player.height;
    //        var playerBottom = player.height;

    //        for (var i = 0; i < projectiles.length; i++) {
    //            var proj = projectiles[i];

    //            var projLeft = proj.x;
    //            var projRight = proj.x + proj.size;
    //            var projTop = proj.y;
    //            var projBottom = proj.y + proj.size;

    //            if (
    //                playerLeft < projRight &&
    //               playerRight > projLeft &&
    //          playerTop < projBottom &&
    //          playerBottom > projTop
    //      ) {
    //          gameOver();
    //      }
    //  }
    //}


    function gameOver() {
        ctx.font = "40px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", 400, 250);

        document.removeEventListener("keydown", keydown);
        document.removeEventListener("keyup", keyup);
    }


    function keydown(e) {
        // move left right
        if(e.keyCode == 37) {
            keys.left = true;
        }
        if(e.keyCode == 39) {
            keys.right = true;
        }

        // jump
        if(e.keyCode == 38) {
            if(player.jump == false) {
                player.y_v = -10;
            }
        }
    }

    function keyup(e) {
        // move left right
        if(e.keyCode == 37) {
            keys.left = false;
        }
        if(e.keyCode == 39) {
            keys.right = false;
        }

        // jump
        if(e.keyCode == 38) {
            if(player.y_v < -2) {
                player.y_v = -3;
            }
        }
    }

    function loop() {
        // move left right
        if(keys.left) {
            player.x += -5.0;
        }
        if(keys.right) {
            player.x += 5.0;
        }

        // jump
        if(player.jump == false) {
            player.x_v *= friction;
        } else {
            player.y_v += gravity;
        }
        player.jump = true;


        player.y += player.y_v;
        player.x += player.x_v;

        let i = -1;

        if(platforms[1].x < player.x && player.x < platforms[1].x + platforms[1].width && platforms[1].y < player.y && player.y < platforms[1].y + platforms[1].height){
            i = 1;
        }
        if(i > -1){
            player.jump = false;
            player.y = platforms[i].y;
        }

        // animation
        for (var n = 0; n < platforms.length; n++) {
            platforms[n].x -= platforms[n].speed;

            if (platforms[n].x + platforms[n].width < 0) {
                platforms[n].x = ctx.canvas.width;
            }
        }

        setInterval(increaseProjectileSpeed, 5000);


        rendercanvas();
        renderplayer();
        renderplatform();

        //checkCollisions();
        renderProjectiles();

        startAnimation();
        updatePlayerFrame();
    }




    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.height = 500;
    ctx.canvas.width = 1000;
    createplatform();
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);

    setInterval(loop, 22);