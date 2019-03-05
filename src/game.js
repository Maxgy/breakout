import {
    Ball
} from "./ball.js";

import {
    Paddle
} from "./paddle.js";

import {
    Brick
} from "./brick.js";

(() => {
    var canvas = document.getElementById("gameCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext("2d"),
        mouseX = canvas.width / 2,
        myBall = new Ball(canvas.width / 2, canvas.height / 1.25, canvas.width / 120),
        myPaddle = new Paddle(mouseX - canvas.width / 8,
            canvas.height - canvas.height / 30 - 5,
            canvas.width / 8,
            canvas.height / 30),
        bricks = [];

    (() => {
        let colors = ["red", "orange", "yellow", "green", "blue"];
        let brickWidthOffset = canvas.width / 25;
        let brickHeight = canvas.height / 13;
        let brickYOffset = canvas.height / 6;
        let endWidth = canvas.width - canvas.width / 10;
        for (let y = 0; y < 5; ++y) {
            let x = 4;

            while (x < endWidth) {
                let w = Math.random() * brickWidthOffset + brickWidthOffset;
                bricks.push(
                    new Brick(x, y * (brickHeight + 5) + brickYOffset, w, brickHeight, colors[y]));
                x += w + 5;
            }
            bricks.push(
                new Brick(x,
                    y * (brickHeight + 5) + brickYOffset,
                    canvas.width - x - 4,
                    brickHeight,
                    colors[y]));
        }
    })();

    function drawBricks() {
        for (let b of bricks) {
            b.draw(ctx);
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        myBall.draw(ctx);
        myPaddle.draw(ctx, mouseX);
        drawBricks();

        myBall.move();

        myBall.edgeCollide(canvas);
        myBall.hitPaddle(myPaddle);
        myBall.breakBricks(bricks);

        if (bricks.length === 0) {
            alert("You win!");
            location.reload(true);
        }
    }

    function mouseMove(e) {
        mouseX = e.screenX;
    }

    document.addEventListener('mousemove', mouseMove);

    setInterval(draw, 10);
})();