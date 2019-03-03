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

var mouseX = canvas.width / 2;

var myBall = new Ball(canvas.width / 2, canvas.height / 1.25);
var myPaddle = new Paddle(mouseX, canvas.height / 1.15);

function mouseMove(e) {
    mouseX = e.screenX;
}

var bricks = []
for (let y = 100; y < canvas.height / 1.7; y += 55) {
    for (let x = 2.5; x < canvas.width; x += 80) {
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
    myPaddle.move(canvas, mouseX);

    myBall.edge_collide(canvas);
    myBall.hit_paddle(myPaddle);
    myBall.break_bricks(bricks);

    if (bricks.length === 0) {
        alert("You win!");
        location.reload(true);
    }
}

document.addEventListener('mousemove', mouseMove);

setInterval(draw, 10)