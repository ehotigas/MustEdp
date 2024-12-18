import { GenerateContracts } from "./components/generate-contracts";
import { UploadCsv } from "./components/upload-csv";
import { Region } from "@/types/region";
import styles from "./page.module.css";


export default function UploadContratosPage(
    context: {
        searchParams: { region: Region }
    }
) {
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
        </main>
    );
}