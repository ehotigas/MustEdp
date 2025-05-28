import { Region } from "@/types/region";

export const generateUrl = (region: Region, periodo?: string, contrato?: string) => {
    let url = `/${region}?`;
    if (periodo) {
        url += `periodo=${periodo}&`
    }
    if (contrato) {
        url += `contrato=${contrato}`
    }
    return url;
}