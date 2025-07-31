import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Target
} from "lucide-react";

export default function MarketSentiment() {
  const sentimentData = {
    overall: 52,
    fear_greed: 48,
    social_sentiment: 67,
    technical_sentiment: 45
  };

  const getSentimentColor = (value) => {
    if (value >= 70) return 'text-green-400';
    if (value >= 50) return 'text-amber-400';
    return 'text-red-400';
  };

  const getSentimentLabel = (value) => {
    if (value >= 80) return 'Extremely Greedy';
    if (value >= 60) return 'Greedy';
    if (value >= 40) return 'Neutral';
    if (value >= 20) return 'Fearful';
    return 'Extremely Fearful';
  };

  return (
    <Card className="glass-card border-slate-700/50 bg-slate-900/40">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white">
          <Brain className="w-5 h-5 text-purple-400" />
          Market Sentiment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getSentimentColor(sentimentData.overall)}`}>
            {sentimentData.overall}
          </div>
          <p className="text-slate-400 text-sm">
            {getSentimentLabel(sentimentData.overall)}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">Fear & Greed Index</span>
            <span className={`font-medium ${getSentimentColor(sentimentData.fear_greed)}`}>
              {sentimentData.fear_greed}
            </span>
          </div>
          <Progress 
            value={sentimentData.fear_greed} 
            className="h-2 bg-slate-700"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">Social Sentiment</span>
            <span className={`font-medium ${getSentimentColor(sentimentData.social_sentiment)}`}>
              {sentimentData.social_sentiment}
            </span>
          </div>
          <Progress 
            value={sentimentData.social_sentiment} 
            className="h-2 bg-slate-700"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">Technical Indicators</span>
            <span className={`font-medium ${getSentimentColor(sentimentData.technical_sentiment)}`}>
              {sentimentData.technical_sentiment}
            </span>
          </div>
          <Progress 
            value={sentimentData.technical_sentiment} 
            className="h-2 bg-slate-700"
          />
        </div>

        <div className="pt-4 border-t border-slate-700/50">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span className="text-slate-400">Bullish Signals: 12</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-red-400" />
              <span className="text-slate-400">Bearish Signals: 8</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3 text-blue-400" />
              <span className="text-slate-400">Neutral: 5</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span className="text-slate-400">High Vol: 3</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}