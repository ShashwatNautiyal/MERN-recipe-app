import "./App.css";
import Home from "./pages/Home/Home";
import Nav from "./components/Nav/Nav";
import Detail from "./pages/Detail/Detail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import AddRecipe from "./pages/AddRecipe/AddRecipe";
import EditRecipe from "./pages/EditRecipe/EditRecipe";
import Recipes from "./pages/Recipes/Recipes";
import Search from "./pages/Search/Search";

function App() {
	return (
		<Router>
			<div className="App">
				<Nav />
				<div>
					<Switch>
						<Route path="/" exact>
							<Home />
						</Route>
						<Route path="/search" exact>
							<Search />
						</Route>
						<Route path="/signin" exact>
							<Signin />
						</Route>
						<Route path="/signup" exact>
							<Signup />
						</Route>
						<Route path="/recipes" exact>
							<Recipes />
						</Route>
						<Route path="/recipes/add" exact>
							<AddRecipe />
						</Route>
						<Route path="/recipes/edit/:recipeId" exact>
							<EditRecipe />
						</Route>
						<Route path="/:recipeId">
							<Detail />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
