import PropTypes from "prop-types";
import "./style.scss";

const Logo = ({ size }) => (
  <div className="Logo" style={{ fontSize: size === "large" ? "32px" : "28px", fontWeight: 700 }}>
  <span style={{ color: "#3300FF", fontWeight: 700 }}>724</span>
  <span style={{ color: "#613CFB", fontWeight: 400 }}>events</span>
</div>
);

Logo.propTypes = {
  size: PropTypes.string,
};

Logo.defaultProps = {
  size: "small",
};

export default Logo;