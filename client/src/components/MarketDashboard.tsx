import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Leaf, 
  TrendingUp, 
  TrendingDown,
  Sprout,
  BarChart3,
  Building2,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Home,
  ShoppingCart,
  Wallet,
  ArrowRightLeft,
  History
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function MarketDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "companies" | "projects" | "trading">("overview");
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [sellDialogOpen, setSellDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: portfolio = [] } = useQuery<any[]>({
    queryKey: ["/api/portfolio"],
  });

  const { data: trades = [] } = useQuery<any[]>({
    queryKey: ["/api/trades"],
  });

  const { data: balanceData } = useQuery<{ balance: string }>({
    queryKey: ["/api/balance"],
  });

  const buyMutation = useMutation({
    mutationFn: async (data: { projectId: number; projectName: string; credits: number; pricePerCredit: string }) => {
      const res = await fetch("/api/trade/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to buy credits");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/trades"] });
      queryClient.invalidateQueries({ queryKey: ["/api/balance"] });
      toast({
        title: "Purchase Successful",
        description: "Your carbon credits have been added to your portfolio",
      });
      setBuyDialogOpen(false);
      setBuyAmount("");
    },
    onError: (error: Error) => {
      toast({
        title: "Purchase Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const sellMutation = useMutation({
    mutationFn: async (data: { projectId: number; projectName: string; credits: number; pricePerCredit: string }) => {
      const res = await fetch("/api/trade/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to sell credits");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/trades"] });
      queryClient.invalidateQueries({ queryKey: ["/api/balance"] });
      toast({
        title: "Sale Successful",
        description: "Your carbon credits have been sold",
      });
      setSellDialogOpen(false);
      setSellAmount("");
    },
    onError: (error: Error) => {
      toast({
        title: "Sale Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleBuy = () => {
    if (!selectedProject || !buyAmount) return;
    buyMutation.mutate({
      projectId: selectedProject.id,
      projectName: selectedProject.name,
      credits: parseInt(buyAmount),
      pricePerCredit: selectedProject.price.toString(),
    });
  };

  const handleSell = () => {
    if (!selectedProject || !sellAmount) return;
    sellMutation.mutate({
      projectId: selectedProject.id,
      projectName: selectedProject.name,
      credits: parseInt(sellAmount),
      pricePerCredit: selectedProject.price.toString(),
    });
  };

  const marketData = {
    currentPrice: 24.50,
    priceChange: 2.3,
    volume24h: 1250000,
    volumeChange: -5.2
  };

  const priceHistory = [
    { date: "Jan 15", price: 22.1 },
    { date: "Jan 16", price: 23.0 },
    { date: "Jan 17", price: 22.8 },
    { date: "Jan 18", price: 23.5 },
    { date: "Jan 19", price: 24.2 },
    { date: "Jan 20", price: 24.0 },
    { date: "Jan 21", price: 24.5 },
  ];

  const companies = [
    {
      id: 1,
      name: "GreenTech Industries",
      ticker: "GRNT",
      esgScore: 87,
      sentiment: "positive",
      priceImpact: 5.2,
      emissions: -12,
      investments: "$45M"
    },
    {
      id: 2,
      name: "EcoSolutions Corp",
      ticker: "ECOS",
      esgScore: 72,
      sentiment: "neutral",
      priceImpact: 0.5,
      emissions: -8,
      investments: "$28M"
    },
    {
      id: 3,
      name: "Carbon Neutral Ltd",
      ticker: "CARB",
      esgScore: 91,
      sentiment: "positive",
      priceImpact: 7.8,
      emissions: -18,
      investments: "$62M"
    },
  ];

  const projects = [
    {
      id: 1,
      name: "Amazon Rainforest Protection",
      region: "South America",
      credits: 125000,
      price: 24.50,
      trend: "up"
    },
    {
      id: 2,
      name: "Solar Farm Initiative Kenya",
      region: "East Africa",
      credits: 85000,
      price: 23.80,
      trend: "up"
    },
    {
      id: 3,
      name: "Wind Energy Expansion India",
      region: "South Asia",
      credits: 95000,
      price: 24.20,
      trend: "down"
    },
  ];

  const getSentimentBadge = (sentiment: string) => {
    const config = {
      positive: { variant: "default" as const, icon: TrendingUp, text: "Positive" },
      neutral: { variant: "secondary" as const, icon: Minus, text: "Neutral" },
      negative: { variant: "destructive" as const, icon: TrendingDown, text: "Negative" }
    };
    const item = config[sentiment as keyof typeof config];
    const Icon = item.icon;
    return (
      <Badge variant={item.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {item.text}
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
            <Link href="/learn-earn">
              <Button variant="ghost" className="gap-2" data-testid="button-learn-earn">
                <Sprout className="h-4 w-4" />
                <span className="hidden sm:inline">Learn & Earn</span>
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
          <h1 className="text-3xl font-bold mb-2">Market Intelligence</h1>
          <p className="text-muted-foreground">Real-time carbon credit pricing and company sustainability analytics</p>
        </div>

        <div className="flex gap-2 mb-8 border-b">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => setActiveTab("overview")}
            className="rounded-b-none"
            data-testid="button-tab-overview"
          >
            Market Overview
          </Button>
          <Button
            variant={activeTab === "companies" ? "default" : "ghost"}
            onClick={() => setActiveTab("companies")}
            className="rounded-b-none"
            data-testid="button-tab-companies"
          >
            Company Index
          </Button>
          <Button
            variant={activeTab === "projects" ? "default" : "ghost"}
            onClick={() => setActiveTab("projects")}
            className="rounded-b-none"
            data-testid="button-tab-projects"
          >
            Credit Projects
          </Button>
          <Button
            variant={activeTab === "trading" ? "default" : "ghost"}
            onClick={() => setActiveTab("trading")}
            className="rounded-b-none gap-2"
            data-testid="button-tab-trading"
          >
            <ArrowRightLeft className="h-4 w-4" />
            Trading
          </Button>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-4">
              <Card data-testid="card-current-price">
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Price</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-mono">${marketData.currentPrice}</div>
                  <div className={`flex items-center gap-1 text-xs ${marketData.priceChange > 0 ? 'text-chart-1' : 'text-destructive'}`}>
                    {marketData.priceChange > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(marketData.priceChange)}% (24h)
                  </div>
                </CardContent>
              </Card>
              <Card data-testid="card-volume">
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Trading Volume</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-mono">${(marketData.volume24h / 1000000).toFixed(2)}M</div>
                  <div className={`flex items-center gap-1 text-xs ${marketData.volumeChange > 0 ? 'text-chart-1' : 'text-destructive'}`}>
                    {marketData.volumeChange > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(marketData.volumeChange)}% (24h)
                  </div>
                </CardContent>
              </Card>
              <Card data-testid="card-high">
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">24h High</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-mono text-chart-1">$25.20</div>
                  <p className="text-xs text-muted-foreground">Peak price today</p>
                </CardContent>
              </Card>
              <Card data-testid="card-low">
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">24h Low</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-mono text-chart-5">$23.80</div>
                  <p className="text-xs text-muted-foreground">Lowest price today</p>
                </CardContent>
              </Card>
            </div>

            <Card data-testid="card-price-chart">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle>Price History</CardTitle>
                    <CardDescription>Carbon credit price per ton (7 days)</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">7D</Button>
                    <Button variant="ghost" size="sm">1M</Button>
                    <Button variant="ghost" size="sm">3M</Button>
                    <Button variant="ghost" size="sm">1Y</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={priceHistory}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.375rem'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={2}
                      fill="url(#priceGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Pricing</CardTitle>
                  <CardDescription>Average price by region ($/ton)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">North America</div>
                      <div className="text-sm text-muted-foreground">VCS Standard</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold">$26.50</div>
                      <div className="text-xs text-chart-1">+3.2%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Europe</div>
                      <div className="text-sm text-muted-foreground">Gold Standard</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold">$28.80</div>
                      <div className="text-xs text-chart-1">+1.8%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Asia Pacific</div>
                      <div className="text-sm text-muted-foreground">VCS Standard</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold">$22.40</div>
                      <div className="text-xs text-destructive">-0.5%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Sentiment</CardTitle>
                  <CardDescription>AI-driven price prediction indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-chart-1" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium mb-1">Strong Green Initiatives</div>
                      <div className="text-sm text-muted-foreground">
                        Major companies announcing carbon neutrality goals → Expected price increase
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-chart-2" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium mb-1">Increased Regulation</div>
                      <div className="text-sm text-muted-foreground">
                        New carbon tax policies in EU → Driving demand higher
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "companies" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Company Green Index</h2>
              <Button variant="outline" size="sm" data-testid="button-filter">Filter by Sector</Button>
            </div>
            {companies.map((company) => (
              <Link key={company.id} href={`/market/company/${company.id}`}>
                <Card className="hover-elevate cursor-pointer" data-testid={`card-company-${company.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4 flex-1">
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg">{company.name}</CardTitle>
                            <Badge variant="outline" className="font-mono text-xs">{company.ticker}</Badge>
                            {getSentimentBadge(company.sentiment)}
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">ESG Score</div>
                              <div className="font-semibold text-chart-1">{company.esgScore}/100</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Emission Trend</div>
                              <div className="font-semibold text-chart-1">{company.emissions}%</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Green Investment</div>
                              <div className="font-semibold">{company.investments}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm text-muted-foreground mb-1">Price Impact</div>
                        <div className={`text-xl font-bold font-mono ${company.priceImpact > 0 ? 'text-chart-1' : 'text-destructive'}`}>
                          {company.priceImpact > 0 ? '+' : ''}{company.priceImpact}%
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Verified Carbon Credit Projects</h2>
              <Button variant="outline" size="sm" data-testid="button-filter-region">Filter by Region</Button>
            </div>
            {projects.map((project) => (
              <Card key={project.id} className="hover-elevate" data-testid={`card-project-${project.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge variant="secondary">{project.region}</Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Available Credits</div>
                          <div className="font-semibold font-mono">{project.credits.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Current Price</div>
                          <div className="font-semibold font-mono">${project.price}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Price Trend</div>
                          <div className="flex items-center gap-1">
                            {project.trend === "up" ? (
                              <>
                                <TrendingUp className="h-4 w-4 text-chart-1" />
                                <span className="font-semibold text-chart-1">Increasing</span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="h-4 w-4 text-destructive" />
                                <span className="font-semibold text-destructive">Decreasing</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => {
                          setSelectedProject(project);
                          setBuyDialogOpen(true);
                        }}
                        data-testid={`button-buy-${project.id}`}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Buy
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "trading" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-mono">
                    ${portfolio.reduce((sum: number, item: any) => 
                      sum + (parseFloat(item.credits) * parseFloat(item.averagePrice)), 0
                    ).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total value of holdings
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-mono">
                    {portfolio.reduce((sum: number, item: any) => sum + parseInt(item.credits), 0)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Carbon credits owned</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-mono">
                    ${balanceData?.balance || "0.00"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Ready to trade</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    My Holdings
                  </CardTitle>
                  <CardDescription>Your carbon credit portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolio.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No holdings yet. Start buying carbon credits!
                    </div>
                  ) : (
                    portfolio.map((item: any) => {
                      const matchingProject = projects.find(p => p.id === item.projectId);
                      return (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{item.projectName}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                              <span className="font-mono">{item.credits} credits</span>
                              <span>•</span>
                              <span className="font-mono">Avg ${parseFloat(item.averagePrice).toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold font-mono">
                              ${(parseFloat(item.credits) * parseFloat(item.averagePrice)).toFixed(2)}
                            </div>
                            {matchingProject && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="mt-2"
                                onClick={() => {
                                  setSelectedProject(matchingProject);
                                  setSellDialogOpen(true);
                                }}
                              >
                                Sell
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Recent Transactions
                  </CardTitle>
                  <CardDescription>Your trading history</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trades.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No transactions yet
                    </div>
                  ) : (
                    trades.map((trade: any) => (
                      <div key={trade.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            trade.type === 'buy' ? 'bg-chart-1/10' : 'bg-destructive/10'
                          }`}>
                            {trade.type === 'buy' ? (
                              <ArrowUpRight className="h-4 w-4 text-chart-1" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-destructive" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">
                              {trade.type === 'buy' ? 'Bought' : 'Sold'} {trade.credits} credits
                            </div>
                            <div className="text-sm text-muted-foreground">{trade.projectName}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold font-mono">${parseFloat(trade.totalAmount).toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(trade.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Dialog open={buyDialogOpen} onOpenChange={setBuyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy Carbon Credits</DialogTitle>
            <DialogDescription>
              {selectedProject && `Purchase credits from ${selectedProject.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available Credits</span>
                  <span className="font-mono font-semibold">{selectedProject.credits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per Credit</span>
                  <span className="font-mono font-semibold">${selectedProject.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Region</span>
                  <span className="font-semibold">{selectedProject.region}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buy-amount">Number of Credits</Label>
                <Input
                  id="buy-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  min="1"
                  max={selectedProject.credits}
                />
              </div>
              {buyAmount && (
                <div className="p-4 bg-chart-1/10 border border-chart-1/20 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Cost</span>
                    <span className="text-2xl font-bold font-mono">
                      ${(parseFloat(buyAmount) * selectedProject.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setBuyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  className="flex-1" 
                  disabled={!buyAmount || parseFloat(buyAmount) <= 0 || buyMutation.isPending}
                  onClick={handleBuy}
                >
                  {buyMutation.isPending ? "Processing..." : "Confirm Purchase"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={sellDialogOpen} onOpenChange={setSellDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sell Carbon Credits</DialogTitle>
            <DialogDescription>
              {selectedProject && `Sell your credits from ${selectedProject.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your Holdings</span>
                  <span className="font-mono font-semibold">150 credits</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Price</span>
                  <span className="font-mono font-semibold">${selectedProject.price}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sell-amount">Number of Credits to Sell</Label>
                <Input
                  id="sell-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  min="1"
                  max="150"
                />
              </div>
              {sellAmount && (
                <div className="p-4 bg-chart-1/10 border border-chart-1/20 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">You'll Receive</span>
                    <span className="text-2xl font-bold font-mono">
                      ${(parseFloat(sellAmount) * selectedProject.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setSellDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  className="flex-1" 
                  disabled={!sellAmount || parseFloat(sellAmount) <= 0 || sellMutation.isPending}
                  onClick={handleSell}
                >
                  {sellMutation.isPending ? "Processing..." : "Confirm Sale"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
