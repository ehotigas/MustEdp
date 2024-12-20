import { ContratoTable } from "@/service/contrato/contrato-table.entity";
import { ContratoAdapter } from "@/service/contrato/contrato.adapter";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { GenerateContracts } from "./components/generate-contracts";
import { PontoAdapter } from "@/service/ponto/ponto.adapter";
import { UploadCsv } from "./components/upload-csv";
import { Filters } from "./components/filters";
import { Table } from "./components/table";
import { Region } from "@/types/region";
import styles from "./page.module.css";
import { DeleteContrato } from "./components/delete-contrato";


export default async function UploadContratosPage(
    context: {
        searchParams: { region: Region, ponto: string, ano: string, cenario: string }
    }
) {
    const api = new MustApiAdapter();
    const pontoAdapter = new PontoAdapter(api);
    const contratoAdapter = new ContratoAdapter(api);

    const filter = await contratoAdapter.findTableFilters();
    
    const ponto = await pontoAdapter.findAll();
    let data: ContratoTable[] = [];
    
    if (context.searchParams.ponto && context.searchParams.ano && context.searchParams.cenario && context.searchParams.ponto.includes(" - ")) {
        data = (await (contratoAdapter.findContratoTable(context.searchParams.ponto.split(" - ")[0], parseInt(context.searchParams.ano), context.searchParams.cenario))).data;
    }
    return (
        <main>
            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Enviar Contratos: </h1>
                <h2 className={styles["sub-title"]}> Enviar csv</h2>
            </header>
            <UploadCsv region={context.searchParams.region} />

            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Gerar Contratos </h1>
                {/* <h2 className={styles["sub-title"]}> Enviar csv</h2> */}
            </header>
            <GenerateContracts />
            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Editar Contratos </h1>
                {/* <h2 className={styles["sub-title"]}> Enviar csv</h2> */}
            </header>
            <Filters
                ano={context.searchParams.ano}
                cenario={context.searchParams.cenario}
                param={filter}
                pontoOption={ponto.pontos.map((value) => `${value.id} - ${value.nome}`)}
                ponto={(context.searchParams.ponto || "").split(" - ")[0]}
            />

            {
                data.length > 0 ? <Table cenario={context.searchParams.cenario} data={data} ponto={context.searchParams.ponto.includes(" - ") ? context.searchParams.ponto.split(" - ")[0] : ""} /> :
                <p className={styles["message"]}>Sem dados. Tente alterar os filtros e clique no botão "pesquisar".</p>
            }
            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Deletar Contratos </h1>
            </header>
            <DeleteContrato param={filter} />
        </main>
    );
}