import { Link, useHistory } from "react-router-dom";
import foodLogo from "../../assets/Group 1.png";
import { useForm } from "react-hook-form";
import "./Signup.css";
import { registerFail, registerSuccess } from "../../actions";
import axios from "axios";
import { useDispatch } from "react-redux";

const Signup = () => {
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const history = useHistory();

	const onSubmit = (data) => {
		delete data["rePassword"];
		axios
			.post("http://localhost:8000/user/register", JSON.stringify(data), {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				dispatch(registerSuccess(null));
				console.log("Register Success", response.data);
				history.push("/signin");
			})
			.catch((error) => {
				alert(error.response.data);
				dispatch(registerFail(null));
			});
	};

	return (
		<div className="signup">
			<form onSubmit={handleSubmit(onSubmit)} className="container">
				<img src={foodLogo} width={500} alt="Food SVG" />
				<div className="box">
					<p>Sign up</p>
					<div className="inputs">
						<div>
							<input
								{...register("firstName", {
									required: "Name is not valid!",
									maxLength: 30,
									minLength: 6,
									pattern: /^[A-Za-z]/,
								})}
								style={errors.firstName && { outline: "1px solid red" }}
								type="text"
								name="firstName"
								placeholder="First Name"
							/>
							<input
								{...register("lastName", {
									required: "Name is not valid!",
									maxLength: 30,
									minLength: 6,
									pattern: /^[A-Za-z]/,
								})}
								style={errors.lastName && { outline: "1px solid red" }}
								type="text"
								name="lastName"
								placeholder="Last Name"
							/>
						</div>

						<input
							{...register("email", {
								required: "Email is not valid!",
								pattern: /\S+@\S+\.\S+/,
								minLength: 10,
								maxLength: 100,
							})}
							style={errors.email && { outline: "1px solid red" }}
							type="email"
							name="email"
							placeholder="Emial"
						/>
						<input
							{...register("password", {
								required: "Password is not valid!",
								pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
							})}
							style={errors.password && { outline: "1px solid red" }}
							type="password"
							name="password"
							placeholder="Password"
						/>

						<input
							{...register("rePassword", {
								validate: {
									matchesPreviousPassword: (value) => {
										const { password } = getValues();
										return password === value || "Passwords should match!";
									},
								},
							})}
							style={errors.password && { outline: "1px solid red" }}
							type="password"
							name="rePassword"
							placeholder="Re-Enter Password"
						/>
						{errors.rePassword && <p className="errors">Passwords should match!</p>}
					</div>
					<div className="actions">
						<button>Sign up</button>
						<p>
							Already have an account? <Link to="/signin">Sign in now</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Signup;
