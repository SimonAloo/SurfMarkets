
import React, { useState, useEffect } from "react";
import { MarketSignal } from "@/entities/MarketSignal";
import { TradingSession } from "@/entities/TradingSession";
import { InvokeLLM } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Search,
  RefreshCw,
  Target,
  AlertTriangle,
  Brain,
  Activity
} from "lucide-react";

import SignalGenerator from "../components/market/SignalGenerator";
import ActiveSignals from "../components/market/ActiveSignals";
import MarketSentiment from "../components/market/MarketSentiment";
import TechnicalAnalysis from "../components/market/TechnicalAnalysis";

export default function MarketAnalysis() {
  const [signals, setSignals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadSignals();
  }, []);

  const loadSignals = async () => {
    setIsLoading(true);
    try {
      const data = await MarketSignal.list("-created_date", 20);
      setSignals(data);
    } catch (error) {
      console.error("Error loading signals:", error);
    }
    setIsLoading(false);
  };

  const generateAISignal = async (symbol) => {
    setIsGenerating(true);
    try {
      const analysis = await InvokeLLM({
        prompt: `Analyze ${symbol} and provide a comprehensive trading signal with the following details:
        - Signal type (buy, sell, strong_buy, strong_sell, hold)
        - Confidence level (0-100)
        - Entry price estimate
        - Target price
        - Stop loss price
        - Risk/reward ratio
        - Timeframe recommendation
        - Technical indicators analysis
        - Market sentiment
        - Signal strength (1-10)
        - Detailed reasoning for the signal
        
        Consider current market conditions, technical indicators, and recent price action.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            signal_type: { type: "string", enum: ["buy", "sell", "strong_buy", "strong_sell", "hold"] },
            confidence_level: { type: "number", minimum: 0, maximum: 100 },
            entry_price: { type: "number" },
            target_price: { type: "number" },
            stop_loss: { type: "number" },
            risk_reward_ratio: { type: "number" },
            timeframe: { type: "string", enum: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"] },
            indicators_used: { type: "array", items: { type: "string" } },
            market_sentiment: { type: "string", enum: ["extremely_fearful", "fearful", "neutral", "greedy", "extremely_greedy"] },
            signal_strength: { type: "number", minimum: 1, maximum: 10 },
            reasoning: { type: "string" }
          }
        }
      });

      const newSignal = {
        symbol: symbol.toUpperCase(),
        ...analysis,
        is_active: true,
        execution_status: "pending",
        notes: analysis.reasoning
      };

      await MarketSignal.create(newSignal);
      loadSignals();
    } catch (error) {
      console.error("Error generating signal:", error);
    }
    setIsGenerating(false);
  };

  const filteredSignals = signals.filter(signal => 
    signal.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Market Analysis
            </h1>
            <p className="text-slate-400">
              AI-powered trading signals and market insights
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={loadSignals}
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Search and Quick Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search trading pairs (e.g., BTC/USD, ETH/USD)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SignalGenerator 
              onGenerateSignal={generateAISignal}
              isGenerating={isGenerating}
            />
            <ActiveSignals 
              signals={filteredSignals}
              isLoading={isLoading}
              onRefresh={loadSignals}
            />
          </div>
          
          <div className="space-y-6">
            <MarketSentiment />
            <TechnicalAnalysis />
            
            {/* Market Overview */}
            <Card className="glass-card border-slate-700/50 bg-slate-900/40">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Fear & Greed Index</span>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Neutral (52)
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Market Cap</span>
                  <span className="text-white font-medium">$2.1T</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">24h Volume</span>
                  <span className="text-white font-medium">$85.4B</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">BTC Dominance</span>
                  <span className="text-white font-medium">56.2%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
