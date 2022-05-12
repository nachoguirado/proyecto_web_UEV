let listaPreguntas = [];
let url ;
let index = 0 ;
let areaPreguntas =  document.getElementById("areaPreguntas");
let textoPregunta = document.getElementById("pregunta");
let opciones = document.getElementById("opciones");
let botonSiguiente = document.createElement("button");
botonSiguiente.setAttribute("id", "botonSiguiente");

//Aqui definimos todas las variables que vamos a utilizar,document es todo el archivo html, los get element by ID son
//los elementos del HTML que vamos a guardar en esa variable. 

function Ajax(url, callback) { 
    /*La funcion Ajax lo que hace es una llamada asincrona al servidor, y nos devuelve en este caso 
    un archivo JSON
    */
    let peticion = new XMLHttpRequest();//XMLHttpRequest es una clase nativa de los objetos para proporcionar una forma facil de obtener informacion de una URL, sin tener que recargar la pagina completa. 
    peticion.addEventListener('readystatechange', function() { //A este objeto le añadimos un evento de tal manera que cuando el estado del documento solicitado haya cambiado realice la siguiente funcion. 
        if(peticion.readyState === 4) {    // Se ha completado la petición
            if(peticion.status === 200) {    // El servidor ha contestado Ok
                callback(JSON.parse(this.responseText)); // Si el estado del servidor es 200, realiza la funcion pasada por parametro, "callback" con el JSON.
            } else {
                alert('Error '+peticion.status+': '
                    +peticion.statusText+'. No se llamará a '+callback);
            }
        }
    })
    peticion.open('GET', "json/"+url); //Abre el documento solicitado con el metodo GET.
    peticion.send(); //Realiza ya la peticion
}
function readJson(file) {
    /*Esta funcion se ejecuta cuando el estado del servidor es 200 y lo que hace es leer el archivo JSON recibido 
    y guardar su informacion en un Array de JS
    */
    for (let i in file){ //Aqui hacemos un bucle que recoge el json
        let pregunta = { //Creamos un objeto con los atributos id, pregunta, opciones, respuesta donde guardaremos la informacion del JSON correspondiente
            id : file[i].id,
            pregunta : file[i].pregunta,
            opciones : file[i].opciones,
            respuesta : null
        }
        listaPreguntas.push(pregunta);// Guardamos el objeto creado dntro del array.
    }
    index  = 0; 
    renderizarPreguntas();// Una vez rellenado el array de las preguntas, mostramos la primera pregunta por pantalla.

}
function renderizarPreguntas(){
    /*Muestra por pantalla, la pregunta con su indice en el array correspondiente,
    por ejemplo en el index=0 , se mostrara la primera pregunta
    */

    textoPregunta.innerText = listaPreguntas[index].pregunta; // Teniendo el elemento html textoPregunta, cambiamos su texto con el enunciado de la pregunta. 
    opciones.style.display  = ""; 
    let html = "";
    for(let i = 0; i < listaPreguntas[index].opciones.length; i++){ //Este bucle recorre las opciones a contestar de cada pregunta
        html = html +"<label><input type='checkbox' class='options' value='"+ i +"'>"+ listaPreguntas[index].opciones[i] +"</label></br>"; 
        opciones.innerHTML = html;
        for(let option of document.getElementsByClassName("options")){// Este segundo bucle anade un evento para cada opcion de tal manera que sabemos cuando se ha elegido.
            option.addEventListener('change', function(){
                if(option.checked == true){
                    listaPreguntas[index].respuesta = option.value;
                    if(index == listaPreguntas.length - 1){ //Cuando el numero de la pregunta es igual al numero total de preguntas el boton de siguiente se cambia por enviar respuestas.
                        botonSiguiente.innerHTML = "Enviar Respuestas";
                        botonSiguiente.addEventListener("click",enviarRespuestas);
                    }
                }
            });
        }
    }    
}

function makeRequest(){
    /*
    Esta funcion inicia el formulario
    */
    document.getElementById("botonDirecto").style.display = "none";
    url = "preguntas.json";
    Ajax(url,readJson);
    botonSiguiente.innerHTML = "Siguiente"; //Anadimos un boton para pasar de pregunta
    areaPreguntas.appendChild(botonSiguiente);
    botonSiguiente.addEventListener("click",function(){ //Cada vez que clicamos este botton, aumentamos en 1 el indice y renderizamos la pregunta
        index++;
        renderizarPreguntas();
        
    });    
}
function enviarRespuestas(){
   
    console.log(JSON.stringify(listaPreguntas));
}
    