import Swal from "sweetalert2";
import axios from "axios";
const btnEliminar = document.querySelector('#eliminar-proyecto');
if (btnEliminar) {
    btnEliminar.addEventListener('click', () => {
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
                Swal.fire(
                    'Eliminado!',
                    'Su archivo fue eliminado.',
                    'success'
                );
                //redirigir al inicio
                setTimeout(() => {
                    window.location.href = '/'
                }, 1000);
            }
        })
    })
}
