import React, { useEffect, useState } from "react";

import "./Popup.scss";
import "./utilidades.scss"

//*Este es un switch de material design, la misma filosofía de diseño de Google
import Switch from "@material-ui/core/Switch"

//*En React las aplicaciones se dividen en componentes, que pueden ser clases, o funciones (recomendable)
//Lo que retorna esta funcion es el contenido del Popup del background
export default function Popup() {

    //*En React las variables tienen que estar envueltas en un estado para poder persistir a través de los re-renderizados
    const [ nombrePagina, setNombrePagina ] = useState<string>("")

    //La opción seleccionada por el usuario, predeterminado: false
    const [ seleccionado, setSeleccionado ] = useState<boolean>(false)

    //*En React lo mejor es definir las funciones en una constante individual, y no directamente en el callback del HTML
    //porque se volverían a generar en cada re-renderizado si fuera puesto directamente en el JSX
    const handleSeleccionado = ( event: React.ChangeEvent<HTMLInputElement>, checked: boolean ) => {

        //Encontramos la pestaña actual
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {

            //Enviamos un mensaje al contentscript de esa pestaña
            chrome.tabs.sendMessage( 
                tabs[0].id, 
                {deshabilitar_permiso_conocer_minimizado: checked},
                //Este es el callback que tiene como argumento la respuesta que manda
                //el contentscript. Vamos a cambiar el estado de la constante "seleccionado" 
                //hasta estar seguros de que se haya ejecutado todo correctamente (*WYSIWYG)
                (): void => setSeleccionado( checked )
            )
        })

        //Se guarda en el almacenamiento lo que eligió el usuario
        chrome.storage.sync.set({ [nombrePagina]: checked })

    }

    //useEffect con un array vacio de segundo argumento se ejecuta solo una vez,
    //cuando el componente es montado, o en otras palabras, cuando se carga el componente
    useEffect(() => {

        chrome.tabs.query({ currentWindow: true, active: true }, result => {

            const url_actual:string = conseguir_dominio_sitio_actual( result[0].url )
            setNombrePagina( url_actual )

            //Obtenemos la preferencia del usuario desde el almacenamiento
            chrome.storage.sync.get([url_actual], storage => {
                setSeleccionado( storage[url_actual] || seleccionado )
            })

        })

    }, []);
  
    return (
        <div className="popupContainer mt-1 d-flex justify-content-center flex-column">

            <header className="text-center">
                <h5>
                    {`¿Querés que `} 
                        <span className="color-de-url">
                            {nombrePagina}
                        </span> 
                    {` no sepa si saliste de la pestaña? `}
                </h5>
            </header>
            
            <div className="border"/>
            
            <section className="d-flex justify-content-center align-items-center">
                <Switch 
                    checked={seleccionado}
                    onChange={handleSeleccionado}
                    color="primary"
                />
            </section>
            
            <div className="border"/>
            
            <footer className="text-center">
                {
                    seleccionado
                    &&
                    <p> <span className="color-de-url">{ nombrePagina }</span> ya no puede saber si estás en ella. </p>
                }
            </footer>
        </div>
    );
}


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