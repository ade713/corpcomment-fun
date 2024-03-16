import { FeedbackItem } from "./FeedbackItem";

const feedbackItem1 = {
  upvoteCount: 593,
  badgeLetter: 'N',
  companyName: 'Nike',
  text: "Fix the SNKRS app please!",
  daysAgo: 4,
};
const feedbackItem2 = {
  upvoteCount: 593,
  badgeLetter: 'A',
  companyName: 'Asics',
  text: "the running shoes are great y'all! keep em coming! love the gel-numbus 25 and superblast!!",
  daysAgo: 3,
};
const feedbackItems = [feedbackItem1, feedbackItem2];

export function FeedbackList() {
  return (
    <ol className="feedback-list">
      { feedbackItems.map((feedbackItem, index) => (
          <FeedbackItem
            key={`${feedbackItem.companyName}-${index}`}
            feedbackItem={feedbackItem}
          />
        ))
      }
    </ol>
  );
}
