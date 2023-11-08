    var player = {
        x: 200,
        y: 200,
        x_v: 0,
        y_v: 0,
        jump: true,
        height: 80,
        width: 50
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
        ctx.drawImage(playerSprite, frameWidth * playerFrame, 0, frameWidth, playerSprite.height, (player.x) - 50, (player.y) - 80, player.width, player.height);
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
                width: 9000,
                height: 300
                }
            );
        }
    }

    function renderplatform() {
        var groundImg = new Image();
        groundImg.src = "./sprites/ground.png";

        var platform = platforms[1];
        var imageWidth = groundImg.width;

        // displaying problems may come from this loop
        for (var x = platform.x; x < platform.x + platform.width; x += imageWidth) {
            var widthToDraw = Math.min(imageWidth, platform.x + platform.width - x);
            var heightToDraw = Math.min(groundImg.height, platform.height);
            ctx.drawImage(groundImg, x, platform.y, widthToDraw, heightToDraw);
        }
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
        //if(platforms[0].x < player.x && player.x < platforms[0].x + platforms[0].width && platforms[0].y < player.y && player.y < platforms[0].y + platforms[0].height){
        //    i = 0;
        //}
        if(platforms[1].x < player.x && player.x < platforms[1].x + platforms[1].width && platforms[1].y < player.y && player.y < platforms[1].y + platforms[1].height){
            i = 1;
        }
        if(i > -1){
            player.jump = false;
            player.y = platforms[i].y;
        }

        rendercanvas();
        renderplayer();
        renderplatform();

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