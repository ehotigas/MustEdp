import Dropdown from "@/components/input/dropdown";
import { Region } from "@/types/region";

interface FiltroSimuladorProps {
    options: string[];
    region: Region;
}


export const FiltroSimulador: React.FC<FiltroSimuladorProps> = ({
    region,
    options
}) => {
    return (
        <section style={{ float: "left", marginBottom: "15px", marginLeft: "5%", marginTop: "15px", width: "90%" }}>
            <Dropdown title="Período" options={options}/>
        </section>
    );
}