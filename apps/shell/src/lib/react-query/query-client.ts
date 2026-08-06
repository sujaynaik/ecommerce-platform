import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000, // 60 seconds
      gcTime: 5 * 60_000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});
