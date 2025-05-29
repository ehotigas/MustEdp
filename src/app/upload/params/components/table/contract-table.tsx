"use client"
import { InformationField } from "@/app/[region]/component/info-field";
import { ContratoAdapter } from "@/service/contrato/contrato.adapter";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { forwardRef, useImperativeHandle, useState } from "react";
import { ParamTable } from "@/service/param/param-table.dto";
import styles from "./table.module.css";
import { Posto } from "@/types/posto";

type ContractTableProps = {
    cenario: string;
    data: ParamTable[];
    ponto: string;
};

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

export type ContractTableHandle = {
    save: () => Promise<void>;
};


export const ContractTable = forwardRef<ContractTableHandle, ContractTableProps> (
    ({ cenario, data, ponto }, ref) => {
        const api = new MustApiAdapter();
        const contratoAdapter = new ContratoAdapter(api);
        
        const [inputData, setInputData] = useState<ParamTable[]>(structuredClone(data));

        const contractChangeEventHandler = (posto: Posto) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const copy = [...inputData];
            let key: "contratoPonta" | "contratoForaPonta" = "contratoPonta";
            let id = "ponta";
            if (posto === Posto.FORA_PONTA) {
                key = "contratoForaPonta";
                id = "fora-ponta";
            }
            for (let inputIdx = 0; inputIdx < data.length; inputIdx++) {
                inputData[inputIdx][key] = parseFloat(e.target.value);
                const input: HTMLInputElement | null = document.querySelector(`#input-contrato-${inputIdx}-${id}`);
                if (input) input.value = e.target.value;
            }
            setInputData(copy);
        }

        const onBlur = (posto: Posto) => () => {
            let key: "contratoPonta" | "contratoForaPonta" = "contratoPonta";
            let ultimoContratoKey: "contratoAnteriorPonta" | "contratoAnteriorForaPonta" = "contratoAnteriorPonta";
            let id = "ponta";
            if (posto === Posto.FORA_PONTA) {
                key = "contratoForaPonta";
                id = "fora-ponta";
                ultimoContratoKey = "contratoAnteriorForaPonta";
            }
            const ultimoContrato = parseFloat((data[data.length - 1][ultimoContratoKey]).toString());
            const contrato = inputData[data.length - 1][key];
            for (let inputIdx = 0; inputIdx < data.length; inputIdx++) {
                if (contrato < ultimoContrato && new Date(inputData[inputIdx].data).getUTCMonth() <= 5) {
                    inputData[inputIdx][key] = ultimoContrato;
                    const input: HTMLInputElement | null = document.querySelector(`#input-contrato-${inputIdx}-${id}`);
                    if (input) input.value = ultimoContrato.toString();
                }
                else if (contrato < ultimoContrato*0.9 && new Date(inputData[inputIdx].data).getUTCMonth() > 5) {
                    inputData[inputIdx][key] = ultimoContrato*.9;
                    const input: HTMLInputElement | null = document.querySelector(`#input-contrato-${inputIdx}-${id}`);
                    if (input) input.value = (ultimoContrato*.9).toString();
                }
            }
        }
        
        
        const save = async () => {
            // console.log(inputData);
            for (const row of inputData) {
                await contratoAdapter.saveByDemanda({ data: row.data.toString().slice(0, 10), cenario, ponto, valor: row.contratoPonta, posto: Posto.PONTA });
                await contratoAdapter.saveByDemanda({ data: row.data.toString().slice(0, 10), cenario, ponto, valor: row.contratoForaPonta, posto: Posto.FORA_PONTA });
            }
            console.log(`contrato`, inputData);
        };
        
        useImperativeHandle(ref, () => ({
            save
        }));
        return (
            <div className={styles["demand-contract-table-container"]}>
                <h1 className={styles["header-cell"]} style={{ color: "#E88C1F" }}>
                    Contrato
                </h1>
                <div className={styles["subheader-container"]} style={{ borderRight: "solid 1px #000" }}>
                    <div className={styles["sub-header-info-container"]}>
                        <InformationField title="Ponta"  style={infoFieldPontaStyle} value={"0.000"} />
                        <InformationField title="Fora Ponta" style={infoFieldForaPontaStyle} value={"0.000"} />
                    </div>
                </div>
                <div className={styles["body-container"]} style={{ borderBottom: "solid 2px #000", borderLeft: "solid 2px #000", borderRight: "solid 1px #000" }}>
                {
                    data.map((row, idx) => (
                        <div className={styles["row-container"]} key={`@contract-row-${idx}`}>
                            <div className={styles["row-cell"]}>
                            <input
                                id={`input-contrato-${idx}-ponta`}
                                className={styles["row-cell-content"]}
                                defaultValue={parseFloat((row.contratoPonta || 0).toString())}
                                onChange={contractChangeEventHandler(Posto.PONTA)}
                                onBlur={onBlur(Posto.PONTA)}
                            />
                            <input
                                id={`input-contrato-${idx}-fora-ponta`}
                                className={styles["row-cell-content"]}
                                defaultValue={parseFloat((row.contratoForaPonta || 0).toString())}
                                onChange={contractChangeEventHandler(Posto.FORA_PONTA)}
                                onBlur={onBlur(Posto.FORA_PONTA)}
                            />
                            </div>
                        </div>
                        
                    ))
                }
                </div>
            </div>
        );
    }
);

ContractTable.displayName = "ContractTable";