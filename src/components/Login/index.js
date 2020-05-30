import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext} from '../Firebase';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');

    const firebase = useContext(FirebaseContext);

    useEffect(()=>{

        if(password.length > 5 && email !== ''){

            setBtn(true)

        } else if(btn){

            setBtn(false)
        }
    }, [password, email, btn])

    const handleSubmit = e => {
        e.preventDefault();

        firebase.loginUser(email, password)
        .then( user =>{

            //vider les champs
            setEmail('');
            setPassword('');
            //redirection vers welcome
            props.history.push('/welcome');
        })
        .catch(error =>{

            setError(error);
            // Vider les champs
            setEmail('');
            setPassword('');
        })
    }
  
    return (

        <div className="signUpLoginBox">
            <div className="slContainer">

                <div className="formBoxLeftLogin">
                    
                    {error !== '' && <span>{error.message}</span>}
                </div>

                <div className="formBoxRight">

                    <div className="formContent">
                      
                        <h2>Connection</h2>

                        <form onSubmit={handleSubmit} >

                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={e => setPassword(e.target.value)} value={password} type="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}

                        </form>

                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signup">Pas de compte? Inscrivez-vous.</Link>
                            <br />
                            <Link className="simpleLink" to="/forgetpassword">Mot de passe oublié? Récupérer-le ici.</Link>


                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
