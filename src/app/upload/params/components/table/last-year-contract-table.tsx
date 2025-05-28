import { InformationField } from "@/app/[region]/component/info-field";
import { ParamTable } from "@/service/param/param-table.dto";
import styles from "./table.module.css";

type LastYearContractTableProps = {
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

export const LastYearContractTable: React.FC<LastYearContractTableProps> = ({ cenario, data, ponto }) => {
    
    return (
        <div className={styles["demand-contract-table-container"]}>
            <h1 className={styles["header-cell"]} style={{ color: "#E26032" }}>
                Contrato Anterior
            </h1>
            <div className={styles["subheader-container"]} style={{ borderRight: "solid 2px #000" }}>
                <div className={styles["sub-header-info-container"]}>
                    <InformationField title="Ponta"  style={infoFieldPontaStyle} value={"0.000"} />
                    <InformationField title="Fora Ponta" style={infoFieldForaPontaStyle} value={"0.000"} />
                </div>
            </div>
            <div className={styles["body-container"]} style={{ borderBottom: "solid 2px #000", borderLeft: "solid 2px #000", borderRight: "solid 2px #000" }}>
            {
                data.map((row, idx) => (
                    <div className={styles["row-container"]} key={`@last-contract-row-${idx}`}>
                        <div className={styles["row-cell"]}>
                        <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.contratoAnteriorPonta || 0).toString())} disabled/>
                        <input className={styles["row-cell-content"]} defaultValue={parseFloat((row.contratoAnteriorForaPonta || 0).toString())} disabled/>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    );
}