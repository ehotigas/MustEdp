import { YearDemandaChartSection } from "./components/year-demanda-chart-section";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { ParamAdapter } from "@/service/param/param.adapter";
import { ParamTable } from "@/service/param/param-table.dto";
import { PontoAdapter } from "@/service/ponto/ponto.adapter";
import { DeleteParam } from "./components/delete-param";
import { UploadCsv } from "./components/upload-csv";
import { Filters } from "./components/filters";
import { Table } from "./components/table";
import { Region } from "@/types/region";
import styles from "./page.module.css";


export default async function UploadParamsPage(
    context: {
        searchParams: { region: Region, ponto: string, ano: string, cenario: string }
    }
) {
    const api = new MustApiAdapter();
    const pontoAdapter = new PontoAdapter(api);
    const paramAdapter = new ParamAdapter(api);

    const ponto = await pontoAdapter.findAll();
    const paramFilterHeader = await paramAdapter.getFilterHeader();
    let data: ParamTable[] = [];

    if (context.searchParams.ponto && context.searchParams.ano && context.searchParams.cenario && context.searchParams.ponto.includes(" - ")) {
        data = (await (paramAdapter.findParamTable(context.searchParams.ponto.split(" - ")[0], parseInt(context.searchParams.ano), context.searchParams.cenario))).table;
    }
    return (
        <main>
            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Enviar Parâmetros: </h1>
                <h2 className={styles["sub-title"]}> Enviar csv</h2>
            </header>
            <UploadCsv region={context.searchParams.region} />

            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Editar Parâmetros </h1>
                {/* <h2 className={styles["sub-title"]}> Enviar csv</h2> */}
            </header>

            <Filters
                ano={context.searchParams.ano}
                cenario={context.searchParams.cenario}
                param={paramFilterHeader}
                pontoOption={ponto.pontos.map((value) => `${value.id} - ${value.nome}`)}
                ponto={(context.searchParams.ponto || "").split(" - ")[0]}
            />

            {
                data.length > 0 ? <Table cenario={context.searchParams.cenario} data={data} ponto={context.searchParams.ponto.includes(" - ") ? context.searchParams.ponto.split(" - ")[0] : ""} /> :
                <p className={styles["message"]}>Sem dados. Tente alterar os filtros e clique no botão "pesquisar".</p>
            }

            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Deletar Parâmetros </h1>
            </header>
            <DeleteParam param={paramFilterHeader} />
            
            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Gráfico Demanda </h1>
            </header>
            <YearDemandaChartSection />
        </main>
    );
}