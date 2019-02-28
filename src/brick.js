export class Brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 75;
        this.h = 25;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "#00FF00";
        ctx.fill();
        ctx.closePath();
    }
}