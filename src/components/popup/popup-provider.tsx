"use client"
import { createContext, useState } from "react";
import Popup from "@/components/popup/popup";

export const PopupContext = createContext((
    title: string,
    text: string,
    color: "red" | "green",
    time: number = 15000
) => { console.log(title, text, color, time) });

interface PopupProviderProps {
    children?: React.ReactNode
}

export default function PopupProvider( {children}: PopupProviderProps) {
    
    const [isOpen, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [color, setColor] = useState<"red" | "green">("green");
    const [time, setTime] = useState<number>(15000);

    const onClose = () => {
        setOpen(false);
    }

    const openPopup = (
        title: string,
        text: string,
        color: "red" | "green",
        time: number = 15000
    ) => {
        setOpen(true);
        setTitle(title);
        setText(text);
        setColor(color);
        setTime(time);
    }
    return (
        <PopupContext.Provider value={openPopup}>
            <Popup
                color={color}
                isOpen={isOpen}
                onClose={onClose}
                text={text}
                time={time}
                title={title}
            />
            {children}
        </PopupContext.Provider>
    );
}
