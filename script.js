const key = '2f784c78';
const url = `http://omdbapi.com/?apikey=${key}&`;
const buscador = document.getElementById('buscar');
const peliculasContenedor =document.querySelector('.peliculas');

const PosterResplado = 'https://image.freepik.com/vector-gratis/error-404-pagina-no-encontrada-texto-pagina-no-encontrada-vaya-parece-que-algo-salio-mal_143407-2.jpg';

async function buscarContenido() {
    peliculasContenedor.innerHTML = '';
    let peticion = await fetch(`${url}s=${buscador.value}`);
    let respuesta = await peticion.json();
    let txt = '';
    for (let res of respuesta.Search){

        if(res.Poster === 'N/A') res.Poster = PosterResplado;
        let html = `<article class="pelicula" data-id="${res.imdbID}">
        <section class="pelicula--poster-contenedor">
            <img src="${res.Poster}" alt="" class="pelicula--poster-img">
            <p class="pelicula--tipo">${res.Type}</p>
            <p class="pelicula--year">${res.Year}</p>
        </section>
        <p class="pelicula--titulo" title="${res.Title}">${res.Title}</p>
    </article>`;
    txt+= html;
    }
    peliculasContenedor.innerHTML += txt;
}

async function masInfo(e){
    let pelicula = null;
    for(let nodo = 0; nodo < e.path.length; nodo++){
        if(e.path[nodo].matches('.pelicula')){
            pelicula = e.path[nodo];
            break;
        }else continue;
    }
    if(pelicula === null) return alert('no se tiene mas información')
    console.log(pelicula)

    let peticion = await fetch(`${url}i=${pelicula.dataset.id}`);
    let respuesta = await peticion.json();
    console.log(respuesta);

    peliculasContenedor.innerHTML += `<div class="modal-contenedor">
    <button class="modal-btn">×</button>
    <section class="modal">
        <h3 class="modal-titulo" title="${respuesta.Title}">${respuesta.Title}</h3>
        <img src="${respuesta.Poster === 'N/A'? PosterResplado: respuesta.Poster}" alt="${respuesta.TItle}" class="modal-poster">

        <p class="modal-desc">${respuesta.Plot === 'N/A'? 'La descripcion de este contenido no esta disponible': respuesta.Plot}</p>
        <table class="p-datos">
            <tr class="p-datos--fila">
                <td class="dato-titulo">Año</td>
                <td class="dato-info">${respuesta.Year}</td>
            </tr>
            <tr class="p-datos--fila">
                <td class="dato-titulo">Tipo</td>
                <td class="dato-info">${respuesta.Type}</td>
            </tr>
            <tr class="p-datos--fila">
                <td class="dato-titulo">País</td>
                <td class="dato-info">${respuesta.Country === 'N/A'? 'No esta disponible el reparto de este contenido': respuesta.Country}</td>
            </tr>
            <tr class="p-datos--fila">
                <td class="dato-titulo">Duración</td>
                <td class="dato-info">${respuesta.Runtime === 'N/A'? 'No Disponible': respuesta.Runtime}</td>
            </tr>
            <tr class="p-datos--fila">
                <td class="dato-titulo">Género</td>
                <td class="dato-info">${respuesta.Genre === 'N/A'? 'No especificado': respuesta.Genre}</td>
            </tr>
            <tr class="p-datos--fila">
                <td class="dato-titulo">Escritor</td>
                <td class="dato-info">${respuesta.Writer === 'N/A'? 'Desconocido': respuesta.Writer}</td>
            </tr>
            <tr class="p-datos--fila">
                <td class="dato-titulo">Director</td>
                <td class="dato-info">${respuesta.Director === 'N/A'? 'Desconocido': respuesta.Director}</td>
            </tr>
            
        </table>
    </section>
</div>`
}

function quitarModal(e){
    if(e.target.matches('.modal-btn')){
        peliculasContenedor.removeChild(e.target.parentElement)
    }
}

document.body.addEventListener('click', quitarModal);

document.addEventListener('search', buscarContenido)

peliculasContenedor.addEventListener('click', masInfo)

