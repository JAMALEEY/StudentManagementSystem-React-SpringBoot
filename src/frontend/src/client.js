import fetch from 'unfetch';

// error handling :
const checkStatus = response => {
    if (response.ok) {
        return response;
    } else {
        // reject the promise by catching it in the object error (let error)
        let error = new Error(response.statusText);
        error.response = response;
        response.json().then(e => {
            error.error = e;
        });
        return Promise.reject(error);
    }
}



export const getAllStudents = () => 
fetch('api/students').then(checkStatus);

export const addNewStudent = student =>
// fetch give us promise so we chain here the error handling that we did
    fetch('api/students', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(student)
    })
    .then(checkStatus);
