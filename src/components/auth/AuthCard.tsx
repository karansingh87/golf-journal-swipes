import { Card } from "@/components/ui/card";

interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <Card className="w-full max-w-md p-8 rounded-xl border border-gray-200 shadow-sm bg-white">
      {children}
    </Card>
  );
};

export default AuthCard;