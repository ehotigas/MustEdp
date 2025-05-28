"use client"
import { PenalityChartDto } from "@/service/simulador/dto/penality-chart.dto";
import { PenalityChart, PenalityChartType } from "./penality-chart";
import styles from "./year-demanda-chart-section.module.css";
import { Posto } from "@/types/posto";


interface PenalityChartSectionProps {
    data: PenalityChartDto[];
    posto: Posto;
}

export const PenalityChartSection: React.FC<PenalityChartSectionProps> = async ({ data, posto }) => {
    const formatData = (): PenalityChartType[] => {
        switch (posto) {
            case Posto.PONTA: return data.map((value) => ({
                data: value.data,
                contrato: value.contratoPonta,
                demanda: value.demandaPonta,
                eust: value.eustPonta,
                add: value.addPonta,
                piu: value.piuPonta,
                pis: value.pisPonta
            }));
            case Posto.FORA_PONTA: return data.map((value) => ({
                data: value.data,
                contrato: value.contratoForaPonta,
                demanda: value.demandaForaPonta,
                eust: parseFloat(value.eustForaPonta.toString()),
                add: parseFloat(value.addForaPonta.toString()),
                piu: parseFloat(value.piuForaPonta.toString()),
                pis: parseFloat(value.pisForaPonta.toString()),
            }));
            default: return data.map((value) => ({
                data: value.data,
                contrato: parseFloat(value.contratoPonta.toString() || "0") + parseFloat(value.contratoForaPonta.toString() || "0"),
                demanda: parseFloat(value.demandaPonta.toString() || "0") + parseFloat(value.demandaForaPonta.toString() || "0"),
                eust: parseFloat(value.eustPonta.toString() || "0") + parseFloat(value.eustForaPonta.toString() || "0"),
                add: parseFloat(value.addPonta.toString() || "0") + parseFloat(value.addForaPonta.toString() || "0"),
                piu: parseFloat(value.piuPonta.toString() || "0") + parseFloat(value.piuForaPonta.toString() || "0"),
                pis: parseFloat(value.pisPonta.toString() || "0") + parseFloat(value.pisForaPonta.toString() || "0"),
            }));
        }
    }

    return (
        <>
            <section className={styles["section"]}>
                <PenalityChart data={formatData()} />
            </section>
        </>
    )
}