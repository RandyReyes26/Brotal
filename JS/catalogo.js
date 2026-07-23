// ===== CATÁLOGO DINÁMICO (lee productos desde JSON) =====

let TODOS_LOS_PRODUCTOS = [];

function formatearPrecio(precio){
    return '₡' + precio.toLocaleString('es-CR');
}

function crearCardHTML(producto){

    return `
        <div class="producto-card">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="info">
                <h3>${producto.nombre}</h3>
                <p class="descripcion">${producto.descripcion}</p>
                <p class="precio">${formatearPrecio(producto.precio)}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
            </div>
        </div>
    `;
}

function renderizarProductos(lista){

    const grid = document.querySelector('.catalogo-grid');
    if(!grid) return;

    if(lista.length === 0){
        grid.innerHTML = `<p class="catalogo-vacio">No encontramos plantas en esta categoría todavía 🌱</p>`;
        return;
    }

    grid.innerHTML = lista.map(crearCardHTML).join('');
}

function filtrarPorCategoria(categoria){

    if(categoria === 'todas'){
        renderizarProductos(TODOS_LOS_PRODUCTOS);
        return;
    }

    const filtrados = TODOS_LOS_PRODUCTOS.filter(p => p.categoria === categoria);
    renderizarProductos(filtrados);
}

function agregarAlCarrito(id){
    const producto = TODOS_LOS_PRODUCTOS.find(p => p.id === id);
    console.log('Agregado al carrito:', producto.nombre);
    alert(`${producto.nombre} se agregó al carrito 🌿`);
}

function initFiltros(){

    const botones = document.querySelectorAll('.filtro-btn');

    botones.forEach(btn => {

        btn.addEventListener('click', () => {

            botones.forEach(b => b.classList.remove('activo'));
            btn.classList.add('activo');

            filtrarPorCategoria(btn.dataset.categoria);

        });

    });
}

function initCatalogo(){

    fetch('/DATA/productos.json')
        .then(res => res.json())
        .then(data => {

            TODOS_LOS_PRODUCTOS = data;
            renderizarProductos(TODOS_LOS_PRODUCTOS);
            initFiltros();

        })
        .catch(err => {
            console.error('Error cargando el catálogo:', err);
            document.querySelector('.catalogo-grid').innerHTML =
                `<p class="catalogo-vacio">No pudimos cargar las plantas. Intenta de nuevo más tarde.</p>`;
        });
}

document.addEventListener('DOMContentLoaded', initCatalogo);