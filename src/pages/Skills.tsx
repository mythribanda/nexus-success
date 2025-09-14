import { useState } from 'react';
import { Trophy, Code, Users, Lightbulb, Plus, CheckCircle, Clock, Star, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import ProgressBar from '@/components/ProgressBar';
import { skills, activities } from '@/utils/mockData';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [enrolledActivities, setEnrolledActivities] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Skills', icon: Trophy },
    { id: 'technical', label: 'Technical', icon: Code },
    { id: 'leadership', label: 'Leadership', icon: Users },
    { id: 'creative', label: 'Creative', icon: Lightbulb },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const availableActivities = activities.filter(activity => activity.status === 'available');
  const inProgressActivities = activities.filter(activity => activity.status === 'in_progress');

  const handleEnroll = (activityId: string) => {
    setEnrolledActivities([...enrolledActivities, activityId]);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Code className="w-4 h-4" />;
      case 'leadership': return <Users className="w-4 h-4" />;
      case 'creative': return <Lightbulb className="w-4 h-4" />;
      default: return <Trophy className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-gradient-primary';
      case 'leadership': return 'bg-gradient-warning';
      case 'creative': return 'bg-gradient-secondary';
      default: return 'bg-gradient-success';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Skills & Activities
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Build your skillset and participate in enriching activities
          </p>
        </div>
        <div className="mt-4 lg:mt-0 flex space-x-4">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-primary text-white shadow-glow'
                    : 'bg-glass-background hover:bg-glass-highlight'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Total Skills</h3>
              <p className="text-2xl font-bold">{skills.length}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Across all categories</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-success">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Verified</h3>
              <p className="text-2xl font-bold">{skills.filter(s => s.verified).length}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Blockchain certified</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-warning">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">In Progress</h3>
              <p className="text-2xl font-bold">{inProgressActivities.length}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Active activities</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-secondary">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Avg Level</h3>
              <p className="text-2xl font-bold">{Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)}%</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Skill proficiency</p>
        </GlassCard>
      </div>

      {/* Skills Grid */}
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Your Skills</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="p-6 bg-glass-background/30 rounded-lg border border-glass-border hover:border-glass-highlight transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(skill.category)}`}>
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{skill.category}</p>
                  </div>
                </div>
                {skill.verified && (
                  <CheckCircle className="w-5 h-5 text-success" />
                )}
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Proficiency</span>
                  <span className="text-sm font-bold">{skill.level}%</span>
                </div>
                <ProgressBar 
                  value={skill.level} 
                  variant={skill.level >= 80 ? 'success' : skill.level >= 60 ? 'primary' : 'warning'}
                  showLabel={false}
                />
              </div>

              {skill.certificates.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Certificates</p>
                  {skill.certificates.map((cert) => (
                    <div key={cert.id} className="text-xs bg-glass-background p-2 rounded-lg mb-2 flex items-center justify-between">
                      <span>{cert.name}</span>
                      {cert.verified && <CheckCircle className="w-3 h-3 text-success" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Available Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-secondary">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Available Activities</h2>
          </div>
          <div className="space-y-4">
            {availableActivities.map((activity) => (
              <div key={activity.id} className="p-4 bg-glass-background/30 rounded-lg border border-glass-border hover:border-glass-highlight transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">{activity.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="text-xs bg-gradient-secondary px-2 py-1 rounded-full text-white capitalize">
                        {activity.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                      <span className="text-xs text-success">+{activity.points} points</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEnroll(activity.id)}
                    disabled={enrolledActivities.includes(activity.id)}
                    className={`ml-4 px-4 py-2 rounded-lg font-medium transition-all ${
                      enrolledActivities.includes(activity.id)
                        ? 'bg-success text-white cursor-not-allowed'
                        : 'bg-gradient-primary text-white hover:shadow-glow'
                    }`}
                  >
                    {enrolledActivities.includes(activity.id) ? 'Enrolled' : 'Join'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-warning">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">In Progress</h2>
          </div>
          <div className="space-y-4">
            {inProgressActivities.map((activity) => (
              <div key={activity.id} className="p-4 bg-glass-background/30 rounded-lg border border-glass-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-warning">{activity.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">
                        In Progress
                      </span>
                      <span className="text-xs text-muted-foreground">Started {activity.date}</span>
                    </div>
                    <div className="mt-3">
                      <ProgressBar value={65} variant="warning" size="sm" />
                    </div>
                  </div>
                  <button className="ml-4 p-2 rounded-lg bg-gradient-warning text-white hover:shadow-glow transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}