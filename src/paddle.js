export class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 175;
        this.h = 20;
    }

    draw(ctx, mouseX) {
        this.x = mouseX - this.w;

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "#FF00FF";
        ctx.fill();
        ctx.closePath();
    }
}