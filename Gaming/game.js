// Example code for Enhanced Space Shooter Coin Collector game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Spaceship
const spaceship = {
    x: canvas.width / 2,
    y: canvas.height - 70,
    width: 50,
    height: 50,
    color: '#3498db'
};

// Bullets
let bullets = [];
const bulletRadius = 5;
const bulletSpeed = 10;

// Coins
let coins = [];
const coinRadius = 15;
const coinSpeed = 2;

// Move transaction details
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

    // Draw spaceship
    createSpaceship();

    // Draw bullets
    bullets.forEach((bullet, bulletIndex) => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x - bullet.radius / 2, bullet.y - bullet.radius / 2, bulletRadius, bullet.radius);
        
        // Move bullets upwards
        bullet.y -= bullet.speed;

        // Remove bullets if they go off screen
        if (bullet.y < 0) {
            bullets.splice(bulletIndex, 1);
        }

        // Check collision with coins
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

    // Draw coins
    coins.forEach((coin, index) => {
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = coin.color;
        ctx.fill();

        // Move coins downwards
        coin.y += coin.speed;

        // Remove coins if they go off screen
        if (coin.y > canvas.height + coin.radius) {
            coins.splice(index, 1);
        }
    });

    // Create new coins
    if (Math.random() < 0.02) { // Adjust spawn rate as needed
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

    // Remove popup after delay
    setTimeout(() => {
        popup.remove();
    }, 3000); // Adjust timing as needed
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
