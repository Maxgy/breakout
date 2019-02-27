export class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 16;
        this.dx = 2;
        this.dy = -2;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    edge_collide(canvas) {
        if (this.x < this.r || this.x > canvas.width - this.r) {
            this.dx = -this.dx;
        }
        if (this.y < this.r) {
            this.dy = -this.dy;
        } else if (this.y > canvas.height - this.r) {
            alert("G A M E   O V E R");
            location.reload(true);
        }
    }

    hit_paddle(paddle) {
        if (this.y > paddle.y - this.r &&
            this.x > paddle.x &&
            this.x < paddle.x + paddle.w) {
            this.dy = -this.dy;
            this.y -= 1;
        }
    }

    break_bricks(bricks) {
        for (var i = 0; i < bricks.length; ++i) {
            if (this.x > bricks[i].x && this.x < bricks[i].x + bricks[i].w) {
                if (this.y < bricks[i].y + bricks[i].h + this.r &&
                    this.y > bricks[i].y ||
                    this.y > bricks[i].y &&
                    this.y < bricks[i].y + bricks[i].h
                ) {
                    bricks.splice(i, 1);
                    this.dy = -this.dy;
                }
            }
            if (this.y > bricks[i].y &&
                this.y < bricks[i].y + bricks[i].h) {
                if (this.x > bricks[i].x &&
                    this.x < bricks[i].x + 1 ||
                    this.x < bricks[i].x + bricks[i].h &&
                    this.x > bricks[i].x + bricks[i].h - 1
                ) {
                    bricks.splice(i, 1);
                    this.dx = -this.dx;
                }
            }
        }
    }
}