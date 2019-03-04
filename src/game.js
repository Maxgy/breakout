import {
    Ball
} from "./ball.js";

import {
    Paddle
} from "./paddle.js";

import {
    Brick
} from "./brick.js";

var canvas = document.getElementById("gameCanvas"),
    ctx = canvas.getContext("2d"),
    mouseX = canvas.width / 2,
    myBall = new Ball(canvas.width / 2, canvas.height / 1.25),
    myPaddle = new Paddle(mouseX, canvas.height - 25),
    bricks = [],
    colors = ["red", "orange", "yellow", "green", "blue"];

for (let y = 0; y < 5; ++y) {
    let x = 5;
    let canvas_width = canvas.width - 100;

    while (x < canvas_width) {
        let w = Math.random() * 50 + 50;
        bricks.push(new Brick(x, y * 55 + 100, w, colors[y]));
        x += w + 5;
    }
    bricks.push(new Brick(x, y * 55 + 100, canvas.width - x - 5, colors[y]));
}

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

    myBall.edge_collide(canvas);
    myBall.hit_paddle(myPaddle);
    myBall.break_bricks(bricks);

    if (bricks.length === 0) {
        alert("You win!");
        location.reload(true);
    }
}

function mouseMove(e) {
    mouseX = e.screenX;
}

document.addEventListener('mousemove', mouseMove);

setInterval(draw, 10)