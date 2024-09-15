interface BubbleProps {
  placeholderText: string;
  onClick: () => void;
}

const Bubble: React.FC<BubbleProps> = ({ placeholderText, onClick }) => (
  <div className="flex">
    <button
      onClick={onClick} 
      className="text-[#6482AD] py-2 px-10 rounded-full bg-white border-2 border-[#6482AD] text-base cursor-pointer font-bold duration-300 hover:bg-[#6482AD] hover:text-white"
    >
      {placeholderText}
    </button>
  </div>
);

export default Bubble;
