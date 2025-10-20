import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

interface IAllTheProvidersProps {
  children: React.ReactNode;
}

export function createWrapper() {
  const queryClient = createTestQueryClient();
  return function AllTheProviders({ children }: IAllTheProvidersProps) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

export function renderWithClient(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  const wrapper = createWrapper();
  return render(ui, { wrapper, ...options });
}
