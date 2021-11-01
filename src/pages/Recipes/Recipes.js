import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { userInfo } from "../../utils/userInfo";
import "./Recipes.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const Recipes = () => {
	const [yourRecipes, setyourRecipes] = useState([]);
	const [handleLoader, setHandleLoader] = useState(false);
	let history = useHistory();

	useEffect(() => {
		getRecipes();
		// eslint-disable-next-line
	}, []);

	const getRecipes = () => {
		setHandleLoader(true);
		axios
			.get(process.env.REACT_APP_BASE_URL + "/recipes/user/" + userInfo()._id, {
				headers: {
					"auth-token": localStorage.getItem("user"),
				},
			})
			.then((response) => {
				setyourRecipes(response.data);
				setHandleLoader(false);
			});
	};

	const handleDelete = (recipe) => {
		setHandleLoader(true);
		axios
			.delete(process.env.REACT_APP_BASE_URL + "/recipes/" + recipe._id, {
				headers: {
					"auth-token": localStorage.getItem("user"),
				},
			})
			.then((response) => {
				console.log(response.data);
				getRecipes();
				setHandleLoader(false);
			});
	};

	return (
		<div className="recipes">
			{handleLoader && <CustomLoader />}
			{yourRecipes.length !== 0 && <p>Your recipes</p>}
			<div className="yourRecipes">
				{yourRecipes.length !== 0 ? (
					yourRecipes.map((recipe) => (
						<div key={recipe._id} className="card">
							<img onClick={() => history.push(`/${recipe._id}`)} src={recipe.image} alt="" />
							<div className="info">
								<p>{recipe.name}</p>
								<p>{recipe.description}</p>
								<div className="foodInfo">
									<p>
										Time:
										<span> {recipe.time}min</span>
									</p>
									<p>
										Serves:
										<span> {recipe.serves}</span>
									</p>
								</div>
								<div className="actionButtons">
									<DeleteIcon onClick={() => handleDelete(recipe)} sx={{ color: "#FF5353" }} />
									<EditIcon
										onClick={() => history.push(`/recipes/edit/${recipe._id}`)}
										sx={{ color: "#5398FF" }}
									/>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="addNewRecipe">
						<p>
							<span>No recipes found!</span> Please add now
						</p>
						<button onClick={() => history.push(`/recipes/add`)}>Add now</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Recipes;
