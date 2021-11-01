import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import foodLogo from "../../assets/Group 1.png";
import "./Home.css";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { useSelector } from "react-redux";

const Home = () => {
	const [recipes, setRecipes] = useState([]);
	const history = useHistory();
	const [handleLoader, setHandleLoader] = useState(false);
	const { isLoggedIn } = useSelector((state) => state.authReducer);

	useEffect(() => {
		setHandleLoader(true);
		axios.get("http://localhost:8000/recipes").then((response) => {
			setRecipes([...response.data]);
			setHandleLoader(false);
		});
	}, []);

	return (
		<div>
			{handleLoader && <CustomLoader />}
			<div className="section">
				<div className="info">
					<p>
						Wanna <span>SMASH</span> in the <span>FOOD!</span>
					</p>
					<p>
						Smashy Recipes is a trusted resource for home cooks with more than 3,000 tested recipes, guides,
						and meal plans, drawing over 15 million readers each month from around the world.{" "}
					</p>
					<button
						onClick={() => {
							if (isLoggedIn) {
								return history.push("/recipes/add");
							} else {
								return history.push("/signin");
							}
						}}
					>
						ADD YOUR RECIPE NOW
					</button>
				</div>
				<img src={foodLogo} width={500} alt="Food SVG" />
			</div>
			<div className="recipeCards">
				{recipes.map((recipe) => (
					<div key={recipe._id} className="card">
						<img onClick={() => history.push(`/${recipe._id}`)} src={recipe.image} alt="" />
						<div onClick={() => history.push(`/${recipe._id}`)} className="info">
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
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
