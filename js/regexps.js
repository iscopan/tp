function checkUsername(user){
    regExUser = /[A-Za-z0-9]{6,15}/;
    if(user.match(regExUser) && user.length <= 15)   return true;
    else                        return false;
}

function checkEmail(email){
    regExEmail = /[a-zA-Z0-9\-\_\.]*\@[a-zA-Z0-9\-\_\.]*\.[a-zA-Z0-9\-\_\.]*/;
    if(email.match(regExEmail)) return true;
    else                        return false;
}

function checkPassword(pass){
    regExPass = /.{6,20}/;
    if(pass.match(regExPass) && pass.length <= 20)   return true;
    else                        return false;
}

function checkTTName(ttName){
    regExTTName = /.{6,20}/;
    if(ttName.match(regExTTName) && ttName.length <= 20)   return true;
    else                            return false;
}

function checkEventName(eventName){
    regExEventName = /.{6,20}/;
    if(eventName.match(regExEventName) && eventName.length <= 20) return true;
    else                                return false;
}