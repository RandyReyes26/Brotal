// ===== CONTADORES ANIMADOS (ESTADÍSTICAS) =====
 
function animarContador(el){
 
    const target = parseInt(el.dataset.target, 10);
    const duracion = 1600; // milisegundos
    const inicio = performance.now();
 
    function paso(ahora){
 
        const progreso = Math.min((ahora - inicio) / duracion, 1);
 
        // easing suave (desacelera al final)
        const progresoSuave = 1 - Math.pow(1 - progreso, 3);
 
        const valorActual = Math.floor(progresoSuave * target);
 
        el.textContent = valorActual.toLocaleString('es-CR');
 
        if(progreso < 1){
            requestAnimationFrame(paso);
        } else {
            el.textContent = target.toLocaleString('es-CR');
        }
    }
 
    requestAnimationFrame(paso);
}
 
function initContadores(){
 
    const contadores = document.querySelectorAll('.contador');
 
    if(contadores.length === 0) return;
 
    const observer = new IntersectionObserver((entries) => {
 
        entries.forEach(entry => {
 
            if(entry.isIntersecting){
                animarContador(entry.target);
                observer.unobserve(entry.target); // solo se anima una vez
            }
 
        });
 
    }, { threshold: 0.5 });
 
    contadores.forEach(contador => observer.observe(contador));
}
 
document.addEventListener('DOMContentLoaded', initContadores);