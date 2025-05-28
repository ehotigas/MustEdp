
import { IMustApiAdapter } from "@/service/must-api/must-api.adapter";
import { UpdateParamsDto } from "./dto/update-params.dto";


export class SharepointParamsAdapter {
    private readonly adapter: IMustApiAdapter;
    public constructor(adapter: IMustApiAdapter) {
        this.adapter = adapter;
    }

    public async update(): Promise<UpdateParamsDto> {
        return await this.adapter.fetch(`/sharepoint-param/update`);
    }
}