let listaPreguntas = [];
let url ;
let index = 0 ;
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
        console.log(file[i].preguntas)
        let pregunta = {
            id : file[i].id,
            pregunta : file[i].pregunta,
            opciones : file[i].opciones,
            respuesta : null
        }
        listaPreguntas.push(pregunta);
    }
    
}
function makeRequest(){
    url = "preguntas.json";
    Ajax(url,readJson);/*
    document.getElementById("areaPreguntas").innerHTML = listaPreguntas[index].pregunta;
    let botonSiguiente = document.createElement("button");
    botonSiguiente.addEventListener("click",function(){index++;document.getElementById("areaPreguntas").innerHTML = listaPreguntas[index].pregunta;})
    document.getElementById("areaPreguntas").appendChild(botonSiguiente);*/
    console.log(listaPreguntas)
}
    