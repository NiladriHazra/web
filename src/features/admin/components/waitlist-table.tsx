import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface WaitlistEntry {
  id: number;
  name: string | null;
  email: string;
  createdAt: Date;
}

interface WaitlistTableProps {
  entries: WaitlistEntry[];
}

export function WaitlistTable({ entries }: WaitlistTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Person</TableHead>
          <TableHead className="hidden sm:table-cell">Email</TableHead>
          <TableHead className="hidden md:table-cell">Signed Up</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {(entry.name ?? entry.email).charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {entry.name || "—"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground sm:hidden">
                    {entry.email}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <span className="text-muted-foreground">{entry.email}</span>
            </TableCell>
            <TableCell className="hidden text-muted-foreground md:table-cell">
              {entry.createdAt.toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
