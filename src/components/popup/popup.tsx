import { useEffect, useState } from "react";
import styles from "./popup.module.css";

const PopupColor = {
    red: "#E32C2C",
    green: "#28FF52"
}

const bgColor = {
    red: "#e32c2c77",
    green: "#A9FFBA"
}

interface PopupProps {
    color: keyof (typeof PopupColor);
    id?: string;
    isOpen: boolean;
    onClose?: ()=>void;
    text: string;
    time?: number
    title: string;
}

export default function Popup(
    {
        color,
        id="popup",
        isOpen,
        onClose,
        time=15000,
        text,
        title
    }: PopupProps
) {
    const [seconds, setSeconds] = useState<number>(time);
    
    useEffect(() => {
        if (isOpen) {
            setSeconds(time);
        } 
    }, [isOpen]);

    useEffect(() => {
        if (seconds > 0) {
            const timeout = setTimeout(
                () => setSeconds(seconds - 10),
                10
            );
            return () => clearTimeout(timeout);
        }
        else {
            if (onClose) onClose();
        }
    }, [seconds]);

    const closeButtonClickHandler = () => {
        if (onClose) onClose();
    }
    
    return (
        <div
            className={styles.popupContainer}
            id={`${id}-container`}
            style={{
                boxShadow: isOpen ? "3px 3px 8px 5px #00000050" : undefined,
                transition: ".5s",
                width: isOpen ? "400px" : 0
            }}
        >
            {
                isOpen && <>

                    <div
                        className={styles.popupTitleContainer}
                        id={`${id}-title-container`}
                        style={{ backgroundColor: PopupColor[color] }}
                    >

                        <p className={styles.title}>
                            {title}
                        <button onClick={onClose} className="float-end mr-2 text-xl text-white" style={{ background: "transparent", border: "none" }}>X</button>
                        </p>
                    </div>
                    <div
                        className={styles.popupBodyContainer}
                        id={`${id}-body-container`}
                    >
                        {text}
                    </div>
                    <div
                        className={styles.popupFooterContainer}
                        id={`${id}-footer-container`}
                    >
                        <button
                            onClick={closeButtonClickHandler}
                        >
                            Ok
                        </button>
                    </div>
                    <div
                        className={styles.popupTimerContainer}
                        id={`${id}-timer-container`}
                        style={{
                            backgroundColor: bgColor[color]
                        }}
                    >
                        <div
                            className={styles.popupTimeBar}
                            id={`${id}-time-bar`}
                            style={{
                                backgroundColor: PopupColor[color],
                                width: `${(seconds/time)*100}%`
                            }}
                        ></div>
                    </div>
                </>
            }
        </div>
    );
}