export class Brick {
    constructor(x, y, w, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = 50;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}