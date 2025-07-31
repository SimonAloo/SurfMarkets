import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  User as UserIcon, 
  AlertTriangle,
  Mail,
  Calendar,
  MoreVertical
} from "lucide-react";
import { format } from "date-fns";

export default function AdminPanel() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await User.me();
        setCurrentUser(user);
        if (user.role === 'admin') {
          const allUsers = await User.list();
          setUsers(allUsers);
        }
      } catch (error) {
        console.error("Error fetching user or users list:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <Card className="glass-card border-red-500/50 bg-red-900/20 max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">
              You do not have the required permissions to view this page.
              Please contact an administrator if you believe this is an error.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Admin Panel
          </h1>
          <p className="text-slate-400">
            Manage users and application settings.
          </p>
        </div>

        <Card className="glass-card border-slate-700/50 bg-slate-900/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <UserIcon className="w-5 h-5 text-cyan-400" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-800/50">
                  <TableHead className="text-slate-300">User</TableHead>
                  <TableHead className="text-slate-300">Email</TableHead>
                  <TableHead className="text-slate-300">Role</TableHead>
                  <TableHead className="text-slate-300">Joined</TableHead>
                  <TableHead className="text-right text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell className="font-medium text-white">{user.full_name}</TableCell>
                    <TableCell className="text-slate-400">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={user.role === 'admin' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-slate-500/20 text-slate-400 border-slate-500/30'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400">
                      {format(new Date(user.created_date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="icon">
                         <MoreVertical className="w-4 h-4 text-slate-400"/>
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}