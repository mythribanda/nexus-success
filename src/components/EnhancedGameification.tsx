import { useState, useEffect } from 'react';
import { Trophy, Star, Zap, Target, Award, Crown, Flame, TrendingUp } from 'lucide-react';
import GlassCard from './GlassCard';
import ProgressBar from './ProgressBar';
import AnimatedCounter from './AnimatedCounter';
import { cn } from '@/lib/utils';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: React.ElementType;
  category: string;
  completedAt: Date;
  rarity: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

interface Streak {
  type: string;
  current: number;
  best: number;
  icon: React.ElementType;
  description: string;
}

export default function EnhancedGameification() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'badges' | 'achievements' | 'streaks'>('overview');
  const [currentLevel, setCurrentLevel] = useState(23);
  const [currentXP, setCurrentXP] = useState(8750);
  const [nextLevelXP] = useState(10000);

  const badges: Badge[] = [
    {
      id: '1',
      name: 'Quick Learner',
      description: 'Complete 5 courses in a month',
      icon: '🚀',
      rarity: 'Rare',
      unlockedAt: new Date('2024-11-15'),
      progress: 5,
      maxProgress: 5
    },
    {
      id: '2',
      name: 'Skill Master',
      description: 'Achieve expert level in 3 skills',
      icon: '🎯',
      rarity: 'Epic',
      progress: 2,
      maxProgress: 3
    },
    {
      id: '3',
      name: 'Community Helper',
      description: 'Help 50 fellow students',
      icon: '🤝',
      rarity: 'Common',
      unlockedAt: new Date('2024-10-20'),
      progress: 50,
      maxProgress: 50
    },
    {
      id: '4',
      name: 'Innovation Pioneer',
      description: 'Submit 10 original projects',
      icon: '💡',
      rarity: 'Legendary',
      progress: 7,
      maxProgress: 10
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first course',
      points: 100,
      icon: Star,
      category: 'Learning',
      completedAt: new Date('2024-09-15'),
      rarity: 'Bronze'
    },
    {
      id: '2',
      title: 'Consistency Champion',
      description: 'Study for 30 consecutive days',
      points: 500,
      icon: Flame,
      category: 'Streaks',
      completedAt: new Date('2024-11-10'),
      rarity: 'Gold'
    },
    {
      id: '3',
      title: 'Skill Collector',
      description: 'Earn 10 different certifications',
      points: 750,
      icon: Award,
      category: 'Skills',
      completedAt: new Date('2024-11-18'),
      rarity: 'Platinum'
    }
  ];

  const streaks: Streak[] = [
    {
      type: 'Daily Learning',
      current: 15,
      best: 45,
      icon: Flame,
      description: 'Consecutive days with learning activity'
    },
    {
      type: 'Assignment Submission',
      current: 8,
      best: 12,
      icon: Target,
      description: 'On-time assignment submissions'
    },
    {
      type: 'Skill Practice',
      current: 22,
      best: 30,
      icon: Zap,
      description: 'Daily skill development sessions'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-muted-foreground border-muted';
      case 'Rare': return 'text-primary border-primary';
      case 'Epic': return 'text-secondary border-secondary';
      case 'Legendary': return 'text-warning border-warning';
      case 'Bronze': return 'text-orange-600 border-orange-600';
      case 'Silver': return 'text-gray-400 border-gray-400';
      case 'Gold': return 'text-yellow-500 border-yellow-500';
      case 'Platinum': return 'text-purple-400 border-purple-400';
      default: return 'text-muted-foreground border-muted';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-muted/10';
      case 'Rare': return 'bg-primary/10';
      case 'Epic': return 'bg-secondary/10';
      case 'Legendary': return 'bg-warning/10';
      case 'Bronze': return 'bg-orange-600/10';
      case 'Silver': return 'bg-gray-400/10';
      case 'Gold': return 'bg-yellow-500/10';
      case 'Platinum': return 'bg-purple-400/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center animate-glow-pulse">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Level <AnimatedCounter end={currentLevel} /></h2>
              <p className="text-muted-foreground">Student Success Champion</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">
              <AnimatedCounter end={currentXP} /> / <AnimatedCounter end={nextLevelXP} /> XP
            </p>
            <p className="text-sm text-muted-foreground">
              <AnimatedCounter end={nextLevelXP - currentXP} /> XP to next level
            </p>
          </div>
        </div>
        <ProgressBar 
          value={(currentXP / nextLevelXP) * 100} 
          variant="primary" 
          showLabel={false}
          animated
          className="h-3"
        />
      </GlassCard>

      {/* Tabs */}
      <div className="flex space-x-1 bg-glass-background/50 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'badges', label: 'Badges', icon: Star },
          { id: 'achievements', label: 'Achievements', icon: Award },
          { id: 'streaks', label: 'Streaks', icon: Flame }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={cn(
              "flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-2",
              selectedTab === tab.id
                ? "bg-gradient-primary text-white shadow-glow"
                : "hover:bg-glass-highlight/50"
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <GlassCard className="p-6 hover-lift">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-warning">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold">
                  <AnimatedCounter end={badges.filter(b => b.unlockedAt).length} />
                </p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 hover-lift">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-success">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold">
                  <AnimatedCounter end={achievements.length} />
                </p>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 hover-lift">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-danger">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold">
                  <AnimatedCounter end={Math.max(...streaks.map(s => s.current))} />
                </p>
                <p className="text-sm text-muted-foreground">Best Streak</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 hover-lift">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-secondary">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold">
                  <AnimatedCounter end={2280} />
                </p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Badges Tab */}
      {selectedTab === 'badges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {badges.map((badge, index) => (
            <GlassCard 
              key={badge.id} 
              className={cn(
                "p-6 hover-lift animate-scale-in",
                badge.unlockedAt ? getRarityBg(badge.rarity) : 'opacity-60'
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className={cn(
                  "text-4xl p-4 rounded-full border-2",
                  getRarityColor(badge.rarity),
                  badge.unlockedAt ? 'animate-glow-pulse' : ''
                )}>
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-bold">{badge.name}</h3>
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full border",
                      getRarityColor(badge.rarity)
                    )}>
                      {badge.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                  
                  {badge.progress !== undefined && badge.maxProgress && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">Progress</span>
                        <span className="text-xs">{badge.progress}/{badge.maxProgress}</span>
                      </div>
                      <ProgressBar 
                        value={(badge.progress / badge.maxProgress) * 100}
                        variant={badge.unlockedAt ? 'success' : 'primary'}
                        size="sm"
                        showLabel={false}
                      />
                    </div>
                  )}

                  {badge.unlockedAt && (
                    <p className="text-xs text-success">
                      Unlocked {badge.unlockedAt.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Achievements Tab */}
      {selectedTab === 'achievements' && (
        <div className="space-y-4 animate-fade-in">
          {achievements.map((achievement, index) => (
            <GlassCard 
              key={achievement.id} 
              className={cn(
                "p-6 hover-lift animate-slide-up",
                getRarityBg(achievement.rarity)
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "p-4 rounded-full border-2 animate-glow-pulse",
                  getRarityColor(achievement.rarity)
                )}>
                  <achievement.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold">{achievement.title}</h3>
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full border",
                      getRarityColor(achievement.rarity)
                    )}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-success">+{achievement.points} points</span>
                    <span className="text-muted-foreground">{achievement.category}</span>
                    <span className="text-muted-foreground">
                      Completed {achievement.completedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Streaks Tab */}
      {selectedTab === 'streaks' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {streaks.map((streak, index) => (
            <GlassCard 
              key={streak.type} 
              className="p-6 hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-danger flex items-center justify-center animate-glow-pulse">
                  <streak.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">{streak.type}</h3>
                <p className="text-sm text-muted-foreground mb-4">{streak.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Current Streak</p>
                    <p className="text-2xl font-bold text-danger">
                      <AnimatedCounter end={streak.current} /> days
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Best Streak</p>
                    <p className="text-lg font-semibold">
                      <AnimatedCounter end={streak.best} /> days
                    </p>
                  </div>

                  <ProgressBar 
                    value={(streak.current / streak.best) * 100}
                    variant="danger"
                    size="sm"
                    showLabel={false}
                  />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}