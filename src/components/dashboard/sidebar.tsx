'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users2,
  TestTube2,
  LineChart,
  FileText,
  Target,
  TrendingUp,
  Calendar,
  Settings,
  BrainCircuit,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme-toggle';

const menuItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/usuarios', icon: Users2, label: 'Usuários' },
  { href: '/testes', icon: TestTube2, label: 'Testes' },
  { href: '#', icon: LineChart, label: 'Análises' },
  { href: '#', icon: FileText, label: 'Relatórios' },
  { href: '#', icon: Target, label: 'Metas' },
  { href: '#', icon: TrendingUp, label: 'Tendências' },
  { href: '#', icon: Calendar, label: 'Agendamentos' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-background md:block w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Header */}
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="text-lg">MindScope</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary',
                    pathname === item.href && 'bg-muted text-primary'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="mt-auto p-4 border-t">
            <nav>
                 <Link
                  href="#"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary'
                  )}
                >
                  <Settings className="h-4 w-4" />
                  Configurações
                </Link>
                <div className="flex items-center justify-center mt-2">
                    <ThemeToggle />
                </div>
            </nav>
        </div>
      </div>
    </aside>
  );
}
