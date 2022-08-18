const id = 4;



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


const getEmployeeById = (id) => {
    return new Promise( (resolve, reject) => {
        const employee = employees.find( (e) => {
            return e.id === id
        } )?.name;
        
        employee ? resolve(employee) : reject(`No existe el empleado con id: ${id}`);
        }
    );
}

const getSalaryById = (id) => {
    return new Promise( (resolve, reject) => {
        const salary = salaries.find( (s) => {
            return s.id === id
        } )?.wage;
        
        salary ? resolve(salary) : reject(`No existe el salario con id: ${id}`);
        }
    );
}



getEmployeeById(id)
    .then(employee => {
        getSalaryById(id)
            .then(salary => {
                console.log(`El empleado ${employee} tiene como salario ${salary}`);
            } )
            .catch(err => console.log(err) );
    } )
    .catch(err => console.log(err) );