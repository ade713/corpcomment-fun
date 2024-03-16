import { TriangleUpIcon } from "@radix-ui/react-icons";

type FeedbackItem = {
  badgeLetter: string;
  companyName: string;
  daysAgo: number;
  text: string;
  upvoteCount: number;
}

type FeedbackItemProps = {
  feedbackItem: FeedbackItem;
};

export function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const {
    badgeLetter,
    companyName,
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
          <p>{companyName}</p>
          <p>{text}</p>
        </div>

        <p>{daysAgo}d</p>
      </li>
  );
}
