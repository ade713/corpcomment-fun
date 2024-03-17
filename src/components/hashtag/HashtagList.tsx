import { useFeedbackItemsContext } from "../../lib/hooks";
import { HashtagItem } from "./HashtagItem";

export function HashtagList() {
  const { companyList, handleSelectedCompany } = useFeedbackItemsContext();

  const handleClickClearSelection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleSelectedCompany('');
    e.currentTarget.blur();
  };

  return (
    <ul className="hashtags">
      { companyList.map(company => (
          <HashtagItem
            key={company}
            company={company}
            onSelectedCompany={handleSelectedCompany}
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
