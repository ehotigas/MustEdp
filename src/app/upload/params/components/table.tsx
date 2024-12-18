"use client"
import { InformationField } from "@/app/[region]/component/info-field";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { PopupContext } from "@/components/popup/popup-provider";
import { ParamAdapter } from "@/service/param/param.adapter";
import { ParamTable } from "@/service/param/param-table.dto";
import { DataType } from "@/service/param/data-type";
import { Button } from "@/components/input/button";
import { useContext, useState } from "react";
import styles from "./table.module.css";
import { Posto } from "@/types/posto";
import { v4 } from "uuid";


interface TableProps {
    cenario: string;
    data: ParamTable[];
    ponto: string;
}

interface SumParam {
    demandaPonta: number;
    demandaForaPonta: number;
    confiabilidadePonta: number;
    confiabilidadeForaPonta: number;
    draPonta: number;
    draForaPonta: number;
    drpPonta: number;
    drpForaPonta: number;
}

export const Table: React.FC<TableProps> = ({
    cenario,
    data,
    ponto
}) => {
    const api = new MustApiAdapter();
    const paramAdapter = new ParamAdapter(api);
    const popup = useContext(PopupContext);

    const payload: ParamTable[] = structuredClone(data);
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

    const changeDataHandler = (index: number, key: keyof SumParam) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) || 0;
        payload[index][key] = value;
    }
    

    const buttonClickHandler = async () => {
        setIsLoading(true);
        try {
            for (const row of payload) {
                await paramAdapter.save({ data: row.data.toString().slice(0, 10), cenario, ponto, tipoDado: DataType.DEMANDA, valor: row.demandaPonta, posto: Posto.PONTA });
                await paramAdapter.save({ data: row.data.toString().slice(0, 10), cenario, ponto, tipoDado: DataType.DEMANDA, valor: row.demandaForaPonta, posto: Posto.FORA_PONTA });
                await paramAdapter.save({ data: row.data.toString().slice(0, 10), cenario, ponto, tipoDado: DataType.CONFIABILIDADE, valor: row.confiabilidadePonta, posto: Posto.PONTA });
                await paramAdapter.save({ data: row.data.toString().slice(0, 10), cenario, ponto, tipoDado: DataType.CONFIABILIDADE, valor: row.confiabilidadeForaPonta, posto: Posto.FORA_PONTA });
                await paramAdapter.save({ data: row.data.toString().slice(0, 10), cenario: 'DRA', ponto, tipoDado: DataType.TARIFA, valor: row.draPonta, posto: Posto.PONTA });
                await paramAdapter.save({ data: row.data.toString().slice(0, 10), cenario: 'DRA', ponto, tipoDado: DataType.TARIFA, valor: row.draForaPonta, posto: Posto.FORA_PONTA });
                await paramAdapter.save({ data: row.data.toString().slice(0, 10), cenario: 'DRP', ponto, tipoDado: DataType.TARIFA, valor: row.drpPonta, posto: Posto.PONTA });
                await paramAdapter.save({ data: row.data.toString().slice(0, 10), cenario: 'DRP', ponto, tipoDado: DataType.TARIFA, valor: row.drpForaPonta, posto: Posto.FORA_PONTA });
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
                    <div className={styles["header-cell"]} style={{ color: "#E88C1F" }}>Confiabilidade</div>
                    <div className={styles["header-cell"]} style={{ color: "#E26032" }}>Tarifa Dra</div>
                    <div className={styles["header-cell"]} style={{ color: "#E26032" }}>Tarifa Drp</div>
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
                            <InformationField title="Ponta"  style={infoFieldPontaStyle} value={getSum("confiabilidadePonta")} />
                            <InformationField title="Fora Ponta" style={infoFieldForaPontaStyle} value={getSum("confiabilidadeForaPonta")} />
                        </div>
                    </div>
                    <div className={`${styles["header-cell"]} ${styles["sub-header-cell"]}`}>
                        <div className={styles["sub-header-info-container"]}>
                            <InformationField title="Ponta"  style={infoFieldPontaStyle} value={getSum("draPonta")} />
                            <InformationField title="Fora Ponta" style={infoFieldForaPontaStyle} value={getSum("draForaPonta")} />
                        </div>
                    </div>
                    <div className={`${styles["header-cell"]} ${styles["sub-header-cell"]}`} style={{ borderRight: "solid 3px #000", width: "calc(20% - 1.5px)" }}>
                        <div className={styles["sub-header-info-container"]}>
                            <InformationField title="Ponta"  style={infoFieldPontaStyle} value={getSum("drpPonta")} />
                            <InformationField title="Fora Ponta" style={infoFieldForaPontaStyle} value={getSum("drpForaPonta")} />
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
                                <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.demandaPonta || 0).toString())} onChange={changeDataHandler(idx, "demandaPonta")}/>
                                <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.demandaForaPonta || 0).toString())} onChange={changeDataHandler(idx, "demandaForaPonta")}/>
                            </div>
                            <div className={styles["row-cell"]}>
                                <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.confiabilidadePonta || 0).toString())} onChange={changeDataHandler(idx, "confiabilidadePonta")}/>
                                <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.confiabilidadeForaPonta || 0).toString())} onChange={changeDataHandler(idx, "confiabilidadeForaPonta")}/>
                                </div>
                            <div className={styles["row-cell"]}>
                                <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.draPonta || 0).toString())} onChange={changeDataHandler(idx, "draPonta")}/>
                                <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.draForaPonta || 0).toString())} onChange={changeDataHandler(idx, "draForaPonta")}/>
                            </div>
                            <div className={styles["row-cell"]}>
                                <input className={styles["row-cell-content"]} style={{ borderRight: "none" }} defaultValue={parseFloat((row.drpPonta || 0).toString())} onChange={changeDataHandler(idx, "drpPonta")}/>
                                <input className={styles["row-cell-content"]} style={{ borderRight: "none" }} defaultValue={parseFloat((row.drpForaPonta || 0).toString())} onChange={changeDataHandler(idx, "drpForaPonta")}/>
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