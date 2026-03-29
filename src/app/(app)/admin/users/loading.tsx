import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminUsersLoading() {
  return (
    <div className="p-6 md:p-8">
      <div>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-2 h-4 w-56" />
      </div>

      <Card className="mt-8">
        <CardHeader className="flex-row items-center justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-7 w-20 rounded-md" />
              <Skeleton className="hidden h-4 w-24 md:block" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
