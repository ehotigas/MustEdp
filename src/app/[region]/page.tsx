import { SimuladorContratoTable } from "@/service/contrato/simulador-contrato-table.entity";
import { PenalidadeAdapter } from "@/service/penalidade/penalidade.adapter";
import { CenarioContratoTable } from "./component/cenario-contrato-table";
import { SimuladorAdapter } from "@/service/simulador/simulador.adapter";
import { ContratoAdapter } from "@/service/contrato/contrato.adapter";
import { MustApiAdapter } from "@/service/must-api/must-api.adapter";
import { Penalidade } from "@/service/penalidade/penalidade.entity";
import { ContratoTableRow } from "./component/contrato-table-row";
import { Simulador } from "@/service/simulador/simulador.entity";
import { FiltroSimulador } from "./component/filtro-simulador";
import { ContratoFilter } from "./component/contrato-filter";
import { PenalidadeRow } from "./component/penalidade-row";
import { InformationField } from "./component/info-field";
import { Region } from "@/types/region";
import styles from "./page.module.css";
import { v4 } from "uuid";


export default async function RegionPage(
    context: {
        params: { region: Region },
        searchParams: { periodo: string, contrato: string }
    }
) {
    const api = new MustApiAdapter();
    const simuladorAdapter = new SimuladorAdapter(api);
    const penalidadeAdapter = new PenalidadeAdapter(api);
    const contratoAdapter = new ContratoAdapter(api);

    let simuladorData: Simulador[] = [];
    let penalidades: Penalidade[] = [];
    let contratos: SimuladorContratoTable[] = [];

    if (context.searchParams.periodo) {
        simuladorData = (await simuladorAdapter.findTableData(parseInt(context.searchParams.periodo), context.params.region)).data;
        penalidades = (await penalidadeAdapter.findAll(parseInt(context.searchParams.periodo), context.params.region)).data;
    }

    if (context.searchParams.periodo && context.searchParams.contrato) {
        contratos = (await contratoAdapter.findSimuladorContratoTable(context.searchParams.contrato, context.searchParams.periodo)).data;
    }

    const periodo = await contratoAdapter.findTableFilters();

    const formatData = (): Record<string, Simulador[]> => {
        let data: Record<string, Simulador[]> = {};
        const dataKeys = new Set(simuladorData.map((value) => value.tipoContrato));
        dataKeys.forEach((key) => data[key] = []);
        simuladorData.forEach((value) => data[value.tipoContrato].push(value));
        return data;
    }
    const formattedData = formatData();

    return (
        <main className={styles["main-container"]}>
            <div className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Filtros:</h1>
            </div>
            <FiltroSimulador region={context.params.region} periodo={context.searchParams.periodo} contrato={context.searchParams.contrato} options={periodo.ano} />

            <div className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>MUST {context.searchParams.periodo}:</h1>
                <h2 className={styles["sub-title"]}> Resultados (EDP {context.params.region.toUpperCase()})</h2>
            </div>

            <div className={styles["contrato-orcado-container"]} style={{ marginTop: "20px" }}>
                <div className={styles["contrato-orcado-title"]}>
                    Orçado
                </div>
                <div className={styles["contrato-orcado-title"]} style={{ color: "#000", marginLeft: "6.8%" }}>
                    6.128 MW​
                </div>
                <InformationField title="TOTAL" value="R$ 698,5 MM" style={{ float: "right", marginRight: "11%" }} />
                <InformationField title="PENALIDADES" value="R$ 21,1 MM" style={{ float: "right", marginRight: "10px" }} />
                <InformationField title="EUST" value="R$ 677,4 MM" style={{ float: "right", marginRight: "10px" }} />
            </div>
            <div className={styles["contrato-orcado-container"]}>
                <div className={styles["contrato-orcado-title"]}>
                    R02
                </div>
                <div className={styles["contrato-orcado-title"]} style={{ color: "#000", marginLeft: "6.8%" }}>
                    6.128 MW​
                </div>
                <InformationField title="TOTAL" value="R$ 701,5 MM" style={{ float: "right", marginRight: "11%" }} />
                <InformationField title="PENALIDADES" value="R$ 24,1 MM" style={{ float: "right", marginRight: "10px" }} />
                <InformationField title="EUST" value="R$ 677,4 MM" style={{ float: "right", marginRight: "10px" }} />
            </div>

            <div className={styles["table-container"]}>
                <div className={styles["table-header-container"]}>
                    <div className={styles["table-header-cell"]} style={{ marginLeft: "4%" }}>
                        Cenário de Demanda
                    </div>
                    <div className={styles["table-header-cell"]}>
                        Contrato Ótimo
                    </div>
                    <div className={styles["table-header-cell"]}>
                        Demandas
                    </div>
                    <div className={styles["table-header-cell"]} style={{ marginRight: "4%", width: "41%" }}>
                        Resultado Financeiro
                    </div>
                </div>
                <div className={styles["table-body"]}>
                    {Object.keys(formattedData).map((key, index) => (
                        <ContratoTableRow data={formattedData[key]} key={v4()} name={key} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#EAEAEA" }} />
                    ))}
                </div>
            </div>

            <div className={styles["header-container"]} style={{ marginTop: "20px" }}>
                <h1 className={styles["main-title"]}>Contratos {context.searchParams.periodo}:</h1>
            </div>
                <ContratoFilter contrato={context.searchParams.contrato} options={Object.keys(formattedData)} periodo={context.searchParams.periodo} region={context.params.region} />
                <CenarioContratoTable data={contratos}/>
            <div className={styles["header-container"]} style={{ marginTop: "20px" }}>
                <h1 className={styles["main-title"]}>Penalidades:</h1>
            </div>

            <div className={styles["penalide-header-container"]}>
                    <p className={styles["header-cell"]} style={{ marginLeft: "4%" }}>Ponto</p>
                    <p className={styles["header-cell"]}>Contrato</p>
                    <p className={styles["header-cell"]}>Demanda</p>
                    <p className={styles["header-cell"]} style={{ width: "41%" }}>Custos</p>
            </div>
            <section className={styles["penalidades-container"]}>
                {penalidades.map((row, idx) => <PenalidadeRow data={row} region={context.params.region} key={`@penalidade-row-${idx}`}/>)}
            </section>
        </main>
    );
}