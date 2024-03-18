import { ErrorMessage } from "../ErrorMessage";
import { FeedbackItem } from "./FeedbackItem";
import { Spinner } from "../Spinner";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export function FeedbackList() {
  const errorMessage = useFeedbackItemsStore(state => state.errorMessage);
  const isLoading = useFeedbackItemsStore(state => state.isLoading);
  const filteredFeedbackItems = useFeedbackItemsStore(state => state.getFilteredFeedbackItems());

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
