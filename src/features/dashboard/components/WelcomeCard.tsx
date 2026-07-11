import { Card, CardContent } from "@/components/ui/card";

export function WelcomeCard() {
  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>

        <p className="mt-2 text-muted-foreground">
          Continue learning with Polyglot AI.
        </p>
      </CardContent>
    </Card>
  );
}
