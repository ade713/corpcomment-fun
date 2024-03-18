import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";
import { HashtagItem } from "./HashtagItem";

export function HashtagList() {
  const companyList = useFeedbackItemsStore(state => state.getCompanyList());
  const selectCompany = useFeedbackItemsStore(state => state.selectCompany);

  const handleClickClearSelection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    selectCompany('');
    e.currentTarget.blur();
  };

  return (
    <ul className="hashtags">
      { companyList.map(company => (
          <HashtagItem
            key={company}
            company={company}
            onSelectedCompany={selectCompany}
          />
        ))
      }
      { companyList.length > 0 ?
        <li>
          <button onClick={handleClickClearSelection}>Clear Selection</button>
        </li> :
        null
      }
    </ul>
  );
}
