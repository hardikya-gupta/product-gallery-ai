import { Header } from "@/components/layout/Header"
import { Sidebar } from "@/components/layout/Sidebar"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { UploadZone } from "@/components/upload/UploadZone"
import { ProgressIndicator } from "@/components/upload/ProgressIndicator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FileImage, 
  Tag, 
  FolderOpen, 
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle2,
  MoreHorizontal,
  Filter,
  Download
} from "lucide-react"
import { useState } from "react"

const Index = () => {
  const [uploadProgress] = useState([
    {
      id: "1",
      title: "Uploading Images",
      status: "completed" as const,
      progress: 100,
      details: "2,847 images uploaded successfully"
    },
    {
      id: "2", 
      title: "AI SKU Detection",
      status: "processing" as const,
      progress: 73,
      details: "Processing image metadata and filenames..."
    },
    {
      id: "3",
      title: "Smart Grouping",
      status: "pending" as const,
      details: "Analyzing product categories and variants"
    },
    {
      id: "4",
      title: "Quality Check",
      status: "pending" as const,
      details: "Validating image quality and metadata"
    }
  ])

  const recentUploads = [
    { name: "Spring Collection 2024", images: 342, status: "completed", date: "2 hours ago" },
    { name: "Summer Footwear", images: 186, status: "processing", date: "4 hours ago" },
    { name: "Electronics Q1", images: 1205, status: "review", date: "1 day ago" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Images"
              value="24,582"
              change="+12% from last month"
              changeType="positive"
              icon={FileImage}
            />
            <StatsCard
              title="Mapped SKUs"
              value="18,391"
              change="74.8% mapping accuracy"
              changeType="positive"
              icon={Tag}
            />
            <StatsCard
              title="Collections"
              value="127"
              change="+8 this week"
              changeType="positive"
              icon={FolderOpen}
            />
            <StatsCard
              title="Pending Review"
              value="1,847"
              change="Needs attention"
              changeType="warning"
              icon={AlertCircle}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Upload */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Quick Upload</h2>
                <UploadZone />
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Recent Uploads</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUploads.map((upload, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <FolderOpen className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{upload.name}</p>
                            <p className="text-sm text-muted-foreground">{upload.images} images • {upload.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {upload.status === "completed" && (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          )}
                          {upload.status === "processing" && (
                            <Clock className="w-5 h-5 text-warning" />
                          )}
                          {upload.status === "review" && (
                            <AlertCircle className="w-5 h-5 text-destructive" />
                          )}
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upload Progress Sidebar */}
            <div className="space-y-6">
              <ProgressIndicator 
                steps={uploadProgress}
                currentStep={1}
              />

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Manage Collections
                  </Button>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium mb-1">Naming Pattern Detected</p>
                    <p className="text-xs text-muted-foreground">
                      87% of your images follow SKU-color-size format. Apply this pattern to unmatched items?
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium mb-1">Quality Alert</p>
                    <p className="text-xs text-muted-foreground">
                      23 images below 1200px resolution. Consider re-uploading for better quality.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
