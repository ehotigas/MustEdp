"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';


export interface DemandaChartData extends Record<string, number | string | Date> {
    data: string | Date;
}

export interface CenarioData {
    name: string;
    color: string;
}



interface DemandaChartProps {
    cenarios: CenarioData[];
    data: DemandaChartData[];
}
  

export const DemandaChart: React.FC<DemandaChartProps> = ({
    cenarios,
    data
}) => {
    return (
        <ResponsiveContainer className="p2">
            <LineChart
                width={500}
                height={100}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" tickFormatter={(tick) => format(parseISO(tick), 'MM/yyyy', { locale: pt })} />
                <YAxis />
                <Tooltip />
                {
                    cenarios.map(
                        value => <Line type="monotone" dataKey={value.name} stroke={value.color} strokeWidth={2} dot={false} />
                    )
                }
                <Legend />

            </LineChart>
        </ResponsiveContainer>
      );
}
