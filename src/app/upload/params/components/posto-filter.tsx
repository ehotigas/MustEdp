"use client"
import { GetFilterHeaderDto } from "@/service/param/dto/get-filter-header.dto";
import Dropdown from "@/components/input/Dropdown";
import styles from "./filters.module.css";
import { Posto } from "@/types/posto";


interface PostoFilterProps {
    ano: string;
    contrato: string;
    demanda: string;
    param: GetFilterHeaderDto;
    pontoOption: string[];
    ponto: string;
    posto: Posto;
}


export const PostoFilter: React.FC<PostoFilterProps> = ({
    ano,
    demanda,
    contrato,
    ponto,
    posto
}) => {
    

    const regionChangeEventHandler = (value: string) => {
        window.location.replace(`/upload/params?ponto=${ponto}&ano=${ano}&demanda=${demanda}&contrato=${contrato}&posto=${value}`);
    }
    
    return (
        <>
            <section className={styles["section"]}>
                <Dropdown defaultValue={posto} title="Posto" options={Object.values(Posto)} onChange={regionChangeEventHandler}/>
            </section>
        </>
    );
}