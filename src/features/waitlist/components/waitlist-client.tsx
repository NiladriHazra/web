"use client";

import { useCallback, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Avatar from "boring-avatars";
import { EMPTY_WAITLIST_OVERVIEW, type WaitlistOverview as WaitlistOverviewData } from "@klipeo/shared";
import { useWaitlistOverview } from "../hooks/use-waitlist-overview";
import { useWaitlistSubmission } from "../hooks/use-waitlist-submission";
import { AVATAR_COLORS } from "./waitlist-avatars";
import { WaitlistForm } from "./waitlist-form";
import { WaitlistOverview } from "./waitlist-overview";

interface WaitlistClientProps {
  initialOverview: WaitlistOverviewData;
  imagesBefore: ReactNode;
  imagesAfter: ReactNode;
}

interface FlyingAvatar {
  name: string;
  x: number;
  y: number;
}

export function WaitlistClient({
  initialOverview = EMPTY_WAITLIST_OVERVIEW,
  imagesBefore,
  imagesAfter,
}: WaitlistClientProps) {
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
  });
  const { overview, refresh } = useWaitlistOverview(initialOverview);
  const [flyingAvatar, setFlyingAvatar] = useState<FlyingAvatar | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const firstSlotRef = useRef<HTMLDivElement>(null);
  const flyingRef = useRef<HTMLDivElement>(null);
  const submittedNameRef = useRef("");

  const animateAvatar = useCallback(async () => {
    const formEl = formRef.current;
    if (!formEl) {
      await refresh();
      return;
    }

    const formRect = formEl.getBoundingClientRect();
    const startX = formRect.left + formRect.width / 2 - 28;
    const startY = formRect.top + formRect.height * 0.4;

    setFlyingAvatar({
      name: submittedNameRef.current || "?",
      x: startX,
      y: startY,
    });

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        const el = flyingRef.current;
        const target = firstSlotRef.current;
        if (!el) {
          resolve();
          return;
        }

        const targetRect = target?.getBoundingClientRect();
        const endX = targetRect ? targetRect.left : startX;
        const endY = targetRect ? targetRect.top : startY + 300;

        gsap.fromTo(
          el,
          { x: 0, y: 0, scale: 0.3, opacity: 0 },
          {
            x: endX - startX,
            y: endY - startY,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(el, {
                scale: 1.15,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut",
                onComplete: resolve,
              });
            },
          },
        );
      });
    });

    await refresh();
    setFlyingAvatar(null);
  }, [refresh]);

  const handleSuccess = useCallback(async () => {
    setFormValues({ email: "", name: "" });
    await animateAvatar();
  }, [animateAvatar]);

  const { errorMessage, isSubmitting, status, submit } = useWaitlistSubmission({
    onSuccess: handleSuccess,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submittedNameRef.current = formValues.name;
    await submit(formValues);
  }

  return (
    <>
      <div className="relative z-10 flex flex-col items-center px-4">
        <div className="relative aspect-[928/1232] w-[90vw] max-w-[640px]">
          {imagesBefore}

          <WaitlistForm
            ref={formRef}
            email={formValues.email}
            errorMessage={errorMessage}
            isSubmitting={isSubmitting}
            name={formValues.name}
            onEmailChange={(email) =>
              setFormValues((current) => ({ ...current, email }))
            }
            onNameChange={(name) =>
              setFormValues((current) => ({ ...current, name }))
            }
            onSubmit={handleSubmit}
            status={status}
          />

          {imagesAfter}
        </div>
      </div>

      <WaitlistOverview
        overview={overview}
        className="z-10 mt-8"
        firstSlotRef={firstSlotRef}
      />

      {flyingAvatar &&
        createPortal(
          <div
            ref={flyingRef}
            className="pointer-events-none fixed z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white/10 shadow-[0_0_24px_rgba(255,255,255,0.1)] sm:h-16 sm:w-16"
            style={{ left: flyingAvatar.x, top: flyingAvatar.y }}
          >
            <Avatar
              size={64}
              name={flyingAvatar.name}
              variant="beam"
              colors={[...AVATAR_COLORS]}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
