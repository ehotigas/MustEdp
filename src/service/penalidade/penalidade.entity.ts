import { Posto } from "@/types/posto";

export interface Penalidade {
    ponto: string;
    data: Date;
    posto: Posto;
    tipoContrato: string;
    tipoDemanda: string;
    contrato: number;
    demanda: number;
    confiabilidade: number;
    tarifa: number;
    eust: number;
    add: number;
    piu: number;
    pis: number;
    penalidades: number;
}