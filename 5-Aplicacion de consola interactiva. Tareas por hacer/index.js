const io = require('./helpers/io');
const {pick} = require('./helpers/persist');
const TaskList = require('./models/TaskList');



const main = async () => {
    const taskList = new TaskList();                                                // Crea una nueva lista de tareas donde se almacenarán
    const tla = pick();                                                             // Carga las tareas si existe persistencia

    if (tla) {
        taskList.loadTasksFromArr(tla);                                             // Añade las tareas cargadas al listado
    }
    

    console.clear();
    
    io.mainMenu(taskList);                                                          // Muestra el menú principal
}


main();