"use client";
import { CreateParamDto } from "@/service/param/dto/create-param.dto";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { PopupContext } from "@/components/popup/popup-provider";
import { ParamAdapter } from "@/service/param/param.adapter";
import { MdOutlineFileUpload } from "react-icons/md";
import { CsvParser } from "@/csv/csv-parser";
import { PiTableFill } from "react-icons/pi";
import { useContext, useState } from "react";
import styles from "./upload-csv.module.css";
import File from "@/components/input/File";
import { RxUpdate } from "react-icons/rx";
import { Region } from "@/types/region";
import { parse } from 'date-fns';


interface UploadCsvProps {
    region: Region;
}

interface CsvParam {
    separator: string;
    dateFormat: string;
    decimal: string;
}


export const UploadCsv: React.FC<UploadCsvProps> = ({
    region
}) => {
    const popup = useContext(PopupContext);
    const api = new MustApiAdapter();
    const paramAdapter = new ParamAdapter(api);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [csvParams, setCsvParams] = useState<CsvParam>({ separator: ";", dateFormat: "yyyy-MM-dd", decimal: "," });
    const csvParser = new CsvParser();

    const regionChangeEventHandler = (value: string) => {
        window.location.replace(`/upload/params?region=${value}`);
    }

    const changeCsvParamHandler = (key: keyof CsvParam) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCsvParams({ ...csvParams, [key]: event.target.value });
    }

    const fileChangeEventHandler = (file: File | null) => {
        setFile(file);
    }

    const dataFormatter = (row: CreateParamDto): CreateParamDto => {
        const valor = parseFloat(row.valor.toString().replace(csvParams.decimal, '.'));
    
        
        const data = parse(row.data.toString(), csvParams.dateFormat, new Date());
        return {
            ...row,
            valor,
            data: data.toISOString().slice(0, 10)
        };
    }

    const buttonClickHandler = async () => {
        if (!file) popup("Erro", "Escolha um arquivo para poder enviar", "red");
        setIsLoading(true);
        const text = await file?.text();
        if (text) {
            const data = await csvParser.parse<CreateParamDto>(text, { separator: csvParams.separator }, dataFormatter);
            try {
                await paramAdapter.saveMany({
                    payload: data.filter((value) => value.cenario === "DEMANDA" ? new Date(value.data) > new Date() : true)
                });
            } catch(error) {
                popup("Erro", `Erro ao enviar os dados. ${(error as any).message}`, "red");
            }
            
        }
        setIsLoading(false);
    }

    return (
        <>
            <section className={styles.section}>
                Para atualizar a base de parâmetros, é necessário fazer o <strong>envio de um arquivo .csv</strong> com o seguinte template:
            </section>
 
            <section className={styles.section}>
                <div className={styles.schema}>
                    <p className={styles.schemaLine}>
                        <PiTableFill className={styles.tableIcon}/>
                        <span style={{ color: "#666", marginLeft: 2 }}>confiabilidade</span>
                    </p>
                    <p className={styles.schemaLine}><span>posto:</span> {`string ("Ponta", "Fora Ponta")`} </p>
                    <p className={styles.schemaLine}><span>data:</span> Date </p>
                    <p className={styles.schemaLine}><span>tipoDado:</span> string {`("DEMANDA", "TARIFA", "CONFIABILIDADE")`} </p>
                    <p className={styles.schemaLine}><span>cenario:</span> string | null </p>
                    <p className={styles.schemaLine}><span>valor:</span> string </p>
                    <p className={styles.schemaLine} style={{ marginBottom: "5px" }}><span>ponto:</span> string // id de um dos pontos </p>
                </div>
            </section>

            <section className={styles.section}>
                <strong>
                    Selecione o arquivo para atualizar a base de parâmetros:
                </strong>
            </section>

            <section className={styles.section} style={{ marginBottom: "30px" }}>
                <div className={styles["parameter-container"]}>
                    <h1 className={styles["parameter-title"]}>Parâmetros do csv:</h1>
                    <div className={styles["param-section"]}>
                        <p className={styles["parameter-name"]}>Separador: </p>
                        <input className={styles["parameter-value"]} defaultValue=";" onChange={changeCsvParamHandler("separator")} />
                    </div>
                    <div className={styles["param-section"]}>
                        <p className={styles["parameter-name"]}>Data: </p>
                        <input className={styles["parameter-value"]} defaultValue="yyyy-MM-dd" onChange={changeCsvParamHandler("dateFormat")} />
                    </div>
                    <div className={styles["param-section"]} style={{ marginBottom: "10px" }}>
                        <p className={styles["parameter-name"]}>Decimal: </p>
                        <input className={styles["parameter-value"]} defaultValue="." onChange={changeCsvParamHandler("decimal")} />
                    </div>
                </div>
                <File onChange={fileChangeEventHandler} style={{ float: "left", marginLeft: "10px", marginRight: "calc(100% - 580px)" }} />
                <button className={styles.uploadButton} onClick={buttonClickHandler}>
                    {
                        isLoading ?
                        <RxUpdate className={`${styles.uploadButtonIcon} ${styles.uploadButtonLoadingIcon}`}/> :
                        <MdOutlineFileUpload className={styles.uploadButtonIcon}/>
                    } Enviar
                </button>
            </section>
        </>
    )
}