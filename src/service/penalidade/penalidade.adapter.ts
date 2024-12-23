import { GetPenalidadeTableDto } from "./dto/get-penalidade-table.dto";
import { IMustApiAdapter } from "../must-api/must-api.adapter";
import { Region } from "@/types/region";
import { Posto } from "@/types/posto";


export class PenalidadeAdapter {
    private readonly adapter: IMustApiAdapter;
    public constructor(adapter: IMustApiAdapter) {
        this.adapter = adapter;
    }

    public async findAll(year: number, region: Region): Promise<GetPenalidadeTableDto> {
        return await this.adapter.fetch(`/penalidade/${year}?region=${region}`);
    }

    public async findPenalidadeChat(year: number, ponto: string, posto: Posto, contrato: string, demanda: string, region: Region): Promise<GetPenalidadeTableDto> {
        return await this.adapter.fetch(`/penalidade/chart/${year}?ponto=${ponto}&posto=${posto}&contrato=${contrato}&demanda=${demanda}&region=${region}`);
    }
}