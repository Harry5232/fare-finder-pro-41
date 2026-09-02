import { useEffect } from "react";

// Sets document.title for the current page, replacing TanStack Router's head().
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
