import { useState } from "react";
import { useRoute, Link } from "wouter";
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
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  BookOpen,
  ChevronRight,
  Award
} from "lucide-react";

export function LevelQuiz() {
  const [, params] = useRoute("/learn-earn/level/:id");
  const levelId = params?.id ? parseInt(params.id) : 1;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  // todo: remove mock functionality - load questions from database based on level
  const quizData = {
    1: {
      title: "What are Carbon Credits?",
      description: "Test your understanding of carbon credit fundamentals",
      questions: [
        {
          question: "What is a carbon credit?",
          options: [
            "A financial loan for green projects",
            "A permit representing the right to emit one ton of CO₂",
            "A government subsidy for farmers",
            "A type of renewable energy certificate"
          ],
          correctAnswer: 1
        },
        {
          question: "Which gas is the primary focus of carbon credits?",
          options: [
            "Oxygen",
            "Nitrogen",
            "Carbon Dioxide (CO₂)",
            "Hydrogen"
          ],
          correctAnswer: 2
        },
        {
          question: "What is the main purpose of carbon credits?",
          options: [
            "To increase industrial emissions",
            "To incentivize emission reduction and offset activities",
            "To replace renewable energy",
            "To eliminate all carbon from the atmosphere"
          ],
          correctAnswer: 1
        },
        {
          question: "Who can earn carbon credits?",
          options: [
            "Only large corporations",
            "Only government agencies",
            "Individuals, organizations, and projects that reduce or remove CO₂",
            "Only farmers"
          ],
          correctAnswer: 2
        },
        {
          question: "What does 'offsetting emissions' mean?",
          options: [
            "Ignoring emissions completely",
            "Compensating for emissions by funding projects that reduce CO₂ elsewhere",
            "Increasing emissions to balance the market",
            "Moving emissions to another country"
          ],
          correctAnswer: 1
        }
      ]
    },
    2: {
      title: "The Carbon Credit System",
      description: "Understand how carbon credit systems function",
      questions: [
        {
          question: "What are the two main carbon credit markets?",
          options: [
            "Digital and Physical",
            "Voluntary and Compliance",
            "National and International",
            "Public and Private"
          ],
          correctAnswer: 1
        },
        {
          question: "In a compliance market, who must buy carbon credits?",
          options: [
            "Anyone who wants to help the environment",
            "Companies regulated by emission caps",
            "Only technology companies",
            "Individual consumers"
          ],
          correctAnswer: 1
        },
        {
          question: "What is the verification process for carbon credits?",
          options: [
            "Projects self-certify their emissions reductions",
            "Independent third parties audit and verify emission reductions",
            "Government automatically approves all projects",
            "No verification is required"
          ],
          correctAnswer: 1
        },
        {
          question: "What does MRV stand for in carbon credit systems?",
          options: [
            "Maximum Revenue Value",
            "Monitoring, Reporting, and Verification",
            "Mandatory Reduction Volume",
            "Market Rate Valuation"
          ],
          correctAnswer: 1
        },
        {
          question: "How are carbon credits typically traded?",
          options: [
            "Only through government auctions",
            "Through exchanges, brokers, and direct transactions",
            "Only by physical delivery of certificates",
            "They cannot be traded"
          ],
          correctAnswer: 1
        }
      ]
    },
    3: {
      title: "Types of Carbon Credits",
      description: "Learn about different carbon credit standards and categories",
      questions: [
        {
          question: "What does VCS stand for?",
          options: [
            "Very Clean Standard",
            "Verified Carbon Standard",
            "Voluntary Climate Service",
            "Value Creation System"
          ],
          correctAnswer: 1
        },
        {
          question: "What is the Gold Standard known for?",
          options: [
            "The highest price credits",
            "Credits from gold mining",
            "High-quality credits with sustainable development benefits",
            "Government-issued credits only"
          ],
          correctAnswer: 2
        },
        {
          question: "What is the difference between removal and avoidance credits?",
          options: [
            "There is no difference",
            "Removal captures CO₂ from atmosphere; avoidance prevents emissions",
            "Avoidance is more expensive",
            "Removal credits are illegal"
          ],
          correctAnswer: 1
        },
        {
          question: "Which sector can generate carbon removal credits?",
          options: [
            "Oil refineries",
            "Reforestation and afforestation projects",
            "Coal power plants",
            "Automobile manufacturing"
          ],
          correctAnswer: 1
        },
        {
          question: "What makes a carbon credit 'high quality'?",
          options: [
            "High price only",
            "Additionality, permanence, and co-benefits",
            "Government certification alone",
            "Large project size"
          ],
          correctAnswer: 1
        }
      ]
    }
    // Additional levels would have their own question sets
  };

  const currentLevelData = quizData[levelId as keyof typeof quizData] || quizData[1];
  const totalQuestions = currentLevelData.questions.length;
  const currentQuestionData = currentLevelData.questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (currentQuestion + 1 < totalQuestions) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
      const newAnswers = [...answers];
      newAnswers.pop();
      setAnswers(newAnswers);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === currentLevelData.questions[index].correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100)
    };
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score.percentage >= 70;

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
              <ThemeToggle />
              <Avatar data-testid="avatar-user">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="text-center" data-testid="card-quiz-results">
            <CardHeader className="space-y-6">
              <div className={`h-20 w-20 rounded-full mx-auto flex items-center justify-center ${
                passed ? 'bg-chart-1/10' : 'bg-destructive/10'
              }`}>
                {passed ? (
                  <Trophy className="h-10 w-10 text-chart-1" />
                ) : (
                  <XCircle className="h-10 w-10 text-destructive" />
                )}
              </div>
              <div>
                <CardTitle className="text-3xl mb-2">
                  {passed ? 'Congratulations!' : 'Keep Learning!'}
                </CardTitle>
                <CardDescription className="text-base">
                  {passed 
                    ? 'You\'ve successfully completed this level!' 
                    : 'You need 70% to pass. Review the material and try again.'}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-chart-1">{score.correct}</div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-primary">{score.percentage}%</div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold">{score.total}</div>
                  <div className="text-sm text-muted-foreground">Total Questions</div>
                </div>
              </div>

              {passed && (
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Level Completed!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You've earned 50 knowledge points and unlocked the next level
                  </p>
                </div>
              )}

              <div className="flex gap-3 justify-center flex-wrap">
                {!passed && (
                  <Button 
                    onClick={() => {
                      setCurrentQuestion(0);
                      setSelectedAnswer(null);
                      setAnswers([]);
                      setShowResults(false);
                    }}
                    data-testid="button-retry"
                  >
                    Try Again
                  </Button>
                )}
                <Link href="/learn-earn/roadmap">
                  <Button variant={passed ? "default" : "outline"} className="gap-2" data-testid="button-roadmap">
                    {passed ? 'Continue Learning' : 'Back to Roadmap'}
                    {passed && <ChevronRight className="h-4 w-4" />}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <ThemeToggle />
            <Avatar data-testid="avatar-user">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/learn-earn/roadmap">
          <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Roadmap
          </Button>
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline">Level {levelId}</Badge>
            <h1 className="text-3xl font-bold">{currentLevelData.title}</h1>
          </div>
          <p className="text-muted-foreground">{currentLevelData.description}</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span>{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}% Complete</span>
          </div>
          <Progress value={((currentQuestion + 1) / totalQuestions) * 100} className="h-2" />
        </div>

        <Card data-testid="card-question">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestionData.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all hover-elevate ${
                  selectedAnswer === index
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
                data-testid={`option-${index}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedAnswer === index
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {selectedAnswer === index && (
                      <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            data-testid="button-previous"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            data-testid="button-next"
          >
            {currentQuestion + 1 === totalQuestions ? 'Submit' : 'Next'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
