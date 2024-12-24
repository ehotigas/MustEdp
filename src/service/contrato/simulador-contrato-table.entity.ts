import { Posto } from "@/types/posto";


export interface SimuladorContratoTable {
    nomePonto: string;
    ponto: string;
    posto: Posto;
    data: number;
    cenario: string;
    contratoPonta: number;
    demandaPonta: number;
    contratoForaPonta: number;
    demandaForaPonta: number;
    ultimoContratoPonta: number;
    ultimoContratoForaPonta: number;
}