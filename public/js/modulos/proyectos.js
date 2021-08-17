import Swal from "sweetalert2";
import axios from "axios";
const btnEliminar = document.querySelector('#eliminar-proyecto');
if (btnEliminar) {
    if (btnEliminar) {
        btnEliminar.addEventListener('click', (e) => {
            const urlProyecto = e.target.dataset.proyectoUrl;
            console.log(urlProyecto);
            Swal.fire({
                title: 'Esta Seguro?',
                text: "Esta operacion es ireversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    //enviar peticion a axios
                    const url = `${location.origin}/proyectos/${urlProyecto}`;
                    axios.delete(url, { params: { urlProyecto } })
                        .then(function (respuesta) {
                            console.log(respuesta);
                            return;
                            Swal.fire(
                                'Eliminado!',
                                'Su archivo fue eliminado.',
                                'success'
                            );
                            //redirigir al inicio
                            setTimeout(() => {
                                window.location.href = '/'
                            }, 1000);

                        });


                }
            })
        })
    }
}
export default btnEliminar;