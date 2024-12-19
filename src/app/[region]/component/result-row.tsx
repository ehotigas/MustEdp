import { Simulador } from "@/service/simulador/simulador.entity";
import { InformationField } from "./info-field";
import styles from "./result-row.module.css";


interface ResultRowProps {
    data: Simulador;
    key?: React.Key;
}

export const ResultRow: React.FC<ResultRowProps> = ({
    data,
    key
}) => {
    return (
        <div className={styles["container"]} key={key}>
            <InformationField title="EUST" value={`R$ ${parseFloat(data.eust.toString()).toFixed(2)} MM​`} style={{ float: "left", height: "27px", marginLeft: "30px", width: "80px" }}/>
            <InformationField title="ADD" value={`R$ ${parseFloat(data.add.toString()).toFixed(2)} MM​`} style={{ float: "left", height: "27px", marginLeft: "30px", width: "80px" }}/>
            <InformationField title="PENALIDADES" value={`R$ ${parseFloat(data.penalidades.toString()).toFixed(2)} MM​`} style={{ float: "left", height: "27px", marginLeft: "30px", width: "80px" }}/>
            <InformationField title="TOTAL" value={`R$ ${parseFloat(data.total.toString()).toFixed(2)} MM​`} style={{ float: "left", height: "27px", marginLeft: "30px", width: "80px" }}/>
        </div>
    );
}