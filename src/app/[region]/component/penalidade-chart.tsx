import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Penalidade } from '@/service/penalidade/penalidade.entity';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';



interface PenalidadeChartProps {
    data: Penalidade[]
}
  

export const PenalidadeChart: React.FC<PenalidadeChartProps> = ({
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
                <Line type="monotone" dataKey="demanda" stroke="#E49430" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="contrato" stroke="#000" strokeWidth={2} dot={false} />
                <Legend />

            </LineChart>
        </ResponsiveContainer>
      );
}
