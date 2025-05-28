"use client"
import { GetFilterHeaderDto } from "@/service/param/dto/get-filter-header.dto";
import { Button } from "@/components/input/button";
import Dropdown from "@/components/input/Dropdown";
import { BiSearchAlt } from "react-icons/bi";
import styles from "./filters.module.css";
import { Posto } from "@/types/posto";
import { useState } from "react";


interface FilterProps {
    ano: string;
    contrato: string;
    demanda: string;
    param: GetFilterHeaderDto;
    pontoOption: string[];
    ponto: string;
    posto: Posto;
}

type FilterForm = {
    demanda: string;
    ponto: string;
    ano: string;
    contrato: string;
}


export const Filters: React.FC<FilterProps> = ({
    ano,
    demanda,
    contrato,
    param,
    pontoOption,
    ponto,
    posto,
}) => {
    const [forms, setForms] = useState<FilterForm>({
        ponto: ponto,
        ano: ano,
        demanda: demanda,
        contrato: contrato
    });

    const changeFilterValue = (key: keyof FilterForm) => (value: string) => {
        setForms({ ...forms, [key]: value });
    }

    const searchButtonClickHandler = () => {
        window.location.replace(`/upload/params?ponto=${forms.ponto}&ano=${forms.ano}&demanda=${forms.demanda}&contrato=${forms.contrato}&posto=${posto}`);
    }
    
    return (
        <>
            <section className={styles["section"]}>
                <Dropdown defaultValue={ponto  || "Selecione um ponto"} title="Ponto" onChange={changeFilterValue("ponto")} options={pontoOption}/>
                <Dropdown defaultValue={ano || "Selecione um ano"} title="Ano" options={param.ano} onChange={changeFilterValue("ano")} style={{ marginLeft: "10px" }}/>
                <Dropdown defaultValue={demanda || "Selecione uma demanda"} title="Demanda" options={param.demanda} onChange={changeFilterValue("demanda")} style={{ marginLeft: "10px" }}/>
                <Dropdown defaultValue={contrato || "Selecione um contrato"} title="Contrato" options={param.contrato} onChange={changeFilterValue("contrato")} style={{ marginLeft: "10px" }}/>
                <Button onClick={searchButtonClickHandler} style={{ height: "35px", float: "left", marginBottom: "11px", marginLeft: "10px", width: "35px" }}>
                    <BiSearchAlt className={styles["search-icon"]} />
                </Button>
            </section>
        </>
    );
}