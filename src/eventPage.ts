chrome.runtime.onMessage.addListener(( message, sender ) => {

    const url:string = conseguir_dominio_sitio_actual(sender.url)

    if ( message === "nuevo-contentscript" ) {
        //Cada vez que se abra una nueva pestaña, ésta va a abrir un nuevo contentscript
        //que va a mandar un mensaje para que el background vea la URL y revise si hay una preferencia
        chrome.storage.sync.get([url], storage => {
            chrome.tabs.sendMessage( sender.tab.id, { deshabilitar_permiso_conocer_minimizado: storage[url] } )
        })
    }

})

//
// * DEPRECATED * porque la mejor práctica es hacer que el contentscript mande un mensaje cada vez
// que se camibie de ruta
//
//chrome.tabs.onCreated.addListener( tab => {
//    //escuchamos a cuando se abre una nueva pestaa en el navegador
//
//    const url:string = conseguir_dominio_sitio_actual(tab.url)
//    //sacamos el url de esa pestaña para tener la key del objeto guardado en el storage con
//    //la selección guardada
//
//    chrome.storage.sync.get([url], storage => {
//        //con esa url se busca en el almacenamiento
//        chrome.tabs.sendMessage( tab.id, { deshabilitar_permiso_conocer_minimizado: storage[url] || false })
//        //a esa tab se le manda su selección guardada, en caso de que no existe se manda
//        //un false (lo predeterminado) 
//    })
//
//})

//Escuchamos a cada vez que el usuario cambia de pestaña
chrome.tabs.onHighlighted.addListener( () => {
    chrome.tabs.query( { active: true, currentWindow: true }, tab => {
        //buscamos la pestaña actual del usuario
        const url = conseguir_dominio_sitio_actual( tab[0].url )
        chrome.storage.sync.get([url], storage => {
            //vemos si tiene habilitada la opción. Si es así, se cambia el icono
            const deshabilitar_permitir_conocer_minimizado = storage[url]
            if ( deshabilitar_permitir_conocer_minimizado ) return chrome.browserAction.setIcon({ path: "../icon16cheque.png" })
            return chrome.browserAction.setIcon({ path: "../icon16.png" })
        })
    })
})

function conseguir_dominio_sitio_actual(url: any, subdomain?: string|false) {
    console.log({url})
    subdomain = subdomain || false;

    url = url.replace(/(https?:\/\/)?(www.)?/i, '');

    if (!subdomain) {
        url = url.split('.');

        url = url.slice(url.length - 2).join('.');
    }

    if (url.indexOf('/') !== -1) {
        return url.split('/')[0];
    }

    return url;
}
//https://stackoverflow.com/a/30877431/8937005