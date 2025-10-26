import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { 
  Leaf,
  Home,
  TrendingUp,
  CheckCircle2,
  Lock,
  Play,
  BookOpen,
  Trophy,
  Award,
  Sprout,
  GraduationCap,
  Map,
  ChevronRight
} from "lucide-react";

export function EducationRoadmap() {
  // todo: remove mock functionality - track actual user progress in database
  const [userProgress, setUserProgress] = useState({
    completedLevels: [1, 2, 3],
    currentLevel: 4,
    totalPoints: 350,
    badges: 3
  });

  // 14-level roadmap from basics to Indian carbon credit market mastery
  const roadmapLevels = [
    {
      id: 1,
      title: "What are Carbon Credits?",
      description: "Understanding the fundamentals of carbon credits and climate action",
      topics: ["Carbon footprint basics", "Greenhouse gases", "Climate change overview"],
      points: 50,
      estimatedTime: "15 min"
    },
    {
      id: 2,
      title: "The Carbon Credit System",
      description: "How carbon credits work and their role in offsetting emissions",
      topics: ["Credit generation", "Verification process", "Trading mechanics"],
      points: 50,
      estimatedTime: "20 min"
    },
    {
      id: 3,
      title: "Types of Carbon Credits",
      description: "Voluntary vs. Compliance markets and different credit categories",
      topics: ["VCS vs. CDM", "Gold Standard", "Credit quality tiers"],
      points: 75,
      estimatedTime: "25 min"
    },
    {
      id: 4,
      title: "Carbon Credit Pricing",
      description: "Market dynamics, pricing factors, and trading fundamentals",
      topics: ["Supply and demand", "Price determinants", "Market trends"],
      points: 75,
      estimatedTime: "30 min"
    },
    {
      id: 5,
      title: "Introduction to Indian Carbon Markets",
      description: "Overview of India's carbon credit landscape and opportunities",
      topics: ["Indian market size", "Key players", "Regulatory framework"],
      points: 100,
      estimatedTime: "25 min"
    },
    {
      id: 6,
      title: "India's Climate Commitments",
      description: "National targets, NDCs, and carbon neutrality goals",
      topics: ["Paris Agreement commitments", "Net-zero 2070 goal", "Sectoral targets"],
      points: 100,
      estimatedTime: "30 min"
    },
    {
      id: 7,
      title: "Agricultural Carbon Credits in India",
      description: "Farming practices that generate carbon credits",
      topics: ["Sustainable farming", "Soil carbon sequestration", "Agroforestry"],
      points: 125,
      estimatedTime: "35 min"
    },
    {
      id: 8,
      title: "Renewable Energy Credits",
      description: "Solar, wind, and biomass projects for carbon credit generation",
      topics: ["Solar installations", "Wind energy projects", "Biomass utilization"],
      points: 125,
      estimatedTime: "40 min"
    },
    {
      id: 9,
      title: "Forestry and Reforestation Projects",
      description: "Tree plantation and forest conservation for carbon offsetting",
      topics: ["REDD+ projects", "Afforestation", "Community forestry"],
      points: 150,
      estimatedTime: "35 min"
    },
    {
      id: 10,
      title: "Verification and Certification",
      description: "Indian standards, auditing process, and certification bodies",
      topics: ["BIS standards", "Verification methodologies", "MRV systems"],
      points: 150,
      estimatedTime: "40 min"
    },
    {
      id: 11,
      title: "Indian Carbon Exchange (ICX)",
      description: "Trading mechanisms on India's carbon credit exchange",
      topics: ["ICX platform", "Trading procedures", "Market participants"],
      points: 175,
      estimatedTime: "45 min"
    },
    {
      id: 12,
      title: "Policy and Regulations",
      description: "Indian government policies, subsidies, and compliance requirements",
      topics: ["CERC regulations", "State-level policies", "Tax incentives"],
      points: 175,
      estimatedTime: "40 min"
    },
    {
      id: 13,
      title: "Community-Based Carbon Projects",
      description: "Grassroots initiatives and local carbon credit generation",
      topics: ["Village-level projects", "SHG involvement", "Fair trade credits"],
      points: 200,
      estimatedTime: "45 min"
    },
    {
      id: 14,
      title: "Advanced Market Strategies",
      description: "Maximizing earnings and long-term carbon credit planning",
      topics: ["Portfolio optimization", "Risk management", "Future market trends"],
      points: 200,
      estimatedTime: "50 min"
    }
  ];

  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true;
    return userProgress.completedLevels.includes(levelId - 1);
  };

  const isLevelCompleted = (levelId: number) => {
    return userProgress.completedLevels.includes(levelId);
  };

  const progressPercentage = (userProgress.completedLevels.length / roadmapLevels.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">CarbonLink</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="gap-2" data-testid="button-home">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href="/market">
              <Button variant="ghost" className="gap-2" data-testid="button-market">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Market</span>
              </Button>
            </Link>
            <ThemeToggle />
            <Avatar data-testid="avatar-user">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Carbon Credits Learning Roadmap</h1>
          </div>
          <p className="text-muted-foreground">
            Master carbon credits from basics to Indian market expertise through 14 progressive levels
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card data-testid="card-progress">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <Map className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {userProgress.completedLevels.length}/{roadmapLevels.length}
              </div>
              <Progress value={progressPercentage} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Levels completed</p>
            </CardContent>
          </Card>

          <Card data-testid="card-points">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">{userProgress.totalPoints}</div>
              <p className="text-xs text-muted-foreground mt-2">Knowledge points earned</p>
            </CardContent>
          </Card>

          <Card data-testid="card-current-level">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Level</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-2">Level {userProgress.currentLevel}</div>
              <p className="text-xs text-muted-foreground mt-2">In progress</p>
            </CardContent>
          </Card>

          <Card data-testid="card-badges">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1">{userProgress.badges}</div>
              <p className="text-xs text-muted-foreground mt-2">Achievements unlocked</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Learning Path</h2>
          <p className="text-muted-foreground">
            Complete each level to unlock the next. Each level includes lessons and a quiz to test your knowledge.
          </p>
        </div>

        <div className="space-y-4">
          {roadmapLevels.map((level, index) => {
            const unlocked = isLevelUnlocked(level.id);
            const completed = isLevelCompleted(level.id);
            const isCurrent = level.id === userProgress.currentLevel;

            return (
              <Card 
                key={level.id} 
                className={`${unlocked ? 'hover-elevate cursor-pointer' : 'opacity-60'} ${isCurrent ? 'border-2 border-primary' : ''}`}
                data-testid={`card-level-${level.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        completed ? 'bg-chart-1/10' : unlocked ? 'bg-primary/10' : 'bg-muted'
                      }`}>
                        {completed ? (
                          <CheckCircle2 className="h-6 w-6 text-chart-1" />
                        ) : unlocked ? (
                          <BookOpen className="h-6 w-6 text-primary" />
                        ) : (
                          <Lock className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <Badge variant="outline" className="font-mono">Level {level.id}</Badge>
                          <CardTitle className="text-lg">{level.title}</CardTitle>
                          {completed && <Badge className="gap-1"><CheckCircle2 className="h-3 w-3" />Completed</Badge>}
                          {isCurrent && !completed && <Badge variant="secondary" className="gap-1">In Progress</Badge>}
                          {!unlocked && <Badge variant="secondary" className="gap-1"><Lock className="h-3 w-3" />Locked</Badge>}
                        </div>
                        <CardDescription className="mb-3">{level.description}</CardDescription>
                        <div className="flex flex-wrap gap-2 text-sm">
                          {level.topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary" className="font-normal">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex flex-col gap-2">
                        <div>
                          <div className="text-xs text-muted-foreground">Points</div>
                          <div className="text-xl font-bold text-primary">{level.points}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Duration</div>
                          <div className="text-sm font-medium">{level.estimatedTime}</div>
                        </div>
                        {unlocked && !completed && (
                          <Link href={`/learn-earn/level/${level.id}`}>
                            <Button size="sm" className="gap-2 mt-2" data-testid={`button-start-${level.id}`}>
                              {isCurrent ? 'Continue' : 'Start'}
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        {completed && (
                          <Link href={`/learn-earn/level/${level.id}`}>
                            <Button variant="outline" size="sm" className="gap-2 mt-2" data-testid={`button-review-${level.id}`}>
                              Review
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8" data-testid="card-video-tutorials">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Play className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Video Tutorials</CardTitle>
            </div>
            <CardDescription>
              Learn practical methods to earn carbon credits in India with step-by-step video guides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/learn-earn/videos">
              <Button className="gap-2" data-testid="button-view-videos">
                <Play className="h-4 w-4" />
                View All Video Tutorials
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
