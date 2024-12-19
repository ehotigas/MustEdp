"use client"
import { GetFilterHeaderDto } from "@/service/param/dto/get-filter-header.dto";
import { Button } from "@/components/input/button";
import Dropdown from "@/components/input/dropdown";
import { BiSearchAlt } from "react-icons/bi";
import styles from "./filters.module.css";
import { useState } from "react";


interface FilterProps {
    ano: string;
    cenario: string;
    param: GetFilterHeaderDto;
    pontoOption: string[];
    ponto: string;
}

type FilterForm = {
    ponto: string;
    ano: string;
    cenario: string;
}


export const Filters: React.FC<FilterProps> = ({
    ano,
    cenario,
    param,
    pontoOption,
    ponto,
}) => {
    const [forms, setForms] = useState<FilterForm>({
        ponto: ponto,
        ano: ano,
        cenario: cenario
    });

    const changeFilterValue = (key: keyof FilterForm) => (value: string) => {
        setForms({ ...forms, [key]: value });
    }

    const searchButtonClickHandler = () => {
        window.location.replace(`/upload/params?ponto=${forms.ponto}&ano=${forms.ano}&cenario=${forms.cenario}`);
    }

    
    return (
        <>
            <section className={styles["section"]}>
                <Dropdown defaultValue={ponto  || "Selecione um ponto"} title="Ponto" onChange={changeFilterValue("ponto")} options={pontoOption}/>
                <Dropdown defaultValue={ano || "Selecione um ano"} title="Ano" options={param.ano} onChange={changeFilterValue("ano")} style={{ marginLeft: "15px" }}/>
                <Dropdown defaultValue={cenario || "Selecione um cenário"} title="Cenário" options={param.cenario} onChange={changeFilterValue("cenario")} style={{ marginLeft: "15px" }}/>
                <Button onClick={searchButtonClickHandler} style={{ height: "35px", marginLeft: "15px", width: "35px" }}>
                    <BiSearchAlt className={styles["search-icon"]} />
                </Button>
            </section>
        </>
    );
}