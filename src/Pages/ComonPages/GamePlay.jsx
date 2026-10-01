
import React from 'react';
import { useRef, useEffect } from 'react';


const GamePlay = () => {

    const canvasRef = useRef(null);

    useEffect(() => {

        const canvas = canvasRef.current;

        if (!canvas) return; // safety check

        const ctx = canvas.getContext("2d");

        let bullets = [];
        let enemies = [];
        let score = 0;

        canvas.width = 400;
        canvas.height = 500;
        let isTouching = false;


        // Responsive Degin

        const GAME_WIDTH = 300;
        const GAME_HEIGHT = 300;

        let player = {
            x: GAME_WIDTH / 2 - 20,
            y: GAME_HEIGHT - 40,
            width: 40,
            height: 20,
            speed: 5
        };

        function resizeCanvas() {
            const scale = Math.min(
                window.innerWidth / GAME_WIDTH,
                window.innerHeight / GAME_HEIGHT
            );

            canvas.width = GAME_WIDTH;
            canvas.height = GAME_HEIGHT;

            canvas.style.width = GAME_WIDTH * scale + "px";
            canvas.style.height = GAME_HEIGHT * scale + "px";
        }



        //  Touch control
        const handleTouch = (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;

            const touchX = (e.touches[0].clientX - rect.left) * scaleX;

            player.x = touchX - player.width / 2;


            // keep inside bounds
            player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
        };
        const handleTouchStart = (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;

            const touchX = (e.touches[0].clientX - rect.left) * scaleX;

            // move player to tap position
            player.x = touchX - player.width / 2;

            // fire bullet 🔥
            bullets.push({
                x: player.x + player.width / 2 - 2,
                y: player.y
            });
        };

        // canvas.addEventListener("touchmove", handleTouch);
        canvas.addEventListener("touchmove", handleTouch, { passive: false });
        canvas.addEventListener("touchstart", handleTouchStart);

        // Enemy Function 
        function spawnEnemies() {
            if (Math.random() < 0.02) { // controls spawn rate
                enemies.push({
                    x: Math.random() * (canvas.width - 30),
                    y: 0,
                    width: 30,
                    height: 30,
                    speed: 2
                });
            }
        }

        function drawEnemies() {
            ctx.fillStyle = "Blue";

            enemies.forEach((enemy, index) => {
                enemy.y += enemy.speed;

                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

                // remove if out of screen
                if (enemy.y > canvas.height) {
                    enemies.splice(index, 1);
                }
            });
        }
        // Bullet vs Enemy collision
        function detectCollision() {
            bullets.forEach((bullet, bIndex) => {
                enemies.forEach((enemy, eIndex) => {
                    if (
                        bullet.x < enemy.x + enemy.width &&
                        bullet.x + 5 > enemy.x &&
                        bullet.y < enemy.y + enemy.height &&
                        bullet.y + 10 > enemy.y
                    ) {
                        // remove both
                        bullets.splice(bIndex, 1);
                        enemies.splice(eIndex, 1);

                        score += 1;
                    }
                });
            });
        }



        function drawBullets() {
            ctx.fillStyle = "red";
            bullets.forEach((b, i) => {
                b.y -= 5;
                ctx.fillRect(b.x, b.y, 5, 10);

                // remove off-screen bullets
                if (b.y < 0) bullets.splice(i, 1);
            });
        }

        function drawPlayer() {
            ctx.fillStyle = "green";
            ctx.fillRect(player.x, player.y, player.width, player.height);
        }

        //  Move handler to variable
        const handleKey = (e) => {
            if (e.key === "ArrowLeft" && player.x > 0) {
                player.x -= player.speed;
            }

            if (e.key === "ArrowRight" && player.x < canvas.width - player.width) {
                player.x += player.speed;
            }

            if (e.code === "ArrowUp") {
                bullets.push({ x: player.x + 18, y: player.y });
            }
        };

        document.addEventListener("keydown", handleKey);



        // Score Define 
        function drawScore() {
            ctx.fillStyle = "Orange";
            ctx.font = "20px Arial";
            ctx.fillText("Score: " + score, 10, 30);
        }




        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        function gameLoop() {
            ctx.fillStyle = "green";
            ctx.clearRect(0, 0, canvas.width, canvas.height);



            if (isTouching) {
                bullets.push({
                    x: player.x + player.width / 2 - 2,
                    y: player.y
                });
            }
            drawScore();
            spawnEnemies();
            drawBullets();
            drawPlayer();
            drawEnemies();
            detectCollision();

            requestAnimationFrame(gameLoop);

        }

        gameLoop();



        //  CLEANUP (VERY IMPORTANT)
        return () => {
            document.removeEventListener("keydown", handleKey);
            canvas.removeEventListener("touchmove", handleTouch);
        };

    }, []);

    return (
        <div>
            <div className=' flex flex-col items-center justify-center m-auto bg-gray-600 '>
                <canvas className='bg-black p-4 m-4 text-orange-800' ref={canvasRef} ></canvas>
            </div>
        </div>
    );
}

export default GamePlay;
