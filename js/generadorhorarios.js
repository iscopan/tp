$(iniciar);

function iniciar(){

    if(modo === "editar"){
        comprobarPertenencia();
    }

    horario = new Horario("", []);

    obtenerNombreHorario();
    obtenerHorario();

    modal = document.getElementById("id01");
    window.onclick = function(event){
        if(event.target == modal){
            modal.style.display = "none";
        }
    }
}

function comprobarPertenencia(){

    $.ajax({
        url: './php/comprobar_pertenencia.php?idHorario=' + id + '&userId=' + userId,
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data){
        if(typeof data[0] === "undefined"){
            window.open("index.php", "_self");
        }
    })
    .fail(function(){
        alert("No se ha podido habilitar la edición del horario. Intentalo de nuevo más tarde.");
    });

}

function serSimultaneo(eventoComprobar, eventoNuevo){
    if(eventoNuevo.dia == eventoComprobar.dia){
        let horasEvento1 = [];
        for(let i = 0; i < eventoNuevo.duracion; i++){
            horasEvento1.push(i + eventoNuevo.inicio);
        }
        let horasEvento2 = [];
        for(let i = 0; i < eventoComprobar.duracion; i++){
            horasEvento2.push(i + eventoComprobar.inicio);
        }
        for(let hora of horasEvento1){
            if(horasEvento2.includes(hora)){
                return true;
            }
        }
    }
    return false;
}

function estarLibre(evento){
    for(let eventoAux of horario.arrayEventos){
        if(serSimultaneo(eventoAux, evento)){
            return false;
        }
    }
    return true;
}

function quitarEvento(dia, horaInicio){

    if(modo === "editar"){
        $.ajax({
            url: './php/quitar_evento.php?idHorario=' + id + '&dia=' + dia + '&inicio=' + horaInicio,
            type: 'POST',
            dataType: 'text',
        })
        .done(function(data){
            var evento;
            var encontrado = false;
            for(let eventoAux of horario.arrayEventos){
                if(eventoAux.dia === dia && eventoAux.inicio === parseInt(horaInicio)){
                    evento = eventoAux;
                    encontrado = true;
                }
            }
            if(encontrado){
                delete horario.arrayEventos[horario.arrayEventos.indexOf(evento)];
                ordenar();
                horario.arrayEventos.pop();
            }
            mostrarHorario();
        })
        .fail(function(){
            alert("No se ha podido borrar el evento. Intentalo de nuevo más tarde.");
        });
    }

}

function cambiarNombre(){

    if(modo === "editar"){
        do{
            var nuevoNombre = window.prompt("Nuevo nombre:");
            if(!checkTTName(nuevoNombre)){
                window.alert("Nombre no válido.");
            }
        }while(!checkTTName(nuevoNombre));
    
        $.ajax({
            url: './php/cambiar_nombre.php?idHorario=' + id + '&nuevoNombre=' + nuevoNombre,
            type: 'POST',
            dataType: 'text',
        })
        .done(function(data){
            horario.nombre = nuevoNombre;
            mostrarHorario();
        })
        .fail(function(){
            console.log("No se ha podido cambiar el nombre. Intentalo de nuevo más tarde.");
        });
    }

}

function nuevoEvento(){

    if(modo === "editar"){
        document.getElementById("id01").style.display = "block";
    }

}

function botonCancelar(){

    if(modo === "editar"){
        document.getElementById("id01").style.display = "none";
    }

}

function enviarEvento(){

    if(modo === "editar"){
        var formCorrecto = true;
        var mal = "";

        var nombre = document.getElementById("nombre");
        // nombre evento cumple exp. reg.
        if(!checkEventName(nombre.value)){
            nombre.style.border = "2px solid red";
            nombre.value = "";
            formCorrecto = false;
            mal += "Nombre de evento no válido.\n";
        }

        var inicio = document.getElementById("inicio");
        // hora posible
        if(!(parseInt(inicio.value) >= 0 && parseInt(inicio.value) < 24)){
            inicio.style.border = "2px solid red";
            inicio.value = "0";
            formCorrecto = false;
            mal += "Hora de inicio no válida.\n";
        }

        var duracion = document.getElementById("duracion");
        // duracion posible
        if(!(parseInt(duracion.value) > 0 && parseInt(duracion.value) < 9 && parseInt(duracion.value) + parseInt(inicio.value) <= 24)){
            duracion.style.border = "2px solid red";
            duracion.value = "1";
            formCorrecto = false;
            mal += "Duración no válida.\n";
        }

        if(!formCorrecto){
            alert(mal);
        }else{
            var dia;
            var color;

            if(document.getElementById("rlunes").checked){
                dia = "lunes";
            }else if(document.getElementById("rmartes").checked){
                dia = "martes";
            }else if(document.getElementById("rmiercoles").checked){
                dia = "miercoles";
            }else if(document.getElementById("rjueves").checked){
                dia = "jueves";
            }else if(document.getElementById("rviernes").checked){
                dia = "viernes";
            }

            if(document.getElementById("rojo").checked){
                color = "rojo";
            }else if(document.getElementById("morado").checked){
                color = "morado";
            }else if(document.getElementById("azul").checked){
                color = "azul";
            }else if(document.getElementById("verde").checked){
                color = "verde";
            }else if(document.getElementById("amarillo").checked){
                color = "amarillo";
            }

            var elNuevoEvento = new Evento(nombre.value, dia, parseInt(inicio.value), parseInt(duracion.value), color);
            if(estarLibre(elNuevoEvento)){
                $.ajax({
                    url: './php/nuevo_evento.php?idHorario=' + id + '&nombre=' + elNuevoEvento.nombre + '&dia=' + elNuevoEvento.dia + '&inicio=' + elNuevoEvento.inicio + '&duracion=' + elNuevoEvento.duracion + '&color=' + elNuevoEvento.color,
                    type: 'POST',
                    dataType: 'text',
                })
                .done(function(data){
                    horario.arrayEventos.push(elNuevoEvento);
                    ordenar();
                    mostrarHorario();
                    nombre.value = "";
                    inicio.value = "";
                    duracion.value = "";
                    document.getElementById("rlunes").checked = true;
                    document.getElementById("rmartes").checked = false;
                    document.getElementById("rmiercoles").checked = false;
                    document.getElementById("rjueves").checked = false;
                    document.getElementById("rviernes").checked = false;
                    document.getElementById("rojo").checked = true;
                    document.getElementById("morado").checked = false;
                    document.getElementById("azul").checked = false;
                    document.getElementById("verde").checked = false;
                    document.getElementById("amarillo").checked = false;
                    botonCancelar();
                })
                .fail(function(){
                    alert("No se ha podido añadir el evento. Intentalo de nuevo más tarde.");
                });
            }else{
                alert("No se ha podido introducir este evento. Comprueba que no se solapa con otros.");
            }

        }
    }

}

function obtenerHorario(){

    var arrayEv = [];

    $.ajax({
        url: './php/obtener_horario.php?idHorario=' + id,
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data){
        $.each(data, function(id, value){
            let eventoTmp = new Evento(value.nombre, value.dia, parseInt(value.inicio), parseInt(value.duracion), value.color);
            arrayEv.push(eventoTmp);
        });
        horario.arrayEventos = arrayEv;
        ordenar();
        mostrarHorario();
    })
    .fail(function(){
        alert("No se ha cargado correctamente el horario.");
    });

}

function obtenerNombreHorario(){
    $.ajax({
        url: './php/nombre_horario.php?idHorario=' + id,
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data){
        horario.nombre = data[0].nombre;
        mostrarHorario();
    })
    .fail(function(){
        alert("No se ha cargado correctamente el horario.");
    });
}

function capitalizar(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Evento(nombre, dia, inicio, duracion, color){
    this.nombre = nombre;
    this.dia = dia;
    this.inicio = inicio;
    this.fin = inicio + duracion
    this.duracion = duracion;
    this.color = color;
}

function Horario(nombre, arrayEventos){
    this.nombre = nombre;
    this.arrayEventos = arrayEventos;
}

function ordenar(){
    horario.arrayEventos.sort(function(a, b){
        if(a.dia < b.dia){return -1}
        if(a.dia > b.dia){return 1}
        if(a.inicio < b.inicio){return -1}
        if(a.inicio > b.inicio){return 1}
        if(a.duracion < b.duracion){return -1}
        if(a.duracion > b.duracion){return 1}
        return 0;
    });
}

function generarHTML(){
    var codigo = "";

    var dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];

    let horaMin = 24;
    let horaMax = 0;
    for(let evento of horario.arrayEventos){
        if(evento.inicio < horaMin){
            horaMin = evento.inicio;
        }
        if(evento.inicio + evento.duracion - 1 > horaMax){
            horaMax = evento.inicio + evento.duracion - 1;
        }
    }

    codigo += '<div class="columna" id="horas">';
    codigo += '<div class="hueco" id="titulo">';
    codigo += '<p>Horas</p>';
    codigo += '</div>';
    for(let i = 0; i < 24; i++){
        codigo += '<div class="hueco hora';
        if(!(i >= horaMin && i <= horaMax)){
            codigo += ' oculto';
        }
        codigo += '">';
        codigo += '<p>' + i + ':00</p>';
        codigo += '</div>';
    }
    codigo += '</div>';

    for(let dia of dias){
        let eventosDia = [];
        // array con todos los eventos de un dia
        for(let evento of horario.arrayEventos){
            if(evento.dia === dia){
                eventosDia.push(evento);
            }
        }
        
        codigo += '<div class="columna" id="' + dia + '">';
        codigo += '<div class="hueco" id="titulo">';
        codigo += '<p>' + capitalizar(dia) + '</p>';
        codigo += '</div>';
        for(let i = 0; i < 24; i++){
            codigo += '<div class="hueco';
            if(!(i >= horaMin && i<= horaMax)){
                codigo += ' vacio oculto"></div>';
            }else{
                let completado = false;
                for(let evento of eventosDia){
                    if(evento.inicio === i){
                        completado = true;
                        if(evento.duracion > 1){
                            codigo += ' extend' + evento.duracion;
                        }
                        codigo += ' evento ' + evento.color + '">';
                        codigo += '<p id="eventon">' + evento.nombre + '</p>';
                        codigo += '<p id="hora">' + evento.inicio + ':00 - ' + evento.fin + ':00</p>';
                        codigo += '</div>';
                        for(let j = 1; j < evento.duracion; j++){
                            codigo += '<div class="hueco vacio oculto"></div>';
                            i += 1;
                        }
                    }
                }
                if(!completado){
                    codigo += ' vacio"></div>';
                }
            }
        }
        codigo += '</div>';
    }
    return codigo;
}

function mostrarHorario(){
    $("#titulohorario").text(horario.nombre);
    $("#horario").html(generarHTML());

    if(modo === "editar"){
        $(".evento").click(function(){
            var nombreEvento = $(this).children("#eventon").text();
            if(confirm("¿Quieres borrar el evento " + nombreEvento + "?")){
                var dia = $(this).parent().children("#titulo").text().toLowerCase();
                var intervalo = $(this).children("#hora").text();
                var horaInicio = intervalo.substr(0, intervalo.indexOf(":"));
                quitarEvento(dia, horaInicio);
            }
        });
    }
    
}