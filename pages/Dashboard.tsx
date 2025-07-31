import React, { useEffect, useState } from "react";
import tradingSessions from "../Entities/TradingSession.json";
import linkedVideos from "../Entities/LinkedVideo.json";
import marketSignals from "../Entities/MarketSignal.json";

//import PerformanceChart from "../Components/dashboard/PerfomanceChart";
//import TopSignals from "../Components/dashboard/TopSignals";
//import RecentVideos from "../Components/dashboard/RecentVideos";
//import TradingMetrics from "../Components/dashboard/TradingMetrics";
//import LoggedOutView from "../Components/dashboard/LoggedOutView";

// TEMPORARY UI replacements
const Button = (props: any) => <button {...props} className="px-4 py-2 bg-blue-500 text-white rounded" />;
const Badge = (props: any) => <span {...props} className="px-2 py-1 text-sm bg-green-600 text-white rounded" />;
const Card = (props: any) => <div {...props} className="p-4 bg-slate-800 rounded shadow">{props.children}</div>;
const CardHeader = (props: any) => <div className="mb-2">{props.children}</div>;
const CardContent = (props: any) => <div>{props.children}</div>;
const CardTitle = (props: any) => <h3 className="text-lg font-semibold">{props.children}</h3>;

// Icons replaced with text placeholders temporarily
const Zap = () => <span>⚡</span>;
const Clock = () => <span>⏱</span>;
const CheckCircle = () => <span>✅</span>;
const Play = () => <span>▶️</span>;
const AlertTriangle = () => <span>⚠️</span>;

type TradingSession = {
  profit_loss?: number;
  total_trades?: number;
  winning_trades?: number;
};

type MarketSignal = {
  is_active: boolean;
};

type LinkedVideo = {
  title: string;
  url: string;
};

type User = {
  name: string;
};

export default function Dashboard() {
  const [sessions, setSessions] = useState<TradingSession[]>([]);
  const [videos, setVideos] = useState<LinkedVideo[]>([]);
  const [signals, setSignals] = useState<MarketSignal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadMockData = async () => {
      setIsLoading(true);
      try {
        setUser({ name: "mockUser" });
       // setSessions(tradingSessions.slice(0, 10));
       // setVideos(linkedVideos.slice(0, 6));
       // setSignals(marketSignals.filter(s => s.is_active).slice(0, 8));
      } catch (err) {
        setUser(null);
        console.error("Failed to load data", err);
      }
      setIsLoading(false);
    };

    loadMockData();
  }, []);

  const handleLogin = async () => {
    setUser({ name: "mockUser" });
  };

  const handleLogout = async () => {
    setUser(null);
  };

  const calculateStats = () => {
    if (!user) return { totalProfit: 0, totalTrades: 0, winRate: 0, activeSignals: 0, totalVideos: 0 };

    const totalProfit = sessions.reduce((sum, s) => sum + (s.profit_loss || 0), 0);
    const totalTrades = sessions.reduce((sum, s) => sum + (s.total_trades || 0), 0);
    const winningTrades = sessions.reduce((sum, s) => sum + (s.winning_trades || 0), 0);
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

    return {
      totalProfit,
      totalTrades,
      winRate,
      activeSignals: signals.filter(s => s.is_active).length,
      totalVideos: videos.length,
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen p-6 text-white bg-black">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Trading Dashboard</h1>
          {user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
        </header>

        {user ? (
          <>
         //   <TradingMetrics stats={stats} isLoading={isLoading} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
             //   <PerformanceChart sessions={sessions} isLoading={isLoading} />
             //   <TopSignals signals={signals} isLoading={isLoading} />
              </div>
              <div className="space-y-6">
            //    <RecentVideos videos={videos} isLoading={isLoading} />

                <Card>
                  <CardHeader>
                    <CardTitle>Bot Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <span>Status</span>
                      <Badge><Zap /> Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime</span>
                      <span>24h 15m</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Signal</span>
                      <span>2 mins ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Analysis</span>
                      <span><Clock /> 5 mins</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>✅ Trade Executed – BTC/USD +$247.50</div>
                    <div>▶️ Video Published – Market Analysis #47</div>
                    <div>⚠️ Signal Generated – ETH/USD Strong Buy</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <LoggedOutView onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}
