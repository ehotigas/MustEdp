import { ImSpinner8 } from "react-icons/im";
import styles from "./button.module.css";

interface ButtonProps {
    children?: React.ReactNode;
    isLoading?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    isLoading,
    onClick,
    style
}) => {
    const buttonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!isLoading && onClick) {
            onClick(event);
        }
    }
    return (
        <button className={styles["button"]} onClick={buttonClickHandler} style={style}>
            {
                isLoading ? <ImSpinner8 className={styles["spinner"]} /> : children
            }
        </button>
    );
}