
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Youtube, 
  Play, 
  ExternalLink,
  ArrowRight,
  Video
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import TiktokIcon from "../icons/TiktokIcon"; // Added TiktokIcon import

export default function RecentVideos({ videos, isLoading }) {
  const getVideoTypeColor = (type) => {
    switch (type) {
      case 'market_analysis':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'trade_review':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'strategy_explanation':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'live_commentary':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };
  
  // New component for platform icon
  const PlatformIcon = ({ platform, className }) => {
    if (platform === 'youtube') return <Youtube className={className} />;
    if (platform === 'tiktok') return <TiktokIcon className={className} />;
    return <Video className={className} />; // Default to a generic video icon
  };

  return (
    <Card className="glass-card border-slate-700/50 bg-slate-900/40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <Video className="w-5 h-5 text-cyan-400" /> {/* Changed icon to Video and color to cyan-400 */}
            Recent Content {/* Changed title text */}
          </CardTitle>
          <Link to={createPageUrl("ContentStudio")}> {/* Changed link destination */}
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cyan-400"> {/* Changed hover color to cyan-400 */}
              Manage
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-16 h-12 rounded bg-slate-700" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full mb-2 bg-slate-700" />
                  <Skeleton className="h-3 w-24 bg-slate-700" />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="space-y-3">
            {videos.slice(0, 4).map((video) => (
              <div 
                key={video.id} 
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:bg-slate-700/30 transition-colors group"
              >
                <div className="relative">
                  {/* Updated thumbnail logic and size */}
                  <img 
                    src={video.thumbnail_url || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963e?w=400'} 
                    alt={video.title}
                    className="w-24 h-16 object-cover rounded bg-slate-700" // Increased size
                  />
                  <div className="absolute inset-0 bg-black/40 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-6 h-6 text-white" /> {/* Increased play icon size */}
                  </div>
                  {/* Added platform icon overlay */}
                  <div className="absolute top-1 right-1 p-1 bg-black/50 rounded-full">
                    <PlatformIcon platform={video.platform} className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white text-sm line-clamp-2 mb-2"> {/* Changed mb-1 to mb-2 */}
                    {video.title}
                  </h4>
                  {/* Simplified content details: removed view/like counts, performance highlight */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Badge className={getVideoTypeColor(video.video_type)} size="sm">
                      {video.video_type?.replace('_', ' ')}
                    </Badge>
                    <span>•</span> {/* Added separator */}
                    <span>{format(new Date(video.created_date), "MMM d")}</span>
                  </div>
                </div>
                
                {/* Changed video.youtube_url to video.url and hover color */}
                {video.url && ( 
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-cyan-400"
                    onClick={() => window.open(video.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Video className="w-12 h-12 text-slate-600 mx-auto mb-4" /> {/* Changed icon to Video */}
            <p className="text-slate-400">No videos linked yet</p> {/* Changed text */}
            <p className="text-slate-500 text-sm">Add your first video link</p> {/* Changed text */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
