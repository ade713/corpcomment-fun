import { FeedbackList } from "./FeedbackList";
import { Header } from "./Header";

export function Container() {
  return (
    <main className="container">
      <Header />
      <FeedbackList />
    </main>
  );
}
