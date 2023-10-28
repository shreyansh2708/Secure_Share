import React, { useState } from 'react'
import "./Login.css"
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const[email,setEmail] = useState('');
    const[password,setPassword]=useState('');
    const[errorMessage, setErrorMessage] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[error, setError] = useState('');
    //signIn
        const signIn = e=>{
            e.preventDefault();
            auth.signInWithEmailAndPassword(email , password).then((auth) => {
              if(auth)
                alert("Signed In Successfully");
                const timeout = setTimeout(() => {
                  // Navigate to the desired route after 5 seconds
                  navigate("/home");  
                }, 2000); // 5000 milliseconds = 5 seconds
                return () => clearTimeout(timeout);
                /*const uid=auth.user.uid;

                //sending the uid to the server
                fetch("http://localhost:8000/", {
                    method: 'POST', // Use the POST method
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid: uid }), // Send the UID in the request body
                  })
                  //receiving the response from the server
                    .then(response => {
                      if (!response.ok) {
                        alert("Authentication Unsuccesful");
                      }
                      return response.json();
                    })
                    .then(data => {
                      //console.log("Response from the server:", data.message);
                      alert(data.message);
                      // Process the response from the server
                    })*/
                    
        })
        .catch(error => alert(error.message))
    }
    //signUp
    const signUp = e =>{
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
      // Passwords match, you can proceed with your logic here 
        } 
        else {
            setError('');
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            setErrorMessage('Password must contain one uppercase, lowercase, special characters & digits between 0-9');
            return;
          }
        //it will successful create a new user with email and password
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            if(auth){
              alert("SignUp Successful")
                navigate("/home");
            }
            
        })
        .catch(error => alert(error.message))
        }
    }

  return (
    <div class="container">
        <input type="checkbox" id="check" />
        <div class="login form">
        <header>Login</header>
        <form action="#">
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
            
            <input type="button" onClick={signIn} class="button" value="Login" />
        </form>
        <div class="signup">
            <span class="signup">Don't have an account?
            <label for="check">Signup</label>
            </span>
        </div>
        </div>
        <div class="registration form">
        <header>Signup</header>
        
        <form action="#">
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" />
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input for="check" type="button" onClick={signUp} class="button" value="Signup" />
            
        </form>
        <div class="signup">
            <span class="signup">Already have an account?
            <label for="check">Login</label>
            </span>
        </div>
        </div>
  </div>
  )
}

export default Login;