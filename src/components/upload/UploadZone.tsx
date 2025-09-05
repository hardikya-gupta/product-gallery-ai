import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileImage, Folder } from "lucide-react"
import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface UploadZoneProps {
  onFilesDrop?: (files: File[]) => void
  className?: string
}

export function UploadZone({ onFilesDrop, className }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    onFilesDrop?.(files)
  }, [onFilesDrop])

  return (
    <Card className={cn(
      "border-2 border-dashed transition-all duration-200 hover:border-primary/50",
      isDragOver && "border-primary bg-primary/5",
      className
    )}>
      <div 
        className="p-12 text-center space-y-6"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-primary-foreground" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Drop images here to upload</h3>
          <p className="text-muted-foreground">
            Or click to browse and select files from your computer
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" className="space-x-2">
            <FileImage className="w-4 h-4" />
            <span>Select Images</span>
          </Button>
          <Button variant="outline" className="space-x-2">
            <Folder className="w-4 h-4" />
            <span>Select Folder</span>
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>Supports: JPG, PNG, WebP, HEIC</p>
          <p>Max file size: 50MB per image</p>
          <p>Bulk upload up to 10,000 images at once</p>
        </div>
      </div>
    </Card>
  )
}