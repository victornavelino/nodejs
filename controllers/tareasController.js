const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.agregarTarea = async (req, res, next) => {
    //obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });
    //leemos tarea
    const { tarea } = req.body;
    //estado 0 imcompleto
    const estado = 0;
    const ProyectoId = proyecto.id;
    //insertamos en la base
    const resultado = await Tareas.create({ tarea, estado, ProyectoId });
    if (!resultado) {
        return next();
    }
    //redireccionar pagina
    res.redirect(`/proyectos/${req.params.url}`);



}
exports.cambiarEstadoTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({ where: { id: id } })
    //cambiar el estado tarea
    //console.log(tarea);
    let estado = 0;
    if (tarea.estado === estado) {
        estado = 1
    }
    tarea.estado = estado;
    const resultado = await tarea.save()
    if (!resultado) return next();
    res.status(200).send('Actualizando');
}
exports.eliminarTarea = async (req, res, next) =>{
    const {id} = req.params;
    const resultado = await Tareas.destroy({where:{id}});
    if(!resultado) return next();
    res.status(200).send("Tarea Eliminada SI señor!!!");
}