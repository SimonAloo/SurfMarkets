import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function PerformanceChart({ sessions, isLoading }) {
  const chartData = sessions.map((session, index) => ({
    name: `Session ${index + 1}`,
    profit: session.profit_loss || 0,
    balance: session.final_balance || session.initial_balance || 0,
    date: format(new Date(session.created_date), "MMM dd")
  })).reverse();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card border border-slate-700/50 bg-slate-900/90 p-3 rounded-lg shadow-xl">
          <p className="text-slate-300 text-sm mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className={`text-sm font-medium ${
              entry.dataKey === 'profit' 
                ? entry.value >= 0 ? 'text-green-400' : 'text-red-400'
                : 'text-cyan-400'
            }`}>
              {entry.dataKey === 'profit' ? 'P&L: ' : 'Balance: '}
              ${entry.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card border-slate-700/50 bg-slate-900/40">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          Performance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full bg-slate-700" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24 bg-slate-700" />
              <Skeleton className="h-4 w-24 bg-slate-700" />
            </div>
          </div>
        ) : chartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#00D4FF"
                  strokeWidth={2}
                  fill="url(#balanceGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#10B981' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No trading data available</p>
              <p className="text-slate-500 text-sm">Start trading to see performance charts</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}