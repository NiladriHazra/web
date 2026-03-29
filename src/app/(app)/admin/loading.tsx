import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminDashboardLoading() {
  return (
    <div className="p-6 md:p-8">
      <div>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-2 h-4 w-48" />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-4 p-6">
              <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
              <div className="min-w-0 flex-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="mt-3 h-8 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader className="flex-row items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-7 w-20 rounded-md" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
