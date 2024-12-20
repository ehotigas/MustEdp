import styles from "./modal.module.css";

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  style?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  onClose,
  style
}) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const height = style?.height ? `calc(${style.height} - 10px)` : "390px";

  return (
    <div
      id='wrapper'
      className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ${styles["background-container"]}`}
      onClick={handleClose}
    >
      <div className={styles.container} style={style}>
        <button onClick={()=>onClose()} className={styles["close-icon"]}>X</button>
          <div className={styles["content-container"]} style={{ height: height }}>
            {children}
          </div>
      </div>
    </div>
  );
};

export default Modal;
