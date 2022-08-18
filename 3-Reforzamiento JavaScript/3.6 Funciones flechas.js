function sumar(a, b = 10) {
    console.log("Función function");
    
    return a + b;
}

console.log(sumar(5) );


const suma = (a, b = 10) => {
    console.log("Función flecha");

    return a + b;
} 

console.log(suma(5) );
