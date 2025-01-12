import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SubscriptionSection } from "@/components/subscription/SubscriptionSection";

type HandicapRange = "scratch_or_better" | "1_5" | "6_10" | "11_15" | "16_20" | "21_25" | "26_plus" | "new_to_golf";

const Settings = () => {
  const { toast } = useToast();
  const session = useSession();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      return data;
    },
    enabled: !!session?.user?.id,
  });

  const [formData, setFormData] = useState({
    display_name: profile?.display_name || '',
    location: profile?.location || '',
    handicap_range: profile?.handicap_range as HandicapRange || 'new_to_golf',
  });

  const updateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', session?.user?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your profile has been updated",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your password has been updated",
      });
      
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        location: profile.location || '',
        handicap_range: profile.handicap_range as HandicapRange || 'new_to_golf',
      });
    }
  }, [profile]);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <Card className="p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  id="display_name"
                  value={formData.display_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                  placeholder="Enter your display name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter your location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="handicap_range">Handicap Range</Label>
                <Select
                  value={formData.handicap_range}
                  onValueChange={(value: HandicapRange) => 
                    setFormData(prev => ({ ...prev, handicap_range: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your handicap range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scratch_or_better">Scratch or better</SelectItem>
                    <SelectItem value="1_5">1-5</SelectItem>
                    <SelectItem value="6_10">6-10</SelectItem>
                    <SelectItem value="11_15">11-15</SelectItem>
                    <SelectItem value="16_20">16-20</SelectItem>
                    <SelectItem value="21_25">21-25</SelectItem>
                    <SelectItem value="26_plus">26+</SelectItem>
                    <SelectItem value="new_to_golf">New to golf</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={updateProfile}
                className="w-full sm:w-auto"
              >
                Save Changes
              </Button>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <Button
                onClick={handlePasswordChange}
                className="w-full sm:w-auto"
                disabled={!currentPassword || !newPassword}
              >
                Update Password
              </Button>
            </TabsContent>

            <TabsContent value="subscription">
              <SubscriptionSection />
            </TabsContent>
          </Tabs>
        </Card>

        {profile?.is_admin && (
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-lg font-semibold mb-4">Admin Settings</h2>
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
              className="w-full sm:w-auto"
            >
              Go to Admin Panel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
