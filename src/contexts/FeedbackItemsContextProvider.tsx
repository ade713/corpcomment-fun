import { createContext, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";

type TFeedbackItemsContext = {
  companyList: string[];
  errorMessage: string;
  filteredFeedbackItems: TFeedbackItem[];
  handleAddToList: (text: string) => void;
  handleSelectedCompany: (company: string) => void;
  isLoading: boolean;
};

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(null);

export function FeedbackItemsContextProvider({ children }: FeedbackItemsContextProviderProps) {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  
  const companyList = useMemo(() =>
    feedbackItems.map(item => item.company)
      .filter((company, index, array) => array.indexOf(company) === index),
    [feedbackItems]
  );
  const filteredFeedbackItems = useMemo(() =>
    selectedCompany ?
      feedbackItems.filter(feedbackItem =>
        feedbackItem.company === selectedCompany
      ) :
      feedbackItems,
    [feedbackItems, selectedCompany]
  );
  
  const handleSelectedCompany = (company: string) => {
    setSelectedCompany(company);
  };
  const handleAddToList = async (text: string) => {
    const company = text
      .split(' ')
      .find(word => word.includes('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company,
      badgeLetter: company.substring(0, 1).toUpperCase(),
    };

    setFeedbackItems([...feedbackItems, newItem]);

    await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
  };

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks");

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage("An error occured... please try again later.");
      }

      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);
  
  return (
    <FeedbackItemsContext.Provider
      value={{
        companyList,
        errorMessage,
        filteredFeedbackItems,
        handleAddToList,
        handleSelectedCompany,
        isLoading,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
