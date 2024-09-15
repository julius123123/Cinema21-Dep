import React from "react";

const Reviews: React.FC = () => (
  <div className="flex-1 pt-2 pr-5 pl-5 rounded-xl shadow-md max-w-[290px] max-h-[600px] mr-5 bg-white ml-5 mt-5">
    <h3 className="mb-5 mt-5 text-xl font-bold">Reviews</h3>
    <div className="mb-10 bg-[#7d98c3] rounded-xl p-3">
      <h4 className="text-lg text-white mb-4 font-bold">Dewi Athena</h4>
      <p className="text-sm text-white">"Most students study here. The building is modern, equipped with Wi-Fi, and has air conditioning."</p>
    </div>
    <div className="mb-10 bg-[#7d98c3] rounded-xl p-3">
      <h4 className="text-lg text-white mb-4 font-bold">Dewa Demeter</h4>
      <p className="text-sm text-white">"Very comfy, open 24 hours, and the perfect place for group discussions."</p>
    </div>
    <div className="mb-10 bg-[#7d98c3] rounded-xl p-3">
      <h4 className="text-lg text-white mb-4 font-bold">Dewa Ares</h4>
      <p className="text-sm text-white">"This is where the top students study, and the food is delicious."</p>
    </div>
  </div>
);

export default Reviews;
