import { useState } from "react";

interface SearchProps {
  setSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ setSearch }) => {
  // Move the state and the handler inside the component
  const [isVisible, setIsVisible] = useState(false);

  const handleSearchChange = (searchValue: string) => {
    setSearch(searchValue);
    setIsVisible(searchValue.trim() !== "");
  };

  return (
    <input
      type="text"
      placeholder="Search location"
      className="w-full sm:w-3/4 md:w-3/4 lg:w-3/5 xl:w-3/5 p-4 rounded-[20px] max-h-[76px] border border-[#ddd] text-base text-black mb-3"
      onChange={({ currentTarget: input }) => handleSearchChange(input.value)}
    />
  );
};

export default Search;


