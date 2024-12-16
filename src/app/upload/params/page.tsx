import { UploadCsv } from "./components/upload-csv";
import { Region } from "@/types/region";
import styles from "./page.module.css";


export default function UploadParamsPage(
    context: {
        searchParams: { region: Region }
    }
) {
    return (
        <main>
            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Enviar Parâmetros: </h1>
                <h2 className={styles["sub-title"]}> Enviar csv</h2>
            </header>
            <UploadCsv region={context.searchParams.region} />
        </main>
    );
}