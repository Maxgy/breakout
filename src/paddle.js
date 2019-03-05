export class Paddle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw(ctx, mouseX) {
        this.x = mouseX - this.w / 2;

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "#FF00FF";
        ctx.fill();
        ctx.closePath();
    }
}