import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { 
  Leaf, 
  TrendingUp,
  Sprout,
  ArrowRight,
  ExternalLink,
  Clock,
  Building2,
  Globe,
  Newspaper,
  TrendingDown,
  DollarSign,
  BarChart3
} from "lucide-react";

export function Dashboard() {
  // todo: remove mock functionality
  const carbonNews = [
    {
      id: 1,
      title: "EU Carbon Prices Hit Record High Amid New Climate Regulations",
      summary: "European carbon allowances reached €95 per ton as the EU implements stricter emission caps under the Fit for 55 package, driving increased demand for carbon credits across voluntary markets.",
      source: "Carbon Pulse",
      date: "2 hours ago",
      category: "Market Update",
      sentiment: "positive",
      priceImpact: "+5.2%"
    },
    {
      id: 2,
      title: "Major Tech Companies Announce $2B Investment in Carbon Removal Projects",
      summary: "Google, Microsoft, and Amazon unveil joint initiative to fund large-scale carbon removal technologies including direct air capture and enhanced mineralization projects across 15 countries.",
      source: "Bloomberg Green",
      date: "5 hours ago",
      category: "Industry News",
      sentiment: "positive",
      priceImpact: "+3.8%"
    },
    {
      id: 3,
      title: "New Study Questions Quality of Some Rainforest Carbon Credits",
      summary: "Independent research reveals that up to 30% of REDD+ credits may overestimate actual emissions reductions, prompting calls for stricter verification standards in voluntary carbon markets.",
      source: "Nature Climate Change",
      date: "8 hours ago",
      category: "Research",
      sentiment: "negative",
      priceImpact: "-2.1%"
    },
    {
      id: 4,
      title: "Global Carbon Market Volume Surpasses $1 Trillion Milestone",
      summary: "Combined trading across compliance and voluntary carbon markets reached record levels in 2024, with voluntary market transactions growing 85% year-over-year driven by corporate net-zero commitments.",
      source: "Reuters",
      date: "12 hours ago",
      category: "Market Update",
      sentiment: "positive",
      priceImpact: "+4.5%"
    },
    {
      id: 5,
      title: "China Expands National Carbon Trading System to Include New Sectors",
      summary: "Beijing announces extension of emissions trading scheme to cover steel, cement, and aluminum industries, adding over 3 billion tons of CO2 to the world's largest carbon market.",
      source: "Financial Times",
      date: "1 day ago",
      category: "Policy",
      sentiment: "positive",
      priceImpact: "+6.2%"
    },
    {
      id: 6,
      title: "Blockchain-Based Carbon Credit Registry Gains International Recognition",
      summary: "New digital platform using distributed ledger technology receives endorsement from UNFCCC, promising enhanced transparency and reduced fraud in carbon credit trading.",
      source: "CoinDesk",
      date: "1 day ago",
      category: "Technology",
      sentiment: "positive",
      priceImpact: "+1.8%"
    },
    {
      id: 7,
      title: "Renewable Energy Credits See Price Decline Amid Oversupply",
      summary: "Solar and wind renewable energy certificates drop 15% in Q4 as rapid deployment of clean energy projects outpaces corporate demand, analysts warn of market correction.",
      source: "Wood Mackenzie",
      date: "2 days ago",
      category: "Market Update",
      sentiment: "negative",
      priceImpact: "-4.3%"
    },
    {
      id: 8,
      title: "Indigenous Communities Launch Direct Carbon Credit Sales Platform",
      summary: "Coalition of Amazon rainforest communities bypasses traditional intermediaries with new marketplace, aiming to increase revenue share for forest guardians from 20% to 70%.",
      source: "Mongabay",
      date: "2 days ago",
      category: "Social Impact",
      sentiment: "positive",
      priceImpact: "+2.5%"
    }
  ];

  const getSentimentBadge = (sentiment: string) => {
    if (sentiment === "positive") {
      return <Badge className="gap-1"><TrendingUp className="h-3 w-3" />Positive</Badge>;
    } else if (sentiment === "negative") {
      return <Badge variant="destructive" className="gap-1"><TrendingDown className="h-3 w-3" />Negative</Badge>;
    }
    return <Badge variant="secondary">Neutral</Badge>;
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
            <ThemeToggle />
            <Avatar data-testid="avatar-user">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Carbon Market Dashboard</h1>
          <p className="text-muted-foreground">Stay updated with the latest carbon market news and trends</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link href="/learn-earn">
            <Card className="hover-elevate cursor-pointer border-2 border-primary/20" data-testid="card-nav-learn-earn">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sprout className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                    Learn & Earn
                    <ArrowRight className="h-5 w-5" />
                  </CardTitle>
                  <CardDescription className="text-base">
                    Document your eco-actions, upload verification proof, and earn CarbonLink Credits for your environmental impact
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6 text-sm">
                  <div>
                    <div className="font-semibold text-primary">245</div>
                    <div className="text-muted-foreground">Your Credits</div>
                  </div>
                  <div>
                    <div className="font-semibold text-chart-1">1,850kg</div>
                    <div className="text-muted-foreground">CO₂ Offset</div>
                  </div>
                  <div>
                    <div className="font-semibold text-chart-1">124</div>
                    <div className="text-muted-foreground">Trees Planted</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/market">
            <Card className="hover-elevate cursor-pointer border-2 border-chart-2/20" data-testid="card-nav-market">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-chart-2" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                    Market Intelligence
                    <ArrowRight className="h-5 w-5" />
                  </CardTitle>
                  <CardDescription className="text-base">
                    Access real-time carbon credit pricing, company ESG analytics, and AI-driven market sentiment predictions
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6 text-sm">
                  <div>
                    <div className="font-semibold font-mono text-chart-2">$24.50</div>
                    <div className="text-muted-foreground">Current Price</div>
                  </div>
                  <div>
                    <div className="font-semibold text-chart-1">+2.3%</div>
                    <div className="text-muted-foreground">24h Change</div>
                  </div>
                  <div>
                    <div className="font-semibold font-mono">$1.25M</div>
                    <div className="text-muted-foreground">Volume</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <Newspaper className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Latest Carbon Market News</h2>
        </div>

        <div className="grid gap-6">
          {carbonNews.map((news) => (
            <Card key={news.id} className="hover-elevate" data-testid={`card-news-${news.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex gap-3 flex-wrap">
                    <Badge variant="outline" data-testid={`badge-category-${news.id}`}>{news.category}</Badge>
                    {getSentimentBadge(news.sentiment)}
                    <Badge variant="secondary" className="gap-1 font-mono">
                      <DollarSign className="h-3 w-3" />
                      {news.priceImpact}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                    <Clock className="h-3 w-3" />
                    {news.date}
                  </div>
                </div>
                <CardTitle className="text-xl leading-tight hover:text-primary transition-colors cursor-pointer">
                  {news.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {news.summary}
                </p>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">{news.source}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2" data-testid={`button-read-${news.id}`}>
                    Read Full Article
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Want to see more detailed market analytics?</p>
          <Link href="/market">
            <Button size="lg" variant="outline" className="gap-2" data-testid="button-view-analytics">
              <BarChart3 className="h-5 w-5" />
              View Full Market Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
