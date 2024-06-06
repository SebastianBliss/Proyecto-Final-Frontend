const tareas = [
    {
        "_id": "1",
        "titulo": "caminar",
        "descripcion": "salir a caminar en las mañanas",
        "estado": "activa",
        "responsable": "sebas"
    },
    {
        "_id": "2",
        "titulo": "ir al gimnasio",
        "descripcion": "salir al gimnasio en las tardes luego del trabajo",
        "estado": "activa",
        "responsable": "sebas"
    },
    {
        "_id": "3",
        "titulo": "Pasear al perror",
        "descripcion": "salir a caminar en las mañanas con el perro",
        "estado": "activa",
        "responsable": "sebas"
    },
    {
        "_id": "4",
        "titulo": "limpiar la cocina",
        "descripcion": "limpiar la cocina despues de cocinar",
        "estado": "activa",
        "responsable": "sebas"
    }
]

const crearTarea = async (tarea) => {
    // enviar consulta a la API para crear una tarea
    //alert('tarea creada')

    tarea.estado = 'inactivo'
    //esta funcion hace que nu
    tareas.push(tarea)
}

const obtenerTareas = async () => {
    // enviar consulta a la API para obtener todas las tareas

    return tareas
}



const verTarea = async (id) => {
    // enviar consulta a la API para obtener la tarea con el id
    //alert('tarea obtenida')
    return {
        "_id": "4",
        "titulo": "caminata en las mañanas",
        "descripcion": "salir a caminar en las mañanas",
        "estado": "activa",
        "responsable": "sebas"
    }
}

const editarTarea = async (id, tareaEditada) => {
    // enviar consulta a la API para obtener la tarea con el id
    alert('tarea editada')
}


const eliminarTarea = async (id) => {
    // enviar consulta a la API para eliminar la tarea con el id
    alert('tarea eliminada')
}

// -----------------------  Renderizar tareas en el HTML -----------------------
const listaTareas = document.getElementById('lista-tareas')
const renderTareas = async () => {

    listaTareas.innerHTML = ''

    const listaTareasObtenidas = await obtenerTareas()

    //bucle para recorrer cada elemento y tarea
    listaTareasObtenidas.forEach((tarea)=> {
        //console.log(tarea)

        const listItem = document.createElement('li')
        const article = document.createElement('article')
        const datos = document.createElement('div')
        datos.classList.add('tarea')

        const titulo = document.createElement('h4')
        const estado = document.createElement('p')
        const responsable = document.createElement('p')

        //Esta es la manera actual
        titulo.innerText =`Titulo:${tarea.titulo}`

        //Antes se hacia así
        /* titulo.innerText = 'Titulo:' + tarea.titulo */
        estado.innerText = `Estado: ${tarea.estado}`
        responsable.innerText = `Responsable ${tarea.responsable}`

        datos.appendChild(titulo)
        datos.appendChild(estado)
        datos.appendChild(responsable)

        article.appendChild(datos)
        listItem.appendChild(article)

        listaTareas.appendChild(listItem)

        //---------------------------------botonoes------------------------------
//wrapper hace referencia a "envolvedor o encapsulador"
        const wrapperBotones = document.createElement('div')
        //ese wrapper-botones es una etiqueta del Style.css
        wrapperBotones.classList.add('wrapper-botones')

        const buttonVerMas = document.createElement('button')
        const buttonEditar = document.createElement('button')
        const buttonEliminar = document.createElement('button')

        buttonVerMas.innerText = 'Ver más'
        buttonEditar.innerText = 'Editar'
        buttonEliminar.innerText = 'Eliminar'

        wrapperBotones.appendChild(buttonVerMas)
        wrapperBotones.appendChild(buttonEditar)
        wrapperBotones.appendChild(buttonEliminar)

        article.appendChild(wrapperBotones)

            //----------------Agregar evento CLICK AL Boton ver más -----------------------
            //addevenListener agrega un elemento de "escucha" para que el elemento este atento a lo que debe "escuchar" en este caso el click
            buttonVerMas.addEventListener('click', async () => {
                //console.log(tarea._id)

                const tareaObtenida = await verTarea(tarea._id)
                //console.log(tareaObtenida)

                const descripcion = document.createElement('p')
                descripcion.innerText = `Descripción: ${tareaObtenida.descripcion}`
                datos.appendChild(descripcion)

                //deshabilitar el boton
                buttonVerMas.disabled = true
             
            
            })
    
            // ------agregar evento al boton editar......
            buttonEditar.addEventListener('click', async () => {
                //console.log(tarea._id)
            const wrapperEditarTarea = document.getElementById('wrapper-form-editar')
            wrapperEditarTarea.style.display = 'grid'

            const tareaObtenida = await verTarea (tarea._id)

            const inputEditarTitulo = document.getElementById('editar-titulo')
            const inputEditarDescripcion = document.getElementById('editar-descripcion')
            const inputEditarResponsable = document.getElementById('editar-responsable')
            const inputEditarEstado = document.getElementById('editar-estado')

            inputEditarTitulo.value = tareaObtenida.titulo
            inputEditarDescripcion.value = tareaObtenida.descripcion
            inputEditarResponsable.value = tareaObtenida.responsable
            inputEditarEstado.value = tareaObtenida.estado

                const formEditarTarea =document.getElementById('form-editar-tarea')
                formEditarTarea.addEventListener('submit', async (event) => {

                    event.preventDefault()

                    const data = Object.fromEntries(new FormData(event.target))

                    await editarTarea(tarea._id, data)

                    //cada vez que se ejecuta una tarea se rederiza de nuevo para que vuelva a cargar la info
                    renderTareas()

                })
        })

        })
}


// -----------------------  Abrir y Cerra ventana crear tarea -----------------------
const wrapperFormCrear = document.getElementById('wrapper-form-crear')

const buttonAbrirFormCrear = document.getElementById('abrir-form-crear')
buttonAbrirFormCrear.addEventListener('click', () => {
    wrapperFormCrear.style.display = 'grid'
})

const buttonCerrarFormCrear = document.getElementById('cerrar-form-crear')
buttonCerrarFormCrear.addEventListener('click', () => {
    wrapperFormCrear.style.display = 'none'
})

// -----------------------  Abrir ventana editar tarea -----------------------
const buttonCerrarFormEditar = document.getElementById('cerrar-form-editar')
buttonCerrarFormEditar.addEventListener('click', () => {
    const editarTarea = document.getElementById('wrapper-form-editar')
    editarTarea.style.display = 'none'
})

// -----------------------  Crear tarea -----------------------
const formCrearTarea = document.getElementById('form-crear-tarea')
//e representa event
formCrearTarea.addEventListener('submit', async (e) => {
    //para prevenir el comportamiento por defecto del formulario.
    e.preventDefault()
    
    //-------------leer los datos del formulario ---- esta linea de codigo es muy util para leer la info de todos los formularios sin tener que hacerlo uno por uno. 
    //convierte los datos en Object osea en formato json....   e.target representa la info del formulario
    const data = Object.fromEntries(new FormData(e.target))
    console.log(data)

    await crearTarea(data)

    //ocultar formulario de crear tarea 
    wrapperFormCrear.style.display = 'none'
     
    //es necesario volver a renderizar la tarea
    renderTareas()
    
})

// -----------------------  Filtrar tareas por estado -----------------------
let estado = ''
const selectEstado = document.getElementById('select-estado')
selectEstado.addEventListener('change', (e) => {
})

window.addEventListener('load', renderTareas)