fetch('/HTML/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer-container').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el footer:', err));