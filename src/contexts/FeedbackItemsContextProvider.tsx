import { createContext, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../lib/hooks";

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
  const [selectedCompany, setSelectedCompany] = useState('');
  const {
    errorMessage,
    feedbackItems,
    isLoading,
    setFeedbackItems,
  } = useFeedbackItems();
  
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
