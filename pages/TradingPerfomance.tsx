
import React, { useState, useEffect } from "react";
import { TradingSession } from "@/entities/TradingSession";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Target,
  Calendar,
  BarChart3,
  Download
} from "lucide-react";
import { format } from "date-fns";

export default function TradingPerformance() {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setIsLoading(true);
    try {
      const data = await TradingSession.list("-created_date", 50);
      setSessions(data);
    } catch (error) {
      console.error("Error loading sessions:", error);
    }
    setIsLoading(false);
  };

  const calculateStats = () => {
    const totalProfit = sessions.reduce((sum, session) => sum + (session.profit_loss || 0), 0);
    const totalTrades = sessions.reduce((sum, session) => sum + (session.total_trades || 0), 0);
    const winningTrades = sessions.reduce((sum, session) => sum + (session.winning_trades || 0), 0);
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades * 100) : 0;
    
    return { totalProfit, totalTrades, winRate };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Trading Performance
            </h1>
            <p className="text-slate-400">
              Detailed analytics and performance metrics
            </p>
          </div>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-900 font-semibold">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card border-slate-700/50 bg-slate-900/40">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total P&L</p>
                  <p className={`text-2xl font-bold ${stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${stats.totalProfit.toFixed(2)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-slate-700/50 bg-slate-900/40">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Win Rate</p>
                  <p className="text-2xl font-bold text-cyan-400">
                    {stats.winRate.toFixed(1)}%
                  </p>
                </div>
                <Target className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-slate-700/50 bg-slate-900/40">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Trades</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalTrades}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions List */}
        <Card className="glass-card border-slate-700/50 bg-slate-900/40">
          <CardHeader>
            <CardTitle className="text-white">Trading Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div>
                    <h3 className="font-semibold text-white">{session.session_name}</h3>
                    <p className="text-slate-400 text-sm">
                      {format(new Date(session.start_time), "MMM d, yyyy HH:mm")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${session.profit_loss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {session.profit_loss >= 0 ? '+' : ''}${session.profit_loss?.toFixed(2)}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {session.win_rate}% WR
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
