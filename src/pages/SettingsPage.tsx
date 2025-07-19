import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Settings, User, Calendar, Mail, Clock } from 'lucide-react';
import WithdrawalContainer from '@/components/WithdrawalContainer';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  updated_at?: string;
}

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          setUserProfile({
            id: user.id,
            email: user.email || '',
            created_at: user.created_at || new Date().toISOString(),
            updated_at: profile?.updated_at
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-indigo-900/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-indigo-900/30">
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
              Account Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your account and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Account Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <span>Account Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userProfile ? (
                    <>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</p>
                          <p className="text-sm text-slate-900 dark:text-slate-100">{userProfile.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Account Created</p>
                          <p className="text-sm text-slate-900 dark:text-slate-100">
                            {new Date(userProfile.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Last Updated</p>
                          <p className="text-sm text-slate-900 dark:text-slate-100">
                            {userProfile.updated_at ? new Date(userProfile.updated_at).toLocaleDateString() : 'Never'}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground">No user profile found</p>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/earnings')}
                  >
                    View Earnings
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Withdrawal Container */}
            <div className="lg:col-span-1">
              <WithdrawalContainer className="h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
