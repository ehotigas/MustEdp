"use client"
import { DemandaChart as DemandaChartType } from "@/service/param/demanda-chart.entity";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { CenarioData, DemandaChartData } from "./demanda-chart";
import { ParamAdapter } from "@/service/param/param.adapter";
import styles from "./year-demanda-chart-section.module.css";
import { YearDemandaChart } from "./year-demanda-chart";
import Dropdown from "@/components/input/dropdown";
import { getColor } from "@/types/color";
import { Region } from "@/types/region";
import { Posto } from "@/types/posto";
import { useState } from "react";


interface YearDemandaChartSection {
}

type ChartProps = { cenario: CenarioData[], data: DemandaChartData[] };

export const YearDemandaChartSection: React.FC<YearDemandaChartSection> = async () => {
    const api = new MustApiAdapter();
    const paramAdapter = new ParamAdapter(api);
    const [ponta, setPonta] = useState<ChartProps>({ cenario: [], data: [] });
    const [foraPonta, setForaPonta] = useState<ChartProps>({ cenario: [], data: [] });

    const formatData = (data: DemandaChartType[]): ChartProps => {
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
        return {
            cenario: cenarioList,
            data: chartData
        }
    }
    const regionChangeEventHandler = async (value: string) => {
        const ponta = (await paramAdapter.findYearDemandaChart(value as Region, Posto.PONTA)).data;
        const foraPonta = (await paramAdapter.findYearDemandaChart(value as Region, Posto.FORA_PONTA)).data;
        setPonta(formatData(ponta));
        setForaPonta(formatData(foraPonta));
    }

    return (
        <>
            <section className={styles["section"]}>
                <Dropdown defaultValue="Selecione a região" title="Região" options={["SP", "ES"]} onChange={regionChangeEventHandler}/>
            </section>
            <section className={styles["section"]}>
                <div className={styles["chart-container"]}>
                    <h1 className={styles["title"]}>
                        Ponta MW
                    </h1>
                    <div style={{ width: '100%', height: '250px', float: "left", fontSize: "12px" }}>
                        <YearDemandaChart cenarios={ponta.cenario} data={ponta.data} />
                    </div>
                </div>
                <div className={styles["chart-container"]}>
                    <h1 className={styles["title"]}>
                        Fora Ponta MW
                    </h1>
                    <div style={{ width: '100%', height: '250px', float: "left", fontSize: "12px" }}>
                        <YearDemandaChart cenarios={foraPonta.cenario} data={foraPonta.data} />
                    </div>
                </div>
            </section>
        </>
    )
}