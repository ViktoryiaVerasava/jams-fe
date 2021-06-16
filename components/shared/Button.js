import styles from "../../styles/shared/Button.module.css";

const Button = ({ label, onClick, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={styles.button}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
