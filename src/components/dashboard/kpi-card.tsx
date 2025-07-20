import type { LucideProps } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  changePeriod: string;
  icon: React.ComponentType<LucideProps>;
  className?: string;
}

export function KpiCard({
  title,
  value,
  change,
  changeType,
  changePeriod,
  icon: Icon,
  className,
}: KpiCardProps) {
  const isIncrease = changeType === 'increase';
  return (
    <Card className={cn('relative overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          {isIncrease ? (
            <ArrowUp className="h-3 w-3 text-green-500" />
          ) : (
            <ArrowDown className="h-3 w-3 text-red-500" />
          )}
          <span className={cn('font-semibold', isIncrease ? 'text-green-500' : 'text-red-500')}>
            {change}%
          </span>
          <span>{changePeriod}</span>
        </p>
      </CardContent>
    </Card>
  );
}
