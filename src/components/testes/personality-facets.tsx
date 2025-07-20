'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Facet {
  name: string;
  score: number;
}

interface FacetData {
  trait: string;
  facets: Facet[];
}

interface PersonalityFacetsProps {
  title: string;
  data: FacetData[];
}

export function PersonalityFacets({ title, data }: PersonalityFacetsProps) {
  return (
    <Card className="border-none bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Layers className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 md:grid-cols-3">
          {data.map((traitData) => (
            <div key={traitData.trait} className="space-y-4">
              <h3 className="font-semibold text-primary">{traitData.trait}</h3>
              <div className="space-y-3">
                {traitData.facets.map((facet) => (
                  <div key={facet.name}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-muted-foreground">{facet.name}</span>
                      <span className="font-medium">{facet.score}%</span>
                    </div>
                    <Progress value={facet.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
