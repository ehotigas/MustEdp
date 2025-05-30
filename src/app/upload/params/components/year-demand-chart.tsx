
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

export type YearDemandType = {
    data: Date | string;
    contrato: number;
    demanda: number;
    eust: number;
    penalidades: number;
};

type YearDemandChartProps = {
    data: YearDemandType[]
};

export const YearDemandChart: React.FC<YearDemandChartProps> = ({ data }) => {
    const getMaxValue = (dataKey: "contrato" | "demanda" | "eust" | "penalidades") => {
        return (Math.max(...data.map(item => item[dataKey])) * 1.9).toFixed(0); // +20% do valor máximo
      };
    const chartFormatter = new Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: 0,
        // currency: 'BRL'
    });

    const legendFormatter = new Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: 3,
        // currency: 'BRL'
    });
      
      
    return (
        <div style={{ width: "100%", float: "left", height: "400px" }}>
            <ResponsiveContainer width="103%" height="100%">
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
                        Demanda MW, Contrato MW, Custo M R$, Penalidades M R$
                    </text>

                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="data" tickFormatter={(tick) => format(parseISO(tick), 'MM/yyyy', { locale: pt })} angle={0} fontSize={14}/>
                    <YAxis fontSize={14} yAxisId="right" orientation="right" domain={[0, (dataMax: number) => getMaxValue("penalidades")]} />
                    <YAxis fontSize={14} yAxisId="left" orientation="left" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#333",
                            borderRadius: "6px",
                            border: "none",
                            color: "#fff"
                          }}
                          itemStyle={{ color: "#fff" }}
                          formatter={(value, name) => {
                            // Formata valores e nomes
                            const formattedName = {
                              eust: "EUST",
                              contrato: "Contrato",
                              demanda: "Demanda",
                              penalidades: "Penalidades",
                            }[name];
                            if (["eust", "penalidades"].includes(name as string)) {
                                return [`R$ ${legendFormatter.format(parseFloat(value.toString()))} M`, formattedName];
                            }
                            return [`${legendFormatter.format(parseFloat(value.toString()))} MW`, formattedName];
                          }}
                          labelFormatter={(label) => {
                            return `Mês: ${format(parseISO(label), "MM/yyyy", { locale: pt })}`;
                          }}
                        
                    />
                    <Legend
                        formatter={(value, entry, index) => {
                            const formattedValues = {
                              eust: "EUST",
                              penalidades: "Penalidades",
                              contrato: "Contrato",
                              demanda: "Demanda"
                            };
                            return formattedValues[value as keyof typeof formattedValues] || value;
                          }}
                        wrapperStyle={{ paddingTop: "0px", fontSize: "12px", fontWeight: "bold" }}
                        
                    />
                    {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
                    <Line strokeWidth={1.5} type="monotone" dataKey="demanda" stroke="#263CC8" xAxisId="0" yAxisId="left">
                        <LabelList
                            dataKey="demanda" 
                            position={"top"} // top, insideTop, insideMiddle, insideBottom, etc.
                            fill="#263CC8" // Cor do texto
                            fontSize={9}
                            fontWeight="bold"
                            formatter={(value: number) => parseFloat(value.toString()) > 1 ? `${chartFormatter.format(parseFloat(value.toString()))}MW` : ""} // Formatação personalizada
                        />
                    </Line>
                    <Line strokeWidth={1.5} type="monotone" dataKey="contrato" stroke="#E32C2C" xAxisId="0" yAxisId="left">
                        <LabelList
                            dataKey="contrato" 
                            position={"top"} // top, insideTop, insideMiddle, insideBottom, etc.
                            fill="#E32C2C" // Cor do texto
                            fontSize={9}
                            fontWeight="bold"
                            formatter={(value: number) => parseFloat(value.toString()) > 1 ? `${chartFormatter.format(parseFloat(value.toString()))}MW` : ""} // Formatação personalizada
                        />
                    </Line>
                    {/* <Bar dataKey="eust" barSize={15} fill="#332D38" stackId="a" opacity={.5} yAxisId="right" >
                        <LabelList
                            dataKey="eust" 
                            position={"top"} // top, insideTop, insideMiddle, insideBottom, etc.
                            fill="#332D38" // Cor do texto
                            fontSize={9}
                            fontWeight="bold"
                            formatter={(value: number) => parseFloat(value.toString()) > 1 ? `${parseFloat(value.toString()).toFixed(0)}M` : ""} // Formatação personalizada
                        />
                    </Bar> */}
                    <Bar dataKey="penalidades" barSize={15} fill="#DF6A41" stackId="b" opacity={.5} yAxisId="right" >
                        <LabelList
                            dataKey="penalidades" 
                            position={"top"} // top, insideTop, insideMiddle, insideBottom, etc.
                            fill="#DF6A41" // Cor do texto
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
