const key = '2f784c78';
const url = `http://omdbapi.com/?apikey=${key}&`;
const buscador = document.getElementById('buscar');
const peliculasContenedor = document.getElementById("peliculas");
const modal = document.getElementById("modalinfo");

const PosterResplado = 'https://image.freepik.com/vector-gratis/error-404-pagina-no-encontrada-texto-pagina-no-encontrada-vaya-parece-que-algo-salio-mal_143407-2.jpg';

async function buscarContenido() {
    peliculasContenedor.innerHTML = '';
    let peticion = await fetch(`${url}s=${buscador.value}`);
    let respuesta = await peticion.json();
    let txt = '';
    for (let res of respuesta.Search){

        if(res.Poster === 'N/A') res.Poster = PosterResplado;

        let html = `
    <article  class="card col-sm-8 col-md-3 col-xlg-2 mx-auto my-3 p-2" style="width: 18rem;">
        <img src="${res.Poster}" class="card-img-top" alt="${res.Title}">
        <div class="card-body">
            <h3 class="card-title">${res.Title}</h3>
            <button type="button" data-id="${res.imdbID}" class="btn btn-primary btn-peli" data-bs-toggle="modal" data-bs-target="#modalinfo">Ver Más</button>
            
        </div>
    </article>
    `;
    txt+= html;
    }
    peliculasContenedor.innerHTML += txt;
}

async function masInfo(id){
    let peticion, respuesta;
    try{
        peticion = await fetch(`${url}i=${id}`);
        respuesta = await peticion.json();
    }catch(err){
        return console.log(err)
    }

    modal.querySelector('.modal-title').textContent = respuesta.Title;
    modal.querySelector('.modal-title').textContent = respuesta.Title;

    modal.querySelector('.modal-body').innerHTML = `
    <div class="container">
        <img class="mx-auto" src="${respuesta.Poster === 'N/A'? PosterResplado: respuesta.Poster}" alt="${respuesta.TItle}" class="modal-poster">
        <p class="text-center my-2">${respuesta.Plot === 'N/A'? 'La descripcion de este contenido no esta disponible': respuesta.Plot}</p>

        <table class="table table-striped">
            <tr class="p-datos--fila">
                <td>Año</td>
                <td>${respuesta.Year}</td>
            </tr>
            <tr class="p-datos--fila">
                <td>Tipo</td>
                <td>${respuesta.Type}</td>
            </tr>
            <tr class="p-datos--fila">
                <td>País</td>
                <td>${respuesta.Country === 'N/A'? 'No esta disponible el reparto de este contenido': respuesta.Country}</td>
            </tr>
            <tr class="p-datos--fila">
                <td>Duración</td>
                <td>${respuesta.Runtime === 'N/A'? 'No Disponible': respuesta.Runtime}</td>
            </tr>
            <tr class="p-datos--fila">
                <td>Género</td>
                <td>${respuesta.Genre === 'N/A'? 'No especificado': respuesta.Genre}</td>
            </tr>
            <tr class="p-datos--fila">
                <td>Escritor</td>
                <td>${respuesta.Writer === 'N/A'? 'Desconocido': respuesta.Writer}</td>
            </tr>
            <tr class="p-datos--fila">
                <td>Director</td>
                <td>${respuesta.Director === 'N/A'? 'Desconocido': respuesta.Director}</td>
            </tr>
            
        </table>

    </div>
`
}


document.addEventListener('search', buscarContenido)

peliculasContenedor.addEventListener('click', e=>{
    if(e.target.matches('.btn-peli')) {
        if(!e.target.dataset.id) return false;
        if(e.target.dataset.id == "") return false

        return masInfo(e.target.dataset.id);
    }
})

