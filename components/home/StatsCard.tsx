import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subValue?: string | number;
  icon: ReactNode;
  iconBgColor?: string;
}

const StatsCard = ({
  title,
  value,
  subValue,
  icon,
  iconBgColor = "bg-gray-100",
}: StatsCardProps) => {
  return (
    <Card className="rounded-xl border border-border h-40">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subValue && (
            <p className="text-sm text-muted-foreground">{subValue}</p>
          )}
        </div>
        <div
          className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
