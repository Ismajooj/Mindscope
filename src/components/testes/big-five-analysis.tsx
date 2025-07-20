'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, HelpCircle, TrendingUp } from 'lucide-react';

interface BigFiveData {
  trait: string;
  score: number;
  description: string;
  benchmark: number;
  trend: 'increase' | 'decrease';
}

interface BigFiveAnalysisProps {
  title: string;
  data: BigFiveData[];
}

export function BigFiveAnalysis({ title, data }: BigFiveAnalysisProps) {
  return (
    <Card className="border-none bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <TrendingUp className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TooltipProvider>
          {data.map((item) => (
            <div key={item.trait}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{item.trait}</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 cursor-pointer text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold">{item.score}%</span>
                  <div
                    className={cn('flex items-center text-xs', item.trend === 'increase' ? 'text-green-500' : 'text-red-500')}
                  >
                    {item.trend === 'increase' ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    <span>{Math.abs(item.score - item.benchmark)}pts</span>
                  </div>
                </div>
              </div>
              <div className="relative h-4">
                <Progress value={item.score} className="h-full" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="absolute top-0 h-full w-1.5 -translate-x-1/2 cursor-pointer bg-foreground/50"
                      style={{ left: `${item.benchmark}%` }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Média: {item.benchmark}%</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
