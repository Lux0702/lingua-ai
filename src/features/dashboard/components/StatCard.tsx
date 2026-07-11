import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardStat } from "../types";

interface StatCardProps {
  stat: DashboardStat;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">
          {stat.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold">{stat.value}</p>
      </CardContent>
    </Card>
  );
}
