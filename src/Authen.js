import React, { Component } from 'react';
var firebase = require('firebase');


var firebaseConfig = {
    apiKey: "AIzaSyAdF9FkbmPgBr4Wxb9bZZSo6pP8vLk8Nks",
    authDomain: "usurvey-6f210.firebaseapp.com",
    databaseURL: "https://usurvey-6f210.firebaseio.com",
    projectId: "usurvey-6f210",
    storageBucket: "usurvey-6f210.appspot.com",
    messagingSenderId: "934017891028",
    appId: "1:934017891028:web:13fc802a3294ea20ad1941"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default class Authen extends Component {


    //Login   
    login(event) {
        const email = this.refs.email.value;
        const password = this.refs.password.value;

        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);

        promise.then(user => {
            var lout = document.getElementById("logout");
            lout.classList.remove('hide');

        });


        promise.catch(e => {
            var err = e.message;
            this.setState({ err: err });
        });

    }



    //SignUp 
    signup() {
        const email = this.refs.email.value;
        const password = this.refs.password.value;

        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, password);

        promise
            .then(user => {
                var err = "Welcome " + user.email;
                firebase.database().ref('user/' + user.uid).set({
                    email: user.email
                });
                this.setState({ err: err });
            });
        promise
            .catch(e => {
                var err = e.message;
                this.setState(({ err: err }));
            });
    }

    //logout

    logout(){
        firebase.auth().signOut();
        var lout = document.getElementById('logout');

        lout.classList.add('hide');
    }
 


constructor(props) {
    super(props)

    this.state = {
        err: ''
        
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
};



render() {
    return (
        <div>
            <br /><br />
            <div className="box">

                <h3>Login with Email and password</h3>
                <input id="email" ref="email" type="email" placeholder="Enter your email" /><br />
                <input id="pass" ref="password" type="password" placeholder="Enter your password" /><br />
                <p>{this.state.err}</p>
                <button className="btn" onClick={this.login}>Log In</button>
                <button className="btn" onClick={this.signup} >Sign Up</button>
                <button id="logout" className="btn hide" onClick={this.logout}>Log out</button>
                <br />
            </div>
            <br />
            <br />


           
        </div>
    );
}
}
