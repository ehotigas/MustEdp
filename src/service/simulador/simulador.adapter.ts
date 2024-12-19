import { GetSimuladorDataDto } from "./dto/get-simulador-data.dto";
import { IMustApiAdapter } from "../must-api/must-api.adapter";


export class SimuladorAdapter {
    private readonly adapter: IMustApiAdapter;
    public constructor(adapter: IMustApiAdapter) {
        this.adapter = adapter;
    }

    public async findTableData(year: number): Promise<GetSimuladorDataDto> {
        return await this.adapter.fetch(`/simulador/${year}`);
    }
}