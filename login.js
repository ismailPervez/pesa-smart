// login functionality
const loginForm = document.getElementById('login-form');
var loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log(email, password);

    auth.signInWithEmailAndPassword(email, password)
        .then(cred => {
            loginForm.reset();
            window.location.replace('index.html')
            alert.textContent = `you have been successfully logged in with ${email}`;
        })
        .catch(error => {
            console.log(error)
        })
})