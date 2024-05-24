// Setup
const canvasElement = document.querySelector('canvas');
const canvas = canvasElement.getContext('2d');

// Config Canvas
canvasElement.width = 1024;
canvasElement.height = 576;

canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);

// Game Config
const gravity = 0.6; // 0.5
const xAxisSpeed = 4.5;
const yAxisSpeed = 15; // 8

// Create Background
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: '../public/assets/game-assets/background.png'
});

const shopSprite = new Sprite({
    position: {
        x: 625,
        y: 160
    },
    imageSrc: '../public/assets/game-assets/shop.png',
    scale: 2.5,
    framesMax: 6
})

// Controls Keys
const controlsKeys = {

    // Player Keys
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },

    //////////////////////
    // Enemy Keys
    arrowLeft: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    },

}

// Create Player 1 & Player 2
const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10,
    },
    imageSrc: '../public/assets/game-assets/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        attack: {
            imageSrc: '../public/assets/game-assets/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        idle: {
            imageSrc: '../public/assets/game-assets/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run: {
            imageSrc: '../public/assets/game-assets/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: '../public/assets/game-assets/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: '../public/assets/game-assets/samuraiMack/Fall.png',
            framesMax: 2,
        },
        hit: {
            imageSrc: '../public/assets/game-assets/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: '../public/assets/game-assets/samuraiMack/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    }
});

const enemy = new Fighter({
    position: {
        x: canvasElement.width - 55,
        y: 100
    },
    velocity: {
        x: 0,
        y: 10,
    },
    imageSrc: '../public/assets/game-assets/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 173
    },
    sprites: {
        attack: {
            imageSrc: '../public/assets/game-assets/kenji/Attack1.png',
            framesMax: 4,
        },
        idle: {
            imageSrc: '../public/assets/game-assets/kenji/Idle.png',
            framesMax: 4,
        },
        run: {
            imageSrc: '../public/assets/game-assets/kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: '../public/assets/game-assets/kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: '../public/assets/game-assets/kenji/Fall.png',
            framesMax: 2,
        },
        hit: {
            imageSrc: '../public/assets/game-assets/kenji/Take Hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: '../public/assets/game-assets/kenji/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -180,
            y: 50
        },
        width: 160,
        height: 50
    }
})

// Game Timer
gameTimer();

// Animation
function animate() {
    window.requestAnimationFrame(animate);

    // Main Background
    canvas.fillStyle = 'black';
    canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);

    // Sprites Update
    background.update();

    shopSprite.update();

    canvas.fillStyle = 'rgba(255, 255, 255, 0.13)';
    canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);

    // Players Update
    player.update(gravity);
    enemy.update(gravity);

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // Player Movement
    if (controlsKeys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -xAxisSpeed;
        player.switchSprite('run');

    } else if (controlsKeys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = xAxisSpeed;
        player.switchSprite('run');

    }else {
        player.switchSprite('idle');
    }

    // Player Movement -> Jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump');

    }else if (player.velocity.y > 0) {
        player.switchSprite('fall');

    }

    // Enemy Movement
    if (controlsKeys.arrowLeft.pressed && enemy.lastKey === 'arrowLeft') {
        enemy.velocity.x = -xAxisSpeed;
        enemy.switchSprite('run');

    } else if (controlsKeys.arrowRight.pressed && enemy.lastKey === 'arrowRight') {
        enemy.velocity.x = xAxisSpeed;
        enemy.switchSprite('run');

    }else {
        enemy.switchSprite('idle');
    }

    // Enemy Movement -> Jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');

    }else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');

    }

    //////////////////////////////////
    // Collision & Hit

    // Player Misses
    if(player.isAttacking && player.framesCurrent === 3){
        player.isAttacking = false;
    }

    // Player Detect For Collision
    if (
        boxCollision({ 
            box1: player, 
            box2: enemy 
        })
        &&
        player.isAttacking
        /*
        && 
        player.framesCurrent === 4
        */
    ) {
        enemy.hit(player.attackDamage);

        player.isAttacking = false;

        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })

    }

    /////////////////////
    // Player Misses
    if(enemy.isAttacking && enemy.framesCurrent === 2){
        enemy.isAttacking = false;
    }

    // Enemy Detect For Collision
    if (
        boxCollision({ 
            box1: enemy, 
            box2: player 
        })
        &&
        enemy.isAttacking 
        /*
        && 
        enemy.framesCurrent === 1
        */
    ) {

        player.hit(enemy.attackDamage);

        enemy.isAttacking = false;

        gsap.to('#playerHealth', {
            width: player.health + '%'
        })

    }

    // End Game Based on Health
    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({ player, enemy, timerId });

    }

}

animate();

// Event Listeners (Keyboard, Touchs & Clicks)
// Keydown
window.addEventListener('keydown', (event) => {

    if(!player.dead){
        
        switch (event.key.toLocaleLowerCase()) {

            // Player Controls
            case 'w':
                player.velocity.y = -yAxisSpeed;
                break;

            case 'a':
                controlsKeys.a.pressed = true;
                player.lastKey = 'a';
                break;

            case 'd':
                controlsKeys.d.pressed = true;
                player.lastKey = 'd';
                break;

            case 's':
                player.attack();
                break;

        }

    }

    if(!enemy.dead){

        switch (event.key.toLocaleLowerCase()) {

            // Enemy Controls
            case 'arrowup':
                enemy.velocity.y = -yAxisSpeed;
                break;

            case 'arrowleft':
                controlsKeys.arrowLeft.pressed = true;
                enemy.lastKey = 'arrowLeft';
                break;

            case 'arrowright':
                controlsKeys.arrowRight.pressed = true;
                enemy.lastKey = 'arrowRight';
                break;

            case 'arrowdown':
                enemy.attack();
                break;

        }

    }

});

// Keyup
window.addEventListener('keyup', (event) => {

    switch (event.key.toLocaleLowerCase()) {

        // Player Controls
        case 'a':
            controlsKeys.a.pressed = false;
            break;

        case 'd':
            controlsKeys.d.pressed = false;
            break;

        //////////////////////
        // Enemy Controls
        case 'arrowleft':
            controlsKeys.arrowLeft.pressed = false;
            break;

        case 'arrowright':
            controlsKeys.arrowRight.pressed = false;
            break;

    }

});
