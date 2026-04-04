
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-overlay">
      <Lottie animationData={heart} loop className="loader-icon" />
    </div>
  );
}

export default Loader;