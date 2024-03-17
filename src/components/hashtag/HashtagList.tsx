import { HashtagItem } from "./HashtagItem";

type HashtagListProps = {
  companyList: string[];
  handleSelectedCompany: (company: string) => void;
};

export function HashtagList({ companyList, handleSelectedCompany }: HashtagListProps) {
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
    </ul>
  );
}
