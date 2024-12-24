import { CreateManyByDemandaResponseDto } from "./dto/create-many-by-demanda-response.dto";
import { CreateContratoByDemanda } from "./dto/create-contrato-by-demanda.dto";
import { CreateManyByDemandaDto } from "./dto/create-many-by-demanda.dto";
import { GetContratoTableDto } from "./dto/get-contrato-table.dto";
import { GetTableFilterDto } from "./dto/get-table-filter.dto";
import { IMustApiAdapter } from "../must-api/must-api.adapter";
import { CreateContratoDto } from "./dto/create-contrato.dto";
import { UpdateContratoDto } from "./dto/update-contrato.dto";
import { Contrato } from "./contrato.entity";
import { RemoveByCenarioDto } from "./dto/remove-by-cenario.dto";
import { GetSimuladorContratoTableDto } from "./dto/get-simulador-contrato-table.dto";


export class ContratoAdapter {
    private readonly adapter: IMustApiAdapter;
    public constructor(adapter: IMustApiAdapter) {
        this.adapter = adapter;
    }

    public async findContratoTable(ponto: string, ano: number, cenario: string): Promise<GetContratoTableDto> {
        return await this.adapter.fetch(`/contrato/${ponto}?ano=${ano}&cenario=${cenario}`);
    }

    public async findTableFilters(): Promise<GetTableFilterDto> {
        return await this.adapter.fetch(`/contrato/table/filter`);
    }

    public async findSimuladorContratoTable(cenario: string, ano: string): Promise<GetSimuladorContratoTableDto> {
        return await this.adapter.fetch(`/contrato/simulador/table/${cenario}?ano=${ano}`);
    }

    public async generate(year: number): Promise<Contrato> {
        return await this.adapter.fetch(
            `/contrato/generate/${year}`,
            { method: "POST" }
        );
    }

    public async save(input: CreateContratoDto): Promise<Contrato> {
        return await this.adapter.fetch(
            `/contrato`,
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                data: JSON.stringify(input)
            }
        );
    }

    public async saveByDemanda(input: CreateContratoByDemanda): Promise<Contrato> {
        return await this.adapter.fetch(
            `/contrato/demanda`,
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                data: JSON.stringify(input)
            }
        );
    }

    public async saveManyByDemanda(input: CreateManyByDemandaDto): Promise<CreateManyByDemandaResponseDto> {
        return await this.adapter.fetch(
            `/contrato/demanda/many`,
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                data: JSON.stringify(input)
            }
        );
    }

    public async update(id: number, input: UpdateContratoDto): Promise<Contrato> {
        return await this.adapter.fetch(
            `/contrato/${id}`,
            {
                method: "PATCH",
                headers: { 'Content-Type': "application/json" },
                data: JSON.stringify(input)
            }
        );
    }

    public async remove(id: number): Promise<Contrato> {
        return await this.adapter.fetch(
            `/contrato/${id}`,
            { method: "DELETE" }
        );
    }

    public async removeByCenario(cenario: string): Promise<RemoveByCenarioDto> {
        return await this.adapter.fetch(
            `/contrato/cenario/${cenario}`,
            { method: "DELETE" }
        );
    }
}