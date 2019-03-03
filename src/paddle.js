export class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 150;
        this.h = 20;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "#FF00FF";
        ctx.fill();
        ctx.closePath();
    }

    move(canvas, mouseX) {
        this.x = mouseX;
    }
}