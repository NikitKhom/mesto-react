import {useState} from "react";

function Login(props) {
	const [formValue, setFormValue] = useState({
		password: '',
		email: ''
	});

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
		props.handleLogin({
			password: formValue.password,
			email: formValue.email
		})
	}

	return (
		<div className="register">
			<p className="register__welcome">Вход</p>
			<form className="register__form" onSubmit={handleSubmit}>
				<input className="register__input" id="email" name="email" type="email" placeholder="Email" onChange={handleChange} value={formValue.email}/>
				<input className="register__input" id="password" name="password" type="password" placeholder="Password" onChange={handleChange} value={formValue.password}/>
				<button className="register__button button" type="submit">Войти</button>
			</form>
	  </div>
	)
}

export default Login;