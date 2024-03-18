import { create } from 'zustand';
import { TFeedbackItem } from '../lib/types';

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  addItemToList: (text: string) => Promise<void>;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  fetchFeedbackItems: () => Promise<void>;
  selectCompany: (company: string) => void;
}

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: '',
  selectedCompany: '',
  addItemToList: async (text: string) => {
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

    set(state => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

    await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
  },
  getCompanyList:() => {
    const state = get();
    return state.feedbackItems
      .map(item => item.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  },
  getFilteredFeedbackItems: () => {
    const state = get();

    return state.selectedCompany ?
      state.feedbackItems.filter(feedbackItem => feedbackItem.company === state.selectedCompany) :
      state.feedbackItems;
  },
  selectCompany: (company: string) => {
    set(() => ({
      selectedCompany: company,
    }));
  },
  fetchFeedbackItems: async () => {
    set(() => ({
      isLoading: true,
    }));

    try {
      const response = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks");

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      set(() => ({
        feedbackItems: data.feedbacks,
      }));
    } catch (error) {
      set(() => ({
        errorMessage: "An error occured... please try again later.",
      }));
    }

    set(() => ({
      isLoading: false,
    }));
  },
}));
