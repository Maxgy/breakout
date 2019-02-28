import {
    Ball
} from "./ball.js";

import {
    Paddle
} from "./paddle.js";

import {
    Brick
} from "./brick.js";

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var rightPressed = false;
var leftPressed = false;

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

var myBall = new Ball(canvas.width / 2, canvas.height / 1.25);
var myPaddle = new Paddle(canvas.width / 2, canvas.height / 1.15);

var bricks = []
for (let y = 5; y < canvas.height / 2.1; y += 30) {
    for (let x = 5; x < canvas.width; x += 80) {
        bricks.push(new Brick(x, y));
    }
}

function drawBricks() {
    for (let b of bricks) {
        b.draw(ctx);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    myBall.draw(ctx);
    myPaddle.draw(ctx);
    drawBricks();

    myBall.move();
    myPaddle.move(canvas, rightPressed, leftPressed);

    myBall.edge_collide(canvas);
    myBall.hit_paddle(myPaddle);
    myBall.break_bricks(bricks);

    if (bricks.length == 0) {
        alert("You win!");
        location.reload(true);
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

setInterval(draw, 10)