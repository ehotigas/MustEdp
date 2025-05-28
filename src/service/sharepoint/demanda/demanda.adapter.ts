
import { IMustApiAdapter } from "@/service/must-api/must-api.adapter";
import { UpdateDemandaDto } from "./dto/update-demanda.dto";


export class SharepointDemandaAdapter {
    private readonly adapter: IMustApiAdapter;
    public constructor(adapter: IMustApiAdapter) {
        this.adapter = adapter;
    }

    public async update(): Promise<UpdateDemandaDto> {
        return await this.adapter.fetch(`/sharepoint-demanda/update`);
    }
}