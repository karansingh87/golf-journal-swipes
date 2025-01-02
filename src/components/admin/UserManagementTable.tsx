import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import DeleteUserButton from "./DeleteUserButton";
import { User } from "@supabase/supabase-js";

interface ExtendedUser {
  id: string;
  email: string | undefined;
  created_at: string;
  last_sign_in_at: string | null;
}

const UserManagementTable = () => {
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data: { users: supabaseUsers }, error } = await supabase.auth.admin.listUsers();
      
      if (error) throw error;
      
      // Transform Supabase users to our ExtendedUser type
      const transformedUsers: ExtendedUser[] = (supabaseUsers || []).map((user: User) => ({
        id: user.id,
        email: user.email || 'No email',
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
      }));
      
      setUsers(transformedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Last Sign In</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {format(new Date(user.created_at), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                {user.last_sign_in_at
                  ? format(new Date(user.last_sign_in_at), "MMM d, yyyy")
                  : "Never"}
              </TableCell>
              <TableCell>
                <DeleteUserButton
                  userId={user.id}
                  userEmail={user.email}
                  onDeleteSuccess={fetchUsers}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagementTable;