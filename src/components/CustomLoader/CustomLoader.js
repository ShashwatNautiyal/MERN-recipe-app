import Loader from "react-loader-spinner";
import "./CustomLoader.css";

const CustomLoader = () => {
	return <Loader className="spinner" type="Oval" color="#333333" height={130} width={130} />;
};

export default CustomLoader;
