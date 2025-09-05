import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Upload, 
  Tags, 
  FolderOpen, 
  BarChart3, 
  FileText,
  Settings,
  Plus
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Upload, label: "Bulk Upload", count: 3 },
  { icon: Tags, label: "SKU Mapping", count: 12 },
  { icon: FolderOpen, label: "Collections", count: 8 },
  { icon: BarChart3, label: "Analytics" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn(
      "bg-card border-r flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Plus className="w-4 h-4 mr-2" />
          {!collapsed && "New Upload"}
        </Button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              collapsed && "px-2"
            )}
          >
            <item.icon className="w-4 h-4" />
            {!collapsed && (
              <>
                <span className="ml-3 flex-1 text-left">{item.label}</span>
                {item.count && (
                  <span className="ml-auto bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                    {item.count}
                  </span>
                )}
              </>
            )}
          </Button>
        ))}
      </nav>

      <div className="p-3 border-t">
        <div className={cn(
          "text-xs text-muted-foreground",
          collapsed && "text-center"
        )}>
          {collapsed ? "v2.1" : "ProductManager v2.1"}
        </div>
      </div>
    </aside>
  )
}