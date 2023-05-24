import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import * as auth from '../utils/auth';

function Register(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    function openInfoTooltip(isOk) {
        props.onRegister(isOk);
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setFormValue({
          ...formValue,
          [name]: value
        });
      }

    function handleSubmit(e) {
        e.preventDefault();
        if (!formValue.password || !formValue.email) {
            return;
        }
        auth.register(formValue.password, formValue.email)
        .then((res) => {
            if (res.data) {
                openInfoTooltip(true);
                navigate('/sign-in', {replace: true});
            }
            else {
                openInfoTooltip(false);
            }
        });
    }

    return (
        <div className="register">
            <p className="register__welcome">Регистрация</p>
            <form className="register__form" onSubmit={handleSubmit}>
                <input className="register__input" id="email" name="email" type="email" placeholder="Email" onChange={handleChange}/>
                <input className="register__input" id="password" name="password" type="password" placeholder="Password" onChange={handleChange}/>
                <button className="register__button button" type="submit">Зарегистрироваться</button>
            </form>
            
            <div className="register__signin">  
                <p className="register__question">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="register__login-link button">Войти</Link>
            </div>
      </div>
    )
}

export default Register;