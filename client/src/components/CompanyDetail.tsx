import { useRoute, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { 
  Leaf, 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Building2,
  Globe,
  ExternalLink,
  Clock,
  DollarSign,
  Sprout,
  Home,
  Target,
  Zap,
  Factory,
  LineChart as LineChartIcon
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function CompanyDetail() {
  const [, params] = useRoute("/market/company/:id");
  const companyId = params?.id ? parseInt(params.id) : 1;

  // todo: remove mock functionality
  const companiesData = {
    1: {
      id: 1,
      name: "GreenTech Industries",
      ticker: "GRNT",
      esgScore: 87,
      sector: "Technology",
      emissions: -12,
      investments: "$45M",
      neutralityTarget: "2035",
      currentEmissions: "450,000 tons CO₂/year",
      description: "Leading renewable energy and sustainable technology solutions provider with operations across North America and Europe.",
      news: [
        {
          id: 1,
          title: "GreenTech Industries Announces $45M Investment in Carbon Capture Technology",
          summary: "The company will deploy direct air capture systems across 12 facilities, aiming to offset 200,000 tons of CO₂ annually by 2027.",
          source: "TechCrunch",
          date: "3 hours ago",
          sentiment: "positive"
        },
        {
          id: 2,
          title: "GreenTech Expands Solar Panel Manufacturing to Meet Growing Demand",
          summary: "New 500MW production facility in Texas expected to reduce company's carbon footprint by 15% while creating 800 green jobs.",
          source: "Bloomberg",
          date: "1 day ago",
          sentiment: "positive"
        },
        {
          id: 3,
          title: "Quarterly Report Shows 12% Reduction in Operational Emissions",
          summary: "Company exceeds sustainability targets for Q4 2024, demonstrating commitment to carbon neutrality roadmap.",
          source: "Reuters",
          date: "3 days ago",
          sentiment: "positive"
        },
        {
          id: 4,
          title: "Partnership with Indigenous Communities for Reforestation Project",
          summary: "GreenTech commits $8M to plant 2 million trees in partnership with Amazon rainforest guardians.",
          source: "Environmental Post",
          date: "1 week ago",
          sentiment: "positive"
        }
      ]
    },
    2: {
      id: 2,
      name: "EcoSolutions Corp",
      ticker: "ECOS",
      esgScore: 72,
      sector: "Manufacturing",
      emissions: -8,
      investments: "$28M",
      neutralityTarget: "2040",
      currentEmissions: "680,000 tons CO₂/year",
      description: "Global manufacturing company transitioning to sustainable production methods with focus on circular economy principles.",
      news: [
        {
          id: 1,
          title: "EcoSolutions Implements AI-Driven Energy Optimization in 30 Factories",
          summary: "Machine learning system reduces energy consumption by 18%, resulting in significant emissions reduction.",
          source: "Industry Week",
          date: "5 hours ago",
          sentiment: "positive"
        },
        {
          id: 2,
          title: "Company Faces Scrutiny Over Offshore Manufacturing Emissions",
          summary: "Environmental groups call for transparency in supply chain carbon accounting practices.",
          source: "Financial Times",
          date: "2 days ago",
          sentiment: "negative"
        },
        {
          id: 3,
          title: "EcoSolutions Launches Recycled Material Product Line",
          summary: "New initiative aims to use 50% recycled materials in all products by 2028.",
          source: "GreenBiz",
          date: "5 days ago",
          sentiment: "positive"
        }
      ]
    },
    3: {
      id: 3,
      name: "Carbon Neutral Ltd",
      ticker: "CARB",
      esgScore: 91,
      sector: "Energy",
      emissions: -18,
      investments: "$62M",
      neutralityTarget: "2030",
      currentEmissions: "320,000 tons CO₂/year",
      description: "Pioneering carbon-neutral energy provider leading the transition to 100% renewable energy sources.",
      news: [
        {
          id: 1,
          title: "Carbon Neutral Ltd Achieves 85% Renewable Energy Portfolio",
          summary: "Company surpasses 2025 target early with massive wind and solar farm expansion across three continents.",
          source: "Renewable Energy World",
          date: "2 hours ago",
          sentiment: "positive"
        },
        {
          id: 2,
          title: "Major Breakthrough in Green Hydrogen Production Costs",
          summary: "Proprietary technology reduces production costs by 40%, making green hydrogen competitive with fossil fuels.",
          source: "Energy Central",
          date: "1 day ago",
          sentiment: "positive"
        },
        {
          id: 3,
          title: "$62M Carbon Credit Purchase Program Announced",
          summary: "Company commits to purchasing high-quality carbon credits to offset remaining emissions on path to 2030 neutrality.",
          source: "Carbon Pulse",
          date: "4 days ago",
          sentiment: "positive"
        },
        {
          id: 4,
          title: "Industry Leadership Award for Climate Action Innovation",
          summary: "Recognized by Global Climate Alliance for outstanding contribution to carbon reduction technologies.",
          source: "Climate Action",
          date: "1 week ago",
          sentiment: "positive"
        }
      ]
    }
  };

  const company = companiesData[companyId as keyof typeof companiesData] || companiesData[1];

  // Generate predictive data based on company's carbon neutrality actions
  // Current price and future predictions based on their emissions reduction trajectory
  const generatePredictiveData = () => {
    const currentPrice = 24.50;
    const emissionsReductionRate = Math.abs(company.emissions); // Higher reduction = more credits needed
    const targetYear = parseInt(company.neutralityTarget);
    const currentYear = 2025;
    const yearsToTarget = targetYear - currentYear;
    
    // Companies with aggressive targets need to buy more credits at increasing rates
    const urgencyMultiplier = 1 + (1 / yearsToTarget) * 2;
    const investmentFactor = parseInt(company.investments.replace(/[^0-9]/g, '')) / 10;
    
    return [
      { 
        quarter: "Q1 2025", 
        currentPrice: currentPrice,
        predictedPrice: currentPrice + (emissionsReductionRate * 0.3),
        volume: investmentFactor * 0.8
      },
      { 
        quarter: "Q2 2025", 
        currentPrice: currentPrice + 0.5,
        predictedPrice: currentPrice + (emissionsReductionRate * 0.5),
        volume: investmentFactor * 0.9
      },
      { 
        quarter: "Q3 2025", 
        currentPrice: currentPrice + 0.8,
        predictedPrice: currentPrice + (emissionsReductionRate * 0.7) * urgencyMultiplier,
        volume: investmentFactor * 1.0
      },
      { 
        quarter: "Q4 2025", 
        currentPrice: currentPrice + 1.2,
        predictedPrice: currentPrice + (emissionsReductionRate * 0.9) * urgencyMultiplier,
        volume: investmentFactor * 1.1
      },
      { 
        quarter: "Q1 2026", 
        currentPrice: currentPrice + 1.5,
        predictedPrice: currentPrice + (emissionsReductionRate * 1.2) * urgencyMultiplier,
        volume: investmentFactor * 1.3
      },
      { 
        quarter: "Q2 2026", 
        currentPrice: currentPrice + 2.0,
        predictedPrice: currentPrice + (emissionsReductionRate * 1.5) * urgencyMultiplier * 1.1,
        volume: investmentFactor * 1.5
      },
      { 
        quarter: "Q3 2026", 
        currentPrice: currentPrice + 2.5,
        predictedPrice: currentPrice + (emissionsReductionRate * 1.8) * urgencyMultiplier * 1.2,
        volume: investmentFactor * 1.7
      },
      { 
        quarter: "Q4 2026", 
        currentPrice: currentPrice + 3.0,
        predictedPrice: currentPrice + (emissionsReductionRate * 2.2) * urgencyMultiplier * 1.3,
        volume: investmentFactor * 2.0
      }
    ];
  };

  const predictiveData = generatePredictiveData();

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
        <Link href="/market">
          <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Market Intelligence
          </Button>
        </Link>

        <Card className="mb-8" data-testid="card-company-header">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4 flex-1">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-3xl font-bold">{company.name}</h1>
                    <Badge variant="outline" className="font-mono">{company.ticker}</Badge>
                    <Badge variant="secondary">{company.sector}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{company.description}</p>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">ESG Score</div>
                      <div className="font-bold text-xl text-chart-1">{company.esgScore}/100</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Emission Reduction</div>
                      <div className="font-bold text-xl text-chart-1">{company.emissions}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Green Investment</div>
                      <div className="font-bold text-xl">{company.investments}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Neutrality Target</div>
                      <div className="font-bold text-xl text-primary">{company.neutralityTarget}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card data-testid="card-current-emissions">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Emissions</CardTitle>
              <Factory className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{company.currentEmissions}</div>
              <p className="text-xs text-muted-foreground mt-1">Annual output</p>
            </CardContent>
          </Card>

          <Card data-testid="card-target-year">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carbon Neutrality Goal</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-primary">{company.neutralityTarget}</div>
              <p className="text-xs text-muted-foreground mt-1">{parseInt(company.neutralityTarget) - 2025} years remaining</p>
            </CardContent>
          </Card>

          <Card data-testid="card-credits-needed">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estimated Credits Needed</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-chart-2">~{parseInt(company.currentEmissions.replace(/[^0-9]/g, '')) / 1000}K/year</div>
              <p className="text-xs text-muted-foreground mt-1">Based on current trajectory</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8" data-testid="card-predictive-pricing">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <LineChartIcon className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Carbon Credit Purchase Rate Prediction</CardTitle>
            </div>
            <CardDescription>
              Projected pricing based on {company.name}'s carbon neutrality roadmap and market demand
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold mb-2">Current Purchase Price</div>
                  <div className="text-2xl font-bold font-mono text-chart-2">${predictiveData[0].currentPrice.toFixed(2)}/ton</div>
                  <p className="text-xs text-muted-foreground mt-1">Market average rate</p>
                </div>
                <div>
                  <div className="font-semibold mb-2">Predicted Price (Q4 2026)</div>
                  <div className="text-2xl font-bold font-mono text-primary">${predictiveData[7].predictedPrice.toFixed(2)}/ton</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +{((predictiveData[7].predictedPrice - predictiveData[0].currentPrice) / predictiveData[0].currentPrice * 100).toFixed(1)}% increase driven by aggressive neutrality timeline
                  </p>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={predictiveData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="quarter" 
                  className="text-xs"
                />
                <YAxis 
                  className="text-xs"
                  label={{ value: 'Price ($/ton)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.375rem'
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="currentPrice" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  name="Current Market Price"
                  dot={{ fill: 'hsl(var(--chart-2))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predictedPrice" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="Predicted Purchase Price"
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-6 p-4 border-t space-y-3">
              <h4 className="font-semibold">Prediction Factors</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Aggressive carbon neutrality target ({company.neutralityTarget}):</strong> Creates urgent demand for high-quality credits</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Current emission reduction rate ({company.emissions}% annually):</strong> Indicates strong commitment requiring sustained credit purchases</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Green investment ({company.investments}):</strong> Large capital allocation suggests bulk purchasing strategy</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Industry sector ({company.sector}):</strong> Regulatory pressures and stakeholder expectations influence purchasing behavior</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 flex items-center gap-3">
          <Globe className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Company News & Updates</h2>
        </div>

        <div className="grid gap-6">
          {company.news.map((article) => (
            <Card key={article.id} className="hover-elevate" data-testid={`card-news-${article.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex gap-3">
                    {getSentimentBadge(article.sentiment)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                    <Clock className="h-3 w-3" />
                    {article.date}
                  </div>
                </div>
                <CardTitle className="text-xl leading-tight hover:text-primary transition-colors cursor-pointer">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">{article.source}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2" data-testid={`button-read-${article.id}`}>
                    Read Full Article
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
