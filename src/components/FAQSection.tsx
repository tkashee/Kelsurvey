import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How much can I earn per survey?",
      answer: "You can earn between KSh 50 to KSh 300 per survey depending on the length and complexity. Premium surveys pay even more!"
    },
    {
      question: "How do I get paid?",
      answer: "We offer multiple payment options including M-Pesa, bank transfer, and PayPal. Payments are processed within 24-48 hours of withdrawal request."
    },
    {
      question: "Is SurveyEarn free to join?",
      answer: "Yes! SurveyEarn is completely free to join. There are no hidden fees or charges."
    },
    {
      question: "How often will I receive surveys?",
      answer: "The frequency depends on your profile and demographics. Most users receive 2-5 surveys per week."
    },
    {
      question: "What are the minimum withdrawal requirements?",
      answer: "The minimum withdrawal amount is KSh 500. You can withdraw anytime once you reach this threshold."
    },
    {
      question: "Is my personal information safe?",
      answer: "Absolutely! We use bank-level security to protect your data and never share your personal information with third parties."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about SurveyEarn</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-soft">
                <CardHeader>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                    {openFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </CardHeader>
                {openFAQ === index && (
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
