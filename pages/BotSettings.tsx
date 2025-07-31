import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Bot,
  Zap,
  Shield,
  DollarSign,
  Clock,
  Target,
  AlertTriangle
} from "lucide-react";

export default function BotSettings() {
  const [settings, setSettings] = useState({
    isActive: true,
    maxDailyLoss: 500,
    maxPositionSize: 1000,
    riskPerTrade: 2,
    autoTrading: true,
    signalGeneration: true,
    stopLoss: true,
    takeProfit: true,
    trailingStop: false,
    maxOpenPositions: 5,
    tradingHours: {
      start: "09:00",
      end: "17:00"
    }
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving settings:", settings);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Bot Settings
            </h1>
            <p className="text-slate-400">
              Configure your trading bot parameters
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${settings.isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
              <Zap className="w-3 h-3 mr-1" />
              {settings.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bot Control */}
          <Card className="glass-card border-slate-700/50 bg-slate-900/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Bot className="w-5 h-5 text-cyan-400" />
                Bot Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Auto Trading</Label>
                <Switch
                  checked={settings.autoTrading}
                  onCheckedChange={(checked) => setSettings({...settings, autoTrading: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Signal Generation</Label>
                <Switch
                  checked={settings.signalGeneration}
                  onCheckedChange={(checked) => setSettings({...settings, signalGeneration: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Bot Active</Label>
                <Switch
                  checked={settings.isActive}
                  onCheckedChange={(checked) => setSettings({...settings, isActive: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Risk Management */}
          <Card className="glass-card border-slate-700/50 bg-slate-900/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5 text-red-400" />
                Risk Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300">Max Daily Loss ($)</Label>
                <Input
                  type="number"
                  value={settings.maxDailyLoss}
                  onChange={(e) => setSettings({...settings, maxDailyLoss: Number(e.target.value)})}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-300">Max Position Size ($)</Label>
                <Input
                  type="number"
                  value={settings.maxPositionSize}
                  onChange={(e) => setSettings({...settings, maxPositionSize: Number(e.target.value)})}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-300">Risk Per Trade (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={settings.riskPerTrade}
                  onChange={(e) => setSettings({...settings, riskPerTrade: Number(e.target.value)})}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Trading Parameters */}
          <Card className="glass-card border-slate-700/50 bg-slate-900/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="w-5 h-5 text-green-400" />
                Trading Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Stop Loss</Label>
                <Switch
                  checked={settings.stopLoss}
                  onCheckedChange={(checked) => setSettings({...settings, stopLoss: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Take Profit</Label>
                <Switch
                  checked={settings.takeProfit}
                  onCheckedChange={(checked) => setSettings({...settings, takeProfit: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Trailing Stop</Label>
                <Switch
                  checked={settings.trailingStop}
                  onCheckedChange={(checked) => setSettings({...settings, trailingStop: checked})}
                />
              </div>
              <div>
                <Label className="text-slate-300">Max Open Positions</Label>
                <Input
                  type="number"
                  value={settings.maxOpenPositions}
                  onChange={(e) => setSettings({...settings, maxOpenPositions: Number(e.target.value)})}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Trading Hours */}
          <Card className="glass-card border-slate-700/50 bg-slate-900/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-amber-400" />
                Trading Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300">Start Time</Label>
                <Input
                  type="time"
                  value={settings.tradingHours.start}
                  onChange={(e) => setSettings({
                    ...settings, 
                    tradingHours: {...settings.tradingHours, start: e.target.value}
                  })}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-300">End Time</Label>
                <Input
                  type="time"
                  value={settings.tradingHours.end}
                  onChange={(e) => setSettings({
                    ...settings, 
                    tradingHours: {...settings.tradingHours, end: e.target.value}
                  })}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                />
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-sm">
                  Bot will only trade during specified hours
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-900 font-semibold"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}