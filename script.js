document.addEventListener("DOMContentLoaded", () => {
    const puzzleContainer = document.getElementById("puzzle-container");
    const winMessage = document.getElementById("win-message");
    const confettiContainer = document.getElementById("confetti-container");

    const imageSrc = "photo.jpg"; // Використовуємо ваше завантажене зображення
    const pieces = 16;
    const rows = 4;
    const cols = 4;
    let shuffledIndices = [...Array(pieces).keys()];

    shuffledIndices = shuffledIndices.sort(() => Math.random() - 0.5);

    // Перевіряємо, чи завантажилось зображення
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
        console.log('Зображення завантажено успішно');
        for (let i = 0; i < pieces; i++) {
            const piece = document.createElement("div");
            piece.classList.add("puzzle-piece");
            piece.style.backgroundImage = `url(${imageSrc})`;

            const row = Math.floor(shuffledIndices[i] / cols);
            const col = shuffledIndices[i] % cols;

            piece.style.backgroundPosition = `-${col * 120}px -${row * 120}px`;
            piece.dataset.index = shuffledIndices[i];

            piece.addEventListener("click", () => {
                const emptyPiece = document.querySelector(".puzzle-piece.empty");
                if (emptyPiece) {
                    swapPieces(piece, emptyPiece);
                } else {
                    piece.classList.add("empty");
                }
                checkWin();
            });

            puzzleContainer.appendChild(piece);
        }
    };

    img.onerror = () => {
        console.error('Помилка завантаження зображення');
    };

    function swapPieces(piece1, piece2) {
        const tempIndex = piece1.dataset.index;
        piece1.dataset.index = piece2.dataset.index;
        piece2.dataset.index = tempIndex;

        const tempBackgroundPosition = piece1.style.backgroundPosition;
        piece1.style.backgroundPosition = piece2.style.backgroundPosition;
        piece2.style.backgroundPosition = tempBackgroundPosition;

        piece1.classList.remove("empty");
        piece2.classList.add("empty");
    }

    function checkWin() {
        const pieces = document.querySelectorAll(".puzzle-piece");
        for (let i = 0; i < pieces.length; i++) {
            if (parseInt(pieces[i].dataset.index) !== i) {
                return;
            }
        }
        showWinMessage();
    }

    function showWinMessage() {
        winMessage.textContent = "Вітаю, моє кохане кошеня! Ти склала пазл! ето венть ми же такіє мілашкінси целоваємся(прості што нас так жжало но надо був квадрат)";
        winMessage.style.display = "block";
        createConfetti();
    }

    function createConfetti() {
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDuration = `${Math.random() * 2 + 1}s`;
            confettiContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 3000);
        }
    }
});
