import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
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
  
  const location = useLocation();

  if (loading) return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const isFocus = location.pathname.startsWith('/focus');
  const showNav = !isFocus && location.pathname !== '/';

  return (
    <>
      <Routes>
      <Route path="/" element={ <AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plan" element={<PlanCreation /> } />
        <Route path="/tasks" element={ <ActiveTasks />} />
        <Route path="/focus/:taskId" element={ <FocusMode /> } />
        <Route path="/history" element={ <HistoryPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/friends" element={ <FriendsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={ <SettingsPage /> } />
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
  
      
      <BrowserRouter>
        
          <AppRoutes />
      </BrowserRouter>
  
  </QueryClientProvider>
);

export default App;
