class Snake {
    // The body of the snake, represented as an array of coordinates on the canvas.
    // The snake starts with one segment at the center of the canvas.
    body: { x: number, y: number }[] = [{ x: 200, y: 200 }];

    // The change in x-coordinate for each update. Starts moving to the right.
    dx = 20;

    // The change in y-coordinate for each update. Starts with no vertical movement.
    dy = 0;

    // The update function moves the snake by adding a new head and removing the tail.
    // This gives the illusion of movement.
    update() {
        // Create a new head at the current head position plus the direction of movement.
        const head = { x: this.body[0].x + this.dx, y: this.body[0].y + this.dy };

        // Wrap the head position around to the opposite side of the canvas if it goes off the edge.
        if (head.x < 0) {
            head.x = 380;
        } else if (head.x > 380) {
            head.x = 0;
        } else if (head.y < 0) {
            head.y = 380;
        } else if (head.y > 380) {
            head.y = 0;
        }

        // Add the new head to the front of the body array.
        this.body.unshift(head);

        // Remove the last segment from the body array.
        this.body.pop();
    }

    // The changeDirection function updates the direction of movement based on user input.
    // It prevents the snake from reversing direction directly.
    changeDirection(newDirection: string) {
        switch (newDirection) {
            case 'ArrowUp':
                // Prevent the snake from moving up if it's currently moving down.
                if (this.dy !== 0) break;
                this.dx = 0;
                this.dy = -20;
                break;
            case 'ArrowDown':
                // Prevent the snake from moving down if it's currently moving up.
                if (this.dy !== 0) break;
                this.dx = 0;
                this.dy = 20;
                break;
            case 'ArrowLeft':
                // Prevent the snake from moving left if it's currently moving right.
                if (this.dx !== 0) break;
                this.dx = -20;
                this.dy = 0;
                break;
            case 'ArrowRight':
                // Prevent the snake from moving right if it's currently moving left.
                if (this.dx !== 0) break;
                this.dx = 20;
                this.dy = 0;
                break;
        }
    }
}