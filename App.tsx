import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import BottomNav from "@/components/BottomNav";
import InstallPrompt from "@/components/InstallPrompt";
import NotificationBanner from "@/components/NotificationBanner";
import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";
import PlanCreation from "@/pages/PlanCreation";
import ActiveTasks from "@/pages/ActiveTasks";
import FocusMode from "@/pages/FocusMode";
import HistoryPage from "@/pages/HistoryPage";
import Leaderboard from "@/pages/Leaderboard";
import FriendsPage from "@/pages/FriendsPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const isFocus = location.pathname.startsWith('/focus');
  const showNav = !!user && !isFocus && location.pathname !== '/';

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/plan" element={user ? <PlanCreation /> : <Navigate to="/" />} />
        <Route path="/tasks" element={user ? <ActiveTasks /> : <Navigate to="/" />} />
        <Route path="/focus/:taskId" element={user ? <FocusMode /> : <Navigate to="/" />} />
        <Route path="/history" element={user ? <HistoryPage /> : <Navigate to="/" />} />
        <Route path="/leaderboard" element={user ? <Leaderboard /> : <Navigate to="/" />} />
        <Route path="/friends" element={user ? <FriendsPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showNav && <BottomNav />}
      {user && <InstallPrompt />}
      {user && <NotificationBanner />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
