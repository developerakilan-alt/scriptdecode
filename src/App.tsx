import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageShell from "@/components/layout/PageShell";
import { AuthProvider } from "@/lib/auth";
import { RippleFX } from "@/components/fx/RippleFX";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { LoaderScreen } from "@/components/fx/LoaderScreen";
import { IntroVideo } from "@/components/fx/IntroVideo";
import Index from "./pages/Index.tsx";
import ScriptTranslation from "./pages/ScriptTranslation.tsx";
import FullScript from "./pages/FullScript.tsx";
import Pastoria from "./pages/Pastoria.tsx";
import Login from "./pages/Login.tsx";
import HistoryPage from "./pages/History.tsx";
import Dictionary from "./pages/Dictionary.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <LoaderScreen />
          <IntroVideo />
          <RippleFX />
          <CursorGlow />
          <PageShell>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/translate" element={<ScriptTranslation />} />
              <Route path="/full-script" element={<FullScript />} />
              <Route path="/pastoria" element={<Pastoria />} />
              <Route path="/login" element={<Login />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/privacy" element={<NotFound />} />
              <Route path="/terms" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageShell>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
