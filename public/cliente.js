const socket = io()
const formMensajes = document.querySelector('#formMensajes')
const infoUsuario = document.querySelector('#infoUsuario')
const mensaje = document.querySelector('#mensaje')

let usuarioGlobal
//USUARIO
socket.on('server:usuario', usuario => {
    console.log(usuario)
    usuarioGlobal = usuario
    renderUsuario(usuario)
})
async function renderUsuario(usuario) {
    const response = await fetch('./usuario.ejs')
    const plantilla = await response.text()
    document.querySelector('#infoUsuario').innerHTML = ''
    const html = ejs.render(plantilla, usuario)
    document.querySelector('#infoUsuario').innerHTML += html
}

//MENSAJES
async function renderMensajes(mensajes) {
    const response = await fetch('./mensajes.ejs')
    const plantilla = await response.text()
    document.querySelector('#chat').innerHTML = ''
    mensajes.forEach(mensaje => {
        const html = ejs.render(plantilla, mensaje)
        document.querySelector('#chat').innerHTML += html
    })
}


socket.on('server:mensajes', mensajes => {
    renderMensajes(mensajes)
})

formMensajes.addEventListener('submit', event => {
    event.preventDefault()
    fecha = new Date().toLocaleString()
    const nuevoMensaje = {
        "author": {
            "userEmail": usuarioGlobal.email,
            "avatar": usuarioGlobal.avatar,
            "tipo": "Usuario"
        },
        "tiempoStamp": fecha,
        "text": mensaje.value
    }
    socket.emit('cliente:mensaje', nuevoMensaje)
    mensaje.value = "" //Para limpiar el campo mensajes y poder escribir otro
})