import fetch from 'unfetch';

// response error handling :
const checkStatus = response => {
    if (response.ok) {
        return response;
    } else {
        // reject the promise by catching it in the object error (let error)
        // I choose let since I want to modify on the error variable while catching the promise
        let error = new Error(response.statusText);
        error.response = response;
        // now we have the access on the response (having on it the actual error so that I can do logic on it after ...)
        response.json().then(e => {
            error.error = e;
        });
        // I return the promise
        return Promise.reject(error);
    }
}


export const getStudentCourse = (studentId) =>
fetch(`api/students/${studentId}/courses`).then(checkStatus);


export const getAllStudents = () => 
// when we perform the fetch (of the students) actually by using fetch we use a promise 
 // the reason why we pass the checkStatus that it is based on promise logic ...
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
    

export const updateStudent = (studentId, student) => 
fetch(`api/students/${studentId}`, {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(student)
})
.then(checkStatus);

export const deleteStudent = studentId =>
fetch(`api/students/${studentId}`, {
    method: 'DELETE',
    
})
.then(checkStatus);

