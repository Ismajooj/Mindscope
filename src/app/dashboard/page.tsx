import type { Metadata } from 'next';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { PersonalityMatrix } from '@/components/dashboard/personality-matrix';
import { RecommendedActions } from '@/components/dashboard/recommended-actions';
import { PriorityList } from '@/components/dashboard/priority-list';
import { Users, Activity, Target, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard | MindScope',
  description: 'Monitore o engajamento e o perfil de aprendizado dos seus alunos.',
};

const kpiData = [
  {
    title: 'Alunos Ativos',
    value: '1.250',
    change: 15.3,
    changeType: 'increase' as const,
    changePeriod: 'nos últimos 30 dias',
    icon: Users,
    className: 'dark:bg-green-900/20 dark:border-green-500/50',
  },
  {
    title: 'Engajamento Médio',
    value: '82%',
    change: 2.1,
    changeType: 'increase' as const,
    changePeriod: 'nos últimos 30 dias',
    icon: Activity,
    className: 'dark:bg-blue-900/20 dark:border-blue-500/50',
  },
  {
    title: 'Testes Concluídos',
    value: '980',
    change: 25,
    changeType: 'increase' as const,
    changePeriod: 'nos últimos 30 dias',
    icon: Target,
    className: 'dark:bg-purple-900/20 dark:border-purple-500/50',
  },
  {
    title: 'Tendência de Risco',
    value: '12%',
    change: 3.5,
    changeType: 'decrease' as const,
    changePeriod: 'nos últimos 30 dias',
    icon: TrendingUp,
    className: 'dark:bg-red-900/20 dark:border-red-500/50',
  },
];

const matrixData = [
  { id: 1, student: 'Ana', extroversion: 80, creativity: 75, xAxisLabel: 'Introversão', xAxisLabelRight: 'Extroversão', yAxisLabelTop: 'Estruturada', yAxisLabelBottom: 'Criativa' },
  { id: 2, student: 'Bruno', extroversion: 30, creativity: 85 },
  { id: 3, student: 'Carla', extroversion: 90, creativity: 40 },
  { id: 4, student: 'Daniel', extroversion: 20, creativity: 30 },
  { id: 5, student: 'Eduarda', extroversion: 65, creativity: 60 },
  { id: 6, student: 'Felipe', extroversion: 50, creativity: 50 },
  { id: 7, student: 'Mariana', extroversion: 70, creativity: 90 },
  { id: 8, student: 'Pedro', extroversion: 40, creativity: 20 },
  { id: 9, student: 'Sofia', extroversion: 85, creativity: 80 },
  { id: 10, student: 'Lucas', extroversion: 15, creativity: 65 },
];

const recommendedActionsData = [
  {
    insight: '25% dos alunos com perfil "Introspectivo-Criativo" apresentam baixo engajamento.',
    recommendation: 'Crie trilhas de aprendizado personalizadas com mais atividades assíncronas e projetos criativos.',
    linkText: 'Ver Alunos',
    linkHref: '#',
  },
  {
    insight: 'Alunos com alta "Necessidade de Estrutura" preferem o formato de microlearning.',
    recommendation: 'Adapte o conteúdo para vídeos curtos, infográficos e quizzes rápidos para aumentar a retenção.',
    linkText: 'Criar Conteúdo',
    linkHref: '#',
  },
  {
    insight: 'O engajamento é 30% maior em turmas com acompanhamento de mentores.',
    recommendation: 'Inicie um programa de mentoria conectando alunos veteranos com calouros.',
    linkText: 'Ver Programa',
    linkHref: '#',
  },
];

const priorityStudents = [
  {
    name: 'Carlos Almeida',
    course: 'Engenharia C. - 2º Ano',
    lastActivity: '2 dias atrás',
    status: 'Risco Alto' as const,
  },
  {
    name: 'Juliana Santos',
    course: 'Psicologia - 1º Ano',
    lastActivity: '8h atrás',
    status: 'Atenção' as const,
  },
  {
    name: 'Lucas Pereira',
    course: 'Design Gráfico - 3º Ano',
    lastActivity: '1 dia atrás',
    status: 'Atenção' as const,
  },
  {
    name: 'Mariana Costa',
    course: 'Medicina - 4º Ano',
    lastActivity: '2h atrás',
    status: 'Engajado' as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/40 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* KPIs Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {kpiData.map((kpi) => (
                <KpiCard key={kpi.title} {...kpi} />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Personality Matrix */}
              <div className="lg:col-span-2">
                <PersonalityMatrix
                  title="Matriz de Personalidade dos Alunos"
                  description="Distribuição dos perfis de personalidade baseada em Extroversão vs Criatividade"
                  matrixData={matrixData}
                />
              </div>

              {/* Priority List */}
              <div>
                <PriorityList
                  title="Alunos Prioritários"
                  students={priorityStudents}
                />
              </div>

              {/* Recommended Actions */}
              <div className="lg:col-span-3">
                <RecommendedActions
                  title="Ações Recomendadas pela IA"
                  description="Insights personalizados baseados nos dados de engajamento e perfis de personalidade"
                  actions={recommendedActionsData}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
