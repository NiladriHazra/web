"use client";

import { useEffect, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserRoleAction } from "../server/actions";

interface UserRoleSelectProps {
  userId: number;
  role: string | null;
  isSelf?: boolean;
  triggerClassName?: string;
}

interface RoleFeedback {
  message: string;
  tone: "idle" | "success" | "error";
}

export function UserRoleSelect({
  userId,
  role,
  isSelf = false,
  triggerClassName,
}: UserRoleSelectProps) {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(role ?? "user");
  const [feedback, setFeedback] = useState<RoleFeedback | null>(null);

  useEffect(() => {
    setValue(role ?? "user");
    setFeedback(null);
  }, [role]);

  const handleRoleChange = (nextRole: string) => {
    const previousRole = value;

    if (previousRole === nextRole) {
      return;
    }

    setValue(nextRole);
    setFeedback({
      message: "Saving role change...",
      tone: "idle",
    });

    startTransition(async () => {
      try {
        const result = await updateUserRoleAction(userId, nextRole);

        setValue(result.role);
        setFeedback({
          message: `Saved as ${result.role}.`,
          tone: "success",
        });
      } catch (error) {
        console.error("[admin] Failed to update user role:", error);
        setValue(previousRole);
        setFeedback({
          message: "Role change failed. Value was reverted.",
          tone: "error",
        });
      }
    });
  };

  return (
    <div className="space-y-1.5 py-1">
      <Select
        value={value}
        onValueChange={(nextRole) => nextRole && handleRoleChange(nextRole)}
        disabled={isSelf || isPending}
      >
        <SelectTrigger className={cn("h-8 w-24", triggerClassName)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">user</SelectItem>
          <SelectItem value="admin">admin</SelectItem>
        </SelectContent>
      </Select>
      {feedback && (
        <p
          className={cn(
            "text-xs",
            feedback.tone === "error" && "text-destructive",
            feedback.tone === "success" && "text-emerald-400",
            feedback.tone === "idle" && "text-muted-foreground",
          )}
        >
          {feedback.message}
        </p>
      )}
    </div>
  );
}
