import { ErrorMessage } from "../ErrorMessage";
import { FeedbackItem } from "./FeedbackItem";
import { Spinner } from "../Spinner";
import { TFeedbackItem } from "../../lib/types";

type FeedbackListProps = {
  isLoading: boolean;
  feedbackItems: TFeedbackItem[];
  errorMessage: string;
};

export function FeedbackList({
  isLoading,
  errorMessage,
  feedbackItems,
}: FeedbackListProps) {
  return (
    <ol className="feedback-list">
      { isLoading ? <Spinner /> : null }

      { errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null }

      { !isLoading ?
          feedbackItems.map((feedbackItem) => (
            <FeedbackItem
              key={feedbackItem.id}
              feedbackItem={feedbackItem}
            />
          )) :
          null
      }
    </ol>
  );
}
