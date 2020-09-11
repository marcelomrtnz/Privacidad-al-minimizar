# Privacidad al minimizar

## ¿Por qué del proyecto?
Los navegadores tienen una [API que le permite a las aplicaciones web saber si estás en ellas o no](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API), llamada Page Visibility API. 
Los navegadores no tienen una forma nativa de evitar este comportamiento, por lo que hay que recurrir a una extensión para inhabilitarlo.

## ¿Cómo funciona la extensión?
La API funciona con un Event Listener, que "escucha" al evento de cuando un usuario abandona una pestaña, pero inyectando código en la página se pueden deshabilitar las respuestas de este evento.

## ¿Con qué está hecho?
Las extensiones de los navegadores son hechas con HTML, CSS y JavaScript, las mismas tecnologías de la web.

## ¿Cómo es la estructura/de qué se compone de una extensión?

Las extensiones pueden tener 3 elementos, que están incomunicados directamente y son independientes entre sí:

* **El popup**: La parte visible de una extensión, que aparece al presionarse su icono en la barra superior, u "omnibox". En ella es donde se puede mostrar el HTML y CSS, por lo que se pueden utilizar frameworks para crearla. En este caso usé ReactJS
* **El background**: Podemos pensar en ella como un Backend, está siempre activa independientemente de la pestaña, y escucha a eventos.
* **El content**: Es el JavaScript que se ejecuta cada vez que un usuario abre una pestaña y puede inyectar código en ésta. Se ejecuta cada vez que un usuario abre una pestaña.

## ¿Con qué tecnologías está hecha esta extensión?
* **ReactJS**: ReactJS no debe ser usada en proyectos así, ya que se puede hacer en pocas líneas de código con HTML y JS. El propósito de React es para aplicaciones web más avanzadas, en los casos como este, sólo añade peso innecesario al bundle, sin embargo, la utilicé para probar cómo utilizar frameworks en los popups de las extensiones.
* **TypeScript**: Es mi primera vez utilizando TypeScript, quería "estrenarlo" en un proyecto pequeño, y creo que vale totalmente la pena utilizarlo, ahorra bastantes bugs, los types ayudan bastante a no tener que volver a leer varias veces el mismo trozo de código para ver qué retorna una función y sus argumentos, y utilizarlo con VSCode mejora muchísimo la experiencia al programar.
* **WebPack**: Reduce el tamaño del empaquetado, y compila TypeScript a JavaScript.

### Este proyecto empezó con [el boilerplate (o plantilla)](https://github.com/martellaj/chrome-extension-react-typescript-boilerplate) hecha por @martellaj.

### Extras:
* **[¿Cómo deshabilitar la Page Visibility API?](https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script?rq=1)**

Hecho por [Marcelo Martínez](https://github.com/marcelomrtnz) @marcelomrtnz

( Mi primer proyecto Open Source :D )