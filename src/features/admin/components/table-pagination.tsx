"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchQuery?: string;
}

function getPageNumbers(current: number, total: number) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (const page of Array.from({ length: end - start + 1 }, (_, i) => start + i)) {
    pages.push(page);
  }

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);
  return pages;
}

export function TablePagination({
  currentPage,
  totalPages,
  basePath,
  searchQuery,
}: TablePaginationProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (searchQuery) params.set("q", searchQuery);
    return `${basePath}?${params.toString()}`;
  };

  const navigate = (page: number) => {
    startTransition(() => {
      router.push(buildHref(page));
    });
  };

  return (
    <Pagination className={cn("py-4 transition-opacity", isPending && "opacity-50")}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? buildHref(currentPage - 1) : "#"}
            aria-disabled={currentPage <= 1 || isPending}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1 && !isPending) navigate(currentPage - 1);
            }}
            className={cn(
              (currentPage <= 1 || isPending) && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>

        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <PaginationItem key={`e-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={buildHref(page)}
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  if (page !== currentPage && !isPending) navigate(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages
                ? buildHref(currentPage + 1)
                : "#"
            }
            aria-disabled={currentPage >= totalPages || isPending}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages && !isPending) navigate(currentPage + 1);
            }}
            className={cn(
              (currentPage >= totalPages || isPending) && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
