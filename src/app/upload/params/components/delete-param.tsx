"use client"
import { GetFilterHeaderDto } from "@/service/param/dto/get-filter-header.dto";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { PopupContext } from "@/components/popup/popup-provider";
import { ParamAdapter } from "@/service/param/param.adapter";
import { Button } from "@/components/input/button";
import Dropdown from "@/components/input/dropdown";
import styles from "./delete-param.module.css";
import { useContext, useState } from "react";
import { BiTrash } from "react-icons/bi";


interface DeleteParamProps {
    param: GetFilterHeaderDto;
}


export const DeleteParam: React.FC<DeleteParamProps> = ({
    param
}) => {
    const api = new MustApiAdapter();
    const paramAdapter = new ParamAdapter(api);
    const popup = useContext(PopupContext);

    const [demanda, setDemanda] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteButtonClickHandler = async () => {
        setIsLoading(true);
        try {
            await paramAdapter.removeDemandaByCenario(demanda);
            popup("Mensagem", "Cenário de demanda removido.", "green");
        }
        catch(error) {
            popup("Erro", `Erro ao remover o cenário de demandando ${demanda}. ${(error as any).message}`, "red");
        }
        setIsLoading(false);
    }

    const changeDemandaHandler = (value: string) => {
        setDemanda(value);
    }

    return (
        <section className={styles["section"]}>
            <Dropdown
                defaultValue={"Selecione uma demanda"}
                onChange={changeDemandaHandler}
                options={param.cenario}
                title="Ponto"
            />
            <Button isLoading={isLoading} onClick={deleteButtonClickHandler} style={{ height: "35px", marginLeft: "15px", width: "35px" }}>
                <BiTrash className={styles["search-icon"]} />
            </Button>
        </section>
    );
}