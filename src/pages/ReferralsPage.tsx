import { useSurveyData } from "@/hooks/useSurveyData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/Sidebar";

const ReferralsPage = () => {
  const { surveyData } = useSurveyData();
  const { toast } = useToast();

  if (!surveyData) return null;

  const referrals = surveyData.userProgress.referrals;

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referrals.referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-6">Referrals</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Code</CardTitle>
            <CardDescription>Share this code to earn rewards</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <code className="bg-muted px-4 py-2 rounded text-lg">{referrals.referralCode}</code>
            <Button onClick={handleCopyReferralCode}>Copy Code</Button>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Referral Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Referrals: {referrals.totalReferrals}</p>
            <p>Referral Earnings: KSh {referrals.referralEarnings.toLocaleString()}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReferralsPage;
