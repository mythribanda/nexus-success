import { useState } from 'react';
import { Users, MessageCircle, Heart, Share2, Plus, UserPlus, Trophy, Star } from 'lucide-react';
import GlassCard from './GlassCard';
import { cn } from '@/lib/utils';

interface PeerConnection {
  id: string;
  name: string;
  program: string;
  commonSkills: string[];
  points: number;
  avatar: string;
  mutualConnections: number;
  isConnected: boolean;
}

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  members: number;
  maxMembers: number;
  nextSession: Date;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  isJoined: boolean;
}

export default function SocialFeatures() {
  const [activeTab, setActiveTab] = useState<'connections' | 'groups' | 'feed'>('connections');

  const peerConnections: PeerConnection[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      program: 'Computer Science',
      commonSkills: ['React', 'Python', 'Machine Learning'],
      points: 2450,
      avatar: 'SC',
      mutualConnections: 5,
      isConnected: true
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      program: 'Software Engineering',
      commonSkills: ['JavaScript', 'Node.js'],
      points: 2150,
      avatar: 'MR',
      mutualConnections: 3,
      isConnected: false
    },
    {
      id: '3',
      name: 'Emma Thompson',
      program: 'Data Science',
      commonSkills: ['Python', 'Machine Learning', 'Data Analysis'],
      points: 2020,
      avatar: 'ET',
      mutualConnections: 7,
      isConnected: true
    }
  ];

  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'Advanced React Patterns',
      subject: 'Web Development',
      members: 8,
      maxMembers: 12,
      nextSession: new Date('2024-12-01T18:00:00'),
      difficulty: 'Advanced',
      tags: ['React', 'JavaScript', 'Frontend'],
      isJoined: true
    },
    {
      id: '2',
      name: 'ML Study Circle',
      subject: 'Machine Learning',
      members: 15,
      maxMembers: 20,
      nextSession: new Date('2024-11-28T19:30:00'),
      difficulty: 'Intermediate',
      tags: ['Python', 'AI', 'Data Science'],
      isJoined: false
    },
    {
      id: '3',
      name: 'Database Design Fundamentals',
      subject: 'Database Systems',
      members: 6,
      maxMembers: 10,
      nextSession: new Date('2024-11-30T17:00:00'),
      difficulty: 'Beginner',
      tags: ['SQL', 'Database', 'Backend'],
      isJoined: false
    }
  ];

  const activityFeed = [
    {
      id: '1',
      user: 'Sarah Chen',
      action: 'completed',
      target: 'AWS Solutions Architect certification',
      time: '2 hours ago',
      likes: 15,
      comments: 3
    },
    {
      id: '2',
      user: 'Michael Rodriguez',
      action: 'joined',
      target: 'Advanced React Patterns study group',
      time: '4 hours ago',
      likes: 8,
      comments: 1
    },
    {
      id: '3',
      user: 'Emma Thompson',
      action: 'achieved',
      target: 'Data Science Expert badge',
      time: '1 day ago',
      likes: 23,
      comments: 7
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/20 text-success';
      case 'Intermediate': return 'bg-warning/20 text-warning';
      case 'Advanced': return 'bg-danger/20 text-danger';
      default: return 'bg-glass-background text-muted-foreground';
    }
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-secondary">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Social Learning Hub</h2>
        </div>
        <div className="flex space-x-1 bg-glass-background/50 p-1 rounded-lg">
          {[
            { id: 'connections', label: 'Connections', icon: Users },
            { id: 'groups', label: 'Study Groups', icon: MessageCircle },
            { id: 'feed', label: 'Activity Feed', icon: Heart }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2",
                activeTab === tab.id
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "hover:bg-glass-highlight/50"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'connections' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Peer Connections</h3>
            <button className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Find Peers</span>
            </button>
          </div>
          {peerConnections.map((peer, index) => (
            <div 
              key={peer.id} 
              className="p-4 bg-glass-background/30 rounded-lg border border-glass-border hover:border-glass-highlight transition-all animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-sm font-bold">
                    {peer.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{peer.name}</h4>
                    <p className="text-sm text-muted-foreground">{peer.program}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Trophy className="w-3 h-3 text-warning" />
                      <span className="text-xs text-muted-foreground">{peer.points} points</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{peer.mutualConnections} mutual</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex flex-wrap gap-1 mb-2 justify-end">
                    {peer.commonSkills.slice(0, 2).map(skill => (
                      <span key={skill} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                    {peer.commonSkills.length > 2 && (
                      <span className="px-2 py-1 bg-glass-background text-xs rounded-full">
                        +{peer.commonSkills.length - 2}
                      </span>
                    )}
                  </div>
                  <button 
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      peer.isConnected
                        ? "bg-success/20 text-success cursor-default"
                        : "bg-gradient-primary text-white hover:shadow-glow"
                    )}
                  >
                    {peer.isConnected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Study Groups</h3>
            <button className="px-4 py-2 bg-gradient-secondary text-white rounded-lg hover:shadow-glow transition-all flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Group</span>
            </button>
          </div>
          {studyGroups.map((group, index) => (
            <div 
              key={group.id} 
              className="p-4 bg-glass-background/30 rounded-lg border border-glass-border hover:border-glass-highlight transition-all animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold">{group.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(group.difficulty)}`}>
                      {group.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{group.subject}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span>{group.members}/{group.maxMembers} members</span>
                    <span>Next: {group.nextSession.toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {group.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-glass-background text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button 
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all ml-4",
                    group.isJoined
                      ? "bg-success/20 text-success cursor-default"
                      : "bg-gradient-primary text-white hover:shadow-glow"
                  )}
                >
                  {group.isJoined ? 'Joined' : 'Join Group'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'feed' && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          {activityFeed.map((activity, index) => (
            <div 
              key={activity.id} 
              className="p-4 bg-glass-background/30 rounded-lg border border-glass-border hover:border-glass-highlight transition-all animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="mb-2">
                    <span className="font-semibold">{activity.user}</span>
                    <span className="text-muted-foreground"> {activity.action} </span>
                    <span className="font-medium text-primary">{activity.target}</span>
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{activity.time}</span>
                    <button className="flex items-center space-x-1 hover:text-danger transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{activity.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{activity.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-secondary transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}