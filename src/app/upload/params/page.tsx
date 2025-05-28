import { YearDemandaChartSection } from "./components/year-demanda-chart-section";
import { PenalityChartDto } from "@/service/simulador/dto/penality-chart.dto";
import { PenalityChartSection } from "./components/penality-chart-section";
import { SimuladorAdapter } from "@/service/simulador/simulador.adapter";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { SharepointUpdater } from "./components/sharepoint-updater";
import { ParamAdapter } from "@/service/param/param.adapter";
import { ParamTable } from "@/service/param/param-table.dto";
import { PontoAdapter } from "@/service/ponto/ponto.adapter";
import { DeleteParam } from "./components/delete-param";
import { PostoFilter } from "./components/posto-filter";
import { Table2 } from "./components/table/table";
import { Filters } from "./components/filters";
import { Region } from "@/types/region";
import styles from "./page.module.css";
import { Posto } from "@/types/posto";


export default async function UploadParamsPage(
    context: {
        searchParams: { region: Region, ponto: string, ano: string, demanda: string, contrato: string, posto: Posto }
    }
) {
    const api = new MustApiAdapter();
    const pontoAdapter = new PontoAdapter(api);
    const paramAdapter = new ParamAdapter(api);
    const simuladorAdapter = new SimuladorAdapter(api);

    const ponto = await pontoAdapter.findAll();
    const paramFilterHeader = await paramAdapter.getFilterHeader();
    let data: ParamTable[] = [];
    let penalidadeData: PenalityChartDto[] = [];

    if (context.searchParams.ponto && context.searchParams.ano && context.searchParams.demanda && context.searchParams.contrato && context.searchParams.ponto.includes(" - ")) {
        data = (await (paramAdapter.findParamTable(context.searchParams.ponto.split(" - ")[0], parseInt(context.searchParams.ano), context.searchParams.demanda, context.searchParams.contrato))).table;
        penalidadeData = (await (simuladorAdapter.findPenalitiesChart(parseInt(context.searchParams.ano), context.searchParams.ponto.split(" - ")[0], context.searchParams.contrato, context.searchParams.demanda))).data;
    }
    return (
        <main>
            {/* <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Enviar Parâmetros: </h1>
                <h2 className={styles["sub-title"]}> Enviar csv</h2>
            </header>
            <UploadCsv region={context.searchParams.region} /> */}

            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Editar Parâmetros </h1>
                {/* <h2 className={styles["sub-title"]}> Enviar csv</h2> */}
            </header>

            <Filters
                ano={context.searchParams.ano}
                demanda={context.searchParams.demanda}
                contrato={context.searchParams.contrato}
                param={paramFilterHeader}
                pontoOption={ponto.pontos.map((value) => `${value.id} - ${value.nome}`)}
                ponto={context.searchParams.ponto || ""}
                posto={context.searchParams.posto || Posto.TODOS}
            />

            {
                data.length > 0 ? <Table2 cenario={context.searchParams.demanda} data={data} ponto={context.searchParams.ponto.includes(" - ") ? context.searchParams.ponto.split(" - ")[0] : ""} /> :
                <p className={styles["message"]}>Sem dados. Tente alterar os filtros e clique no botão {`"pesquisar"`}.</p>
            }
            
            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Gráfico Demanda </h1>
            </header>
            <PostoFilter
                ano={context.searchParams.ano}
                demanda={context.searchParams.demanda}
                contrato={context.searchParams.contrato}
                param={paramFilterHeader}
                pontoOption={ponto.pontos.map((value) => `${value.id} - ${value.nome}`)}
                ponto={context.searchParams.ponto || ""}
                posto={context.searchParams.posto || Posto.TODOS}
            />
            <YearDemandaChartSection data={penalidadeData} posto={context.searchParams.posto || Posto.TODOS} />

            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Gráfico Penalidades </h1>
            </header>
            <PenalityChartSection data={penalidadeData} posto={context.searchParams.posto || Posto.TODOS} />

            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Atualizar Dados Sharepoint </h1>
            </header>
            <SharepointUpdater />

            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Deletar Parâmetros </h1>
            </header>
            <DeleteParam param={paramFilterHeader} />
        </main>
    );
}