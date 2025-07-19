import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface SurveyPlan {
  planName: string;
  dailySurvey: number;
  monthlyIncome: number;
  dailyIncome: number;
  minimumWithdrawal: number;
  earningPerSurvey: string;
  price: string;
}

interface Question {
  id: string;
  question: string;
  type: string;
  options: string[];
  correctAnswer: string | null;
}

export interface Survey {
  id: string;
  title: string;
  reward: number;
  duration: string;
  category: string;
  difficulty: string;
  status: string;
  description: string;
  requiredPlan: string;
  questions?: Question[];
}

export interface UserProgress {
  currentPlan: string;
  surveysCompletedToday: number;
  totalEarnings: number;
  pendingEarnings: number;
  completedSurveys: string[];
  referrals: {
    totalReferrals: number;
    referralEarnings: number;
    referralCode: string;
  };
}

export interface PlanData {
  visibility: boolean;
  surveyPlans: SurveyPlan[];
  mpesaPaymentDetails: {
    tillName: string;
    tillNumber: number;
  };
  moneyMaking: any[];
}

export interface SurveyData {
  surveys: Survey[];
  userProgress: UserProgress;
}

export const useSurveyData = () => {
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        
        // Migrate old generic survey data to user-specific storage
        const oldData = localStorage.getItem('surveyData');
        if (oldData) {
          const newStorageKey = `surveyData_${user.id}`;
          if (!localStorage.getItem(newStorageKey)) {
            localStorage.setItem(newStorageKey, oldData);
          }
          // Remove old generic data after migration
          localStorage.removeItem('surveyData');
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planResponse, surveyResponse] = await Promise.all([
          fetch('/data/plan.json'),
          fetch('/data/survey.json')
        ]);

        if (!planResponse.ok || !surveyResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const planData = await planResponse.json();
        let surveyData;

        // Use fallback data for demo purposes when no user is logged in
        if (!userId) {
          surveyData = await surveyResponse.json();
          surveyData.userProgress = {
            currentPlan: "Starter",
            surveysCompletedToday: 0,
            totalEarnings: 0,
            pendingEarnings: 0,
            completedSurveys: [],
            referrals: {
              totalReferrals: 0,
              referralEarnings: 0,
              referralCode: "REF_DEMO123"
            }
          };
        } else {
          // Load user-specific surveyData from localStorage if available
          const storageKey = `surveyData_${userId}`;
          const storedSurveyData = localStorage.getItem(storageKey);
          
          if (storedSurveyData) {
            surveyData = JSON.parse(storedSurveyData);
          } else {
            surveyData = await surveyResponse.json();
            // Initialize with default user progress if none exists
            if (!surveyData.userProgress) {
              surveyData.userProgress = {
                currentPlan: "Starter",
                surveysCompletedToday: 0,
                totalEarnings: 0,
                pendingEarnings: 0,
                completedSurveys: [],
                referrals: {
                  totalReferrals: 0,
                  referralEarnings: 0,
                  referralCode: `REF_${Math.random().toString(36).substring(2, 8)}`
                }
              };
              localStorage.setItem(storageKey, JSON.stringify(surveyData));
            }
          }
        }
        
        setPlanData(planData);
        setSurveyData(surveyData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Provide fallback data if fetch fails
        setPlanData({
          visibility: true,
          surveyPlans: [{
            planName: "Starter",
            dailySurvey: 1,
            monthlyIncome: 0,
            dailyIncome: 0,
            minimumWithdrawal: 4500,
            earningPerSurvey: "40 - 50",
            price: "0"
          }],
          mpesaPaymentDetails: {
            tillName: "FINTECH HUB VENTURES 3",
            tillNumber: 8071464
          },
          moneyMaking: []
        });
        
        const surveyResponse = await fetch('/data/survey.json');
        const surveyData = await surveyResponse.json();
        surveyData.userProgress = {
          currentPlan: "Starter",
          surveysCompletedToday: 0,
          totalEarnings: 0,
          pendingEarnings: 0,
          completedSurveys: [],
          referrals: {
            totalReferrals: 0,
            referralEarnings: 0,
            referralCode: "REF_DEMO123"
          }
        };
        setSurveyData(surveyData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);


  const getCurrentPlan = () => {
    if (!planData || !surveyData) return null;
    return planData.surveyPlans.find(
      plan => plan.planName === surveyData.userProgress.currentPlan
    );
  };


  const getAvailableSurveys = () => {
    if (!surveyData || !planData) return [];
    
    const currentPlan = getCurrentPlan();
    if (!currentPlan) return [];

    const planHierarchy = ['Starter', 'Silver', 'Gold', 'Platinum'];
    const currentPlanIndex = planHierarchy.indexOf(currentPlan.planName);
    
    // Return all surveys that user is eligible for regardless of daily limit
    return surveyData.surveys.filter(survey => {
      const requiredPlanIndex = planHierarchy.indexOf(survey.requiredPlan);
      return requiredPlanIndex <= currentPlanIndex;
    });
  };


  const completeSurvey = (surveyId: string) => {
    if (!surveyData || !userId) return;
    
    const survey = surveyData.surveys.find(s => s.id === surveyId);
    if (!survey) return;

    setSurveyData(prev => {
      if (!prev) return null;
      
      const updatedSurveyData = {
        ...prev,
        userProgress: {
          ...prev.userProgress,
          surveysCompletedToday: prev.userProgress.surveysCompletedToday + 1,
          totalEarnings: prev.userProgress.totalEarnings + survey.reward,
          pendingEarnings: prev.userProgress.pendingEarnings + survey.reward,
          completedSurveys: [...prev.userProgress.completedSurveys, surveyId]
        }
      };

      // Save updated surveyData to user-specific localStorage
      const storageKey = `surveyData_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedSurveyData));

      return updatedSurveyData;
    });
  };

  return {
    planData,
    surveyData,
    loading,
    getCurrentPlan,
    getAvailableSurveys,
    completeSurvey
  };
};
