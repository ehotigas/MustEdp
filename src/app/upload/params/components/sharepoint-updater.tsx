"use client"
import { SharepointContratoAdapter } from "@/service/sharepoint/contrato/contrato.adapter";
import { SharepointDemandaAdapter } from "@/service/sharepoint/demanda/demanda.adapter";
import { SharepointParamsAdapter } from "@/service/sharepoint/params/params.adapter";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { Button } from "@/components/input/button";
import { useState } from "react";


export const SharepointUpdater = () => {
    const api = new MustApiAdapter();
    const demanda = new SharepointDemandaAdapter(api);
    const contrato = new SharepointContratoAdapter(api);
    const param = new SharepointParamsAdapter(api);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const buttonClickHandler = async () => {
        setIsLoading(true);
        await contrato.update();
        await param.update();
        await demanda.update();
        setIsLoading(false);
        window.location.reload();
    }
    return (
        <section style={{ float: "left", width: "70%", marginLeft: "15%", marginRight: "15%", marginTop: "15px", marginBottom: "15px" }}>
            <Button onClick={buttonClickHandler} isLoading={isLoading}>
                Atualizar
            </Button>
        </section>
    );
}