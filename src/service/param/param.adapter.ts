import { CreateManyParamResponseDto } from "./dto/create-many-param-response.dto";
import { CreateManyParamDto } from "./dto/create-many-param.dto";
import { GetFilterHeaderDto } from "./dto/get-filter-header.dto";
import { IMustApiAdapter } from "../must-api/must-api.adapter";
import { CreateParamDto } from "./dto/create-param.dto";
import { GetParamDto } from "./dto/get-param.dto";
import { Param } from "./param.entity";
import { Posto } from "@/types/posto";
import { GetParamTableDto } from "./dto/get-param-table.dto";


export class ParamAdapter {
    private readonly adapter: IMustApiAdapter;
    public constructor(adapter: IMustApiAdapter) {
        this.adapter = adapter;
    }

    public async findAll(): Promise<GetParamDto> {
        return await this.adapter.fetch(`/param`);
    }

    public async findById(id: number): Promise<Param> {
        return await this.adapter.fetch(`/param/${id}`);
    }

    public async findParamTable(ponto: string, ano: number, cenario: string): Promise<GetParamTableDto> {
        return await this.adapter.fetch(`/param/table/${ponto}?&ano=${ano}&cenario=${cenario}`);
    }

    public async getFilterHeader(): Promise<GetFilterHeaderDto> {
        return await this.adapter.fetch(`/param/filter/header`);
    }

    public async save(input: CreateParamDto): Promise<Param> {
        return await this.adapter.fetch(
            `/param`,
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                data: JSON.stringify(input)
            }
        );
    }

    public async saveMany(input: CreateManyParamDto): Promise<CreateManyParamResponseDto> {
        return await this.adapter.fetch(
            `/param/many`,
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                data: JSON.stringify(input)
            }
        );
    }

    public async update(id: number, input: Partial<CreateParamDto>): Promise<Param> {
        return await this.adapter.fetch(
            `/param/${id}`,
            {
                method: "PATCH",
                headers: { 'Content-Type': "application/json" },
                data: JSON.stringify(input)
            }
        );
    }

    public async remove(id: number): Promise<Param> {
        return await this.adapter.fetch(
            `/param/${id}`,
            { method: "DELETE" }
        );
    }
}