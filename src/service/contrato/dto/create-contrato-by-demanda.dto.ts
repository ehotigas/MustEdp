import { Posto } from "@/types/posto";


export interface CreateContratoByDemanda {
    ponto: string;
    posto: Posto;
    data: Date | string;
    cenario: string;
    valor: number;
}