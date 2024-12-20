"use client"
import { PenalidadeAdapter } from "@/service/penalidade/penalidade.adapter";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { Penalidade } from "@/service/penalidade/penalidade.entity";
import { PenalidadeChart } from "./penalidade-chart";
import styles from "./penalidade-row.module.css";
import { InformationField } from "./info-field";
import Modal from "@/components/modal/modal";
import { getColor } from "@/types/color";
import { useState } from "react";


interface IPenalidadeRow {
    data: Penalidade;
}


export const PenalidadeRow: React.FC<IPenalidadeRow> = ({
    data
}) => {
    const api = new MustApiAdapter();
    const penalidadeAdapter = new PenalidadeAdapter(api);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [chartData, setChartData] = useState<Penalidade[]>([]);

    const rowClickEventHandler = async () => {
        setIsOpen(true);
        if(chartData.length === 0) {
            const response = await penalidadeAdapter.findPenalidadeChat(parseInt(data.data.toString().slice(0, 4)), data.ponto, data.posto, data.tipoContrato, data.tipoDemanda);
            setChartData(response.data);
        }
    }

    const onModalClose = () => {
        setIsOpen(false);
    }
    const formatter = Intl.DateTimeFormat("pt-BR", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
    
    return (
        <>
            <Modal isOpen={isOpen} onClose={onModalClose}>
                <h1 className={styles["chart-title"]}>
                    {`${data.ponto} (${data.posto})`}
                </h1>
                <InformationField title="Contrato" value={data.tipoContrato} style={{ float: "left", marginLeft: "35px", width: "100px" }} />
                <InformationField title="Demanda" value={data.tipoDemanda} style={{ float: "left", width: "100px" }} />
                <InformationField title="Demanda" value={formatter.format(new Date(data.data.toString()))} style={{ float: "left", width: "100px" }} />
                <InformationField title="Valor Contrato" value={`${data.contrato} kW`} style={{ float: "left", marginRight: "15px", width: "100px" }} />
                <div style={{ width: '100%', height: '250px', float: "left", fontSize: "12px" }}>
                    <PenalidadeChart data={chartData} />
                </div>
            </Modal>

            <div className={styles["row-container"]} onClick={rowClickEventHandler}>
                <p className={styles["title"]} style={{ marginLeft: "4%" }}>
                    {`${data.ponto} (${data.posto === "Ponta" ? "P" : "FP"})`}
                </p>

                <div className={styles["title"]} style={{ marginTop: "8.5px" }}>
                    <p className={styles["demanda-field"]} style={{ backgroundColor: getColor(data.tipoContrato),  }}>
                        <span style={{ textAlign: "center", width: "100%" }}>{data.tipoContrato}</span>
                    </p>
                </div>
                <div className={styles["title"]} style={{marginTop: "8.5px" }}>
                    <p className={styles["demanda-field"]} style={{ backgroundColor: getColor(data.tipoDemanda)  }}>
                        <span style={{ textAlign: "center", width: "100%" }}>{data.tipoDemanda}</span>
                    </p>
                </div>

                <div>
                    <InformationField title="Contrato" value={`R$ ${parseFloat(data.contrato.toString()).toFixed(2)} M`} style={{ float: "left", width: "90px" }} />
                    <InformationField title="Add" value={`R$ ${parseFloat(data.add.toString()).toFixed(2)} M`} style={{ float: "left", width: "90px" }} />
                    <InformationField title="Piu" value={`R$ ${parseFloat(data.piu.toString()).toFixed(2)} M`} style={{ float: "left", width: "90px" }} />
                    <InformationField title="Pis" value={`R$ ${parseFloat(data.pis.toString()).toFixed(2)} M`} style={{ float: "left", width: "90px" }} />
                    <InformationField title="Total Penalidades" value={`R$ ${parseFloat(data.penalidades.toString()).toFixed(2)} M`} style={{ float: "left", width: "90px" }} />
                </div>
            </div>
        </>
    );
}