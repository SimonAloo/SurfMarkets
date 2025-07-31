import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Activity,
  Youtube,
  Zap
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TradingMetrics({ stats, isLoading }) {
  const metrics = [
    {
      title: "Total P&L",
      value: `$${stats.totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      trend: stats.totalProfit >= 0 ? "positive" : "negative"
    },
    {
      title: "Win Rate",
      value: `${stats.winRate.toFixed(1)}%`,
      icon: Target,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      borderColor: "border-cyan-500/30"
    },
    {
      title: "Total Trades",
      value: stats.totalTrades.toString(),
      icon: Activity,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Active Signals",
      value: stats.activeSignals.toString(),
      icon: Zap,
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/30"
    },
    {
      title: "YouTube Videos",
      value: stats.totalVideos.toString(),
      icon: Youtube,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className={`glass-card border-slate-700/50 bg-slate-900/40 hover:bg-slate-800/50 transition-all duration-300 group`}>
          <CardContent className="p-4">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 bg-slate-700" />
                <Skeleton className="h-8 w-20 bg-slate-700" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {metric.title}
                  </p>
                  <div className={`p-1.5 rounded-lg ${metric.bgColor} border ${metric.borderColor}`}>
                    <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className={`text-2xl font-bold text-white group-hover:${metric.color} transition-colors`}>
                    {metric.value}
                  </p>
                  {metric.trend && (
                    <TrendingUp className={`w-4 h-4 ${
                      metric.trend === 'positive' ? 'text-green-400' : 'text-red-400 rotate-180'
                    }`} />
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}