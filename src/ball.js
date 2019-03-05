export class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = 2.3;
        this.dy = -2.3;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "#FF00FF";
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    changeDx() {
        let rand = Math.random() * 2;

        this.dx = -this.dx;
        if (this.dx < 0) {
            this.dx = -3 - rand;
        } else {
            this.dx = 3 + rand;
        }
    }

    changeDy() {
        let rand = Math.random() * 2;

        this.dy = -this.dy;
        if (this.dy < 0) {
            this.dy = -3 - rand;
        } else {
            this.dy = 3 + rand;
        }
    }

    edgeCollide(canvas) {
        if (this.x < this.r) {
            this.x = this.r + 1;
            this.changeDx();
        } else if (this.x > canvas.width - this.r) {
            this.x = canvas.width - this.r - 1;
            this.changeDx();
        }
        if (this.y < this.r) {
            this.y = this.r + 1;
            this.changeDy();
        } else if (this.y > canvas.height - this.r) {
            alert("G A M E   O V E R");
            location.reload(true);
        }
    }

    hitPaddle(paddle) {
        if (this.y > paddle.y - this.r) {
            if (this.x > paddle.x && this.x < paddle.x + paddle.w) {
                this.y--;
                if (this.x < paddle.x + paddle.w / 2) {
                    this.dx = -Math.abs(this.dx);
                    this.changeDy();
                } else {
                    this.dx = Math.abs(this.dx);
                    this.changeDy();
                }
            }
        }
    }

    breakBricks(bricks) {
        for (let i = 0; i < bricks.length; ++i) {
            let b = bricks[i];

            if (this.x > b.x && this.x < b.x + b.w) {
                if (this.y < b.y + b.h + this.r && this.y > b.y + b.h / 2 ||
                    this.y > b.y - this.r && this.y < b.y + b.h / 2
                ) {
                    this.changeDy();
                    bricks.splice(i, 1);
                    return;
                }
            }
            if (this.y > b.y && this.y < b.y + b.h) {
                if (this.x < b.x + b.w + this.r && this.x > b.x + b.w / 2 ||
                    this.x > b.x - this.r && this.x < b.x + b.w / 2
                ) {
                    this.changeDx();
                    bricks.splice(i, 1);
                    return;
                }
            }
        }
    }
}