import { useState, useEffect } from 'react';
import { TrendingUp, Award, Target, Brain, Users, Star, ArrowRight, Zap } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import ProgressBar from '@/components/ProgressBar';
import { currentStudent, getProgressData, careerRecommendations, getLeaderboard, activities } from '@/utils/mockData';

export default function Dashboard() {
  const [progressData, setProgressData] = useState(getProgressData());
  const [leaderboard] = useState(getLeaderboard());
  const [showAchievementModal, setShowAchievementModal] = useState(false);

  // Simulate achievement unlock
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAchievementModal(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const recentActivities = activities.filter(a => a.status === 'completed').slice(0, 3);
  const topRecommendations = careerRecommendations.filter(r => r.priority === 'high').slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome back, {currentStudent.name}! 🚀
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Ready to continue your success journey?
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <GlassCard className="p-4" glow>
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="font-bold text-lg">2,280</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Academics</h3>
                <p className="text-2xl font-bold">{progressData.academics}%</p>
              </div>
            </div>
          </div>
          <ProgressBar value={progressData.academics} variant="primary" size="sm" showLabel={false} />
          <p className="text-sm text-muted-foreground mt-2">Above average performance</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-secondary">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Skills</h3>
                <p className="text-2xl font-bold">{progressData.skills}%</p>
              </div>
            </div>
          </div>
          <ProgressBar value={progressData.skills} variant="secondary" size="sm" showLabel={false} />
          <p className="text-sm text-muted-foreground mt-2">6 verified skills</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-success">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Activities</h3>
                <p className="text-2xl font-bold">{progressData.extracurricular}%</p>
              </div>
            </div>
          </div>
          <ProgressBar value={progressData.extracurricular} variant="success" size="sm" showLabel={false} />
          <p className="text-sm text-muted-foreground mt-2">Highly active participant</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-warning">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Overall</h3>
                <p className="text-2xl font-bold">{progressData.overall}%</p>
              </div>
            </div>
          </div>
          <ProgressBar value={progressData.overall} variant="warning" size="sm" showLabel={false} />
          <p className="text-sm text-muted-foreground mt-2">Excellent progress</p>
        </GlassCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Recommendations */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">AI Recommendations</h2>
              </div>
              <Zap className="w-5 h-5 text-yellow-400 animate-glow-pulse" />
            </div>
            <div className="space-y-4">
              {topRecommendations.map((rec) => (
                <div key={rec.id} className="flex items-center justify-between p-4 bg-glass-background/30 rounded-lg border border-glass-border hover:border-glass-highlight transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs bg-gradient-primary px-2 py-1 rounded-full text-white">
                        {rec.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">{rec.estimatedTime}</span>
                      <span className="text-xs text-success">+{rec.points} points</span>
                    </div>
                  </div>
                  <button className="ml-4 p-2 rounded-lg bg-gradient-primary text-white hover:shadow-glow transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Leaderboard */}
        <div>
          <GlassCard className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-warning">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">Leaderboard</h2>
            </div>
            <div className="space-y-4">
              {leaderboard.map((student) => (
                <div key={student.rank} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    student.rank === 1 ? 'bg-gradient-warning text-white' :
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
                    <p className="font-bold text-primary">{student.points}</p>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Recent Activities */}
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-success">
            <Award className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Recent Achievements</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="p-4 bg-glass-background/30 rounded-lg border border-glass-border">
              <h3 className="font-semibold text-success">{activity.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
                  Completed
                </span>
                <span className="text-sm font-bold text-success">+{activity.points}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Achievement Modal */}
      {showAchievementModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <GlassCard className="p-8 max-w-md mx-4 text-center animate-scale-in">
            <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Achievement Unlocked!</h3>
            <p className="text-muted-foreground mb-4">
              Congratulations! You've earned the "Quick Learner" badge for completing 3 workshops this month.
            </p>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-lg font-bold text-success">+50 points</span>
            </div>
            <button 
              onClick={() => setShowAchievementModal(false)}
              className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all"
            >
              Awesome!
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}