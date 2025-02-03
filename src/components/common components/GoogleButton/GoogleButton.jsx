import Google from "../../../assets/google.svg";

const GoogleButton = ({ onSelect, cssClasses, image, children }) => {
  return (
    <button
      onClick={onSelect}
      className={`border-none text-base text-center flex items-center justify-center gap-4 shadow-md hover:shadow-lg transition-shadow ${cssClasses}`}
    >
      <img src={Google} alt="Google icon" height={26} width={26} />
      {children}
    </button>
  );
};

export default GoogleButton;
