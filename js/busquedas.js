$(iniciar);

function iniciar(){
    if(typeof consulta !== "undefined"){
        buscarHorarios();
    }else{
        recuperarHorariosDelUsuario();
    }
}

function buscarHorarios(){

    $.ajax({
        url: './php/buscar_horarios.php?consulta=' + consulta,
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data){
        $.each(data, function(id, value){
            $(".notfound").hide();
            let resultado = "";
            resultado += '<div class="elem">';
            resultado += '<p class="titulo">' + value.nombre + '</p>';
            resultado += '<p class="normal">';
            resultado += '<input type="button" value="Ver" onClick=\'abrirHorario("ver", '+ value.id +')\'>';
            resultado += '</p></div>';
            $("#lista").append(resultado);
        });
    })
    .fail(function(){
        alert("No se han podido buscar los horarios. Intentalo de nuevo más tarde.");
    });

}

function recuperarHorariosDelUsuario(){

    $.ajax({
        url: './php/recuperar_horarios.php?userId=' + userId,
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data){
        $.each(data, function(id, value){
            $(".notfound").hide();
            let resultado = "";
            resultado += '<div class="elem">';
            resultado += '<p class="titulo">' + value.nombre + '</p>';
            resultado += '<p class="normal">';
            resultado += '<input type="button" value="Ver" onClick=\'abrirHorario("ver", '+ value.id +')\'>';
            resultado += '<input type="button" value="Editar" onClick=\'abrirHorario("editar", '+ value.id +')\'>';
            if(value.visible == 1){
                resultado += '<input id="visualizacion' + value.id + '" type="button" value=" 👁 " onclick="cambiarVisualizacion(' + value.id + ')" style="text-decoration: none; color: black; padding: 5px;">';
            }else{
                resultado += '<input id="visualizacion' + value.id + '" type="button" value=" 👁 " onclick="cambiarVisualizacion(' + value.id + ')" style="text-decoration: line-through; color: red; padding: 5px;">';
            }
            resultado += '<input type="button" value="Borrar" onClick="borrarHorario(' + value.id + ')">';
            resultado += '</p></div>';
            $("#lista").append(resultado);
        });
    })
    .fail(function(){
        alert("No se han podido recuperar los horarios. Intentalo de nuevo más tarde.");
    });

}

function abrirHorario(modo, id){
    window.open("horario.php?"+ modo +"=" + id, "_self");
}

function cambiarVisualizacion(id){
    boton = document.getElementById("visualizacion" + id);
    
    if(boton.style.color === "red"){
        // si es privado, hacer publico
        if(confirm("¿Quieres que el horario sea público?")){

            $.ajax({
                url: './php/cambiar_visualizacion.php?idHorario=' + id + '&visualizacion=1',
                type: 'POST',
                dataType: 'text',
            })
            .done(function(data){
                boton.style.color = "black";
                boton.style.textDecoration = "none";
            })
            .fail(function(){
                alert("No se han podido cambiar la visualización. Intentalo de nuevo más tarde.");
            });

        }
    }else{
        // si es publico, hacerlo privado
        if(confirm("¿Quieres que el horario sea privado?")){
            
            $.ajax({
                url: './php/cambiar_visualizacion.php?idHorario=' + id + '&visualizacion=0',
                type: 'POST',
                dataType: 'text',
            })
            .done(function(data){
                boton.style.color = "red";
                boton.style.textDecoration = "line-through";
            })
            .fail(function(){
                alert("No se han podido cambiar la visualización. Intentalo de nuevo más tarde.");
            });
            
        }
    }
}

function borrarHorario(id){

    if(confirm("¿Estás seguro de borrar este horario?")){
        $.ajax({
            url: './php/borrar_horario.php?idHorario=' + id,
            type: 'POST',
            dataType: 'text',
        })
        .done(function(data){
            window.open("busqueda.php?id=" + userId, "_self");
        })
        .fail(function(){
            alert("No se ha podido borrar el horario. Intentalo de nuevo más tarde.");
        });
    }

}

function nuevoHorario(){

    do{
        var nombre = window.prompt("Nombre del nuevo horario:");
        if(!checkTTName(nombre)){
            window.alert("Nombre no válido.");
        }
    }while(!checkTTName(nombre));

    $.ajax({
        url: './php/nuevo_horario.php?userId=' + userId + '&nombre=' + nombre,
        type: 'POST',
        dataType: 'text',
    })
    .done(function(data){
        window.open("busqueda.php?id=" + userId, "_self");
    })
    .fail(function(){
        alert("No se ha podido crear el horario. Intentalo de nuevo más tarde.");
    });

}