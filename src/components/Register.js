import {useState} from "react";
import {Link} from 'react-router-dom';


function Register(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });


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
        props.handleRegister({
            email: formValue.email,
            password: formValue.password
        })
    }

    return (
        <div className="register">
            <p className="register__welcome">Регистрация</p>
            <form className="register__form" onSubmit={handleSubmit}>
                <input className="register__input" id="email" name="email" type="email" placeholder="Email" onChange={handleChange} value={formValue.email}/>
                <input className="register__input" id="password" name="password" type="password" placeholder="Password" onChange={handleChange} value={formValue.password}/>
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