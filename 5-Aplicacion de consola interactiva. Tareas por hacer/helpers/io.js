const inquirer = require("inquirer");
const Task = require("../models/Task");
const readline = require('readline').createInterface( {
    input: process.stdin,
    output: process.stdout
} );

require("colors");



const mainMenu = async (taskList) => {
    // Define las opciones del menú principal
    const question = {
        type: "list",
        name: "opt",
        message: "¿Qué desea hacer?",
        choices: [
            {
                value: '1',
                name: `${"1.".green} Crear tarea`
            },
            {
                value: '2',
                name: `${"2.".green} Listar tareas`
            },
            {
                value: '3',
                name: `${"3.".green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${"4.".green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${"5.".green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${"6.".green} Borrar tarea`
            },
            {
                value: '0',
                name: `${"0.".green} Salir`
            }
        ]
    }

    var option = '';
    

    do {
        console.clear();
        
        console.log("-----------------------".green);
        console.log(" Seleccione una opción".blue);
        console.log("----------------------- \n".green);
        
        
        let {opt} = await inquirer.prompt(question);                                // Promptea las opciones del menú principal

        switch (opt) {
            case '1':   //Crear tarea
                await createTask(taskList);
                
            break;
            case '2':   //Listar todas las tareas
                await taskList.listTasks(0);
                
            break;
            case '3':   //Listar tareas completadas
                await taskList.listTasks(1);
                
            break;
            case '4':   //Listar tareas pendientes
                await taskList.listTasks(2);
                
            break;
            case '5':   //Completar tarea(s)
                const {ids} = await completeTask(taskList);
                
                taskList.toggleCompleted(ids)
                
            break;
            case '6':   //Borrar tarea
                const {id} = await deleteTask(taskList);
                
                if (id !== '0') {
                    const ok = await confirm("¿Está seguro que desea eliminar esta tarea?");          
                    
                    if(ok) {
                        taskList.deleteTask( {id} );
                    }
                }
                
            break;
            case '0':   //Salir del programa
                option = '0';
                
            break;
        }
        
        await pause()
    } while(option !== '0');

    readline.close();
}


// Crear tarea
const createTask = async (taskList) => {
    // Define la pregunta a promptear para crear una tarea
    const question = [
        {
            type: "input",
            name: "desc",
            message: "Inserte la descripción de la tarea que desea crear:",

            validate(value) {
                if (value.length === 0) {
                    return "Por favor, ingrese un valor"
                }

                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    const task = new Task(desc);


    taskList.createTask(task);
};

//Completar tareas
const completeTask = async (taskList) => {
    const choices = await listTasks(taskList);
    
    const question = {
        type: "checkbox",
        name: "ids",
        message: "Seleccione una o varias",
        choices
    }


    return inquirer.prompt(question);
}

//Borrar tarea
const deleteTask = async (taskList) => {
    const choices = await listTasks(taskList);
    
    choices.push( {
        value: "0",
        name: `${`0.`.yellow} Cancelar`
    } );

    const question = {
        type: "list",
        name: "id",
        message: "Seleccione la tarea a borrar",
        choices
    }


    return inquirer.prompt(question);
}


// Pausa la entrada en la cosola
const pause = async () => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"enter".green} para continuar`
        }
    ];


    console.log();

    
    await inquirer.prompt(question);
}

//Promptea para realizar una confirmación
const confirm = async (message) => {
    //Define la pregunta a promptear para confirmar
    const question = {
        type: "confirm",
        name: "ok",
        message
    }

    const {ok} = await inquirer.prompt(question);


    return ok;
}

//Listar tareas
const listTasks = async (taskList) => {
    const {taskListArr} = taskList;
    

    return taskListArr.map( ( {id, desc, completed}, i) => {
        return {
            value: id,
            name: `${completed? `${i + 1}.`.green : `${i + 1}.`.red} ${desc}`,
            checked: completed? true : false
        }
    } );
}


module.exports = {
    mainMenu
}