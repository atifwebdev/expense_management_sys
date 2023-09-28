// Forms JS

function signupFunc() {
    document.getElementById("signup_form").style.display = "block";
    document.getElementById("login_form").style.display = "none";
}

function loginFunc() {
    document.getElementById("login_form").style.display = "block";
    document.getElementById("signup_form").style.display = "none";
}

function uniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

document.getElementById("signupForm").addEventListener('submit', function (event) {
    event.preventDefault();

    let allUsersArr = readFromAllUsers();
    // empty local storage
    if (!allUsersArr) allUsersArr = [];
    let userId = uniqueId();
    let name = document.getElementById("inpName").value;
    let email = document.getElementById("inpEmail").value;
    let password = document.getElementById("inpPassword").value;
    const todo = {
        id: userId,
        name: name,
        email: email,
        password: password
    };
    allUsersArr.push(todo);
    localStorage.setItem('allUsers', JSON.stringify(allUsersArr));

    document.getElementById("signupForm").reset();
})

function readFromAllUsers() {
    const allUsersArr = localStorage.getItem('allUsers');
    return !allUsersArr ? [] : JSON.parse(allUsersArr);
}






document.getElementById("loginForm").addEventListener('submit', function (event) {
    event.preventDefault();

    let todos = readFromUserLogin();

    // empty local storage
    if (!todos) todos = [];
    console.log(todos);
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let jsonData = localStorage.getItem("allUsers");
    let objData = JSON.parse(jsonData);
    objData.find((data) => {
        if (email === data.email) {
            console.log("Email is ", data.email);
            console.log("Email is ", email);
            if (password === data.password) {

                const todo = { useId: data.id, email: email, password: password };
                todos.push(todo);
                localStorage.setItem('loginUsers', JSON.stringify(todos));

                console.log("Password is ", password);
                console.log("Password is ", data.password);
                // window.location.href = "./dashboard.html";
                document.getElementById("loginForm").reset();
            }
            else {
                console.log("Password is invalid");
            }
        }
        else {
            console.log("Email is invalid...");
        }
    });
    // const todo = { id: 1, email: email, password: password };
    // todos.push(todo);
    // localStorage.setItem('loginUsers', JSON.stringify(todos));

    // document.getElementById("loginForm").reset();
})

function readFromUserLogin() {
    const todos = localStorage.getItem('loginUsers');
    return !todos ? [] : JSON.parse(todos);
}