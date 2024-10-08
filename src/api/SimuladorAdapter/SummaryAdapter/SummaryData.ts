import { Region } from "@/types/Region";

export interface SummaryData {
    Empresa: Region;
    Ano: number;
    TipoDemanda: string;
    TipoContrato: string;
    Contrato: number;
    Demanda?: number;
    Piu?: number;
    Add?: number;
    Eust: number;
    Pis?: number;
    Dra?: number;
    Drp?: number;
    ParcelaA: number;
    ParcelaB: number;
    CustoTotal: number;
    Total: number;
}