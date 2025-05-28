
import { IMustApiAdapter } from "@/service/must-api/must-api.adapter";
import { UpdateContratoDto } from "./dto/update-contrato.dto";


export class SharepointContratoAdapter {
    private readonly adapter: IMustApiAdapter;
    public constructor(adapter: IMustApiAdapter) {
        this.adapter = adapter;
    }

    public async update(): Promise<UpdateContratoDto> {
        return await this.adapter.fetch(`/sharepoint-contrato/update`);
    }
}