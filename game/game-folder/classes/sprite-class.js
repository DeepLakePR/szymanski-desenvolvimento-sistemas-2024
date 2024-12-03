// Sprite
class Sprite {

    // Constructor
    constructor({
        position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
    }) {

        // Canvas
        this.canvasElement = document.querySelector('canvas');
        this.canvas = this.canvasElement.getContext('2d');

        // Sprite Configs
        this.position = position;

        // Sprite Appearence
        this.width = 50;
        this.height = 150;

        this.image = new Image();
        this.image.src = imageSrc;

        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 16;

        this.offset = offset;

    }

    // Draw Sprite on Screen
    draw() {
        this.canvas.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,

            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )

    }

    // Animate Frame
    animateFrames() {
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                console.log('here');
                this.framesCurrent++;

            } else {
                console.log('0');
                this.framesCurrent = 0;

            }

        }
    }

    // Update Sprite Position
    update() {
        this.draw();
        this.animateFrames();

    }

}
