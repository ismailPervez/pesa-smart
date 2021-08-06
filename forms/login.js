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
            // console.log(cred.user.uid);
            // once the user creation has happened successfully, we can add the current user into firestore with appropriate details
            // db.collection('users').doc(auth.currentUser.uid)
            //     .where("email", "==", "newguy@gmail.com")
            //     .get()
            //     .then(user => {
            //         console.log(user);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })
            // localStorage.setItem('message', `you have been successfully logged in with ${email}`);
            // redirect to home page
            // var alert = document.querySelector('.alert-success');
            loginForm.reset();
            // window.location.replace('/accounts/index.html')
            // alert.textContent = `you have been successfully logged in with ${email}`;
        })
        .catch(error => {
            console.log(error)
        })
})