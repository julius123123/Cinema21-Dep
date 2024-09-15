interface FasilitasProps {
  fasilitas: string[];
  filterFacilities: string[];
  setFilterFacilities: React.Dispatch<React.SetStateAction<string[]>>;
}

const Fasilitas = ({ fasilitas, filterFacilities, setFilterFacilities }: FasilitasProps) => {
  const onChange = ({ currentTarget: input }: React.ChangeEvent<HTMLInputElement>) => {
    if (input.checked) {
      setFilterFacilities([...filterFacilities, input.value]);
    } else {
      setFilterFacilities(filterFacilities.filter((val) => val !== input.value));
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 mr-5">
      <h2 className="text-xl font-bold mb-4">Filter by Fasilitas</h2>
      <div>
        {fasilitas.map((fasilitasItem) => (
          <div key={fasilitasItem} className="mb-2">
            <input 
              className="mr-4 cursor-pointer" 
              type="checkbox" 
              id={fasilitasItem}  // Add an ID that matches the label's htmlFor
              value={fasilitasItem} 
              onChange={onChange} 
              checked={filterFacilities.includes(fasilitasItem)} 
            />
            <label htmlFor={fasilitasItem} className="cursor-pointer">
              {fasilitasItem}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fasilitas;
