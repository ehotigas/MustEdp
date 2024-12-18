import { IoCloudUploadOutline } from "react-icons/io5";
import styles from "./File.module.css";
import { useState } from "react";

interface FileProps {
    onChange?: (file: File | null) => void
    style?: React.CSSProperties
}

export default function File(
    {
        onChange,
        style
    }: FileProps
) {
    const [isActive, setIsActive] = useState(false);
    const [currentFile, setCurrentFile] = useState<string>("extensão .csv")

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsActive(true);
    };

    const handleDragLeave = () => {
        setIsActive(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsActive(false);
        const files = e.dataTransfer.files;
        handleFiles(files);
    };

    const handleFiles = async (files: FileList | null) => {
        if (files) {
            onChange && onChange(files[files.length - 1]);
            setCurrentFile(files[files.length - 1].name)
        }
        else {
            onChange && onChange(null);
        }
    };

    const handleClick = () => {
        if (document.getElementById('file-input')) {
            document.getElementById('file-input')?.click();
        }
    };
    return (
        <div
            className={`${styles.dropZone} ${isActive ? styles.active : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            style={style}
        >
        <div className={styles.iconContainer}>
            <IoCloudUploadOutline className={styles.icon} />
        </div>
        <div className={styles.textContainer}>
            <p className={styles.title}>
                Envie sua base aqui
            </p>
            <p className={styles.subTitle}>
                {currentFile}
            </p>
        </div>
        <div className={styles.buttonContainer}>
            <button className={styles.button}>
                Procurar Arquivos
            </button>
        </div>
        <input
            type="file"
            id="file-input"
            className={styles.fileInput}
            multiple
            onChange={(e) => handleFiles(e.target.files)}
        />
        </div>
    );
}