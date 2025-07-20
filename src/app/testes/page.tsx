import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrainCircuit, Target, Code, Ear, Lock, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { BigFiveAnalysis } from '@/components/testes/big-five-analysis';
import { PersonalityFacets } from '@/components/testes/personality-facets';

export const metadata: Metadata = {
  title: 'Resultados de Personalidade | MindScope',
  description: 'Descubra insights profundos sobre sua personalidade e estilo de aprendizagem.',
};

const EneagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);


const BigFiveIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15.23 18.23a4.5 4.5 0 0 0-1.2-5.73l-1.53-1.53a1.5 1.5 0 0 1 0-2.12l4.6-4.6a1.5 1.5 0 0 1 2.12 0l1.53 1.53a4.5 4.5 0 0 1-5.73 6.45Z"/><path d="m9.24 11.22 3.53 3.53"/><path d="m6.66 8.64.71.71c.78.78.78 2.05 0 2.83l-2.12 2.12c-.78.78-2.05.78-2.83 0L2 13.88c-.78-.78-.78-2.05 0-2.83l.42-.42c.78-.78 2.05-.78 2.83 0l.71.71c.78.78.78 2.05 0 2.83l-.71.71c-.78.78-2.05.78-2.83 0l-.42-.42c-.78-.78-.78-2.05 0-2.83l2.12-2.12c.78-.78 2.05-.78 2.83 0Z"/></svg>
);

const insights = [
  {
    icon: Code,
    title: 'Perfil Dominante',
    subtitle: 'Consciencioso-Criativo',
    description: 'Combinação de organização com inovação',
  },
  {
    icon: Target,
    title: 'Estilo Preferido',
    subtitle: 'Visual-Auditivo',
    description: 'Aprendizagem multissensorial',
  },
];

const bigFiveData = [
    {
      trait: 'Abertura à Experiência',
      score: 78,
      description: 'Criatividade e curiosidade acima da média',
      benchmark: 72,
      trend: 'increase' as const,
    },
    {
      trait: 'Conscienciosidade',
      score: 85,
      description: 'Organização e disciplina excelentes',
      benchmark: 78,
      trend: 'increase' as const,
    },
    {
      trait: 'Extroversão',
      score: 62,
      description: 'Perfil mais introvertido que a média',
      benchmark: 68,
      trend: 'decrease' as const,
    },
    {
      trait: 'Amabilidade',
      score: 71,
      description: 'Cooperação ligeiramente abaixo da média',
      benchmark: 75,
      trend: 'decrease' as const,
    },
    {
      trait: 'Neuroticismo',
      score: 45,
      description: 'Estabilidade emocional acima da média',
      benchmark: 52,
      trend: 'increase' as const,
    },
  ];
  
const facetsData = [
    {
      trait: 'Abertura à Experiência',
      facets: [
        { name: 'Imaginação', score: 82 },
        { name: 'Interesses Artísticos', score: 90 },
        { name: 'Emocionalidade', score: 75 },
        { name: 'Aventureirismo', score: 68 },
        { name: 'Intelectualidade', score: 85 },
        { name: 'Liberalismo', score: 70 },
      ],
    },
    {
      trait: 'Conscienciosidade',
      facets: [
        { name: 'Autoeficácia', score: 88 },
        { name: 'Ordem', score: 92 },
        { name: 'Senso de Dever', score: 85 },
        { name: 'Esforço por Realizações', score: 90 },
        { name: 'Autodisciplina', score: 80 },
        { name: 'Deliberação', score: 78 },
      ],
    },
    {
      trait: 'Extroversão',
      facets: [
        { name: 'Sociabilidade', score: 65 },
        { name: 'Assertividade', score: 70 },
        { name: 'Nível de Atividade', score: 58 },
        { name: 'Busca por Excitação', score: 60 },
        { name: 'Alegria', score: 68 },
        { name: 'Simpatia', score: 72 },
      ],
    },
  ];

export default function TestesPage() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col">
          <Header />
          <div className="flex-1 space-y-8 p-4 md:p-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold tracking-tight">
                Seus Resultados de Personalidade
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Descubra insights profundos sobre sua personalidade e estilo de aprendizagem
              </p>
            </div>

            <Tabs defaultValue="big-five" className="w-full">
              <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="big-five">
                  <BigFiveIcon className="mr-2 h-4 w-4" />
                  Big Five + VARK
                </TabsTrigger>
                <TabsTrigger value="eneagrama">
                  <EneagramIcon className="mr-2 h-4 w-4" />
                  Eneagrama
                </TabsTrigger>
              </TabsList>
              <TabsContent value="big-five" className="mt-6 space-y-8">
                <Card className="border-none bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                        <BrainCircuit className="h-5 w-5" />
                        Insights Principais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {insights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <insight.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <p className="font-semibold">{insight.title}</p>
                          <p className="text-primary">{insight.subtitle}</p>
                          <p className="text-sm text-muted-foreground">
                            {insight.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <BigFiveAnalysis title="Análise Big Five" data={bigFiveData} />

                <PersonalityFacets title="Facetas de Personalidade" data={facetsData} />

              </TabsContent>
               <TabsContent value="eneagrama" className="mt-6">
                <Card className="border-none bg-muted/30 shadow-sm">
                  <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                      <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      Pronto para o Próximo Nível?
                    </h2>
                    <p className="mt-3 max-w-md text-muted-foreground">
                      Você já sabe 'o que' são seus traços. Agora, descubra 'por que' eles existem. O Eneagrama revela suas motivações mais profundas, medos inconscientes e seu caminho exato para o crescimento.
                    </p>
                    <Button className="mt-8" size="lg">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Desbloquear Meu Perfil Eneagrama
                    </Button>
                  </CardContent>
                </Card>
               </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
