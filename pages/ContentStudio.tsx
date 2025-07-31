import React, { useState, useEffect } from "react";
import { LinkedVideo } from "@/entities/LinkedVideo";
import { InvokeLLM } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Film, 
  Plus, 
  Video,
  ExternalLink,
  Calendar,
  Link as LinkIcon,
  Sparkles,
  Youtube,
  Image
} from "lucide-react";
import { format } from "date-fns";
import TiktokIcon from "../components/icons/TiktokIcon";

export default function ContentStudio() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const videosData = await LinkedVideo.list("-created_date", 50);
      setVideos(videosData);
    } catch (error) {
      console.error("Error loading videos:", error);
    }
    setIsLoading(false);
  };

  const handleAddVideo = async () => {
    if (!videoUrl) return;
    setIsProcessing(true);
    try {
      const platform = videoUrl.includes("tiktok.com") ? "tiktok" : "youtube";
      
      const extractedData = await InvokeLLM({
        prompt: `Extract the title, a short description, and a high-quality thumbnail URL for the following video: ${videoUrl}.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            thumbnail_url: { type: "string", format: "uri" }
          }
        }
      });

      const newVideo = {
        url: videoUrl,
        platform,
        title: extractedData.title || "Untitled Video",
        description: extractedData.description || "",
        thumbnail_url: extractedData.thumbnail_url || "",
        video_type: "entertainment",
        status: "published"
      };

      await LinkedVideo.create(newVideo);
      setVideoUrl("");
      setShowForm(false);
      loadData();
    } catch (error)
    {
      console.error("Failed to add video:", error);
      // Fallback for when AI fails
      const platform = videoUrl.includes("tiktok.com") ? "tiktok" : "youtube";
      await LinkedVideo.create({ url: videoUrl, platform: platform, title: `Video: ${videoUrl}` });
      setVideoUrl("");
      setShowForm(false);
      loadData();
    }
    setIsProcessing(false);
  };

  const PlatformIcon = ({ platform, className }) => {
    if (platform === 'youtube') return <Youtube className={className} />;
    if (platform === 'tiktok') return <TiktokIcon className={className} />;
    return <Video className={className} />;
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Content Studio
            </h1>
            <p className="text-slate-400">
              Link your videos from YouTube and TikTok
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-900 font-semibold shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Link New Video
          </Button>
        </div>

        {showForm && (
          <Card className="glass-card border-slate-700/50 bg-slate-900/40">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-cyan-400" />
                Add Video from URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Paste YouTube or TikTok URL here..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
                <Button onClick={handleAddVideo} disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Add Video'}
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                AI will automatically fetch the title, description, and thumbnail.
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="glass-card border-slate-700/50 bg-slate-900/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Film className="w-5 h-5 text-cyan-400" />
              Your Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="glass-card rounded-xl overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={video.thumbnail_url || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963e?w=400'} 
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 right-2 p-2 bg-black/50 rounded-full">
                      <PlatformIcon platform={video.platform} className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-3 mb-3">{video.description}</p>
                    <div className="flex justify-between items-center">
                       <p className="text-xs text-slate-500">{format(new Date(video.created_date), "MMM d, yyyy")}</p>
                       <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(video.url, '_blank')}
                        className="text-slate-400 hover:text-cyan-400"
                      >
                        Watch
                        <ExternalLink className="w-3 h-3 ml-1.5" />
                      </Button>
                    </div>
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