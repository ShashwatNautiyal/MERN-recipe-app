import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginFail, loginSuccess } from "../../actions";
import foodLogo from "../../assets/Group 1.png";
import "./Signin.css";

const Signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let history = useHistory();
	const dispatch = useDispatch();

	const handleLogin = (e) => {
		e.preventDefault();

		const loginData = {
			email,
			password,
		};

		axios
			.post("http://localhost:8000/user/login", JSON.stringify(loginData), {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				localStorage.setItem("user", response.data);
				dispatch(loginSuccess(response.data));
				history.push("/");
			})
			.catch((error) => {
				alert(error.response.data);
				dispatch(loginFail(null));
			});
	};

	return (
		<div className="signin">
			<form className="container">
				<img src={foodLogo} width={500} alt="Food SVG" />
				<div className="box">
					<p>Sign in</p>
					<div className="inputs">
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							name="email"
							placeholder="Email"
						/>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							name="password"
							type="password"
							placeholder="Password"
						/>
					</div>
					<div className="actions">
						<button type="submit" onClick={handleLogin}>
							Sign In
						</button>
						<p>
							Don't have an account? <Link to="/signup">Sign up now</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Signin;
