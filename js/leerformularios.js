function comprobarRegistro(){
    formCorrecto = true;
    mal = "";

    user = document.getElementById("ruser");
    // usuario cumple exp. reg.
    if(!checkUsername(user.value)){
        user.style.border = "2px solid red";
        user.value = "";
        formCorrecto = false;
        mal += "Nombre de usuario no válido.\n";
    }

    correo = document.getElementById("rcorreo");
    // correo cumple exp. reg.
    if(!checkEmail(correo.value)){
        correo.style.border = "2px solid red";
        correo.value = "";
        formCorrecto = false;
        mal += "Dirección de correo no válida.\n";
    }
    // correo ya registrado

    pass = document.getElementById("rpass");
    pass2 = document.getElementById("rpass2");
    // contraseña cumple exp. reg.
    if(!checkPassword(pass.value)){
        pass.style.border = "2px solid red";
        pass.value = "";
        pass2.value = "";
        formCorrecto = false;
        mal += "Contraseña no válida.\n";
    }
    // contraseña igual que confirmacion
    if(pass.value !== pass2.value){
        pass2.style.border = "2px solid red";
        pass2.value = "";
        formCorrecto = false;
        mal += "Las contraseñas no coinciden.\n";
    }

    if(formCorrecto){
        $.ajax({
            url: './php/registro_usuario.php?user=' + user.value + '&correo=' + correo.value + '&pass=' + pass.value,
            type: 'POST',
            dataType: 'text',
        })
        .done(function(data){
            window.open("login.php?correo=" + correo.value + "&pass=" + pass.value ,"_self");
        })
        .fail(function(){
            alert("No se ha podido registrar el usuario. Intentalo de nuevo más tarde.");
        });
    }else{
        alert(mal);
    }
}

function comprobarLogin(){
    formCorrecto = true;
    mal = "";

    correo = document.getElementById("lcorreo");
    // correo cumple reg. exp.
    if(!checkEmail(correo.value)){
        correo.style.border = "2px solid red";
        correo.value = "";
        formCorrecto = false;
        mal += "Dirección de correo no válida.\n";
    }

    pass = document.getElementById("lpass");
    // contraseña cumple exp. reg.
    if(!checkPassword(pass.value)){
        pass.style.border = "2px solid red";
        pass.value = "";
        formCorrecto = false;
        mal += "Contraseña no válida.\n";
    }

    if(formCorrecto){
        $.ajax({
            url: './php/entrar_usuario.php?correo=' + correo.value + '&pass=' + pass.value,
            type: 'GET',
            dataType: 'json',
        })
        .done(function(data){
            if(typeof data[0] === "undefined"){
                alert("Correo o contraseña incorrectos. Intentalo de nuevo.");
                pass.value = "";
            }else{
                window.open("login.php?correo=" + correo.value + "&pass=" + pass.value ,"_self");
            }
        })
        .fail(function(){
            alert("No se ha podido iniciar sesión. Intentalo de nuevo más tarde.");
        });
    }else{
        alert(mal);
    }
}

function cerrarSesion(){
    window.open("cerrar_sesion.php", "_self");
}