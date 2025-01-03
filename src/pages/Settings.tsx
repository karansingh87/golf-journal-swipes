import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type HandicapRange = "scratch_or_better" | "1_5" | "6_10" | "11_15" | "16_20" | "21_25" | "26_plus" | "new_to_golf";

const Settings = () => {
  const { toast } = useToast();
  const supabaseClient = useSupabaseClient();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: profile, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const [formData, setFormData] = useState({
    display_name: profile?.display_name || '',
    location: profile?.location || '',
    handicap_range: profile?.handicap_range as HandicapRange || 'new_to_golf',
  });

  const updateProfile = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return;

      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', session.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      refetch();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password updated successfully",
      });
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto pt-20 px-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6 space-y-4">
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
              disabled={loading}
              className="w-full"
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new_password">New Password</Label>
              <Input
                id="new_password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            <Button 
              onClick={updatePassword} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;