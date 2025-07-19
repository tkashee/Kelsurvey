import { useSurveyData } from "@/hooks/useSurveyData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import WithdrawalContainer from "@/components/WithdrawalContainer";

const EarningsPage = () => {
  const { surveyData } = useSurveyData();

  if (!surveyData) return null;

  const userProgress = surveyData.userProgress;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-6">My Earnings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Earnings Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Total Earnings</CardTitle>
                <CardDescription>Your total earnings from surveys</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">KSh {userProgress.totalEarnings.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Pending Earnings: KSh {userProgress.pendingEarnings.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Withdrawal Container */}
          <div>
            <WithdrawalContainer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EarningsPage;
