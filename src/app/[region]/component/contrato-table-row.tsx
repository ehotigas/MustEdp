import { Simulador } from "@/service/simulador/simulador.entity";
import styles from "./contrato-table-row.module.css";
import { DemandaName } from "./demanda-name";
import { ResultRow } from "./result-row";
import { v4 } from "uuid";

interface ContratoTableRowProps {
    data: Simulador[];
    name: string;
    key?: React.Key;
    style?: React.CSSProperties;
}

export const ContratoTableRow: React.FC<ContratoTableRowProps> = ({
    data,
    name,
    key,
    style
}) => {
    let contractSum: string = '0';
    let contractPontaSum: string = '0';
    let contractForaPontaSum: string = '0';
    if (data.length > 0) {
        contractSum = parseFloat(data[0].contrato.toString()).toFixed(0);
        contractPontaSum = parseFloat(data[0].contratoPonta.toString()).toFixed(0);
        contractForaPontaSum = parseFloat(data[0].contratoForaPonta.toString()).toFixed(0);
    }
    return (
        <div className={styles["container"]} style={style} key={key}>
            <div className={styles["field-container"]} style={{ marginLeft: "4%" }}>
                <p className={styles["contrato-otimo-field"]} style={{ color: "#3A6C72" }}>
                    <strong>{name}</strong>
                </p>
            </div>

            <div className={styles["field-container"]}>
                <p className={styles["contrato-otimo-field"]}>
                    <strong>{contractSum} MW​</strong><br/>
                    Ponta: {contractPontaSum} MW​<br/>
                    Fora Ponta: {contractForaPontaSum} MW
                </p>
            </div>

            <div className={styles["field-container"]}>
                {data.map((value, index) => (
                    <DemandaName color={index % 3 === 0 ? "green" : index % 3 === 1 ? "yellow" : "orange"} name={value.tipoDemanda} key={v4()} />
                ))}
            </div>
            
            <div className={styles["result-container"]}>
                {data.map((value) => (
                    <ResultRow data={value} key={v4()} />
                ))}
            </div>
        </div>
    );
}