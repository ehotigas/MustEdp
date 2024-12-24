"use client"
import Dropdown from "@/components/input/dropdown";
import styles from "./contrato-filter.module.css";
import { Region } from "@/types/region";
import { generateUrl } from "../page";


interface ContratoFilterProps {
    contrato?: string;
    options: string[];
    periodo?: string;
    region: Region;
}


export const ContratoFilter: React.FC<ContratoFilterProps> = ({
    contrato,
    options,
    periodo,
    region
}) => {
    const contratoChangeEventHandler = (value: string) => {
        window.location.replace(generateUrl(region, periodo, value));
    }
    return (
        <section className={styles["section"]}>
            <Dropdown defaultValue={contrato ? contrato : "Selecione um cenário"} title="Contrato" onChange={contratoChangeEventHandler} options={options} />
        </section>
    );
}