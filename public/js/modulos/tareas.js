import axios from "axios";
import Swal from "sweetalert2";
import {actualizarAvance} from '../funciones/avance';

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
                        actualizarAvance();
                    }
                })
        }
        if (e.target.classList.contains('fa-trash')) {
            const tareaHTML = e.target.parentElement.parentElement;
            const idTarea = tareaHTML.dataset.tarea;
            Swal.fire({
                title: 'Desea eliminar esta Tarea?',
                text: "Esta operacion es ireversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    //enviar la peticion para eliminar..
                    const url = `${location.origin}/tareas/${idTarea}`;
                    axios.delete(url, { params: { idTarea } })
                        .then(respuesta => {
                            //eliminar el registro del html
                            if(respuesta.status===200) {
                                //elimino el elemento del
                               tareaHTML.parentElement.removeChild(tareaHTML);
                               
                               //mensaje de alerta de eliminacion correcta
                                Swal.fire(
                                    'Tarea Eliminada',
                                     respuesta.data,
                                     'success'
                                )
                                actualizarAvance();
                               
                            }
                            

                        });
                }
            })



        }

    })

}

export default tareas;