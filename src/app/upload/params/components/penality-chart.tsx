
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

export type PenalityChartType = {
    data: Date | string;
    contrato: number;
    demanda: number;
    eust: number;
    add: number;
    piu: number;
    pis: number;
};

type PenalityChartProps = {
    data: PenalityChartType[]
};

export const PenalityChart: React.FC<PenalityChartProps> = ({ data }) => {
    const chartFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        maximumFractionDigits: 0,
        // currency: 'BRL'
    });

    const legendFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        maximumFractionDigits: 0,
        // currency: 'BRL'
    });
      
    
    return (
        <div style={{ width: "100%", float: "left", height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={data}
                    margin={{
                        top: 40,
                        right: 80,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <text
                        x="50%"  // Centralizado horizontalmente
                        y={20}   // Distância do topo
                        textAnchor="middle"  // Alinhamento central
                        style={{ fontSize: '14px', fontWeight: 'bold' }}
                    >
                        Penalidades M R$
                    </text>

                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="data" tickFormatter={(tick) => format(parseISO(tick), 'MM/yyyy', { locale: pt })} angle={0} fontSize={14}/>
                    <YAxis fontSize={14}/>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#333",
                            borderRadius: "6px",
                            border: "none",
                            color: "#fff"
                          }}
                          itemStyle={{ color: "#fff" }}
                          formatter={(value, name, props) => {
                            // Formata valores e nomes
                            const formattedName = {
                              eust: "EUST",
                              add: "ADD", 
                              contrato: "Contrato",
                              demanda: "Demanda",
                              piu: "PIU",
                              pis: "PIS"
                            }[name];
                            if (["eust", "penalidades", "piu", "pis", "add"].includes(name as string)) {
                                return [`${value} M`, formattedName];
                            }
                            return [`${value} MW`, formattedName];
                          }}
                          labelFormatter={(label) => {
                            return `Mês: ${format(parseISO(label), "MM/yyyy", { locale: pt })}`;
                          }}
                        
                    />
                    <Legend
                        formatter={(value) => {
                            const formattedValues = {
                              eust: "EUST",
                              add: "ADD",
                              piu: "PIU",
                              pis: "PIS",
                              contrato: "Contrato",
                              demanda: "Demanda"
                            };
                            return formattedValues[value as keyof typeof formattedValues] || value;
                          }}
                        wrapperStyle={{ paddingTop: "0px", fontSize: "12px", fontWeight: "bold" }}
                    />
                    <Bar dataKey="add" barSize={15} fill="#DF6A41" stackId="b" opacity={.8}>
                        <LabelList
                            dataKey="add" 
                            position={"top"} // top, insideTop, insideMiddle, insideBottom, etc.
                            fill="#DF6A41" // Cor do texto
                            fontSize={9}
                            fontWeight="bold"
                            formatter={(value: number) => parseFloat(value.toString()) > 1 ? `${chartFormatter.format(parseFloat(value.toString()))}M` : ""} // Formatação personalizada
                        />
                    </Bar>
                    <Bar dataKey="piu" barSize={15} fill="#edae98" stackId="b" opacity={.8}>
                        <LabelList
                            dataKey="piu" 
                            position={"top"} // top, insideTop, insideMiddle, insideBottom, etc.
                            fill="#edae98" // Cor do texto
                            fontSize={9}
                            fontWeight="bold"
                            formatter={(value: number) => parseFloat(value.toString()) > 1 ? `${chartFormatter.format(parseFloat(value.toString()))}M` : ""} // Formatação personalizada
                        />
                    </Bar>
                    <Bar dataKey="pis" barSize={15} fill="#332D38" stackId="b" opacity={.8}>
                        <LabelList
                            dataKey="pis" 
                            position={"top"} // top, insideTop, insideMiddle, insideBottom, etc.
                            fill="#332D38" // Cor do texto
                            fontSize={9}
                            fontWeight="bold"
                            formatter={(value: number) => parseFloat(value.toString()) > 1 ? `${chartFormatter.format(parseFloat(value.toString()))}M` : ""} // Formatação personalizada
                        />
                    </Bar>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
