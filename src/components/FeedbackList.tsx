import { useEffect, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { FeedbackItem } from "./FeedbackItem";
import { Spinner } from "./Spinner";

export function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
