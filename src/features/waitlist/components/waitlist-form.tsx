import { forwardRef, type FormEventHandler } from "react";
import type { WaitlistSubmissionStatus } from "../hooks/use-waitlist-submission";

const PAPER_WORDMARK_CLASSNAME =
  "mx-auto mt-[4%] w-[88%] -translate-x-[8%] rotate-[-2deg] text-center font-[Georgia,'Times_New_Roman',serif] text-[clamp(1.62rem,3.7vw,3.02rem)] font-semibold uppercase leading-none tracking-[0.11em] text-[#57534d] sm:-translate-x-[15%] [text-shadow:0_1px_0_rgba(255,255,255,0.92),0_3px_3px_rgba(0,0,0,0.42),0_11px_14px_rgba(0,0,0,0.16)]";

const PAPER_INPUT_BASE_CLASSNAME =
  "w-[90%] rotate-[-1.5deg] rounded-none border border-[#9a9590] bg-white px-[6%] py-[0.18em] text-[clamp(0.72rem,1.44vw,1.08rem)] font-bold text-black shadow-none outline-none placeholder:font-bold placeholder:text-[#555] focus:border-[#666] sm:w-full sm:py-[0.32em] sm:text-[clamp(0.82rem,1.44vw,1.08rem)]";

const PAPER_INPUT_CLASSNAME = PAPER_INPUT_BASE_CLASSNAME;

const PAPER_SUCCESS_CLASSNAME =
  "-translate-x-[8%] sm:translate-x-0 sm:mt-[6%] w-full rotate-[-1.5deg] whitespace-nowrap rounded-[0.18rem] border border-[#b9b1a6] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,247,239,0.94)_100%)] px-[6%] py-[0.72em] text-center font-[Georgia,'Times_New_Roman',serif] text-[clamp(0.68rem,1.3vw,1.08rem)] font-semibold tracking-[0.04em] text-[#35582a] shadow-[0_1px_0_rgba(255,255,255,0.98),0_0_0_1px_rgba(99,90,80,0.08),0_0_0_2px_rgba(52,47,41,0.08),0_8px_14px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,1)] sm:py-[1em] sm:text-[clamp(0.82rem,1.5vw,1.2rem)]";

const PAPER_FIELDS_STACK_CLASSNAME =
  "mt-[24%] flex w-[84%] translate-x-[10%] flex-col gap-[clamp(0.5rem,2.5vw,1rem)] sm:-translate-x-[1%]";

const PAPER_CTA_CLASSNAME =
  "text-center font-[Georgia,'Times_New_Roman',serif] text-[clamp(1.62rem,3.7vw,3.02rem)] font-semibold uppercase leading-none tracking-[0.11em] text-[#5a564f] [text-shadow:0_1px_0_rgba(255,255,255,0.94),0_4px_4px_rgba(0,0,0,0.44),0_12px_16px_rgba(0,0,0,0.16)]";

const PAPER_DIVIDER_CLASSNAME =
  "mx-auto h-[1.5px] w-[72%] bg-[#5f5a52]/32 shadow-[0_1px_0_rgba(255,255,255,0.4)]";

interface WaitlistCtaLabelArgs {
  isSubmitting: boolean;
  status: WaitlistSubmissionStatus;
}

interface WaitlistFormProps {
  email: string;
  errorMessage: string;
  isSubmitting: boolean;
  name: string;
  onEmailChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  status: WaitlistSubmissionStatus;
}

function getWaitlistCtaLabel({ isSubmitting, status }: WaitlistCtaLabelArgs) {
  if (status === "success") return "JOINED";
  if (isSubmitting)
    return (
      <>
        <span className="sm:hidden">JOINING..</span>
        <span className="hidden sm:inline">JOINING...</span>
      </>
    );
  return "JOINNOW";
}

export const WaitlistForm = forwardRef<HTMLFormElement, WaitlistFormProps>(
  function WaitlistForm(
    {
      email,
      errorMessage,
      isSubmitting,
      name,
      onEmailChange,
      onNameChange,
      onSubmit,
      status,
    },
    ref,
  ) {
    return (
      <form
        ref={ref}
        onSubmit={onSubmit}
        className="absolute top-[16.6%] left-[45%] z-10 flex w-[43.5%] -translate-x-1/2 rotate-[-3.5deg] flex-col items-center origin-top sm:left-[46%] md:top-[17%] md:w-[42%] md:scale-[0.92]"
      >
      <div className="pointer-events-none w-full select-none">
        <p className={PAPER_WORDMARK_CLASSNAME}>WAITLIST</p>
      </div>

      <div className={PAPER_FIELDS_STACK_CLASSNAME}>
        {status !== "success" && (
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            autoComplete="name"
            className={PAPER_INPUT_CLASSNAME}
          />
        )}
        {status === "success" ? (
          <div className={PAPER_SUCCESS_CLASSNAME}>
            You&apos;re on the list!
          </div>
        ) : (
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            autoComplete="email"
            required
            className={PAPER_INPUT_CLASSNAME}
          />
        )}
        {status === "error" && (
          <p className="mt-2 text-center text-[10px] font-semibold text-red-500 drop-shadow-sm sm:text-[11px]">
            {errorMessage}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || status === "success"}
        className={`w-[92%] -translate-x-[1%] rotate-[-2deg] cursor-pointer select-none transition duration-200 hover:brightness-110 disabled:cursor-default sm:-translate-x-[5%] ${status === "success" ? "mt-[16%] sm:mt-[34%] md:mt-[44%]" : "mt-[8%] sm:mt-[24%] md:mt-[34%]"}`}
      >
        <div className={`${PAPER_DIVIDER_CLASSNAME} mb-[4%]`} />
        <p className={PAPER_CTA_CLASSNAME}>
          {getWaitlistCtaLabel({ isSubmitting, status })}
        </p>
        <div className={`${PAPER_DIVIDER_CLASSNAME} mt-[4%]`} />
      </button>
      </form>
    );
  },
);
