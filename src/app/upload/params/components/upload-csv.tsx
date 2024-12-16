"use client";
import Dropdown from "@/components/input/dropdown";
import styles from "./upload-csv.module.css";
import { Region } from "@/types/region";

interface UploadCsvProps {
    region: Region;
}

export const UploadCsv: React.FC<UploadCsvProps> = ({
    region
}) => {
    const regionChangeEventHandler = (value: string) => {
        window.location.replace(`/upload/params?region=${value}`);
    }

    return (
        <>
            <section className={styles["section"]} style={{ marginTop: "15px" }}>
                <Dropdown defaultValue={region} options={["SP", "ES"]} onChange={regionChangeEventHandler} title="Escolha a Região" />
            </section>
            <section className={styles["section"]} style={{ marginTop: "15px" }}>

            </section>
        </>
    )
}