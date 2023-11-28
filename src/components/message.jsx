import { PropTypes } from "prop-types";

export const Message = ({ msg, type }) => {
  const checkType = (type) => {
    switch (type) {
      case "error":
        return "text-red-500";
      case "success":
        return "text-green-500";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="border-r-2 py-2 px-5 m-0 flex justify-center items-center">
      <span className={checkType(type)}>{msg}</span>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
