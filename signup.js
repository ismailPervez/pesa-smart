// sign up functionality
if (!localStorage.getItem('sign-up-info')) {
    localStorage.setItem('sign-up-info', JSON.stringify([]));
}

async function getUserCurrency(country_code) {
    var signupInfo = JSON.parse(localStorage.getItem('sign-up-info'));
    // console.log(signupInfo);
    var [countryName, countryCode] = signupInfo;
    var res = await fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
    var data = await res.json();
    var currencies = Object(...data.currencies)
    var currencyCode = currencies.code;
    signupInfo.push(currencyCode);
    // console.log(signupInfo);
    localStorage.setItem('sign-up-info', JSON.stringify(signupInfo))
}

// 1. make a function that gets the user's current location
async function getUserLocation() {
    var res = await fetch('https://extreme-ip-lookup.com/json/');
    var data = await res.json();
    var countryName = data.country;
    var countryCode = data.countryCode;

    if (localStorage.getItem('sign-up-info')) {
        var signupInfo = JSON.parse(localStorage.getItem('sign-up-info'));
        signupInfo.push(countryName, countryCode);
        localStorage.setItem('sign-up-info', JSON.stringify(signupInfo));
        // console.log("inside get user location: ", signupInfo);
        
        // 1(a). get user currency
        getUserCurrency(countryCode);
    }

    else {
        localStorage.setItem('sign-up-info', JSON.stringify([]));
        var signupInfo = JSON.parse(localStorage.getItem('sign-up-info'));
        signupInfo.push(countryName, countryCode);
        localStorage.setItem('sign-up-info', JSON.stringify(signupInfo));
        // console.log("inside get user location: ", signupInfo)

        // 1(a). get user currency
        getUserCurrency(countryCode);
    }
}

// 3. submitting form
var form = document.querySelector('#sign-up-form');
var submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    submitBtn.textContent = 'signing up...';
    getUserLocation();
    // localStorage.setItem('sign-up-info', JSON.stringify([]));
    // waiting for local storage to populate
    setTimeout(() => {
        var signupInfo = JSON.parse(localStorage.getItem('sign-up-info'));
        const [location, countryCode, currencyCode] = signupInfo;

        var fullName = document.getElementById('full-name').value;
        var username = document.getElementById('username').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        const startingAmount = 1000;

        if (fullName && username && email && password) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    // once the user creation has happened successfully, we can add the current user into firestore with appropriate details
                    db.collection('users').doc(auth.currentUser.uid)
                        .set({
                            "country": location,
                            "currency": currencyCode,
                            "email": email,
                            "full name": fullName,
                            "password": password,
                            "username": username,
                            "amount": startingAmount
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        
                    submitBtn.textContent = 'sign up';
                    form.reset();
                    alert(`you have been successfully registered. you are also logged in with ${email}. thank you!`);
                    localStorage.clear();
                    // redirect to home page
                    window.location.replace('/accounts/index.html');
                })
                .catch(error => {
                    console.log('Something went wrong with added user to firestore: ', error);
                })
        }

        else {
            submitBtn.textContent = 'sign up';
            alert('all fields are required!');
        }
    }, 3000);
})