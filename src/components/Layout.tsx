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
  Bell,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Academics', href: '/academics', icon: BookOpen },
  { name: 'Skills & Activities', href: '/skills', icon: Trophy },
  { name: 'Career Twin', href: '/career', icon: Brain },
  { name: 'Portfolio', href: '/portfolio', icon: Award },
  { name: 'Faculty Panel', href: '/faculty', icon: Users },
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-glass-background/80 backdrop-blur-xl border-b border-glass-border">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-glass-background/50 hover:bg-glass-highlight/50 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 bg-glass-background/50 border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg bg-glass-background/50 hover:bg-glass-highlight/50 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-glass-background/50 hover:bg-glass-highlight/50 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold">
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
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h1 className="text-lg font-bold">HSS Platform</h1>
                    <p className="text-xs text-muted-foreground">Student Success</p>
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
                      "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                      isActive 
                        ? "bg-gradient-primary text-white shadow-glow" 
                        : "hover:bg-glass-highlight/50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {sidebarOpen && (
                      <span className="font-medium">{item.name}</span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Student Info */}
            {sidebarOpen && (
              <div className="p-4 border-t border-glass-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center text-sm font-bold">
                    AS
                  </div>
                  <div>
                    <p className="font-medium">Alex Smith</p>
                    <p className="text-sm text-muted-foreground">Computer Science</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "pt-16 transition-all duration-300 ease-in-out",
        sidebarOpen ? "ml-64" : "ml-16"
      )}>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}