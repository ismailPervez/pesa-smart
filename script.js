// listen for auth status changes

auth.onAuthStateChanged(user => {
    // console.log(user)
    var logoutBtn = document.getElementById('log-out-btn');
    var loginBtn = document.getElementById('login-link');
    if (user) {
        console.log('user has logged in with: ', user.email);
        loginBtn.classList.remove('active');
        logoutBtn.classList.add('active');
        // console.log(logoutBtn.classList);
    }

    else {
        console.log('user has logged out');
        loginBtn.classList.add('active');
        logoutBtn.classList.remove('active');
    }
})

// logout functionality
const logoutBtn = document.getElementById('log-out-btn');
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(ref => {
        console.log('user has logged out')
    });
})

// send money
// 1. listen to submit event
// 2. make sure all fields are validates
// 3. make sure user exists
// 4. make sure password is authenticated
// 5. make sure amount is possible
// 6. you cant send money to yourself

const sendMoneyForm = document.getElementById('send-money-form');
const sendMoneyBtn = document.getElementById('send-btn');

sendMoneyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    var username = document.querySelector('#send-money-form #username').value;
    var amount = parseInt(document.getElementById('amount').value);
    var password = document.querySelector('#send-money-form #password').value;

    if (username && amount && password) {
        // var receiverBalance;
        // var senderBalance;
        // var receiverUsername;
        // var senderUsername;
        // var receiverCurrency;
        // var senderCurrency;
        console.log(amount);

        if (amount > 1) {
            db.collection('users').where("email", "==", auth.currentUser.email).get()
            .then(snapshot => {
                snapshot.docs.map(doc => {
                    // console.log("sender's details: ", doc.data())
                    var senderCurrency = doc.data().currency;
                    var senderBalance = doc.data().amount;

                    if (localStorage.getItem('send-money-details')) {
                        var sendMoneyDetails = JSON.parse(localStorage.getItem('send-money-details'));
                        sendMoneyDetails.push(senderCurrency, senderBalance);
                        localStorage.setItem('send-money-details', JSON.stringify(sendMoneyDetails));
                        // console.log(sendMoneyDetails);
                    }

                    else {
                        localStorage.setItem('send-money-details', JSON.stringify([]));
                        var sendMoneyDetails = JSON.parse(localStorage.getItem('send-money-details'));
                        sendMoneyDetails.push(senderCurrency, senderBalance);
                        localStorage.setItem('send-money-details', JSON.stringify(sendMoneyDetails));
                        // console.log(sendMoneyDetails);
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })

            db.collection('users').where("username", "==", username).get().then(snapshot => {
                snapshot.docs.map(doc => {
                    // console.log(doc.data());
                    var receiverCurrency = doc.data().currency;
                    var receiverBalance = doc.data().amount;
                    var receiverID = doc.id;
                    
                    if (localStorage.getItem('send-money-details')) {
                        var sendMoneyDetails = JSON.parse(localStorage.getItem('send-money-details'));
                        sendMoneyDetails.push(receiverCurrency, receiverBalance, receiverID);
                        localStorage.setItem('send-money-details', JSON.stringify(sendMoneyDetails));
                        // console.log(sendMoneyDetails);
                    }

                    else {
                        localStorage.setItem('send-money-details', JSON.stringify([]));
                        var sendMoneyDetails = JSON.parse(localStorage.getItem('send-money-details'));
                        sendMoneyDetails.push(receiverCurrency, receiverBalance, receiverID);
                        localStorage.setItem('send-money-details', JSON.stringify(sendMoneyDetails));
                        // console.log(sendMoneyDetails);
                    }
                })

            })
            .catch(error => {
                console.log(error);
            })

            // calculations, then update
            // get the sendMoneyDetails
            const sendMoneyDetails = JSON.parse(localStorage.getItem('send-money-details'));
            var [senderCurrency, senderBalance, receiverCurrency, receiverBalance, receiverID] = sendMoneyDetails;

            // console.log(senderCurrency, senderBalance, receiverCurrency, receiverBalance);
            if (senderCurrency !== receiverCurrency) {
                // console.log('coming from two different states!');
                // convert into receiver's currency
                async function convertCurrency(sender_currency, receiver_currency, amount) {
                    var res = await fetch(`http://data.fixer.io/api/latest?access_key=8269b4aad97af40d2bc213b009da5670`);
                    var data = await res.json();

                    var senderToEuro = Math.round((amount / data.rates[senderCurrency]) * 100) / 100;
                    console.log(senderToEuro)
                    var euroToReceiver = Math.round((data.rates[receiverCurrency] * senderToEuro) * 100) / 100;

                    senderBalance -= amount;
                    receiverBalance += euroToReceiver;

                    // update sender
                    db.collection('users').doc(auth.currentUser.uid).update({
                        amount: senderBalance
                    })

                    db.collection('users').doc(receiverID).update({
                        amount: receiverBalance
                    })

                    console.log('converted and db updated...');
                } 

                convertCurrency(senderCurrency, receiverCurrency, amount)
            }

            else {
                // console.log('coming from the same state');
                senderBalance -= amount;
                receiverBalance += amount;

                // update balance in db
                // update sender
                db.collection('users').doc(auth.currentUser.uid).update({
                    amount: senderBalance
                })

                // update receiver
                db.collection('users').doc(receiverID).update({
                    amount: receiverBalance
                }) 
            }
        }

        else {
            alert('please enter a valid amount!');
        }

        // in the end
        localStorage.clear();
    }

    else {
        alert('all fields are required!');
    }
})

// close pop up
var closePopUpBtn = document.querySelector('.close-pop-up h1');
closePopUpBtn.addEventListener('click', () => {
    document.querySelector('.pop-up').classList.remove('active');
})

// open pop up
var openPopUpBtn = document.getElementById('send-money-btn');
openPopUpBtn.addEventListener('click', () => {
    document.querySelector('.pop-up').classList.add('active');
})