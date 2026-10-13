'use client'

import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

type Props = {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({error, reset}: Props) {
  return <ErrorMessage error={error} reset={reset} />;
}