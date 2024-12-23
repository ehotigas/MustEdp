"use client"
import { GetFilterHeaderDto } from "@/service/param/dto/get-filter-header.dto";
import { ContratoAdapter } from "@/service/contrato/contrato.adapter";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { PopupContext } from "@/components/popup/popup-provider";
import { Button } from "@/components/input/button";
import Dropdown from "@/components/input/dropdown";
import styles from "./delete-contrato.module.css";
import { useContext, useState } from "react";
import { BiTrash } from "react-icons/bi";


interface DeleteContratoProps {
    param: GetFilterHeaderDto;
}


export const DeleteContrato: React.FC<DeleteContratoProps> = ({
    param
}) => {
    const api = new MustApiAdapter();
    const contratoAdapter = new ContratoAdapter(api);
    const popup = useContext(PopupContext);

    const [contrato, setContrato] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteButtonClickHandler = async () => {
        setIsLoading(true);
        try {
            await contratoAdapter.removeByCenario(contrato);
            popup("Mensagem", "Cenário de contrato removido.", "green");
        }
        catch(error) {
            popup("Erro", `Erro ao remover o cenário de contrato ${contrato}. ${(error as any).message}`, "red");
        }
        setIsLoading(false);
    }

    const changeContratoHandler = (value: string) => {
        setContrato(value);
    }

    return (
        <section className={styles["section"]}>
            <Dropdown
                defaultValue={"Selecione um contrato"}
                onChange={changeContratoHandler}
                options={param.cenario}
                title="Contrato"
            />
            <Button isLoading={isLoading} onClick={deleteButtonClickHandler} style={{ backgroundColor: "#E32C2C", height: "35px", marginLeft: "15px", width: "35px" }}>
                <BiTrash className={styles["search-icon"]} />
            </Button>
        </section>
    );
}