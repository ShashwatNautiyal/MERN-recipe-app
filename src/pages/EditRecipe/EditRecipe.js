import "./EditRecipe.css";
import addNowLogo from "../../assets/Group 10.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { userInfo } from "../../utils/userInfo";
import { useHistory, useParams } from "react-router";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const AddRecipe = () => {
	const [recipeDetails, setRecipeDetails] = useState({
		image: null,
		name: "",
		description: "",
		time: "",
		serves: "",
		ingredients: [""],
		steps: [""],
		userId: userInfo()._id,
	});

	let { recipeId } = useParams();
	const history = useHistory();
	const [handleLoader, setHandleLoader] = useState(false);

	useEffect(() => {
		setHandleLoader(true);
		axios.get(process.env.REACT_APP_BASE_URL + "/recipes/" + recipeId).then((response) => {
			const data = response.data;
			setRecipeDetails({
				image: data.image,
				name: data.name,
				description: data.description,
				time: data.time,
				serves: data.serves,
				steps: data.steps,
				ingredients: data.ingredients,
				userId: userInfo()._id,
			});
			setHandleLoader(false);
		});
		// eslint-disable-next-line
	}, []);

	const handleChange = (e) => {
		setRecipeDetails((prev) => {
			let data = {};
			if (e.target.name === "image") {
				data["image"] = e.target.files[0];
			} else if (e.target.name.includes("ingredients") || e.target.name.includes("steps")) {
				const name = e.target.name.split("-")[0];
				const index = e.target.name.split("-")[1];
				let arr = [...recipeDetails[name]];
				arr[index] = e.target.value;
				data[name] = arr;
			} else if (e.target.type === "number") {
				e.target.value !== "" ? (data[e.target.name] = parseInt(e.target.value)) : (data[e.target.name] = "");
			} else {
				data[e.target.name] = e.target.value;
			}
			return { ...prev, ...data };
		});
	};

	const addMore = (e) => {
		setRecipeDetails((prev) => {
			let data = [...recipeDetails[`${e}`]];
			data.push("");
			return {
				...prev,
				[e]: data,
			};
		});
	};

	const deleteOne = (e) => {
		setRecipeDetails((prev) => {
			let data = [...recipeDetails[`${e}`]];
			data.pop();
			return {
				...prev,
				[e]: data,
			};
		});
	};

	const handleSubmit = () => {
		setHandleLoader(true);
		let formData = new FormData();
		for (let key in recipeDetails) {
			if (recipeDetails[key] instanceof Array) {
				recipeDetails[key].map((item) => formData.append(key, item));
			} else {
				formData.append(key, recipeDetails[key]);
			}
		}
		formData.append("_id", recipeId);
		axios
			.put(process.env.REACT_APP_BASE_URL + "/recipes/" + recipeId, formData, {
				headers: {
					"auth-token": localStorage.getItem("user"),
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				console.log("Recipe added", response.data);
				setHandleLoader(false);
				history.push("/recipes");
			})
			.catch((error) => {
				console.log("Recipe error", error.response.data);
				setHandleLoader(false);
			});
	};

	function isObject(obj) {
		return obj === Object(obj);
	}

	return (
		<div className="editRecipe">
			{handleLoader && <CustomLoader />}
			<p>Edit your recipe</p>
			<div className="detailsCard">
				<div className="upload">
					<p>Upload picture</p>
					<label htmlFor="dishImage">
						{!recipeDetails.image ? (
							<img src={addNowLogo} alt="" />
						) : isObject(recipeDetails.image) ? (
							<img src={URL.createObjectURL(recipeDetails.image)} alt="" />
						) : (
							<img src={recipeDetails.image} alt="" />
						)}
					</label>
					<input onChange={(e) => handleChange(e)} id="dishImage" type="file" name="image" />
				</div>
				<div className="details">
					<p>Details</p>
					<div>
						<input
							value={recipeDetails.name}
							onChange={(e) => handleChange(e)}
							type="text"
							name="name"
							placeholder="Name"
						/>
						<textarea
							rows="5"
							value={recipeDetails.description}
							onChange={(e) => handleChange(e)}
							type="text"
							name="description"
							placeholder="Description"
						/>
						<div>
							<input
								value={recipeDetails.time}
								onChange={(e) => handleChange(e)}
								type="number"
								name="time"
								placeholder="Time"
							/>
							<input
								value={recipeDetails.serves}
								onChange={(e) => handleChange(e)}
								type="number"
								name="serves"
								placeholder="Serves"
							/>
						</div>
					</div>
				</div>
				<div className="details">
					<p>Ingredients</p>
					<div>
						{recipeDetails.ingredients.map((item, index) => (
							<input
								key={index}
								value={recipeDetails.ingredients[index]}
								onChange={(e) => handleChange(e)}
								type="text"
								name={`ingredients-${index}`}
								placeholder=""
							/>
						))}
					</div>
					<div style={{ display: "flex" }}>
						<button onClick={() => addMore("ingredients")}>Add</button>
						<button onClick={() => deleteOne("ingredients")}>Delete</button>
					</div>
				</div>
				<div className="details">
					<p>Steps</p>
					<div>
						{recipeDetails.steps.map((item, index) => (
							<textarea
								rows="4"
								key={index}
								value={recipeDetails.steps[index]}
								onChange={(e) => handleChange(e)}
								type="text"
								name={`steps-${index}`}
								placeholder={`Step ${index + 1}`}
							/>
						))}
					</div>
					<div style={{ display: "flex" }}>
						<button onClick={() => addMore("steps")}>Add</button>
						<button onClick={() => deleteOne("steps")}>Delete</button>
					</div>
				</div>
			</div>
			<button onClick={handleSubmit}>UPDATE</button>
		</div>
	);
};

export default AddRecipe;
