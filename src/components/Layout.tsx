import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Brain, 
  Award, 
  Users, 
  Menu, 
  Sun, 
  Moon,
  Search,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import NotificationSystem from './NotificationSystem';
import ParticleBackground from './ParticleBackground';

const sidebarItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Academics', href: '/academics', icon: BookOpen },
  { name: 'Skills & Activities', href: '/skills', icon: Trophy },
  { name: 'Career Twin', href: '/career', icon: Brain },
  { name: 'Portfolio', href: '/portfolio', icon: Award },
  { name: 'Faculty Panel', href: '/faculty', icon: Users },
  { name: 'Analytics & Reports', href: '/analytics', icon: BarChart3 },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Set initial theme
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ParticleBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-glass-background/80 backdrop-blur-xl border-b border-glass-border">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-glass-background/50 hover:bg-glass-highlight/50 transition-all hover-lift"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 bg-glass-background/50 border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all focus:w-80"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationSystem />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-glass-background/50 hover:bg-glass-highlight/50 transition-all hover-lift"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold hover-lift cursor-pointer transition-transform hover:scale-110">
              AS
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 bottom-0 z-40 transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="h-full bg-glass-background/80 backdrop-blur-xl border-r border-glass-border">
          <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="p-6 border-b border-glass-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center animate-glow-pulse">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                {sidebarOpen && (
                  <div className="animate-fade-in">
                    <h1 className="text-lg font-bold gradient-text">Smart Student Hub</h1>
                    <p className="text-xs text-muted-foreground">Holistic Success Platform</p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group hover-lift",
                      isActive 
                        ? "bg-gradient-primary text-white shadow-glow animate-scale-in" 
                        : "hover:bg-glass-highlight/50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {sidebarOpen && (
                      <span className="font-medium animate-fade-in">{item.name}</span>
                    )}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white/80 rounded-full animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Student Info */}
            {sidebarOpen && (
              <div className="p-4 border-t border-glass-border animate-slide-up">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-glass-background/30 hover:bg-glass-highlight/30 transition-all hover-lift cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center text-sm font-bold">
                    AS
                  </div>
                  <div>
                    <p className="font-medium">Alex Smith</p>
                    <p className="text-sm text-muted-foreground">Computer Science</p>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                      <span className="text-xs text-success">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "pt-16 transition-all duration-300 ease-in-out relative z-10",
        sidebarOpen ? "ml-64" : "ml-16"
      )}>
        <div className="p-6">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}