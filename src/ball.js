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

    change_dx() {
        let rand = Math.random() / 2 - 0.25;

        if (this.dx < -2.5) {
            this.dx += Math.abs(rand);
            this.dx = -this.dx;
        } else if (this.dx > 2.5) {
            this.dx -= Math.abs(rand);
            this.dx = -this.dx + rand;
        } else {
            this.dx = -this.dx + rand;
        }
        this.dy += rand / 2;
    }

    change_dy() {
        let rand = Math.random() / 2 - 0.25;

        if (this.dy < -2.5) {
            this.dy += Math.abs(rand);
            this.dy = -this.dx;
        } else if (this.dy > 2.5) {
            this.dy -= Math.abs(rand);
            this.dy = -this.dy + rand;
        } else {
            this.dy = -this.dy + rand;
        }
        this.dx += rand / 2;
    }

    edge_collide(canvas) {
        if (this.x < this.r) {
            this.x++;
            this.change_dx();
        } else if (this.x > canvas.width - this.r) {
            this.x--;
            this.change_dx();
        }
        if (this.y < this.r) {
            this.y++;
            this.change_dy();
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
        for (let i = 0; i < bricks.length; ++i) {
            let b = bricks[i];
            if (this.x > b.x && this.x < b.x + b.w) {
                if (this.y < b.y + b.h + this.r &&
                    this.y > b.y ||
                    this.y > b.y &&
                    this.y < b.y + b.h
                ) {
                    bricks.splice(i, 1);
                    this.dy = -this.dy;
                }
            }
            if (this.y > b.y &&
                this.y < b.y + b.h) {
                if (this.x > b.x - this.r &&
                    this.x < b.x + 1 ||
                    this.x < b.x + b.h + this.r &&
                    this.x > b.x + b.h - 1
                ) {
                    bricks.splice(i, 1);
                    this.dx = -this.dx;
                }
            }
        }
    }
}