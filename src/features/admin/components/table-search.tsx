"use client";

import { useRef, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { Input } from "@/components/ui/input";

interface TableSearchProps {
  placeholder?: string;
}

export function TableSearch({
  placeholder = "Search by name or email...",
}: TableSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set("q", value);
          params.delete("page");
        } else {
          params.delete("q");
        }
        router.push(`${pathname}?${params.toString()}`);
      }, 300);
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="relative">
      <HugeiconsIcon
        icon={Search01Icon}
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        placeholder={placeholder}
        defaultValue={searchParams.get("q") ?? ""}
        onChange={handleChange}
        className="pl-9"
      />
    </div>
  );
}
