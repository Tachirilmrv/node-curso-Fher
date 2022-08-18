const id = 100;



const employees = [
    {
        id: 1,
        name: "Lázaro"
    },
    {
        id: 2,
        name: "Michel"
    },
    {
        id: 3,
        name: "Fernando"
    }
];
const salaries = [
    {
        id: 1,
        wage: 1000
    },
    {
        id: 2,
        wage: 1500
    }
];


const getEmployeeById = (id, callback) => {
    const employee = employees.find( (e) => {
        return e.id === id
    } );

    if(employee) {
        callback(null, employee);
    } else {
        callback(`Empleado con id ${id} no encontrado`);
    }
}

const getSalaryById = (id, callback) => {
    const salary = salaries.find( (s) => {
        return s.id === id
    } );

    if(salary) {
        callback(null, salary);
    } else {
        callback(`Salario con id ${id} no encontrado`);
    }
}



getEmployeeById(id, (err, employee) => {
    if(err) {
        console.log("Error!");
        
        return console.log(err);
    }

    console.log("Empleado existe");
    console.log(employee);
} );

getSalaryById(id, (err, salary) => {
    if(err) {
        console.log("Error!");
        
        return console.log(err);
    }

    console.log("Salario existe");
    console.log(salary);
} );