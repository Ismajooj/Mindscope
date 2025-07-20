
import type { Metadata } from 'next';
import { Plus, Calendar, Search, Filter, MessageSquare, MoreVertical, BarChart2, Users, Edit, Bell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sidebar } from '@/components/dashboard/sidebar';

export const metadata: Metadata = {
  title: 'Usuários | Mindscope',
  description: 'Sua central de comando para coaching de alta performance.',
};

// Tipos para melhor type safety
interface Coachee {
  id: string;
  name: string;
  avatar: string;
  profileTags: string[];
}

interface NextSession extends Coachee {
  time: string;
  insight: string;
  isUrgent?: boolean;
}

interface ActiveCoachee extends Coachee {
  assessmentStatus: 'Completo' | 'Pendente' | 'Em Andamento';
  profile: string;
  hasNotes: boolean;
  lastSession?: string;
}

// Dados mockados com melhor estrutura
const nextSessions: NextSession[] = [
  {
    id: '1',
    name: 'Lucas Gabriel',
    time: '09:00',
    avatar: '/avatars/01.png',
    insight: 'Foco da sessão: transição de carreira e definição de metas.',
    profileTags: ['Big Five: Alta Abertura', 'Eneagrama: Tipo 4 SX'],
    isUrgent: true
  },
  {
    id: '2',
    name: 'Mariana Santos',
    time: '11:00',
    avatar: '/avatars/02.png',
    insight: 'Revisar o progresso das ações definidas na última sessão.',
    profileTags: ['DISC: Dominância', 'MBTI: ENTJ']
  },
  {
    id: '3',
    name: 'Ricardo Pereira',
    time: '14:30',
    avatar: '/avatars/03.png',
    insight: 'Sessão de alinhamento de valores e propósito.',
    profileTags: ['Big Five: Alta Consciência', 'Motivadores: Altruísta']
  },
  {
    id: '4',
    name: 'Ana Beatriz Costa',
    time: '16:00',
    avatar: '/avatars/04.png',
    insight: 'Cliente novo. Primeira sessão de descoberta.',
    profileTags: ['Assessment Pendente']
  },
];

const activeCoachees: ActiveCoachee[] = [
  {
    id: '5',
    name: 'Juliana Paiva',
    avatar: '/avatars/05.png',
    assessmentStatus: 'Completo',
    profile: 'Big Five: Alta Extroversão',
    hasNotes: true,
    profileTags: [],
    lastSession: '2024-07-15'
  },
  {
    id: '6',
    name: 'Fernando Lima',
    avatar: '/avatars/06.png',
    assessmentStatus: 'Pendente',
    profile: 'Eneagrama: Tipo 9 SP',
    hasNotes: false,
    profileTags: []
  },
  {
    id: '7',
    name: 'Beatriz Costa',
    avatar: '/avatars/07.png',
    assessmentStatus: 'Completo',
    profile: 'DISC: Influência',
    hasNotes: true,
    profileTags: [],
    lastSession: '2024-07-18'
  },
  {
    id: '8',
    name: 'Carlos Mendes',
    avatar: '/avatars/08.png',
    assessmentStatus: 'Em Andamento',
    profile: 'MBTI: ISFJ',
    hasNotes: true,
    profileTags: [],
    lastSession: '2024-07-16'
  },
];

// Componente para card de próxima sessão
function NextSessionCard({ session, index }: { session: NextSession; index: number }) {
  return (
    <Card className="w-[320px] shrink-0 rounded-xl border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-primary/10">
              <AvatarImage
                src={`https://i.pravatar.cc/48?img=${index + 1}`}
                alt={`Avatar de ${session.name}`}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {session.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground text-base">{session.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{session.time}</p>
                {session.isUrgent && (
                  <Badge variant="destructive" className="text-xs px-2 py-0.5">
                    <Bell className="h-3 w-3 mr-1" />
                    Urgente
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex flex-wrap gap-1">
            {session.profileTags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-primary/10 dark:text-primary-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Alert className="bg-amber-50 text-amber-900 border-amber-200 dark:bg-yellow-900/20 dark:text-yellow-200 dark:border-yellow-700/50 mb-4">
          <AlertDescription className="flex items-start gap-2 text-sm">
            <span className="text-amber-600 dark:text-yellow-300">💡</span>
            <span className="flex-1 leading-relaxed">{session.insight}</span>
          </AlertDescription>
        </Alert>

        <Button variant="ghost" size="sm" className="w-full justify-between p-0 h-auto text-primary hover:text-primary/80">
          <span className="text-sm font-medium">Ver Perfil Completo</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

// Componente para status do assessment
function AssessmentStatusBadge({ status }: { status: ActiveCoachee['assessmentStatus'] }) {
  const variants = {
    'Completo': {
      variant: 'default' as const,
      className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 border-green-200 dark:border-green-700'
    },
    'Pendente': {
      variant: 'secondary' as const,
      className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200 border-orange-200 dark:border-orange-700'
    },
    'Em Andamento': {
      variant: 'outline' as const,
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border-blue-200 dark:border-blue-700'
    }
  };

  const config = variants[status];

  return (
    <Badge variant={config.variant} className={config.className}>
      {status}
    </Badge>
  );
}

// Componente principal
export default function CoachDashboardPage() {
  const todaySessions = nextSessions.length;
  const pendingAssessments = activeCoachees.filter(c => c.assessmentStatus === 'Pendente').length;

  return (
    <div className="flex min-h-screen w-full bg-gray-50/50 dark:bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 space-y-8 p-4 md:p-8 overflow-y-auto">
          {/* Header com informações contextuais */}
          <header className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Olá, Sofia 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Você tem <span className="font-semibold text-foreground">{todaySessions} sessões hoje</span>
                {pendingAssessments > 0 && (
                  <> · <span className="text-amber-600">{pendingAssessments} assessments pendentes</span></>
                )}
              </p>
            </div>

            <div className="flex gap-3">
              <Button className="shadow-sm">
                <Plus className="mr-2 h-4 w-4" />
                Convidar Usuário
              </Button>
              <Button variant="outline" className="shadow-sm">
                <Calendar className="mr-2 h-4 w-4" />
                Minha Agenda
              </Button>
            </div>
          </header>

          {/* Seção: Próximas Sessões */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Próximas Sessões</h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {todaySessions} hoje
              </Badge>
            </div>

            <ScrollArea className="w-full">
              <div className="flex space-x-6 pb-4">
                {nextSessions.map((session, index) => (
                  <NextSessionCard key={session.id} session={session} index={index} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Seção: Painel de Usuários Ativos */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Usuários Ativos</h2>
              <Badge variant="outline">
                {activeCoachees.length} coachees
              </Badge>
            </div>

            <Card className="rounded-xl border-border bg-card shadow-sm">
              <CardHeader className="px-6 py-5 border-b border-border">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar usuário..."
                      className="pl-10 border-0 bg-muted/50 focus-visible:bg-background"
                    />
                  </div>

                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Filtrar
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Todos os Status</DropdownMenuItem>
                        <DropdownMenuItem>Assessment Completo</DropdownMenuItem>
                        <DropdownMenuItem>Assessment Pendente</DropdownMenuItem>
                        <DropdownMenuItem>Por Tipo de Eneagrama</DropdownMenuItem>
                        <DropdownMenuItem>Por MBTI</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-6 font-semibold">Usuário</TableHead>
                      <TableHead className="font-semibold">Status do Assessment</TableHead>
                      <TableHead className="font-semibold">Perfil Principal</TableHead>
                      <TableHead className="font-semibold">Última Sessão</TableHead>
                      <TableHead className="font-semibold">Anotações</TableHead>
                      <TableHead className="text-right pr-6 font-semibold">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeCoachees.map((coachee, index) => (
                      <TableRow
                        key={coachee.id}
                        className="hover:bg-muted/30 transition-colors duration-150"
                      >
                        <TableCell className="font-medium pl-6">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={`https://i.pravatar.cc/40?img=${index + 10}`}
                                alt={`Avatar de ${coachee.name}`}
                              />
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                                {coachee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{coachee.name}</p>
                              <p className="text-xs text-muted-foreground">
                                ID: {coachee.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <AssessmentStatusBadge status={coachee.assessmentStatus} />
                        </TableCell>

                        <TableCell className="max-w-48">
                          <p className="text-sm font-medium truncate">{coachee.profile}</p>
                        </TableCell>

                        <TableCell>
                          {coachee.lastSession ? (
                            <p className="text-sm text-muted-foreground">
                              {new Date(coachee.lastSession).toLocaleDateString('pt-BR')}
                            </p>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Primeira sessão
                            </Badge>
                          )}
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`text-muted-foreground hover:text-primary ${coachee.hasNotes ? 'text-primary' : ''}`}
                          >
                            <MessageSquare className={`h-4 w-4 ${coachee.hasNotes ? 'fill-current' : ''}`} />
                          </Button>
                        </TableCell>

                        <TableCell className="text-right pr-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                              <DropdownMenuItem>Agendar Sessão</DropdownMenuItem>
                              <DropdownMenuItem>Enviar Assessment</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Arquivar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

          {/* Seção: Insights da Prática */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Insights da Sua Prática</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                Ver Relatório Completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="rounded-xl border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-primary" />
                    Perfil da Carteira
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 w-full bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center text-muted-foreground mb-4">
                    <BarChart2 className="h-12 w-12 text-primary/50" />
                  </div>
                  <Alert className="bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:text-green-200 dark:border-green-700/50">
                    <AlertDescription className="flex items-center gap-2 text-sm">
                      <span className="text-green-500">📈</span>
                      <span className="flex-1">
                        <strong>Tendência:</strong> Alta concentração de clientes do Centro Mental.
                      </span>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200 md:col-span-2 lg:col-span-2">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Oportunidades de Negócio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground mb-1">Sugestão de Workshop</p>
                      <p className="text-sm text-muted-foreground">
                        Crie um workshop sobre <strong className="text-foreground">Comunicação Assertiva</strong> para seus 4 clientes do Tipo 9.
                      </p>
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-primary hover:text-primary/80">
                        Ver detalhes
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                      <Edit className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground mb-1">Ideia de Conteúdo</p>
                      <p className="text-sm text-muted-foreground">
                        Escreva sobre como a <strong className="text-foreground">'Alta Abertura'</strong> pode levar à falta de foco.
                      </p>
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300">
                        Começar rascunho
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
