const courses = require('./data/data');
const argv = require('yargs');
const fs = require ('fs');

let showCoursesInfo = (index) => {
    
    setTimeout(() => {
        printCourseInfo(courses[index]);
        if(index < courses.length - 1) {
            showCoursesInfo(index + 1);
        }
    }, 2000);
    
};

let printCourseInfo = (course) => {
    console.log('Informacion del curso: id: ' + course.id + ', nombre: ' + course.name + ', duracion: ' + course.duration + ', precio: ' + course.price);
};

const options = {
    id: {
        demand: true,
        alias: 'i'
    },
    nombre: {
        demand: true,
        alias: 'n'
    },
    cedula: {
        demand: true,
        alias: 'c'
    }
};


argv
.command('*', 'Default', {}, () => {
    showCoursesInfo(0);
})
.command('inscribir', 'Inscribirse a un curso', options, ({id, nombre, cedula}) => {
    let courseToSuscribe = courses.find(course => course.id == id);
    if(!courseToSuscribe) {
        console.log('El curso con id: ' + id + ' no fue encontrado en el sistema');
        return;
    }
    printCourseInfo(courseToSuscribe);
    let subscriptionInfo = 'El estudiante de nombre: ' + nombre + ' y numero de cedula: ' + cedula + ' se ha inscrito exitosamente al siguiente curso.' + '\n'
                            + 'id: ' + courseToSuscribe.id + ', nombre: ' + courseToSuscribe.name + ', duracion: ' + courseToSuscribe.duration + ', precio: ' + courseToSuscribe.price;
    fs.writeFile('inscripcion.txt', subscriptionInfo, (error) => {
        if(error) {
            console.log('Hubo un error tratando de escribir el archivo') 
        } else {
            console.log('Archivo de inscripcion generado exitosamente');
        }
    })
})
.argv;