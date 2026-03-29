import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-1.5 truncate text-3xl font-semibold tracking-tight">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
