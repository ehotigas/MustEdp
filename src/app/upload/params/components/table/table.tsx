"use client"
import { LastYearContractTable } from "./last-year-contract-table";
import { PopupContext } from "@/components/popup/popup-provider";
import { ParamTable } from "@/service/param/param-table.dto";
import { useContext, useRef, useState } from "react";
import { Button } from "@/components/input/button";
import { ContractTable } from "./contract-table";
import { DemandTable } from "./demand-table";
import styles from "./table.module.css";

type TableProps = {
    demanda: string;
    contrato: string;
    data: ParamTable[];
    ponto: string;
};

// const getSum = (key: string) => {
//     let sum: number = 0;
//     for (const param of data) {
//         sum += parseFloat((param[key] || 0).toString());
//     }
//     return sum.toFixed(3);
// }

export const Table2: React.FC<TableProps> = ({ contrato, demanda, data, ponto }) => {
    const popup = useContext(PopupContext);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const demandTableRef = useRef<{ save: () => Promise<void> }>(null);
    const contractTableRef = useRef<{ save: () => Promise<void> }>(null);


    const buttonClickHandler = async () => {
        setIsLoading(true);
        try {
            if (demandTableRef && demandTableRef.current) await demandTableRef.current.save();
            if (contractTableRef && contractTableRef.current) await contractTableRef.current.save();
            // await new Promise((resolve) => setTimeout(resolve, 5000));
            // window.location.reload();
        } catch(error) {
            console.log(error);
            popup("Erro", `Erro ao atualizar dados. ${(error as any).message}.`, "red");
        }
        setIsLoading(false);
    }

    return (
        <>
            <section className={styles["table-container"]}>
                <div className={styles["date-table-container"]}>
                    {
                        data.map((row, idx) => (
                            <div className={styles["row-container"]} key={`@date-row-${idx}`}>
                                <div className={styles["row-cell"]}>
                                    <input className={styles["row-cell-content"]} style={{ borderLeft: "none" }} defaultValue={row.data.toString().slice(0, 10)} disabled />
                                </div>
                            </div>
                            
                        ))
                    }
                </div>
                <DemandTable cenario={demanda} data={data} ponto={ponto} ref={demandTableRef}/>
                <ContractTable cenario={contrato} data={data} ponto={ponto} ref={contractTableRef}/>
                <LastYearContractTable cenario={contrato} data={data} ponto={ponto}/>
            </section>
        
            <section className={styles["table-container"]} style={{ marginTop: "0px" }}>
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