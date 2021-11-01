import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import "./Search.css";

const Search = () => {
	const [resultRecipes, setResultRecipes] = useState([]);
	const [handleLoader, setHandleLoader] = useState(false);
	const { searchQuery } = useSelector((state) => state.searchReducer);
	const history = useHistory();
	let query = useQuery();

	function useQuery() {
		return new URLSearchParams(useLocation().search);
	}

	useEffect(() => {
		getRecipes();
		// eslint-disable-next-line
	}, [searchQuery]);

	const getRecipes = () => {
		setHandleLoader(true);
		axios.get("http://localhost:8000/recipes/search?query=" + query.get("query")).then((response) => {
			setResultRecipes(response.data);
			setHandleLoader(false);
		});
	};

	return (
		<div className="search">
			{handleLoader && <CustomLoader />}
			<p>Search results</p>
			<div className="results">
				{resultRecipes.map((recipe) => (
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
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Search;
