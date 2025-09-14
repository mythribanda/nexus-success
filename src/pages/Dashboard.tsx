import { useState, useEffect } from 'react';
import { TrendingUp, Award, Target, Brain, Users, Star, ArrowRight, Zap, Plus, Calendar } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import ProgressBar from '@/components/ProgressBar';
import AnimatedCounter from '@/components/AnimatedCounter';
import { currentStudent, getProgressData, careerRecommendations, getLeaderboard, activities } from '@/utils/mockData';

export default function Dashboard() {
  const [progressData, setProgressData] = useState(getProgressData());
  const [leaderboard] = useState(getLeaderboard());
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate achievement unlock
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowAchievementModal(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const recentActivities = activities.filter(a => a.status === 'completed').slice(0, 3);
  const topRecommendations = careerRecommendations.filter(r => r.priority === 'high').slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center animate-fade-in">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-primary/20 rounded-full animate-spin">
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-primary rounded-full animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Loading your dashboard...
          </h2>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between animate-slide-down">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome back, {currentStudent.name}! 🚀
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Ready to continue your success journey?
          </p>
        </div>
        <div className="mt-4 lg:mt-0 animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <GlassCard className="p-4 hover-lift" glow>
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-yellow-400 animate-glow-pulse" />
              <div>
                <p className="font-bold text-lg">
                  <AnimatedCounter end={2280} />
                </p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            icon: TrendingUp, 
            title: 'Academics', 
            value: progressData.academics, 
            gradient: 'bg-gradient-primary',
            subtitle: 'Above average performance',
            delay: '0.1s'
          },
          { 
            icon: Award, 
            title: 'Skills', 
            value: progressData.skills, 
            gradient: 'bg-gradient-secondary',
            subtitle: '6 verified skills',
            delay: '0.2s'
          },
          { 
            icon: Target, 
            title: 'Activities', 
            value: progressData.extracurricular, 
            gradient: 'bg-gradient-success',
            subtitle: 'Highly active participant',
            delay: '0.3s'
          },
          { 
            icon: Brain, 
            title: 'Overall', 
            value: progressData.overall, 
            gradient: 'bg-gradient-warning',
            subtitle: 'Excellent progress',
            delay: '0.4s'
          }
        ].map((item, index) => (
          <div key={index} className="animate-slide-up hover-lift" style={{ animationDelay: item.delay }}>
            <GlassCard className="p-6 hover:shadow-elevated transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${item.gradient}`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-2xl font-bold">
                      <AnimatedCounter end={item.value} decimals={1} suffix="%" />
                    </p>
                  </div>
                </div>
              </div>
              <ProgressBar 
                value={item.value} 
                variant={index === 0 ? 'primary' : index === 1 ? 'secondary' : index === 2 ? 'success' : 'warning'} 
                size="sm" 
                showLabel={false} 
                animated
              />
              <p className="text-sm text-muted-foreground mt-2">{item.subtitle}</p>
            </GlassCard>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Recommendations */}
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <GlassCard className="p-6 hover:shadow-elevated transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-primary animate-glow-pulse">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">AI Recommendations</h2>
              </div>
              <Zap className="w-5 h-5 text-yellow-400 animate-glow-pulse" />
            </div>
            <div className="space-y-4">
              {topRecommendations.map((rec, index) => (
                <div 
                  key={rec.id} 
                  className="flex items-center justify-between p-4 bg-glass-background/30 rounded-lg border border-glass-border hover:border-glass-highlight transition-all hover-lift animate-slide-up"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs bg-gradient-primary px-2 py-1 rounded-full text-white animate-pulse">
                        {rec.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">{rec.estimatedTime}</span>
                      <span className="text-xs text-success">+{rec.points} points</span>
                    </div>
                  </div>
                  <button className="ml-4 p-2 rounded-lg bg-gradient-primary text-white hover:shadow-glow transition-all hover:scale-105">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Leaderboard */}
        <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <GlassCard className="p-6 hover:shadow-elevated transition-all duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-warning animate-glow-pulse">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">Leaderboard</h2>
            </div>
            <div className="space-y-4">
              {leaderboard.map((student, index) => (
                <div 
                  key={student.rank} 
                  className="flex items-center space-x-3 animate-slide-up hover-lift transition-all duration-200 p-2 rounded-lg hover:bg-glass-background/20"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    student.rank === 1 ? 'bg-gradient-warning text-white animate-glow-pulse' :
                    student.rank === 2 ? 'bg-gradient-secondary text-white' :
                    student.rank === 3 ? 'bg-gradient-success text-white' :
                    'bg-glass-background text-muted-foreground'
                  }`}>
                    {student.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.program}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      <AnimatedCounter end={student.points} />
                    </p>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
        <GlassCard className="p-6 hover:shadow-elevated transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-success animate-glow-pulse">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">Recent Achievements</h2>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all hover:scale-105">
              <Plus className="w-4 h-4" />
              <span>Add Activity</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentActivities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="p-4 bg-glass-background/30 rounded-lg border border-glass-border hover:border-glass-highlight transition-all hover-lift animate-scale-in"
                style={{ animationDelay: `${1.1 + index * 0.1}s` }}
              >
                <h3 className="font-semibold text-success">{activity.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{activity.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full animate-pulse">
                    Completed
                  </span>
                  <span className="text-sm font-bold text-success">+{activity.points}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  {activity.date}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Achievement Modal */}
      {showAchievementModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <GlassCard className="p-8 max-w-md mx-4 text-center animate-scale-in hover:shadow-elevated">
            <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-success bg-clip-text text-transparent">
              Achievement Unlocked!
            </h3>
            <p className="text-muted-foreground mb-4">
              Congratulations! You've earned the "Quick Learner" badge for completing 3 workshops this month.
            </p>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-lg font-bold text-success animate-pulse">+50 points</span>
            </div>
            <button 
              onClick={() => setShowAchievementModal(false)}
              className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all hover:scale-105"
            >
              Awesome!
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}