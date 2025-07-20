'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  Label,
} from 'recharts';

interface PersonalityMatrixProps {
  title: string;
  description: string;
  matrixData: any[];
  className?: string;
}

const chartConfig = {
  extroversion: {
    label: 'Extroversão',
    color: 'hsl(var(--chart-1))',
  },
  creativity: {
    label: 'Criatividade',
    color: 'hsl(var(--chart-2))',
  },
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-border rounded-lg shadow-xl p-3">
        <p className="font-semibold text-foreground">{data.student}</p>
        <p className="text-sm text-muted-foreground">
          Extroversão: {data.extroversion}%
        </p>
        <p className="text-sm text-muted-foreground">
          Criatividade: {data.creativity}%
        </p>
      </div>
    );
  }

  return null;
};

export function PersonalityMatrix({
  title,
  description,
  matrixData,
  className,
}: PersonalityMatrixProps) {
  const colors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[450px]"
        >
          <ScatterChart
            data={matrixData}
            margin={{
              top: 20,
              right: 20,
              bottom: 40,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="extroversion"
              domain={[0, 100]}
              tickCount={6}
              tickFormatter={(value) => `${value}%`}
              name="Extroversão"
              unit="%"
            >
                <Label value="Introversão <> Extroversão" offset={-30} position="insideBottom" />
            </XAxis>

            <YAxis
              type="number"
              dataKey="creativity"
              domain={[0, 100]}
              tickCount={6}
              tickFormatter={(value) => `${value}%`}
              name="Criatividade"
              unit="%"
            >
                 <Label value="Criativa <> Estruturada" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter
              dataKey="extroversion"
              name="Alunos"
              fill="hsl(var(--chart-1))"
              shape={(props: any) => {
                const { cx, cy, payload } = props;
                const color = colors[payload.id % colors.length];
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={8}
                    fill={color}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                );
              }}
            />
          </ScatterChart>
        </ChartContainer>
        
        <div className="text-center text-sm text-muted-foreground mt-4">
          Dica: Passe o mouse sobre os pontos para ver detalhes individuais dos alunos.
        </div>
      </CardContent>
    </Card>
  );
}
