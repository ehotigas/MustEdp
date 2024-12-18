import { IMustApiAdapter } from "../must-api/must-api.adapter";
import { CreatePontoDto } from "./dto/create-ponto.dto";
import { UpdatePontoDto } from "./dto/update-ponto.dto";
import { GetPontoDto } from "./dto/get-ponto.dto";
import { Region } from "@/types/region";
import { Ponto } from "./ponto.entity";


export class PontoAdapter {
    private readonly adapter: IMustApiAdapter;
    public constructor(adapter: IMustApiAdapter) {
        this.adapter = adapter;
    }

    public async findAll(): Promise<GetPontoDto> {
        return await this.adapter.fetch(`/ponto`);
    }

    public async create(input: CreatePontoDto): Promise<Ponto> {
        return await this.adapter.fetch(
            `/ponto`,
            {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                data: JSON.stringify(input)
            }
        );
    }

    public async update(id: number, input: UpdatePontoDto): Promise<Ponto> {
        return await this.adapter.fetch(
            `/ponto/${id}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': "application/json" },
                data: JSON.stringify(input)
            }
        );
    }
}