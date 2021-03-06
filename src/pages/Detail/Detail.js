import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import "./Detail.css";

const Detail = () => {
	const [recipe, setRecipe] = useState([]);
	let { recipeId } = useParams();
	const [handleLoader, setHandleLoader] = useState(false);

	const [related, setRelated] = useState([]);
	const history = useHistory();

	useEffect(() => {
		axios.get(process.env.REACT_APP_BASE_URL + "/recipes").then((response) => {
			setRelated([...response.data]);
		});
		// eslint-disable-next-line
	}, [history.location]);

	useEffect(() => {
		setHandleLoader(true);
		axios.get(process.env.REACT_APP_BASE_URL + "/recipes/" + recipeId).then((response) => {
			setRecipe(response.data);
			setHandleLoader(false);
		});

		// eslint-disable-next-line
	}, [history.location]);

	return (
		<div className="detail">
			{handleLoader && <CustomLoader />}
			<div className="section">
				<img src={recipe.image} alt="Dish" />
				<div className="infoCard">
					<p>{recipe.name}</p>
					<p>
						Desciption: <span> {recipe.description}</span>
					</p>
					<p>
						Time: <span>{recipe.time}</span>
					</p>
					<p>
						Serves: <span>{recipe.serves}</span>
					</p>
				</div>
			</div>
			<div className="instruction">
				<p>Ingredients</p>
				<div className="instructionCard">
					<ol>
						{recipe.ingredients?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ol>
				</div>
			</div>
			<div className="instruction">
				<p>Steps</p>
				<div className="instructionCard">
					<ol>
						{recipe.steps?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ol>
				</div>
			</div>
			<div className="relatedItems">
				<p>Related Items</p>
				<div className="relatedCard">
					{related.map((recipe) => (
						<div key={recipe._id} className="card">
							<img
								onClick={() => {
									history.push(`/${recipe._id}`);
									window.scroll(0, 0);
								}}
								src={recipe.image}
								alt=""
							/>
							<div
								onClick={() => {
									history.push(`/${recipe._id}`);
									window.scroll(0, 0);
								}}
								className="info"
							>
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
		</div>
	);
};

export default Detail;
