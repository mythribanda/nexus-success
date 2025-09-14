import { useState } from 'react';
import { Brain, Target, TrendingUp, Users, Award, Calendar, ArrowRight, Lightbulb, CheckCircle } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import ProgressBar from '@/components/ProgressBar';
import { careerRecommendations } from '@/utils/mockData';

export default function Career() {
  const [selectedPath, setSelectedPath] = useState('fullstack');

  const careerPaths = [
    { id: 'fullstack', label: 'Full-Stack Developer', match: 94 },
    { id: 'ml', label: 'ML Engineer', match: 87 },
    { id: 'frontend', label: 'Frontend Developer', match: 91 },
    { id: 'backend', label: 'Backend Developer', match: 89 }
  ];

  const roadmapSteps = [
    {
      id: 1,
      title: 'Foundation Mastery',
      status: 'completed',
      skills: ['HTML/CSS', 'JavaScript', 'Git'],
      timeframe: 'Months 1-2',
      description: 'Master the fundamental technologies'
    },
    {
      id: 2,
      title: 'Frontend Specialization',
      status: 'in_progress',
      skills: ['React', 'TypeScript', 'State Management'],
      timeframe: 'Months 3-5',
      description: 'Dive deep into modern frontend development'
    },
    {
      id: 3,
      title: 'Backend Development',
      status: 'upcoming',
      skills: ['Node.js', 'Databases', 'APIs'],
      timeframe: 'Months 6-8',
      description: 'Learn server-side development'
    },
    {
      id: 4,
      title: 'Advanced Topics',
      status: 'future',
      skills: ['DevOps', 'Cloud', 'Microservices'],
      timeframe: 'Months 9-12',
      description: 'Explore advanced architectural patterns'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-gradient-success';
      case 'in_progress': return 'bg-gradient-primary';
      case 'upcoming': return 'bg-gradient-warning';
      case 'future': return 'bg-glass-background';
      default: return 'bg-glass-background';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-white" />;
      case 'in_progress': return <Target className="w-5 h-5 text-white" />;
      case 'upcoming': return <Calendar className="w-5 h-5 text-white" />;
      case 'future': return <Lightbulb className="w-5 h-5 text-muted-foreground" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Career Twin AI
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          AI-powered career guidance tailored to your skills and goals
        </p>
      </div>

      {/* Career Path Matching */}
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Career Path Analysis</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {careerPaths.map((path) => (
            <div 
              key={path.id}
              onClick={() => setSelectedPath(path.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedPath === path.id 
                  ? 'border-primary bg-gradient-primary text-white shadow-glow' 
                  : 'border-glass-border bg-glass-background/30 hover:border-glass-highlight'
              }`}
            >
              <h3 className="font-semibold mb-2">{path.label}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm">Match Score</span>
                <span className="text-lg font-bold">{path.match}%</span>
              </div>
              <ProgressBar 
                value={path.match} 
                variant={selectedPath === path.id ? 'secondary' : 'primary'}
                size="sm" 
                showLabel={false}
                className="mt-2"
              />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Career Roadmap */}
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-secondary">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Your Career Roadmap</h2>
          <span className="text-sm text-muted-foreground">Full-Stack Developer Path</span>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-primary"></div>
          
          <div className="space-y-8">
            {roadmapSteps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-6">
                <div className={`relative z-10 p-3 rounded-full ${getStatusColor(step.status)} shadow-glass`}>
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <span className="text-sm text-muted-foreground">{step.timeframe}</span>
                  </div>
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {step.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-glass-background rounded-full text-sm border border-glass-border">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {step.status === 'in_progress' && (
                    <div className="bg-glass-background/30 p-4 rounded-lg border border-glass-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-bold">65%</span>
                      </div>
                      <ProgressBar value={65} variant="primary" showLabel={false} />
                      <p className="text-sm text-muted-foreground mt-2">2 of 3 skills completed</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-warning">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Personalized Recommendations</h2>
          </div>
          <div className="space-y-4">
            {careerRecommendations.slice(0, 4).map((rec) => (
              <div key={rec.id} className="p-4 bg-glass-background/30 rounded-lg border border-glass-border hover:border-glass-highlight transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        rec.priority === 'high' ? 'bg-danger/20 text-danger' :
                        rec.priority === 'medium' ? 'bg-warning/20 text-warning' :
                        'bg-success/20 text-success'
                      }`}>
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
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-success">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Industry Insights</h2>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-glass-background/30 rounded-lg border border-glass-border">
              <h3 className="font-semibold mb-2">Market Demand</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Full-Stack Developers</span>
                  <span className="text-sm font-bold text-success">High</span>
                </div>
                <ProgressBar value={89} variant="success" size="sm" showLabel={false} />
                <p className="text-sm text-muted-foreground">23% growth expected in next 5 years</p>
              </div>
            </div>

            <div className="p-4 bg-glass-background/30 rounded-lg border border-glass-border">
              <h3 className="font-semibold mb-2">Salary Range</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Entry Level</span>
                  <span className="text-sm font-bold">$65k - $85k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Mid Level</span>
                  <span className="text-sm font-bold">$85k - $120k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Senior Level</span>
                  <span className="text-sm font-bold">$120k - $180k</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-glass-background/30 rounded-lg border border-glass-border">
              <h3 className="font-semibold mb-2">Top Skills in Demand</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL'].map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-gradient-primary text-white text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}