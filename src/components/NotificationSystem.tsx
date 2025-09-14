import { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Info, Star } from 'lucide-react';
import GlassCard from './GlassCard';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: string;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'You earned the "Quick Learner" badge for completing 3 workshops this month.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      action: 'View Badge'
    },
    {
      id: '2',
      type: 'success',
      title: 'Certificate Approved',
      message: 'Your AWS Cloud Practitioner certification has been verified and added to your portfolio.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      action: 'View Portfolio'
    },
    {
      id: '3',
      type: 'warning',
      title: 'AI Career Recommendation',
      message: 'Based on your progress, consider enrolling in the upcoming DevOps workshop.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      action: 'View Details'
    },
    {
      id: '4',
      type: 'info',
      title: 'Leaderboard Update',
      message: 'You moved up to #2 position in the Computer Science leaderboard!',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-success" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'info': return <Info className="w-5 h-5 text-primary" />;
      case 'achievement': return <Star className="w-5 h-5 text-yellow-400" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-success/10 border-success/20';
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'info': return 'bg-primary/10 border-primary/20';
      case 'achievement': return 'bg-yellow-400/10 border-yellow-400/20';
      default: return 'bg-glass-background/30 border-glass-border';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    if (diff < 60 * 1000) return 'Just now';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}m ago`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}h ago`;
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))}d ago`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-glass-background/50 hover:bg-glass-highlight/50 transition-all"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-danger text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 w-96 z-50 animate-slide-down">
            <GlassCard className="p-0 max-h-96 overflow-hidden">
              <div className="p-4 border-b border-glass-border flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-glass-highlight/50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No notifications yet</p>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-4 border-b border-glass-border/50 last:border-b-0 hover:bg-glass-highlight/20 transition-all cursor-pointer",
                          !notification.read && "bg-glass-highlight/10",
                          getBgColor(notification.type)
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium truncate">
                                {notification.title}
                              </h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                                className="p-1 rounded-full hover:bg-glass-highlight/50 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">
                                {formatTime(notification.timestamp)}
                              </span>
                              {notification.action && (
                                <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                                  {notification.action}
                                </button>
                              )}
                            </div>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        </>
      )}
    </div>
  );
}