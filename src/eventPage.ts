
chrome.tabs.onCreated.addListener( tab => {
    //escuchamos a cuando se abre una nueva pestaa en el navegador

    const url:string = conseguir_dominio_sitio_actual(tab.url)
    //sacamos el url de esa pestaña para tener la key del objeto guardado en el storage con
    //la selección guardada

    chrome.storage.sync.get([url], storage => {
        //con esa url se busca en el almacenamiento
        chrome.tabs.sendMessage( tab.id, { deshabilitar_permiso_conocer_minimizado: storage[url] || false })
        //a esa tab se le manda su selección guardada, en caso de que no existe se manda
        //un false (lo predeterminado) 
    })

})


function conseguir_dominio_sitio_actual(url: any, subdomain?: string|false) {
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