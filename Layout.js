
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import {
  TrendingUp,
  BarChart3,
  Settings,
  Activity,
  Bot,
  Zap,
  Bell,
  ShieldCheck, // New import
  Film // New import
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Activity,
    description: "Overview & Performance"
  },
  {
    title: "Trading Performance",
    url: createPageUrl("TradingPerformance"),
    icon: TrendingUp,
    description: "Analytics & P&L"
  },
  {
    title: "Market Analysis",
    url: createPageUrl("MarketAnalysis"),
    icon: BarChart3,
    description: "Signals & Charts"
  },
  {
    title: "Content Studio", // Updated from YouTube Studio
    url: createPageUrl("ContentStudio"), // Updated from YouTubeStudio
    icon: Film, // Updated from Youtube
    description: "Video Management" // Updated from Content Management
  },
  {
    title: "Bot Settings",
    url: createPageUrl("BotSettings"),
    icon: Settings,
    description: "Configuration"
  }
];

const adminNavigationItem = { // New navigation item for Admin Panel
  title: "Admin Panel",
  url: createPageUrl("AdminPanel"),
  icon: ShieldCheck,
  description: "User Management"
};

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null); // State to store user information

  useEffect(() => {
    // Function to fetch current user data
    const fetchUser = async () => {
      try {
        const currentUser = await User.me(); // Assume User.me() fetches the logged-in user
        setUser(currentUser);
      } catch (error) {
        // If user is not logged in or an error occurs, set user to null
        setUser(null);
      }
    };
    fetchUser();
  }, [location.pathname]); // Re-fetch user data if the route changes

  // Dynamically create navigation items based on user role
  const navItems = user?.role === 'admin'
    ? [...navigationItems, adminNavigationItem] // Add admin panel if user is admin
    : navigationItems; // Otherwise, show standard navigation items

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <style>
          {`
            :root {
              --primary: #00D4FF;
              --primary-foreground: #0B1426;
              --secondary: #1E293B;
              --secondary-foreground: #F1F5F9;
              --accent: #10B981;
              --destructive: #EF4444;
              --warning: #F59E0B;
              --background: #0B1426;
              --foreground: #F8FAFC;
              --card: rgba(30, 41, 59, 0.4);
              --card-foreground: #F8FAFC;
              --border: rgba(148, 163, 184, 0.2);
              --muted: #334155;
              --muted-foreground: #94A3B8;
            }

            .glass-card {
              background: rgba(30, 41, 59, 0.3);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(148, 163, 184, 0.1);
            }

            .neon-glow {
              box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
            }

            .trading-gradient {
              background: linear-gradient(135deg, #00D4FF 0%, #10B981 100%);
            }
          `}
        </style>

        <Sidebar className="border-r border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
          <SidebarHeader className="border-b border-slate-800/50 p-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 trading-gradient rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-slate-900" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <Zap className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-lg text-white">TradingBot Pro</h2>
                <p className="text-xs text-slate-400">AI-Powered Trading</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => ( // Use navItems for conditional rendering
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-slate-800/50 hover:text-cyan-400 transition-all duration-300 rounded-xl mb-1 group ${
                          location.pathname === item.url
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 shadow-lg'
                            : 'text-slate-300'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className={`w-5 h-5 transition-colors ${
                            location.pathname === item.url ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'
                          }`} />
                          <div className="flex-1">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-slate-500 group-hover:text-slate-400">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 space-y-3">
                  <div className="glass-card rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Bot Status</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                  <div className="glass-card rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Today's P&L</span>
                      <span className="text-green-400 font-bold">+$1,247</span>
                    </div>
                  </div>
                  <div className="glass-card rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Win Rate</span>
                      <span className="text-cyan-400 font-bold">73.5%</span>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-800/50 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">T</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">Trader</p>
                <p className="text-xs text-slate-400">Professional Account</p>
              </div>
              <Bell className="w-4 h-4 text-slate-400 hover:text-cyan-400 cursor-pointer transition-colors" />
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-slate-950/60 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-800/50 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-white">TradingBot Pro</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
