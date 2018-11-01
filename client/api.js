function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response.json();
}

function post(url, data) {
    return fetch(url, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(handleErrors);
}

function get(url) {
    return fetch(url, {
        method: "GET",
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(handleErrors);
}