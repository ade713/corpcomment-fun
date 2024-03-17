import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState('');
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) return;

    setText(newText);
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // basic hashtag validation
    if (text.includes('#') && text.length >= 5) {
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 1000);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => setShowInvalidIndicator(false), 1000);
      return;
    }

    onAddToList(text);
    setText('');
  };

  const charactersLeft = MAX_CHARACTERS - text.length;

  return (
    <form
      className={`form
        ${showValidIndicator ? 'form--valid' : ''}
        ${showInvalidIndicator ? 'form--invalid' : ''}
      `}
      onSubmit={handleOnSubmit}
    >
      <textarea
        id="feedback-textarea"
        onChange={handleOnChange}
        placeholder=""
        spellCheck={false}
        value={text}
      />
      <label htmlFor="feedback-textarea">
          Enter your feedback here, remember to #hashtag the company
      </label>

      <div>
        <p className="u-italic">{charactersLeft}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
