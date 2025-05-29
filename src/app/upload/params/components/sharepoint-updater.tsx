"use client"
import { SharepointDemandaRealizadaAdapter } from "@/service/sharepoint/demanda-realizada/demanda-realizada.adapter";
import { SharepointDemandaAdapter } from "@/service/sharepoint/demanda/demanda.adapter";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { Button } from "@/components/input/button";
import { useState } from "react";


export const SharepointUpdater = () => {
    const api = new MustApiAdapter();
    const demanda = new SharepointDemandaAdapter(api);
    const demandaRealizada = new SharepointDemandaRealizadaAdapter(api);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const buttonClickHandler = async () => {
        setIsLoading(true);
        await demanda.update();
        await demandaRealizada.update();
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