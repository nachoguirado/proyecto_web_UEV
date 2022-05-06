# Auto detect text files and perform LF normalization
* text=auto
let listaPreguntas = [];
let url ;
let index = 0 ;
let areaPreguntas =  document.getElementById("areaPreguntas");
let textoPregunta = document.getElementById("pregunta");
let opciones = document.getElementById("opciones");
let botonSiguiente = document.createElement("button");


function Ajax(url, callback) {
    let peticion = new XMLHttpRequest();
    peticion.addEventListener('readystatechange', function() {
        if(peticion.readyState === 4) {    // Se ha completado la petición
            if(peticion.status === 200) {    // El servidor ha contestado Ok
                callback(JSON.parse(this.responseText));
            } else {
                alert('Error '+peticion.status+': '
                    +peticion.statusText+'. No se llamará a '+callback);
            }
        }
    })
    peticion.open('GET', "json/"+url); //direccion de cada JSON
    peticion.send();
}
function readJson(file) {
    for (let i in file){
        let pregunta = {
            id : file[i].id,
            pregunta : file[i].pregunta,
            opciones : file[i].opciones,
            respuesta : null
        }
        listaPreguntas.push(pregunta);
    }
    index  = 0;
    renderizarPreguntas();

}
function renderizarPreguntas(){
    textoPregunta.innerText = listaPreguntas[index].pregunta;
    opciones.style.display  = "";
    let html = "";
    for(let i = 0; i < listaPreguntas[index].opciones.length; i++){
        html = html +"<label><input type='checkbox' class='options' value='"+ i +"'>"+ listaPreguntas[index].opciones[i] +"</label></br>";
        opciones.innerHTML = html;
        for(let option of document.getElementsByClassName("options")){
            option.addEventListener('change', function(){
                if(option.checked == true){
                    listaPreguntas[index].respuesta = option.value;
                    if(index == listaPreguntas.length - 1){
                        botonSiguiente.innerHTML = "Enviar Respuestas";
                        botonSiguiente.addEventListener("click",enviarRespuestas);
                    }
                }
            });
        }
    }    
}

function makeRequest(){
    document.getElementById("start").style.display = "none";
    url = "preguntas.json";
    Ajax(url,readJson);
    botonSiguiente.innerHTML = "Siguiente";
    areaPreguntas.appendChild(botonSiguiente);
    botonSiguiente.addEventListener("click",function(){
        index++;
        renderizarPreguntas();
        
    });    
}
function enviarRespuestas(){
    console.log(JSON.stringify(listaPreguntas));
}
    