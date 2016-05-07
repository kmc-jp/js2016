const Settings = {
    SCREEN_WIDTH: 640,
    SCREEN_HEIGHT: 480,
    PLAYER_WIDTH: 128,
    PLAYER_HEIGHT: 128,
    PLAYER_SLOW_SPEED: 3,
    PLAYER_FAST_SPEED: 6,
};
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isDie = false;
        this.initElement_(screen);
    }
    initElement_() {
        let player = document.createElement("img");
        player.alt = "player";
        player.src = "image/player.png";
        player.classList.add("player");
        player.style.width = `${Settings.PLAYER_WIDTH}px`;
        player.style.height = `${Settings.PLAYER_HEIGHT}px`;
        this.elem = player;
        this.update();
    }
    move() {
        let dx = 0;
        let dy = 0;
        if (key[37]) --dx;
        if (key[38]) --dy;
        if (key[39]) ++dx;
        if (key[40]) ++dy;
        let speed = key[16] ? Settings.PLAYER_SLOW_SPEED : Settings.PLAYER_FAST_SPEED;
        dx *= speed, dy *= speed;
        this.x += dx;
        this.y += dy;
        if ( this.x < 0 ) this.x = 0;
        if ( this.x > Settings.SCREEN_WIDTH-1 ) this.x = Settings.SCREEN_WIDTH-1;
        if ( this.y < 0 ) this.y = 0;
        if ( this.y > Settings.SCREEN_HEIGHT-1 ) this.y = Settings.SCREEN_HEIGHT-1;
    }
    update() {
        this.elem.style.left = `${this.x-Settings.PLAYER_WIDTH/2}px`;
        this.elem.style.top = `${this.y-Settings.PLAYER_HEIGHT/2}px`;
    }
    die() {
        if ( !this.isDie ) {
            this.isDie = true;
            this.elem.parentElement.removeChild(this.elem);
        }
    }
}
class Bullet {
    constructor(x, y, r, v, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.v = v;
        this.elem = document.createElement("div");
        this.elem.classList.add("bullet");
        this.color = color;
    }
    move() {
        this.x -= this.v;
    }
    update() {
        this.elem.style.left = `${Math.floor(this.x)-this.r}px`;
        this.elem.style.top = `${this.y-this.r}px`;
        this.elem.style.backgroundColor = this.color;
        this.elem.style.width = `${this.r*2}px`;
        this.elem.style.height = `${this.r*2}px`;
        this.elem.style.borderRadius = `${this.r}px`;
    }
}
class Score {
    constructor(screen) {
        this.val = 0;
        this.elem = document.createElement("div");
        this.elem.classList.add("score");
        screen.appendChild(this.elem);
    }
    valueOf() {
        return this.val;
    }
    add(val) {
        this.val += val;
    }
    update() {
        this.elem.innerText = this.val;
    }
}
class BulletManager {
    constructor() {
        this.bullets = [];
    }
    check(screen, score) {
        // new bullet
        const th = 3 + score/400;
        if ( Math.random()*100 < th ) {
            let y = Math.floor( Math.random() * Settings.SCREEN_HEIGHT );
            let r = Math.floor( Math.random() * 61 ) + 10;
            let v = Math.random() * 10 + 1;
            let color = `rgb(${Math.floor(Math.random()*240)}, ${Math.floor(Math.random()*240)}, ${Math.floor(Math.random()*240)})`;
            let bullet = new Bullet(Settings.SCREEN_WIDTH+r, y, r, v, color);
            this.bullets.push(bullet);
            screen.appendChild(bullet.elem);
        }
        // out
        let nextBullets = [];
        this.bullets.forEach((bullet) => {
            if (bullet.x < -bullet.r) {
                screen.removeChild(bullet.elem);
            }
            else {
                nextBullets.push(bullet);
            }
        });
        this.bullets = nextBullets;
    }
    move() {
        this.bullets.forEach((bullet) => {
            bullet.move();
        });
    }
    hitCheck(player) {
        this.bullets.forEach((bullet) => {
            let dx = player.x - bullet.x;
            let dy = player.y - bullet.y;
            if ( dx * dx + dy * dy <= bullet.r * bullet.r ) {
                player.die();
            }
        });
    }
    update() {
        this.bullets.forEach((bullet) => {
            bullet.update();
        });
    }
}
class Game {
    constructor(screen) {
        this.screen = screen;
        this.screen.style.width = `${Settings.SCREEN_WIDTH}px`;
        this.screen.style.height = `${Settings.SCREEN_HEIGHT}px`;
        this.player = new Player(Settings.PLAYER_WIDTH/2, Settings.SCREEN_HEIGHT/2, this.screen);
        this.screen.appendChild(this.player.elem);
        this.bullets = new BulletManager();
        this.score = new Score(this.screen);
    }
    move() {
        this.bullets.move();
        if (!this.player.isDie) {
            this.player.move();
            this.score.add(1);
        }
    }
    check() {
        this.bullets.check(this.screen, this.score);
        if (!this.player.isDie) {
            this.bullets.hitCheck(this.player);
        }
    }
    update() {
        if (!this.player.isDie) {
            this.player.update();
        }
        this.bullets.update();
        this.score.update();
    }
}

const game = new Game(document.getElementById("screen"));
const key = [];
const mainloop = () => {
    setTimeout(mainloop, Math.floor(1000/60));
    game.move();
    game.update();
    game.check();
};

document.addEventListener("keydown", (e) => {
    key[e.keyCode] = true;
});
document.addEventListener("keyup", (e) => {
    key[e.keyCode] = false;
});

mainloop();
