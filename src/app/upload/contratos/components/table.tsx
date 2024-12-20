"use client"
import { ContratoTable } from "@/service/contrato/contrato-table.entity";
import { InformationField } from "@/app/[region]/component/info-field";
import { ContratoAdapter } from "@/service/contrato/contrato.adapter";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { PopupContext } from "@/components/popup/popup-provider";
import { Button } from "@/components/input/button";
import { useContext, useState } from "react";
import styles from "./table.module.css";
import { Posto } from "@/types/posto";
import { v4 } from "uuid";


interface TableProps {
    cenario: string;
    data: ContratoTable[];
    ponto: string;
}

interface SumParam {
    contratoPonta: number;
    contratoForaPonta: number;
    demandaPonta: number;
    demandaForaPonta: number;
    ultimoContratoPonta: number;
    ultimoContratoForaPonta: number;
}

export const Table: React.FC<TableProps> = ({
    cenario,
    data,
    ponto
}) => {
    const api = new MustApiAdapter();
    const contratoAdapter = new ContratoAdapter(api);
    const popup = useContext(PopupContext);

    const payload: ContratoTable[] = structuredClone(data);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    

    const infoFieldPontaStyle: React.CSSProperties = {
        float: "left",
        marginLeft: "12px",
        width: "70px"
    }

    const infoFieldForaPontaStyle: React.CSSProperties = {
        float: "left",
        marginLeft: "3px",
        width: "70px"
    }

    const getSum = (key: keyof SumParam) => {
        let sum: number = 0;
        for (const param of data) {
            sum += parseFloat((param[key] || 0).toString());
        }
        return sum.toFixed(3);
    }

    const changeDataHandler = (idx: number, posto: "ponta" | "fora-ponta", key: keyof SumParam) => (event: React.ChangeEvent<HTMLInputElement>) => {
        for (let listIndex = 0; listIndex < payload.length; listIndex++) {
            if (listIndex === idx) continue;
            let ultimoContrato;
            if (posto === "ponta") ultimoContrato = payload[listIndex].ultimoContratoPonta;
            else ultimoContrato = payload[listIndex].ultimoContratoForaPonta;

            let value = parseFloat(event.target.value) || 0;
            if (value < ultimoContrato && parseInt(payload[listIndex].data.toString().slice(5, 7)) < 7) value = ultimoContrato; 
            const input: HTMLInputElement | null = document.querySelector(`#contrato-${posto}-${listIndex}`);
            if (input) {
                payload[listIndex][key] = value;
                input.value = value.toString();
            }
        }
    }

    const onBlurEventHandler = (idx: number, posto: "ponta" | "fora-ponta", key: keyof SumParam) => () => {
        if (payload.length <= 1) return;
        if (idx < 6) {
            const value = idx === 0 ? 1 : 0;
            const input: HTMLInputElement | null = document.querySelector(`#contrato-${posto}-${idx}`);
            if (input) {
                payload[idx][key] = payload[value][key];
                input.value = payload[value][key].toString();
            }
        }
        else {
            const value = idx === 6 ? 7 : 6;
            const input: HTMLInputElement | null = document.querySelector(`#contrato-${posto}-${idx}`);
            if (input) {
                payload[idx][key] = payload[value][key];
                input.value = payload[value][key].toString();
            }
        }
        
        for (let listIndex = 5; listIndex < payload.length; listIndex++) {
            let ultimoContrato;
            if (posto === "ponta") ultimoContrato = payload[listIndex].ultimoContratoPonta;
            else ultimoContrato = payload[listIndex].ultimoContratoForaPonta;
            if (payload[listIndex][key] < ultimoContrato*0.9) {
                const input: HTMLInputElement | null = document.querySelector(`#contrato-${posto}-${listIndex}`);
                if (input) {
                    payload[listIndex][key] = ultimoContrato*0.9;
                    input.value = (ultimoContrato*0.9).toFixed(3).toString();
                }
            } 
        }
    }
    

    const buttonClickHandler = async () => {
        setIsLoading(true);
        try {
            for (const row of payload) {
                await contratoAdapter.saveByDemanda({ data: row.data.toString().slice(0, 10), cenario, ponto, valor: row.demandaPonta, posto: Posto.PONTA });
                await contratoAdapter.saveByDemanda({ data: row.data.toString().slice(0, 10), cenario, ponto, valor: row.demandaForaPonta, posto: Posto.FORA_PONTA });
            }
            window.location.reload();
        }
        catch(error) {
            popup("Erro", `Erro ao atualizar dados. ${(error as any).message}.`, "red");
        }
        setIsLoading(false);
    }

    return (
        <>
            <section className={styles["section"]} style={{ marginTop: "25px" }}>
                <section className={styles["header-container"]}>
                    <div className={styles["header-cell"]}></div>
                    <div className={styles["header-cell"]} style={{ color: "#3A6C72" }}>Demanda</div>
                    <div className={styles["header-cell"]} style={{ color: "#E88C1F" }}>Contrato</div>
                    <div className={styles["header-cell"]} style={{ color: "#E26032" }}>Contrato Anterior</div>
                </section>
                <section className={styles["sub-header-container"]}>
                    <div className={styles["header-cell"]}></div>
                    <div className={`${styles["header-cell"]} ${styles["sub-header-cell"]}`} style={{ borderLeft: "solid 3px #000", marginLeft: "-2.5px" }}>
                        <div className={styles["sub-header-info-container"]}>
                            <InformationField title="Ponta"  style={infoFieldPontaStyle} value={getSum("demandaPonta")} />
                            <InformationField title="Fora Ponta" style={infoFieldForaPontaStyle} value={getSum("demandaForaPonta")} />
                        </div>
                    </div>
                    <div className={`${styles["header-cell"]} ${styles["sub-header-cell"]}`}>
                        <div className={styles["sub-header-info-container"]}>
                            <InformationField title="Ponta"  style={infoFieldPontaStyle} value={getSum("contratoPonta")} />
                            <InformationField title="Fora Ponta" style={infoFieldForaPontaStyle} value={getSum("contratoForaPonta")} />
                        </div>
                    </div>
                    <div className={`${styles["header-cell"]} ${styles["sub-header-cell"]}`} style={{ borderRight: "solid 3px #000" }}>
                        <div className={styles["sub-header-info-container"]}>
                            <InformationField title="Ponta"  style={infoFieldPontaStyle} value={getSum("ultimoContratoPonta")} />
                            <InformationField title="Fora Ponta" style={infoFieldForaPontaStyle} value={getSum("ultimoContratoForaPonta")} />
                        </div>
                    </div>
                </section>
                <section className={styles["body-container"]}>
                    {data.map((row, idx) => (
                        <div className={styles["row-container"]} key={`table-row-${v4()}`}>
                            <div className={styles["row-cell"]}>
                                <input className={styles["row-cell-content"]} style={{ borderLeft: "none" }} defaultValue={row.data.toString().slice(0, 10)} disabled />
                            </div>
                            <div className={styles["row-cell"]}>
                                <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.demandaPonta || 0).toString())} disabled/>
                                <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.demandaForaPonta || 0).toString())} disabled/>
                            </div>
                            <div className={styles["row-cell"]}>
                                <input id={`contrato-ponta-${idx}`} className={styles["row-cell-content"]} defaultValue={parseFloat((row.contratoPonta || 0).toString())} onBlur={onBlurEventHandler(idx, "ponta", "contratoPonta")} onChange={changeDataHandler(idx, "ponta", "contratoPonta")}/>
                                <input id={`contrato-fora-ponta-${idx}`} className={styles["row-cell-content"]} defaultValue={parseFloat((row.contratoForaPonta || 0).toString())} onBlur={onBlurEventHandler(idx, "fora-ponta", "contratoForaPonta")} onChange={changeDataHandler(idx, "fora-ponta", "contratoForaPonta")}/>
                            </div>
                            <div className={styles["row-cell"]}>
                                <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.ultimoContratoPonta || 0).toString())} disabled/>
                                <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.ultimoContratoForaPonta || 0).toString())} disabled/>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
            <section className={styles["section"]} style={{ marginTop: "0" }}>
                {
                    data.length > 0 &&
                    <Button onClick={buttonClickHandler} isLoading={isLoading}>
                        Atualizar dados
                    </Button>
                }
            </section>
        </>
    );
}