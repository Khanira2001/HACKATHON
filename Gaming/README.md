
# Space Shooter Coin Collector Documentation

## Introduction

The **Space Shooter Coin Collector** is an interactive game where players control a spaceship to shoot down coins floating in space. Each coin shot triggers a Move transaction, and at the end of the game, a popup displays the total coins collected along with transaction details.

## Technologies Used

- **HTML**: Provides the structure of the game interface.
- **CSS**: Styles the game elements for visual appeal.
- **JavaScript**: Implements game mechanics and interactions.
- **Canvas**: Renders game elements smoothly for animation.
- **Move**: Integrates blockchain transaction details in the form of popups.

## Gameplay Overview

In this game, the player navigates a spaceship using arrow keys and shoots bullets at coins by pressing the spacebar. Coins move downward, and when hit by a bullet, a Move transaction is triggered. At the end of the game, the total coins collected and transaction details are displayed.

## Game Elements

### Spaceship
The player controls a spaceship represented by a circle. The spaceship moves horizontally across the screen.

### Coins
Coins are circular objects that float downward on the screen. The player collects coins by shooting them with bullets.

### Bullets
Bullets are small rectangles fired vertically upwards from the spaceship when the player presses the spacebar.

### Move Integration
Move is used to simulate blockchain transactions triggered when a bullet hits a coin. The transaction details are displayed in a popup, including the total coins collected and transaction amount in Aptos.

## Implementation Details

### HTML Structure (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Shooter Coin Collector</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <canvas id="gameCanvas"></canvas>
    <script src="game.js"></script>
</body>
</html>
```

### CSS Styling (`styles.css`)

```css
body {
    margin: 0;
    overflow: hidden;
    background-color: #000;
}

canvas {
    display: block;
    margin: auto;
}

.spaceship {
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #3498db;
    border-radius: 50%;
}

.bullet {
    width: 5px;
    height: 15px;
    position: absolute;
    background-color: #f39c12;
    border-radius: 5px;
}

.coin {
    width: 30px;
    height: 30px;
    position: absolute;
    background-color: gold;
    border-radius: 50%;
}
```

### JavaScript Game Logic (`game.js`)

```javascript
// Example code for Space Shooter Coin Collector game.js

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
const spaceship = {
    x: canvas.width / 2,
    y: canvas.height - 70,
    width: 50,
    height: 50,
    color: '#3498db'
};

let bullets = [];
const bulletRadius = 5;
const bulletSpeed = 10;

let coins = [];
const coinRadius = 15;
const coinSpeed = 2;

let collectedCoins = 0;
const coinValue = 10; // Value of each coin in Aptos

// Functions
function createSpaceship() {
    ctx.fillStyle = spaceship.color;
    ctx.fillRect(spaceship.x - spaceship.width / 2, spaceship.y - spaceship.height / 2, spaceship.width, spaceship.height);
}

function createBullet() {
    const bullet = {
        x: spaceship.x,
        y: spaceship.y - spaceship.height / 2,
        radius: bulletRadius,
        speed: bulletSpeed,
        color: '#f39c12'
    };
    bullets.push(bullet);
}

function createCoin() {
    const coin = {
        x: Math.random() * canvas.width,
        y: -coinRadius * 2,
        radius: coinRadius,
        speed: coinSpeed,
        color: 'gold'
    };
    coins.push(coin);
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    createSpaceship();

    bullets.forEach((bullet, bulletIndex) => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x - bullet.radius / 2, bullet.y - bullet.radius / 2, bulletRadius, bullet.radius);
        
        bullet.y -= bullet.speed;

        if (bullet.y < 0) {
            bullets.splice(bulletIndex, 1);
        }

        coins.forEach((coin, coinIndex) => {
            const dist = Math.hypot(bullet.x - coin.x, bullet.y - coin.y);

            if (dist - bullet.radius - coin.radius < 1) {
                bullets.splice(bulletIndex, 1);
                coins.splice(coinIndex, 1);
                collectedCoins++;
                displayMovePopup();
            }
        });
    });

    coins.forEach((coin, index) => {
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = coin.color;
        ctx.fill();

        coin.y += coin.speed;

        if (coin.y > canvas.height + coin.radius) {
            coins.splice(index, 1);
        }
    });

    if (Math.random() < 0.02) {
        createCoin();
    }
}

function displayMovePopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    popup.style.color = 'white';
    popup.style.padding = '20px';
    popup.style.position = 'absolute';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.borderRadius = '10px';
    popup.style.textAlign = 'center';
    popup.innerHTML = `
        <h2>Move Transaction Details</h2>
        <p>You collected ${collectedCoins} coins.</p>
        <p>Transaction ID: ${Math.random().toString(36).substr(2, 9)}</p>
        <p>Status: Success</p>
        <p>Amount: ${collectedCoins * coinValue} APT</p>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// Event listeners
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            spaceship.x -= 20;
            break;
        case 'ArrowRight':
            spaceship.x += 20;
            break;
        case ' ':
            createBullet();
            break;
    }
});

// Initialize game animation
animate();

// Spawn initial coins
setInterval(createCoin, 1000);
```

## Conclusion

The Space Shooter Coin Collector game leverages HTML, CSS, and JavaScript to create an engaging user experience where Move is integrated to simulate blockchain transactions. By shooting coins with a spaceship and triggering Move transactions, players learn about blockchain technology in a fun and interactive way. Customize the game further to enhance visuals, gameplay mechanics, and educational content based on your preferences and learning goals.

