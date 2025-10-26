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
  TrendingUp, 
  Award, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Trees,
  Wind,
  Sun,
  Droplets,
  MapPin,
  Calendar,
  Home
} from "lucide-react";

export function LearnEarnDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "actions" | "impact">("overview");

  // todo: remove mock functionality
  const userStats = {
    totalCredits: 245,
    co2Offset: 1850,
    treesPlanted: 124,
    rank: 3,
    monthlyGoal: 75,
    currentProgress: 68
  };

  const ecoActions = [
    { 
      id: 1, 
      type: "Tree Planting", 
      status: "verified", 
      credits: 45, 
      date: "2025-01-15", 
      location: "Amazon Rainforest, Brazil",
      icon: Trees,
      co2: 225
    },
    { 
      id: 2, 
      type: "Solar Panel Installation", 
      status: "pending", 
      credits: 120, 
      date: "2025-01-20", 
      location: "Rural Farm, Kenya",
      icon: Sun,
      co2: 600
    },
    { 
      id: 3, 
      type: "Renewable Energy Adoption", 
      status: "verified", 
      credits: 80, 
      date: "2025-01-10", 
      location: "Community Center, India",
      icon: Wind,
      co2: 400
    },
  ];

  const actionCategories = [
    { name: "Reforestation", icon: Trees, color: "text-chart-1" },
    { name: "Solar Energy", icon: Sun, color: "text-chart-3" },
    { name: "Wind Power", icon: Wind, color: "text-chart-2" },
    { name: "Water Conservation", icon: Droplets, color: "text-chart-4" },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      verified: { variant: "default" as const, icon: CheckCircle2, text: "Verified" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending" },
      rejected: { variant: "destructive" as const, icon: AlertCircle, text: "Rejected" }
    };
    const config = variants[status as keyof typeof variants];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

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
                <span className="hidden sm:inline">Market Data</span>
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
          <h1 className="text-3xl font-bold mb-2">Welcome back, John</h1>
          <p className="text-muted-foreground">Track your eco-actions and environmental impact</p>
        </div>

        <div className="flex gap-2 mb-8 border-b">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => setActiveTab("overview")}
            className="rounded-b-none"
            data-testid="button-tab-overview"
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "actions" ? "default" : "ghost"}
            onClick={() => setActiveTab("actions")}
            className="rounded-b-none"
            data-testid="button-tab-actions"
          >
            My Actions
          </Button>
          <Button
            variant={activeTab === "impact" ? "default" : "ghost"}
            onClick={() => setActiveTab("impact")}
            className="rounded-b-none"
            data-testid="button-tab-impact"
          >
            Impact
          </Button>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-4">
              <Card data-testid="card-stat-credits">
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{userStats.totalCredits}</div>
                  <p className="text-xs text-muted-foreground">CarbonLink Credits</p>
                </CardContent>
              </Card>
              <Card data-testid="card-stat-co2">
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CO₂ Offset</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-1">{userStats.co2Offset}</div>
                  <p className="text-xs text-muted-foreground">kg reduced</p>
                </CardContent>
              </Card>
              <Card data-testid="card-stat-trees">
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Trees Planted</CardTitle>
                  <Trees className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-1">{userStats.treesPlanted}</div>
                  <p className="text-xs text-muted-foreground">and growing</p>
                </CardContent>
              </Card>
              <Card data-testid="card-stat-rank">
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-3">#{userStats.rank}</div>
                  <p className="text-xs text-muted-foreground">among peers</p>
                </CardContent>
              </Card>
            </div>

            <Card data-testid="card-monthly-goal">
              <CardHeader>
                <CardTitle>Monthly Goal Progress</CardTitle>
                <CardDescription>You're {userStats.currentProgress}% towards your {userStats.monthlyGoal} credit goal</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(userStats.currentProgress / userStats.monthlyGoal) * 100} className="h-3" />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>{userStats.currentProgress} credits earned</span>
                  <span>{userStats.monthlyGoal - userStats.currentProgress} remaining</span>
                </div>
              </CardContent>
            </Card>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Learning Resources</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/learn-earn/roadmap">
                  <Card className="hover-elevate cursor-pointer h-full" data-testid="card-roadmap">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Educational Roadmap</CardTitle>
                      <CardDescription className="text-base">
                        14-level learning path from carbon credit basics to Indian market mastery
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <div className="font-semibold text-primary">3/14</div>
                          <div className="text-muted-foreground">Completed</div>
                        </div>
                        <div>
                          <div className="font-semibold text-chart-3">350</div>
                          <div className="text-muted-foreground">Points Earned</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/learn-earn/videos">
                  <Card className="hover-elevate cursor-pointer h-full" data-testid="card-videos">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center mb-3">
                        <Plus className="h-6 w-6 text-chart-2" />
                      </div>
                      <CardTitle className="text-xl">Video Tutorials</CardTitle>
                      <CardDescription className="text-base">
                        Step-by-step guides on earning carbon credits in India through various methods
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <div className="font-semibold text-chart-2">12</div>
                          <div className="text-muted-foreground">Tutorials</div>
                        </div>
                        <div>
                          <div className="font-semibold">6</div>
                          <div className="text-muted-foreground">Categories</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === "actions" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">My Eco-Actions</h2>
              <Button className="gap-2" data-testid="button-add-action">
                <Plus className="h-4 w-4" />
                Add Action
              </Button>
            </div>
            {ecoActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card key={action.id} className="hover-elevate" data-testid={`card-action-${action.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4 flex-1">
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-lg">{action.type}</CardTitle>
                            {getStatusBadge(action.status)}
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {action.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {action.date}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-primary">{action.credits}</div>
                        <div className="text-xs text-muted-foreground">credits</div>
                        <div className="text-sm text-muted-foreground mt-1">{action.co2}kg CO₂</div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === "impact" && (
          <div className="space-y-6">
            <Card data-testid="card-total-impact">
              <CardHeader>
                <CardTitle className="text-2xl">Your Environmental Impact</CardTitle>
                <CardDescription>Total contribution to carbon offset</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-chart-1">{userStats.co2Offset}kg</div>
                    <div className="text-sm text-muted-foreground">Total CO₂ Offset</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-chart-1">{userStats.treesPlanted}</div>
                    <div className="text-sm text-muted-foreground">Trees Planted</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-primary">{userStats.totalCredits}</div>
                    <div className="text-sm text-muted-foreground">Credits Earned</div>
                  </div>
                </div>
                <div className="pt-6 border-t">
                  <p className="text-muted-foreground">
                    Your efforts are equivalent to removing <span className="font-semibold text-foreground">3.7 cars</span> from the road for a year,
                    or powering <span className="font-semibold text-foreground">2.1 homes</span> with clean energy for a month.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact by Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Reforestation</span>
                      <span className="text-sm text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Renewable Energy</span>
                      <span className="text-sm text-muted-foreground">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Waste Reduction</span>
                      <span className="text-sm text-muted-foreground">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
