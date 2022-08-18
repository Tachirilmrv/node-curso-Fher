const { dump } = require("../helpers/persist");

class TaskList {
    taskList = {};


    //Get de la lista de tareas como un array
    get taskListArr () {
        const tla = [];


        Object.keys(this.taskList).forEach(key => {
            tla.push(this.taskList[key] );
        } );


        return tla;
    }


    //Crear tarea
    createTask(task) {
        this.taskList[task.id] = task;


        dump(this.taskListArr);
    }

    //Cargar tareas desde un array
    loadTasksFromArr(task) {
        task.forEach(t => {
            this.taskList[t.id] = t;
        } );
    }

    /**
     * Listar las tareas de acuerdo a un parámetro
     * @param {int} mode Forma de listar las tareas. 0 para todas. 1 para completadas. 2 para pendientes
     **/
    listTasks(mode) {
        let index = 1;                                                                      //Índice actual de la cantidad de tareas a listar


        console.log();

        for (let i = 0; i < this.taskListArr.length; i++) {
            const {desc, completed} = this.taskListArr[i];
            
            if(mode === 0) {    //Listar todas las tareas
                console.log(`${completed? `${index}.`.green : `${index}.`.red} ${desc} :: ${completed? `${"Completada".green}` : "Pendiente".red}`);

                index++;
            } else if (mode === 1) {    //Listar solo las tareas completadas
                if (completed) {
                    console.log(`${`${index}.`.green} ${desc} :: ${"Completada".green} ${completed.blue}`);

                    index++;
                }
            } else if (mode === 2) {    //Listar solo las tareas pendientes
                if(!completed) {
                    console.log(`${`${index}.`.red} ${desc} :: ${"Pendiente".red}`);

                    index++;
                }
            }
        }
    }

    //Completar/Descompletar tareas
    toggleCompleted(ids = [] ) {
        for (let i = 0; i < ids.length; i++) {
            const t = this.taskList[ids [i] ];
            
            if(t.completed) {
                t.completed = null;
            } else if(!t.completed) {
                t.completed = new Date().toISOString();
            }
        }
    }

    //Borrar tarea
    deleteTask( {id} = '') {
        if(this.taskList[id] ) {
            delete this.taskList[id];

            console.log("Tarea eliminada satisfactoriamente");
        }

        dump(this.taskListArr);
    }
}



module.exports = TaskList;