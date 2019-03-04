export class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 16;
        this.dx = 2.3;
        this.dy = -2.3;
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
        let rand = Math.random() * 2;

        this.dx = -this.dx;
        if (this.dx < 0) {
            this.dx = -3 - rand;
        } else {
            this.dx = 3 + rand;
        }
    }

    change_dy() {
        let rand = Math.random() * 2;

        this.dy = -this.dy;
        if (this.dy < 0) {
            this.dy = -3 - rand;
        } else {
            this.dy = 3 + rand;
        }
    }

    edge_collide(canvas) {
        if (this.x < this.r) {
            this.x = this.r + 1;
            this.change_dx();
        } else if (this.x > canvas.width - this.r) {
            this.x = canvas.width - this.r - 1;
            this.change_dx();
        }
        if (this.y < this.r) {
            this.y = this.r + 1;
            this.change_dy();
        } else if (this.y > canvas.height - this.r) {
            alert("G A M E   O V E R");
            location.reload(true);
        }
    }

    hit_paddle(paddle) {
        if (this.y > paddle.y - this.r &&
            this.x > paddle.x &&
            this.x < paddle.x + paddle.w
        ) {
            this.y--;
            this.change_dy();
        }
    }

    break_bricks(bricks) {
        for (let i = 0; i < bricks.length; ++i) {
            let b = bricks[i];

            if (this.x > b.x && this.x < b.x + b.w) {
                if (this.y < b.y + b.h + this.r && this.y > b.y + b.h / 2 ||
                    this.y > b.y - this.r && this.y < b.y + b.h / 2
                ) {
                    this.change_dy();
                    bricks.splice(i, 1);
                }
            }
            if (this.y > b.y && this.y < b.y + b.h) {
                if (this.x < b.x + b.w + this.r && this.x > b.x + b.w / 2 ||
                    this.x > b.x - this.r && this.x < b.x + b.w / 2
                ) {
                    this.change_dx();
                    bricks.splice(i, 1);
                }
            }
        }
    }
}