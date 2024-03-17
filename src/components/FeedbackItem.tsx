import { TriangleUpIcon } from "@radix-ui/react-icons";
import { type TFeedbackItem } from "../lib/types";

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

export function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const {
    badgeLetter,
    company,
    daysAgo,
    text,
    upvoteCount,
  } = feedbackItem;

  return (
    <li className="feedback">
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
