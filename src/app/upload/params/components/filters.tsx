"use client"
import { GetFilterHeaderDto } from "@/service/param/dto/get-filter-header.dto";
import { CenarioData, DemandaChart, DemandaChartData } from "./demanda-chart";
import { InformationField } from "@/app/[region]/component/info-field";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { ParamAdapter } from "@/service/param/param.adapter";
import { Button } from "@/components/input/button";
import Dropdown from "@/components/input/dropdown";
import { FaChartColumn } from "react-icons/fa6";
import { BiSearchAlt } from "react-icons/bi";
import Modal from "@/components/modal/modal";
import styles from "./filters.module.css";
import { getColor } from "@/types/color";
import { Posto } from "@/types/posto";
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
    const api = new MustApiAdapter();
    const paramAdapter = new ParamAdapter(api);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [chartData, setChartData] = useState<DemandaChartData[]>([]);
    const [cenarios, setCenarios] = useState<CenarioData[]>([]);
    const [posto, setPosto] = useState<Posto>(Posto.PONTA);
    const [forms, setForms] = useState<FilterForm>({
        ponto: ponto,
        ano: ano,
        cenario: cenario
    });
    const pontoId = ponto.split(" - ")[0];

    const changeFilterValue = (key: keyof FilterForm) => (value: string) => {
        setForms({ ...forms, [key]: value });
    }

    const searchButtonClickHandler = () => {
        window.location.replace(`/upload/params?ponto=${forms.ponto}&ano=${forms.ano}&cenario=${forms.cenario}`);
    }

    const getData = async () => {
        const data = (await paramAdapter.findDemandaChart(pontoId, posto, parseInt(ano))).data;
        console.log(data);
        const distinctDate = new Set(data.map(value => value.data));
        const chartData: DemandaChartData[] = [];
        const cenario = new Set<string>();

        distinctDate.forEach((dateValue) => {
            const obj: DemandaChartData = { data: dateValue };
            data.forEach((value) => {
                cenario.add(value.cenario);
                if (value.data === dateValue) obj[value.cenario] = value.demanda;
            });
            chartData.push(obj);
        });

        const cenarioList: CenarioData[] = [];
        cenario.forEach((cenario: string) => {
            cenarioList.push({
                name: cenario,
                color: getColor(cenario)
            })
        });
        setChartData(chartData);
        setCenarios(cenarioList);
    }

    const chartButtonClickHandler = async () => {
        if (chartData.length === 0) await getData();
        setIsOpen(true);
    }

    const onModalCloseHandler = () => {
        setIsOpen(false);
    }

    const postoButtonClickHandler = (posto: Posto) => async () => {
        setPosto(posto);
        await getData();
    }
    
    return (
        <>
            <Modal isOpen={isOpen} onClose={onModalCloseHandler} style={{ height: "415px" }}>
                <h1 className={styles["chart-title"]}>
                    {`Gráfico de demanda`}
                </h1>
                <div className={styles["chart-info-container"]}>
                    <div style={{ margin: "0 auto", width: "max-content" }}>
                        <InformationField title="Ponto" value={pontoId} style={{ float: "left", width: "min-content" }} />
                        <InformationField title="Ano" value={ano} style={{ float: "left", marginLeft: "20px", width: "min-content" }} />
                    </div>
                </div>
                <div className={styles["chart-info-container"]}>
                    <Button
                        onClick={postoButtonClickHandler(Posto.PONTA)}
                        style={{ background: posto === Posto.PONTA ? `#212E3E` : "transparent", color: posto === Posto.PONTA ? "#fff" : "#000", height: "20px", marginRight: "7.5px", width: "70px" }}
                    >
                        Ponta
                    </Button>
                    <Button
                        onClick={postoButtonClickHandler(Posto.FORA_PONTA)}
                        style={{ background: posto === Posto.FORA_PONTA ? `#212E3E` : "transparent", color: posto === Posto.FORA_PONTA ? "#fff" : "#000", height: "20px", marginLeft: "7.5px", width: "70px" }}
                    >
                        Fora Ponta
                    </Button>
                </div>
                <div style={{ width: '100%', height: '250px', float: "left", fontSize: "12px" }}>
                    <DemandaChart cenarios={cenarios} data={chartData} />
                </div>
            </Modal>
            <section className={styles["section"]}>
                <Dropdown defaultValue={ponto  || "Selecione um ponto"} title="Ponto" onChange={changeFilterValue("ponto")} options={pontoOption}/>
                <Dropdown defaultValue={ano || "Selecione um ano"} title="Ano" options={param.ano} onChange={changeFilterValue("ano")} style={{ marginLeft: "15px" }}/>
                <Dropdown defaultValue={cenario || "Selecione um cenário"} title="Cenário" options={param.cenario} onChange={changeFilterValue("cenario")} style={{ marginLeft: "15px" }}/>
                <Button onClick={searchButtonClickHandler} style={{ height: "35px", float: "left", marginBottom: "11px", marginLeft: "15px", width: "35px" }}>
                    <BiSearchAlt className={styles["search-icon"]} />
                </Button>
                <Button onClick={chartButtonClickHandler} style={{ backgroundColor: "#212E3E", color: "#fff", height: "35px", float: "left", marginBottom: "11px", marginLeft: "15px", width: "35px" }}>
                    <FaChartColumn className={styles["chart-icon"]} />
                </Button>
            </section>
        </>
    );
}