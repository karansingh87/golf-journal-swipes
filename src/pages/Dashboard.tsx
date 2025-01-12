import { ThemeToggle } from "@/components/ThemeToggle";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to your dashboard! Start recording your golf sessions.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;