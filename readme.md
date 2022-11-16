Proyecto Final Curso BackEnd CoderHouse

Descripción:
Desarrollo de el backend de una aplicación de e-commerce

Rutas Desarrolladas:
"/api/productos"
    -Metodo: get -Ruta: '/:id?'
    -Metodo: get -Ruta: '/categoria/:categoria'
    -Metodo: post -Ruta: '/'
    -Metodo: put -Ruta: '/:id'
    -Metodo: delete -Ruta: '/:id'

"/api/carrito":
    -Metodo: get -Ruta: '/:id?'
    -Metodo: post -Ruta: '/'
    -Metodo: delete -Ruta: '/:id'
    -Metodo: get -Ruta: '/:id/productos'
    -Metodo: post -Ruta: '/:id/productos'
    -Metodo: delete -Ruta: '/:id/productos/:id_prod'
    -Metodo: post -Ruta: '/iniciarPedido'

"/api/chat":
    -Metodo: get -Ruta: '/:email'
    -Metodo: get -Ruta: '/'

"/api/ordenes"
    -Metodo: get -Ruta: '/all'
    -Metodo: post -Ruta: '/'
    -Metodo: get -Ruta: '/'

"/api/":
    -Metodo:get -Ruta: "/register"
    -Metodo:post -Ruta: "/register"
    -Metodo:get -Ruta: "/failregister"
    -Metodo:get -Ruta: "/login"
    -Metodo:post -Ruta: "/login"
    -Metodo:get -Ruta: "/faillogin"
    -Metodo:get -Ruta: "/logout"
    -Metodo:get -Ruta: "/home"

"/api/config"

