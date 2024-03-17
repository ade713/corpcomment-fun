type HashtagItemProps = {
  company: string;
  onSelectedCompany: (company: string) => void;
};

export function HashtagItem({
  company,
  onSelectedCompany,
}: HashtagItemProps) {
  return (
    <li key={company}>
      <button onClick={() => onSelectedCompany(company)}>#{company}</button>
    </li>
  );
}
