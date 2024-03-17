import { useState } from "react";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { type TFeedbackItem } from "../../lib/types";

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

export function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);

  const {
    badgeLetter,
    company,
    daysAgo,
    text,
    upvoteCount,
  } = feedbackItem;

  const handleToggleFeedBackItem = () => setOpen(prev => !prev);

  return (
    <li
      className={`feedback ${open ? "feedback--expand" : ''}`}
      onClick={handleToggleFeedBackItem}
    >
        <button>
          <TriangleUpIcon />
          <span>{upvoteCount}</span>
        </button>

        <div>
          <p>{badgeLetter}</p>
        </div>

        <div>
          <p>{company}</p>
          <p>{text}</p>
        </div>

        <p>
          { daysAgo === 0 ? 'NEW' : `${daysAgo}d` }
        </p>
      </li>
  );
}
