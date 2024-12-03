// Fighter
class Fighter extends Sprite {

    // Constructor
    constructor({
        position,
        velocity,
        fighterColor = 'red',
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined }
    }) {

        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        });

        // Canvas
        this.canvasElement = document.querySelector('canvas');
        this.canvas = this.canvasElement.getContext('2d');

        // Fighter Configs
        this.velocity = velocity;

        // Fighter Appearence
        this.width = 50;
        this.height = 150;
        this.fighterColor = fighterColor

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 16;

        this.sprites = sprites;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;

        }

        // Fighter Controls
        this.lastKey;

        this.health = 100;

        this.attackDamage = 10;
        this.isAttacking = false;

        this.dead = false;

        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }


    }

    // Update Fighter Position
    update(gravity) {
        this.draw();

        if(!this.dead)
            this.animateFrames();

        // Attack Box
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // Draw Attack Box
        /*
        this.canvas.fillRect(
            this.attackBox.position.x, 
            this.attackBox.position.y, 
            this.attackBox.width, 
            this.attackBox.height
        );
        */

        // Position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Gravity
        if (this.position.y + this.height + this.velocity.y >= this.canvasElement.height - 93) {
            this.velocity.y = 0;
            this.position.y = 335;

        } else this.velocity.y += gravity;

    }

    // Attack = Fighter Is Attacking
    attack() {
        this.switchSprite('attack');
        this.isAttacking = true;

    }

    // Hit
    hit(attackDamage) {

        this.health -= attackDamage;

        if(this.health <= 0){
            this.switchSprite('death');

        }else{
            this.switchSprite('hit');

        }

    }

    // Change Sprite
    switchSprite(sprite) {

        if(this.image === this.sprites.death.image){
            
            if(this.framesCurrent === this.sprites.death.framesMax - 1)
                this.dead = true;

            return
        }

        // Overriding All Other Animations with Attack Animation
        if (
            this.image === this.sprites.attack.image &&
            this.framesCurrent < this.sprites.attack.framesMax - 1
        )
            return

        // Override When Fighter Gets Hit
        if (
            this.image === this.sprites.hit.image &&
            this.framesCurrent < this.sprites.hit.framesMax - 1
        ) 
            return

        switch (sprite) {
            case 'attack':
                if (this.image !== this.sprites.attack.image) {
                    this.image = this.sprites.attack.image;
                    this.framesMax = this.sprites.attack.framesMax;
                    this.framesCurrent = 0;
                }
                break;

            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 0;
                }
                break;

            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.framesCurrent = 0;
                }
                break;

            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.framesCurrent = 0;
                }
                break;

            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.framesCurrent = 0;
                }
                break;

            case 'hit':
                if (this.image !== this.sprites.hit.image) {
                    this.image = this.sprites.hit.image;
                    this.framesMax = this.sprites.hit.framesMax;
                    this.framesCurrent = 0;
                }
                break;

            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image;
                    this.framesMax = this.sprites.death.framesMax;
                    this.framesCurrent = 0;
                }
                break;

        }

    }

}
