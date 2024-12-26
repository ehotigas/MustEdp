import { SimuladorContratoTable } from "@/service/contrato/simulador-contrato-table.entity";
import styles from "./cenario-contrato-table.module.css";
import { InformationField } from "./info-field";
import { v4 } from "uuid";


interface CenarioContratoTableProps {
    data: SimuladorContratoTable[];
}

interface SumParam {
    contratoPonta: number;
    contratoForaPonta: number;
    demandaPonta: number;
    demandaForaPonta: number;
    ultimoContratoPonta: number;
    ultimoContratoForaPonta: number;
}


export const CenarioContratoTable: React.FC<CenarioContratoTableProps> = ({
    data
}) => {
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

    return (
        <section className={styles["section"]} style={{ marginTop: "5px" }}>
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
                            <input className={styles["row-cell-content"]} style={{ borderLeft: "none", width: "calc(100% - 15px)" }} defaultValue={row.nomePonto} disabled />
                        </div>
                        <div className={styles["row-cell"]}>
                            <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.demandaPonta || 0).toString())} disabled/>
                            <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.demandaForaPonta || 0).toString())} disabled/>
                        </div>
                        <div className={styles["row-cell"]}>
                            <input id={`contrato-ponta-${idx}`} className={styles["row-cell-content"]} defaultValue={parseFloat((row.contratoPonta || 0).toString())} disabled/>
                            <input id={`contrato-fora-ponta-${idx}`} className={styles["row-cell-content"]} defaultValue={parseFloat((row.contratoForaPonta || 0).toString())} disabled />
                        </div>
                        <div className={styles["row-cell"]}>
                            <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.ultimoContratoPonta || 0).toString())} disabled/>
                            <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.ultimoContratoForaPonta || 0).toString())} disabled/>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    );
}