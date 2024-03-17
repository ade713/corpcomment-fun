import { HashtagItem } from "./HashtagItem";

type HashtagListProps = {
  companyList: string[];
  handleSelectedCompany: (company: string) => void;
};

export function HashtagList({ companyList, handleSelectedCompany }: HashtagListProps) {
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
