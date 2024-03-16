import { useState } from "react";
import { MAX_CHARACTERS } from "./lib/constants";

export function FeedbackForm() {
  const [text, setText] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) return;

    setText(newText);
  }

  const charactersLeft = MAX_CHARACTERS - text.length;

  return (
    <form className="form">
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
