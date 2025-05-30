"use client"
import { ContratoAdapter } from "@/service/contrato/contrato.adapter";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { PopupContext } from "@/components/popup/popup-provider";
import styles from "./generate-contracts.module.css";
import { Button } from "@/components/input/button";
import { useContext, useState } from "react";


export const GenerateContracts = () => {
    const popup = useContext(PopupContext);

    const api = new MustApiAdapter();
    const contratoAdapter = new ContratoAdapter(api);

    const nextYear = new Date().getFullYear() + 1;
    const [year, setYear] = useState<string>(nextYear.toString());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const changeYearInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.value);
    }
    
    const generateContratosButtonClickHandler = async () => {
        setIsLoading(true);
        try {
            await contratoAdapter.generate(parseInt(year));
            popup("Mensagem", `Contratos gerados com sucesso.`, "green");
        }
        catch (error) {
            popup("Erro", `Falha ao gerar contratos. ${(error as any).message}`, "red");
        }
        
        setIsLoading(false);
    }

    return (
        <>
            <section className={styles["section"]}>
                <p className={styles["year-input-field"]}>Selecione o ano que deseja gerar os contratos:</p>
                <input defaultValue={nextYear} type="number" className={styles["year-input"]} onChange={changeYearInputHandler} />
            </section>
            <section className={styles["section"]} style={{ marginBottom: "15px" }}>
                <Button isLoading={isLoading} onClick={generateContratosButtonClickHandler}>
                    Gerar Contratos
                </Button>
            </section>
        </>
    );
}