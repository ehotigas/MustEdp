import Dropdown from "@/components/input/dropdown";
import styles from "./page.module.css";

export default function UploadParamsPage() {
    
    return (
        <main>
            <header className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>Enviar Parâmetros: </h1>
                <h2 className={styles["sub-title"]}> Enviar csv</h2>
            </header>
            <section className={styles["section"]} style={{ marginTop: "15px" }}>
                <Dropdown defaultValue="SP" options={["SP", "ES"]} title="Escolha a Região" />
            </section>
            <section className={styles["section"]} style={{ marginTop: "15px" }}>
            
            </section>
        </main>
    );
}