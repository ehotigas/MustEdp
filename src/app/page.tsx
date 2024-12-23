import styles from "./page.module.css";
import Image from "next/image";
import image from "./bg.png";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.leftContent}>
        <div className={styles.mainTitleContainer}>
          <h1 className={styles.mainTitle}>SIMULADOR MUST</h1>
        </div>
        <p className={styles.mainText}>Simulador desenvolvido pela equipe de <strong>Estudos de Mercado</strong>, com o objetivo de otimizar a seleção de contratos para os pontos de distribuição</p>
        <p className={styles.mainText}><strong>Para iniciar a simulação, selecione uma das regiões abaixo:</strong></p>
        <span className={styles.span}>•</span>
        <Link className={styles.link} href="/sp">
          EDP SP
        </Link>
        <br/>
        <span className={styles.span}>•</span>
        <Link className={styles.link} href="/es">
          EDP ES
        </Link>
      </div>
      <div className={styles.rightContent}>
        <Image
          src={image}
          alt="main.svg"
          width={1000}
          className={styles.bgImage}
        />
      </div>
    </main>
  );
}
