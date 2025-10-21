import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HeroPage from "./pages/HeroPage";
import Loading from "./components/Common/Loading";
import { ToastProvider } from "./context/ToastProvider";
import ErrorBoundary from "./components/Common/ErrorBoundary";

import "normalize.css";
import "./index.css";

const queryClient = new QueryClient();

const HeroProfile = lazy(() => import("./components/Hero/HeroProfile"));

const EmptyHint = () => (
  <div>
    <h3>請選擇一位英雄</h3>
  </div>
);

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/heroes" replace /> },
  {
    path: "/heroes",
    element: <HeroPage />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <EmptyHint /> },
      {
        path: ":heroId",
        element: <HeroProfile />,
      },
    ],
  },

  { path: "*", element: <div style={{ padding: 24 }}>404 Not Found</div> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </ToastProvider>
  </StrictMode>
);
