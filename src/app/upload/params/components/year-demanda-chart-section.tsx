"use client"
import { PenalityChartDto } from "@/service/simulador/dto/penality-chart.dto";
import { YearDemandChart, YearDemandType } from "./year-demand-chart";
import styles from "./year-demanda-chart-section.module.css";
import { Posto } from "@/types/posto";


interface YearDemandaChartSection {
    data: PenalityChartDto[];
    posto: Posto;
}

export const YearDemandaChartSection: React.FC<YearDemandaChartSection> = async ({ data, posto }) => {
    const formatData = (): YearDemandType[] => {
        switch (posto) {
            case Posto.PONTA: return data.map((value) => ({
                data: value.data,
                contrato: value.contratoPonta,
                demanda: value.demandaPonta,
                eust: value.eustPonta,
                penalidades: parseFloat(value.addPonta.toString()) +
                             parseFloat(value.piuPonta.toString()) +
                             parseFloat(value.pisPonta.toString())
            }));
            case Posto.FORA_PONTA: return data.map((value) => ({
                data: value.data,
                contrato: value.contratoForaPonta,
                demanda: value.demandaForaPonta,
                eust: parseFloat(value.eustForaPonta.toString()),
                penalidades: parseFloat(value.addForaPonta.toString()) +
                             parseFloat(value.piuForaPonta.toString()) +
                             parseFloat(value.pisForaPonta.toString())
            }));
            default: return data.map((value) => ({
                data: value.data,
                contrato: Math.max(parseFloat(value.contratoPonta.toString() || "0"), parseFloat(value.contratoForaPonta.toString() || "0")),
                demanda: Math.max(parseFloat(value.demandaPonta.toString() || "0"), parseFloat(value.demandaForaPonta.toString() || "0")),
                eust: Math.max(parseFloat(value.eustPonta.toString() || "0"), parseFloat(value.eustForaPonta.toString() || "0")),
                penalidades: parseFloat(value.addPonta.toString() || "0") + parseFloat(value.addForaPonta.toString() || "0") +
                             parseFloat(value.piuPonta.toString() || "0") + parseFloat(value.piuForaPonta.toString() || "0") +
                             parseFloat(value.pisPonta.toString() || "0") + parseFloat(value.pisForaPonta.toString() || "0")
            }));
        }
    }

    return (
        <>
            <section className={styles["section"]}>
                <YearDemandChart data={formatData()} />
            </section>
        </>
    )
}