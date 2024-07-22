import ReactDOM from "react-dom/client";
import "./css/index.css";
import "./css/tabel.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { PersistGate } from "redux-persist/integration/react";
import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import themeFile from "@/theme.json";
import { persistor, store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";
import { primaryColor } from "./config/app.config.ts";
import { ThemeProvider } from "./components/Theme-provider.tsx";
// const { defaultAlgorithm, darkAlgorithm } = theme;
const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: 1000, // 2 minutes
  },
};
const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
});
// algorithm: darkAlgorithm 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <ConfigProvider theme={{ ...themeFile}}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                fontWeight: "600",
                background: "#363636",
                color: "#fff",
                fontSize: "12px",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                iconTheme: {
                  primary: primaryColor,
                  secondary: "#fff",
                },
              },
            }}
          />
          {/* Wrap RouterProvider inside Provider to ensure access to Redux store */}
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RouterProvider router={router} />
            </PersistGate>
          </Provider>
        </TooltipProvider>
      </QueryClientProvider>
    </ConfigProvider>
  </ThemeProvider>
);
