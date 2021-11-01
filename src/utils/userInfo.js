import jwt_decode from "jwt-decode";

export const userInfo = () => {
	const token = localStorage.getItem("user");
	const decoded = token ? jwt_decode(token) : "";

	return {
		_id: decoded._id,
		firstName: decoded.firstName,
		lastName: decoded.lastName,
		fullName: decoded.fullName,
		email: decoded.email,
	};
};
