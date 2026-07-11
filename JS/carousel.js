// ===== CARRUSEL - PLANTAS DESTACADAS =====

function initCarousel(){

    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if(!track || slides.length === 0) return;

    let current = 0;

    // Crear los puntos dinámicamente según la cantidad de slides
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if(i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function goToSlide(index){
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[current].classList.add('active');
    }

    prevBtn.addEventListener('click', () => goToSlide(current - 1));
    nextBtn.addEventListener('click', () => goToSlide(current + 1));

    // Auto-play cada 6 segundos
    let autoplay = setInterval(() => goToSlide(current + 1), 6000);

    // Pausa y reinicia el autoplay cuando el usuario interactúa
    [prevBtn, nextBtn, dotsContainer].forEach(el => {
        el.addEventListener('click', () => {
            clearInterval(autoplay);
            autoplay = setInterval(() => goToSlide(current + 1), 6000);
        });
    });
}

document.addEventListener('DOMContentLoaded', initCarousel);