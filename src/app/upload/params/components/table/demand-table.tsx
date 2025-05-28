"use client"
import { InformationField } from "@/app/[region]/component/info-field";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { ParamTable } from "@/service/param/param-table.dto";
import { ParamAdapter } from "@/service/param/param.adapter";
import { useImperativeHandle, useState } from "react";
import styles from "./table.module.css";
import { Posto } from "@/types/posto";
import { forwardRef } from 'react';
import { DataType } from "@/service/param/data-type";


type DemandTableProps = {
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

export type DemandTableHandle = {
    save: () => Promise<void>;
};


export const DemandTable = forwardRef<DemandTableHandle, DemandTableProps> (
    ({ cenario, data, ponto }, ref) => {
        const api = new MustApiAdapter();
        const paramAdapter = new ParamAdapter(api);

        const [inputData, setInputData] = useState<ParamTable[]>([...data]);
        
        const demandChangeEventHandler = (posto: Posto, idx: number) => (value: React.ChangeEvent<HTMLInputElement>) => {
            const copy = [...inputData];
            let key = "demandaPonta";
            if (posto === Posto.FORA_PONTA) key = "demandaForaPonta";
            copy[idx][key as "demandaPonta" | "demandaForaPonta"] = parseFloat(value.target.value);
            setInputData(copy);
        };
        
        const save = async () => {
            for (const row of inputData) {
                await paramAdapter.save({ data: row.data.toString().slice(0, 10), cenario, ponto, tipoDado: DataType.DEMANDA, valor: row.demandaPonta, posto: Posto.PONTA });
                await paramAdapter.save({ data: row.data.toString().slice(0, 10), cenario, ponto, tipoDado: DataType.DEMANDA, valor: row.demandaForaPonta, posto: Posto.FORA_PONTA });
            }
        };
        
        useImperativeHandle(ref, () => ({
            save
        }));
        return (
            <div className={styles["demand-contract-table-container"]}>
                <h1 className={styles["header-cell"]} style={{ color: "#3A6C72" }}>
                    Demanda
                </h1>
                <div className={styles["subheader-container"]} style={{ borderRight: "solid 1px #000" }}>
                    <div className={styles["sub-header-info-container"]}>
                        <InformationField title="Ponta"  style={infoFieldPontaStyle} value={""} />
                        <InformationField title="Fora Ponta" style={infoFieldForaPontaStyle} value={""} />
                    </div>
                </div>
                <div className={styles["body-container"]} style={{ borderBottom: "solid 2px #000", borderLeft: "solid 2px #000", borderRight: "solid 1px #000" }}>
                {
                    data.map((row, idx) => (
                        <div className={styles["row-container"]} key={`@demand-row-${idx}`}>
                            <div className={styles["row-cell"]}>
                            <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.demandaPonta || 0).toString())} onChange={demandChangeEventHandler(Posto.PONTA, idx)} />
                            <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.demandaForaPonta || 0).toString())} onChange={demandChangeEventHandler(Posto.FORA_PONTA, idx)}/>
                            </div>
                        </div>
                        
                    ))
                }
                </div>
            </div>
        );
    }
);


DemandTable.displayName = "DemandTable";
