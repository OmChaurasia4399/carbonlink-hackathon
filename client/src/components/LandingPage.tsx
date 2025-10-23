import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { Sprout, TrendingUp, Award, Users, BarChart3, Shield, ArrowRight, Leaf, DollarSign, Globe } from "lucide-react";
import heroImage from "@assets/generated_images/Eco-actions_hero_montage_7eba7bdf.png";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">CarbonLink</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover-elevate active-elevate-2 rounded-md px-3 py-2">Features</a>
            <a href="#how-it-works" className="text-sm hover-elevate active-elevate-2 rounded-md px-3 py-2">How It Works</a>
            <a href="#impact" className="text-sm hover-elevate active-elevate-2 rounded-md px-3 py-2">Impact</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="outline" size="sm" data-testid="button-signin">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" data-testid="button-getstarted">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="text-sm" data-testid="badge-platform">Dual-Purpose Platform</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Bridge Your Impact to the Carbon Market
              </h1>
              <p className="text-lg text-muted-foreground">
                Learn sustainable practices, document eco-actions, earn verified carbon credits, and access real-time market intelligence—all in one platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2" data-testid="button-start-earning">
                    <Sprout className="h-5 w-5" />
                    Start Earning Credits
                  </Button>
                </Link>
                <Link href="/market">
                  <Button size="lg" variant="outline" className="gap-2" data-testid="button-explore-market">
                    <TrendingUp className="h-5 w-5" />
                    Explore Market Data
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <div className="text-2xl font-bold text-primary">15K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">2.5M</div>
                  <div className="text-sm text-muted-foreground">Trees Planted</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">450K</div>
                  <div className="text-sm text-muted-foreground">Tons CO₂ Offset</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
              <img 
                src={heroImage} 
                alt="Diverse eco-actions including tree planting, solar panels, and sustainable farming" 
                className="rounded-lg w-full"
                data-testid="img-hero"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Two Platforms, One Ecosystem</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're generating carbon credits or analyzing market trends, CarbonLink has you covered.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate" data-testid="card-learn-earn">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sprout className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Learn & Earn</CardTitle>
                <CardDescription className="text-base">
                  For individuals, farmers, and organizations ready to make an impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Knowledge Hub</div>
                      <div className="text-sm text-muted-foreground">Access structured education on sustainable practices</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Document Actions</div>
                      <div className="text-sm text-muted-foreground">Upload proof and track your eco-projects</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Earn Credits</div>
                      <div className="text-sm text-muted-foreground">Get verified CarbonLink Credits for your impact</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-market-trade">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-chart-2" />
                </div>
                <CardTitle className="text-2xl">Market Intelligence</CardTitle>
                <CardDescription className="text-base">
                  For investors, analysts, and companies tracking sustainability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-chart-2/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BarChart3 className="h-3 w-3 text-chart-2" />
                    </div>
                    <div>
                      <div className="font-medium">Live Market Data</div>
                      <div className="text-sm text-muted-foreground">Real-time carbon credit pricing and trends</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-chart-2/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BarChart3 className="h-3 w-3 text-chart-2" />
                    </div>
                    <div>
                      <div className="font-medium">Company ESG Tracking</div>
                      <div className="text-sm text-muted-foreground">Monitor sustainability performance metrics</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-chart-2/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BarChart3 className="h-3 w-3 text-chart-2" />
                    </div>
                    <div>
                      <div className="font-medium">Sentiment Analysis</div>
                      <div className="text-sm text-muted-foreground">AI-driven price predictions based on market news</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Simple steps to start making an impact</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card data-testid="card-step-learn">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle>Learn</CardTitle>
                <CardDescription>
                  Explore our knowledge hub to understand sustainable practices like reforestation, renewable energy, and regenerative agriculture.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card data-testid="card-step-apply">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <CardTitle>Apply</CardTitle>
                <CardDescription>
                  Register your eco-projects and upload verification proof with photos, GPS coordinates, and timestamps.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card data-testid="card-step-earn">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <CardTitle>Earn</CardTitle>
                <CardDescription>
                  Get verified by our team and receive CarbonLink Credits representing your CO₂ offset contribution.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="impact" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trust & Transparency</h2>
            <p className="text-lg text-muted-foreground">Built on verified data and real impact</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Verified Actions</h3>
              <p className="text-muted-foreground">
                Every eco-action is reviewed by our verification team before credits are issued
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-lg bg-chart-2/10 flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-chart-2" />
              </div>
              <h3 className="text-xl font-semibold">Global Impact</h3>
              <p className="text-muted-foreground">
                Connect with a worldwide community making real environmental change
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-lg bg-chart-3/10 flex items-center justify-center mx-auto">
                <DollarSign className="h-8 w-8 text-chart-3" />
              </div>
              <h3 className="text-xl font-semibold">Market Transparency</h3>
              <p className="text-muted-foreground">
                Access real-time pricing data and company ESG metrics in one place
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Make an Impact?</h2>
          <p className="text-lg opacity-90">
            Join thousands of individuals and organizations contributing to a sustainable future
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="gap-2" data-testid="button-cta-start">
                Get Started Today
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/market">
              <Button size="lg" variant="outline" className="gap-2 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground backdrop-blur-sm" data-testid="button-cta-explore">
                Explore Market Data
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">CarbonLink</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Bridging carbon credit generation with market intelligence for a sustainable future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover-elevate active-elevate-2 rounded-md px-2 py-1 inline-block">Learn & Earn</a></li>
                <li><a href="#" className="hover-elevate active-elevate-2 rounded-md px-2 py-1 inline-block">Market Data</a></li>
                <li><a href="#" className="hover-elevate active-elevate-2 rounded-md px-2 py-1 inline-block">Verification</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover-elevate active-elevate-2 rounded-md px-2 py-1 inline-block">Knowledge Hub</a></li>
                <li><a href="#" className="hover-elevate active-elevate-2 rounded-md px-2 py-1 inline-block">Documentation</a></li>
                <li><a href="#" className="hover-elevate active-elevate-2 rounded-md px-2 py-1 inline-block">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover-elevate active-elevate-2 rounded-md px-2 py-1 inline-block">About</a></li>
                <li><a href="#" className="hover-elevate active-elevate-2 rounded-md px-2 py-1 inline-block">Blog</a></li>
                <li><a href="#" className="hover-elevate active-elevate-2 rounded-md px-2 py-1 inline-block">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 CarbonLink. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
