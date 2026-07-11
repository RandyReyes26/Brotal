// ===== HERO CARRUSEL =====
 
function initHeroCarousel(){
 
    const track = document.querySelector('.hero-track');
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.hero-dots');
    const prevBtn = document.querySelector('.hero-btn.prev');
    const nextBtn = document.querySelector('.hero-btn.next');
 
    if(!track || slides.length === 0) return;
 
    let current = 0;
 
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('hero-dot');
        if(i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
 
    const dots = document.querySelectorAll('.hero-dot');
 
    function goToSlide(index){
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
 
        dots.forEach(dot => dot.classList.remove('active'));
        dots[current].classList.add('active');
    }
 
    prevBtn.addEventListener('click', () => goToSlide(current - 1));
    nextBtn.addEventListener('click', () => goToSlide(current + 1));
 
    let autoplay = setInterval(() => goToSlide(current + 1), 7000);
 
    [prevBtn, nextBtn, dotsContainer].forEach(el => {
        el.addEventListener('click', () => {
            clearInterval(autoplay);
            autoplay = setInterval(() => goToSlide(current + 1), 7000);
        });
    });
}
 
document.addEventListener('DOMContentLoaded', initHeroCarousel);
 