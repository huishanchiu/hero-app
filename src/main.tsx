import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "normalize.css";
import "./index.css";

import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Loading from "./components/Common/Loading";

const queryClient = new QueryClient();

const HeroProfile = lazy(() => import("./components/Hero/HeroProfile"));

const EmptyHint = () => (
  <div>
    <h3>請選擇一位英雄</h3>
  </div>
);

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/heroes" replace /> }, // 進首頁就導向 /heroes
  {
    path: "/heroes",
    element: <HeroPage />,
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
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
