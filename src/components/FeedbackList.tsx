import { useEffect, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { FeedbackItem } from "./FeedbackItem";
import { Spinner } from "./Spinner";

export function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks")
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(data => {
        setFeedbackItems(data.feedbacks);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage('An error occured...');
        setIsLoading(false);
      });
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
