import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, ArrowRight, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardHeader, CardTitle, CardDescription } from '../ui/card';

interface Action {
  insight: string;
  recommendation: string;
  linkText: string;
  linkHref: string;
}

interface RecommendedActionsProps {
  title: string;
  description: string;
  actions: Action[];
  className?: string;
}

const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export function RecommendedActions({ title, description, actions, className }: RecommendedActionsProps) {
  return (
    <Card className={cn('w-full', className)}>
        <CardHeader>
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </div>
        </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          {actions.map((action, index) => (
            <Card key={index} className="group relative overflow-hidden border-l-4 border-primary/20 transition-all hover:border-primary hover:shadow-lg">
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-start gap-3 mb-3">
                  <Lightbulb className="mt-1 h-4 w-4 flex-shrink-0 text-amber-500" />
                  <div>
                    <h4 className="mb-1 text-sm font-semibold">
                      Insight
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {action.insight}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 mb-4">
                  <TargetIcon className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                  <div>
                    <h4 className="mb-1 text-sm font-semibold">
                      Ação Recomendada
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {action.recommendation}
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto">
                    <Link
                    href={action.linkHref}
                    className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
                    >
                    {action.linkText}
                    <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
