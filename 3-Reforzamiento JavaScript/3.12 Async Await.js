const id = 3;



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

const getEmployeeInfo = async (id) => {
    try {
        const name = await getEmployeeById(id);
        const salary = await getSalaryById(id);
    
        return `El empleado ${employee} tiene como salario ${salary}`;
    } catch (error) {
        throw error
    }
}

getEmployeeInfo(id)
    .then(msg => console.log(msg) )
    .catch(err => console.log(err) );