"use client"
import Dropdown from "@/components/input/dropdown";
import { Region } from "@/types/region";
import { generateUrl } from "../page";

interface FiltroSimuladorProps {
    contrato: string;
    options: string[];
    periodo?: string;
    region: Region;
}


export const FiltroSimulador: React.FC<FiltroSimuladorProps> = ({
    contrato,
    region,
    periodo,
    options
}) => {
    const changePeriodoHandler = (value: string) => {
        window.location.replace(generateUrl(region, value, contrato));
    }

    return (
        <section style={{ float: "left", marginBottom: "15px", marginLeft: "5%", marginTop: "15px", width: "90%" }}>
            <Dropdown defaultValue={periodo ? periodo : "Selecione o período"} onChange={changePeriodoHandler} options={options} title="Período"/>
        </section>
    );
}