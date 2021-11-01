import "./Nav.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions";
import { useState } from "react";

const Nav = () => {
	const { isLoggedIn } = useSelector((state) => state.authReducer);
	let history = useHistory();
	const dispatch = useDispatch();
	const [searchInput, setSearchInput] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		history.push(`/search?query=${searchInput}`);
		setSearchInput("");
	};

	return (
		<div className="nav">
			<Link to="/">
				SMASHY <span>FOOD</span>
			</Link>
			<form className="searchBox">
				<input
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					type="text"
					placeholder="Search"
				/>
				<button
					style={{ background: "transparent", border: "none" }}
					type="submit"
					onClick={(e) => handleSearch(e)}
				>
					<SearchIcon sx={{ color: "#ADB9B0", cursor: "pointer" }} />
				</button>
			</form>
			{isLoggedIn ? (
				<div className="regBtns">
					<button onClick={() => history.push("/recipes")}>Your Recipes</button>
					<button onClick={() => dispatch(logout(null), history.push("/signin"))}>Sign out</button>
				</div>
			) : (
				<div className="regBtns">
					<button onClick={() => history.push("/signin")}>Sign In</button>
					<button onClick={() => history.push("/signup")}>Sign Up</button>
				</div>
			)}
		</div>
	);
};

export default Nav;
