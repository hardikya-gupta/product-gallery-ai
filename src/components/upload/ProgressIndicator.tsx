import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, AlertCircle, Upload } from "lucide-react"

interface UploadStep {
  id: string
  title: string
  status: "pending" | "processing" | "completed" | "error"
  progress?: number
  details?: string
}

interface ProgressIndicatorProps {
  steps: UploadStep[]
  currentStep: number
  onCancel?: () => void
}

export function ProgressIndicator({ steps, currentStep, onCancel }: ProgressIndicatorProps) {
  const getStepIcon = (status: UploadStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />
      case "processing":
        return <Upload className="w-4 h-4 text-primary animate-pulse" />
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-muted" />
    }
  }

  const getStatusBadge = (status: UploadStep["status"]) => {
    switch (status) {
      case "completed":
        return <StatusBadge variant="success">Complete</StatusBadge>
      case "error":
        return <StatusBadge variant="destructive">Error</StatusBadge>
      case "processing":
        return <StatusBadge variant="default">Processing</StatusBadge>
      default:
        return <StatusBadge variant="outline">Pending</StatusBadge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Upload Progress</CardTitle>
        {onCancel && (
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStepIcon(step.status)}
                <span className="font-medium">{step.title}</span>
              </div>
              {getStatusBadge(step.status)}
            </div>
            
            {step.progress !== undefined && (
              <Progress value={step.progress} className="h-2" />
            )}
            
            {step.details && (
              <p className="text-sm text-muted-foreground ml-7">{step.details}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}