"use client"
import { useEffect, useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import styles from "./dropdown.module.css";
import { uuid } from "uuidv4";

interface DropdownProps {
    defaultValue?: string;
    onChange?: (value: string) => void;
    options: string[];
    style?: React.CSSProperties;
    title?: string;
}

export default function Dropdown(
    {
        defaultValue,
        onChange,
        options,
        style,
        title
    }: DropdownProps
) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(defaultValue === undefined ? options[0] : defaultValue);
    const ref = useRef<HTMLDivElement>(null);
    const optionRef = useRef<HTMLDivElement>(null);

    const filterClickButtonHandler = () => {
        setIsOpen(true);
    }

    const clickOutHandler = (event: MouseEvent) => {
        if (
            ref.current &&
            optionRef.current &&
            !ref.current.contains(event.target as Node) &&
            !optionRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickOutHandler);
        return () => document.removeEventListener("mousedown", clickOutHandler);
    }, []);

    const optionClickHandler = (value: string) => () => {
        setValue(value);
        onChange && onChange(value);
        setIsOpen(false);
    }
    return (
        <div className={styles.container} style={style}>
            <p className={styles.title}>{title}</p>
            <div
                className={styles.filterContainer}
                onClick={filterClickButtonHandler}
                ref={ref}
            >
                <MdArrowDropDown className={styles.filterIcon}/>
                <p className={styles.value}>{value}</p>
            </div>
            <div
                className={styles.optionsContainer}
                style={{
                    height: isOpen ? "min-content" : 0,
                    boxShadow: isOpen ? "2px 2px 8px 4px #03030321" : "none"
                }}
                ref={optionRef}
            >
                {
                    isOpen && options.map((element: string) => (
                        <div
                            className={styles.optionRow}
                            key={uuid()}
                            onClick={optionClickHandler(element)}
                        >
                            <p className={styles.option}>
                                {element}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}