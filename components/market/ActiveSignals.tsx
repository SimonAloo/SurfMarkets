import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function ActiveSignals({ signals, isLoading, onRefresh }) {
  const getSignalIcon = (signalType) => {
    switch (signalType) {
      case 'buy':
      case 'strong_buy':
        return <TrendingUp className="w-4 h-4" />;
      case 'sell':
      case 'strong_sell':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getSignalColor = (signalType) => {
    switch (signalType) {
      case 'strong_buy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'buy':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'strong_sell':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'sell':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getExecutionIcon = (status) => {
    switch (status) {
      case 'executed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'missed':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      default:
        return <Clock className="w-4 h-4 text-blue-400" />;
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <Card className="glass-card border-slate-700/50 bg-slate-900/40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Trading Signals
          </CardTitle>
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
            {signals.filter(s => s.is_active).length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg bg-slate-700" />
                  <div>
                    <Skeleton className="h-4 w-16 mb-2 bg-slate-700" />
                    <Skeleton className="h-3 w-32 bg-slate-700" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16 bg-slate-700" />
              </div>
            ))}
          </div>
        ) : signals.length > 0 ? (
          <div className="space-y-3">
            {signals.map((signal) => (
              <div 
                key={signal.id} 
                className="flex items-start justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:bg-slate-700/30 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getSignalColor(signal.signal_type)}`}>
                    {getSignalIcon(signal.signal_type)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-lg">{signal.symbol}</span>
                      <Badge className={getSignalColor(signal.signal_type)}>
                        {signal.signal_type.replace('_', ' ').toUpperCase()}
                      </Badge>
                      {getExecutionIcon(signal.execution_status)}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Entry:</span>
                        <span className="text-white font-medium ml-1">
                          ${signal.entry_price?.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Target:</span>
                        <span className="text-green-400 font-medium ml-1">
                          ${signal.target_price?.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Stop:</span>
                        <span className="text-red-400 font-medium ml-1">
                          ${signal.stop_loss?.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">R/R:</span>
                        <span className="text-cyan-400 font-medium ml-1">
                          1:{signal.risk_reward_ratio?.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>{signal.timeframe}</span>
                      <span>•</span>
                      <span>Strength: {signal.signal_strength}/10</span>
                      <span>•</span>
                      <span>{format(new Date(signal.created_date), "MMM d, HH:mm")}</span>
                    </div>

                    {signal.indicators_used && signal.indicators_used.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {signal.indicators_used.slice(0, 3).map((indicator, index) => (
                          <Badge key={index} variant="outline" size="sm" className="text-xs border-slate-600 text-slate-400">
                            {indicator}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${getConfidenceColor(signal.confidence_level)}`}>
                    {signal.confidence_level}%
                  </div>
                  <div className="text-xs text-slate-500">
                    Confidence
                  </div>
                  {signal.market_sentiment && (
                    <div className="text-xs text-slate-400 mt-1 capitalize">
                      {signal.market_sentiment.replace('_', ' ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Zap className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No signals generated yet</p>
            <p className="text-slate-500 text-sm">Use the AI Signal Generator to create your first signal</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}