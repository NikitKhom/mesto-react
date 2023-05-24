import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import * as auth from '../utils/auth';

function Login(props) {
	const [formValue, setFormValue] = useState({
		password: '',
		email: ''
	});
	const navigate = useNavigate();

	function handleChange(e) {
	  const {name, value} = e.target;
	  setFormValue({
		...formValue,
		[name]: value
	  });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formValue.email || !formValue.password){
		  return;
		}
		auth.authorize(formValue.password, formValue.email)
		.then((data) => {
			if (data.token){
				props.handleLogin(formValue.email);
				setFormValue({ password: '' , email: ''});
				navigate('/', {replace: true});
			}
		})
		.catch(err => console.log(err));
	}
	return (
		<div className="register">
			<p className="register__welcome">Вход</p>
			<form className="register__form" onSubmit={handleSubmit}>
				<input className="register__input" id="email" name="email" type="email" placeholder="Email" onChange={handleChange}/>
				<input className="register__input" id="password" name="password" type="password" placeholder="Password" onChange={handleChange}/>
				<button className="register__button button" type="submit">Войти</button>
			</form>
	  </div>
	)
}

export default Login;