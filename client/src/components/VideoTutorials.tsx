import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { Input } from "@/components/ui/input";
import { 
  Leaf,
  Home,
  TrendingUp,
  Play,
  Clock,
  Users,
  Search,
  ArrowLeft,
  Trees,
  Sun,
  Wind,
  Droplets,
  Sprout,
  Factory,
  Recycle
} from "lucide-react";

export function VideoTutorials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // todo: remove mock functionality - load actual video tutorials from database or video platform
  const videoCategories = [
    { id: "all", name: "All Methods", icon: Play },
    { id: "agriculture", name: "Agriculture", icon: Sprout },
    { id: "forestry", name: "Forestry", icon: Trees },
    { id: "renewable", name: "Renewable Energy", icon: Sun },
    { id: "waste", name: "Waste Management", icon: Recycle },
    { id: "water", name: "Water Conservation", icon: Droplets }
  ];

  const videoTutorials = [
    {
      id: 1,
      title: "Sustainable Farming Practices for Carbon Credits",
      description: "Learn how organic farming, crop rotation, and minimal tillage can help you earn carbon credits in India",
      category: "agriculture",
      duration: "18:45",
      views: "24K",
      difficulty: "Beginner",
      thumbnail: "🌾",
      topics: ["Organic farming", "Crop rotation", "Soil health", "Verification process"]
    },
    {
      id: 2,
      title: "Community Reforestation Projects: Step-by-Step Guide",
      description: "Complete guide to starting a tree plantation project and registering it for carbon credits under VCS",
      category: "forestry",
      duration: "22:30",
      views: "31K",
      difficulty: "Intermediate",
      thumbnail: "🌳",
      topics: ["Tree species selection", "Land preparation", "VCS registration", "Monitoring"]
    },
    {
      id: 3,
      title: "Rooftop Solar Installation for Carbon Credit Generation",
      description: "How to install solar panels and earn carbon credits through renewable energy generation",
      category: "renewable",
      duration: "25:15",
      views: "45K",
      difficulty: "Beginner",
      thumbnail: "☀️",
      topics: ["Solar panel types", "Installation process", "Grid connection", "Credit calculation"]
    },
    {
      id: 4,
      title: "Biogas Plants: Turning Waste into Carbon Credits",
      description: "Setting up biogas digesters from agricultural and household waste for carbon offset",
      category: "waste",
      duration: "20:10",
      views: "18K",
      difficulty: "Intermediate",
      thumbnail: "♻️",
      topics: ["Biogas technology", "Feedstock preparation", "Maintenance", "Credit eligibility"]
    },
    {
      id: 5,
      title: "Agroforestry Systems for Indian Farmers",
      description: "Integrating trees with crops to increase yields and generate carbon credits simultaneously",
      category: "forestry",
      duration: "16:40",
      views: "28K",
      difficulty: "Beginner",
      thumbnail: "🌲",
      topics: ["Tree-crop systems", "Economic benefits", "Species combinations", "Indian context"]
    },
    {
      id: 6,
      title: "Wind Energy Projects in Rural India",
      description: "Community wind power projects and their role in carbon credit generation",
      category: "renewable",
      duration: "19:55",
      views: "22K",
      difficulty: "Advanced",
      thumbnail: "💨",
      topics: ["Wind assessment", "Community ownership", "Technical requirements", "CDM process"]
    },
    {
      id: 7,
      title: "Drip Irrigation and Water Conservation Credits",
      description: "Efficient irrigation methods that reduce emissions and qualify for carbon credits",
      category: "water",
      duration: "14:20",
      views: "35K",
      difficulty: "Beginner",
      thumbnail: "💧",
      topics: ["Drip systems", "Energy savings", "Installation", "Verification"]
    },
    {
      id: 8,
      title: "Vermicomposting: Organic Waste to Carbon Credits",
      description: "Commercial vermicomposting setups and carbon credit registration process",
      category: "waste",
      duration: "17:30",
      views: "26K",
      difficulty: "Beginner",
      thumbnail: "🪱",
      topics: ["Worm farming", "Composting techniques", "Market opportunities", "Credit potential"]
    },
    {
      id: 9,
      title: "Conservation Agriculture: No-Till Farming Method",
      description: "Reduce emissions through conservation tillage and earn credits while improving soil",
      category: "agriculture",
      duration: "21:05",
      views: "19K",
      difficulty: "Intermediate",
      thumbnail: "🚜",
      topics: ["No-till benefits", "Equipment needs", "Transition process", "Documentation"]
    },
    {
      id: 10,
      title: "Mangrove Restoration for Coastal Communities",
      description: "Blue carbon credits through mangrove plantation and coastal ecosystem restoration",
      category: "forestry",
      duration: "23:45",
      views: "15K",
      difficulty: "Advanced",
      thumbnail: "🌊",
      topics: ["Mangrove species", "Coastal zones", "Blue carbon", "Community benefits"]
    },
    {
      id: 11,
      title: "Biomass Energy from Agricultural Residue",
      description: "Converting crop residues into energy instead of burning, generating carbon credits",
      category: "renewable",
      duration: "18:50",
      views: "21K",
      difficulty: "Intermediate",
      thumbnail: "🔥",
      topics: ["Residue collection", "Biomass plants", "Emission reduction", "Policy support"]
    },
    {
      id: 12,
      title: "Rainwater Harvesting Systems for Credit Generation",
      description: "How rainwater harvesting reduces energy use and qualifies for carbon offset programs",
      category: "water",
      duration: "15:35",
      views: "29K",
      difficulty: "Beginner",
      thumbnail: "☔",
      topics: ["Harvesting methods", "Storage systems", "Energy savings", "Credit quantification"]
    }
  ];

  const filteredVideos = videoTutorials.filter(video => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyBadge = (difficulty: string) => {
    const variants = {
      "Beginner": "default" as const,
      "Intermediate": "secondary" as const,
      "Advanced": "destructive" as const
    };
    return <Badge variant={variants[difficulty as keyof typeof variants]}>{difficulty}</Badge>;
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
        <Link href="/learn-earn/roadmap">
          <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Roadmap
          </Button>
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Play className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Video Tutorials</h1>
          </div>
          <p className="text-muted-foreground">
            Practical guides on earning carbon credits in India through various sustainable methods
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {videoCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2"
                data-testid={`button-category-${category.id}`}
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </Button>
            );
          })}
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredVideos.length} {filteredVideos.length === 1 ? 'tutorial' : 'tutorials'}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="hover-elevate cursor-pointer" data-testid={`card-video-${video.id}`}>
              <CardHeader className="space-y-0 p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-t-lg flex items-center justify-center text-6xl">
                  {video.thumbnail}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {getDifficultyBadge(video.difficulty)}
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {video.duration}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Users className="h-3 w-3" />
                    {video.views}
                  </Badge>
                </div>
                <CardTitle className="text-lg mb-2 leading-tight line-clamp-2">
                  {video.title}
                </CardTitle>
                <CardDescription className="mb-4 line-clamp-2">
                  {video.description}
                </CardDescription>
                <div className="flex flex-wrap gap-1 mb-4">
                  {video.topics.slice(0, 3).map((topic, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs font-normal">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full gap-2" data-testid={`button-watch-${video.id}`}>
                  <Play className="h-4 w-4" />
                  Watch Tutorial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No tutorials found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
