console.log("CONTENT SCRIPTS TS")

//Ponemos esta funcion aparte para poder removerla de su event listener
function detener_evento(event: Event) {
    event.stopImmediatePropagation();
}

//Escuchamos a mensajes mandados por el background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    //Si no existe deshabilitar_permiso_conocer_minimizado terminamos la funcion
    if ( request.deshabilitar_permiso_conocer_minimizado === undefined ) return sendResponse(false)
    
    if ( request.deshabilitar_permiso_conocer_minimizado === true) {
        //Si el usuario quiere dehabilitar la API de visibilidad en este pagina
        for ( const event_name of ["visibilitychange", "webkitvisibilitychange", "blur"]) {
            window.addEventListener(event_name, detener_evento, true);
        }
        console.log("TRUE")

    } else if ( request.deshabilitar_permiso_conocer_minimizado === false) {
        for ( const event_name of ["visibilitychange", "webkitvisibilitychange", "blur"]) {
            window.removeEventListener(event_name, detener_evento, true);
        }
        console.log("false")
    }

    //Enviamos la respuesta de que se realizó con éxito
    sendResponse(true)
    
});
