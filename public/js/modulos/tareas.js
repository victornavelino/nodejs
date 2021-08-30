import axios from "axios";
const tareas = document.querySelector('.listado-pendientes');

if (tareas) {

    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            //redirect hacia tarea:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, { idTarea })
                .then(respuesta => {
                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo');
                    }
                })
        }
        if (e.target.classList.contains('fa-trash')) {
            const tareaHTML= e.target.parentElement.parentElement;
            const idTarea

            
            console.log(tareaHTML);
        }

    })

}

export default tareas;