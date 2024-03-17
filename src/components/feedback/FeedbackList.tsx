import { ErrorMessage } from "../ErrorMessage";
import { FeedbackItem } from "./FeedbackItem";
import { Spinner } from "../Spinner";
import { useFeedbackItemsContext } from "../../lib/hooks";

export function FeedbackList() {
  const {
    errorMessage,
    filteredFeedbackItems,
    isLoading,
  } = useFeedbackItemsContext();

  return (
    <ol className="feedback-list">
      { isLoading ? <Spinner /> : null }

      { errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null }

      { !isLoading ?
          filteredFeedbackItems.map((feedbackItem) => (
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
