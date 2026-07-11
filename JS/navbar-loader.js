fetch('/HTML/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar-container').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el footer:', err));