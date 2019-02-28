export class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 20;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "#FF00FF";
        ctx.fill();
        ctx.closePath();
    }

    move(canvas, rightPressed, leftPressed) {
        if (rightPressed && this.x < canvas.width - this.w) {
            this.x += 1.7;
        } else if (leftPressed && this.x > 0) {
            this.x -= 1.7;
        }
    }
}