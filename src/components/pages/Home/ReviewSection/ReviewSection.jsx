import Roger from "../../../../assets/uncle roger.jpeg";
import Ryan from "../../../../assets/ryan reynolds.jpeg";
import Ramsey from "../../../../assets/gordon ramsey.jpeg";
import { FaStar } from "react-icons/fa";

const ReviewSection = () => {
  return (
    <section className="mt-8 w-full flex flex-col items-center px-16 pt-8 pb-10">
      <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
        What Major Critique Say About Us!
      </h1>
      <div className="flex justify-center items-center gap-12 flex-wrap w-full max-w-7xl">
        <div className="flex flex-col items-center text-center bg-white rounded-md shadow-lg p-4 w-[335px] mt-32">
          <img
            src={Ryan}
            alt="Ryan Reynolds"
            className="rounded-full mb-4"
            height={175}
            width={175}
          />
          <h4 className="text-[#000033] font-semibold text-lg">
            Ryan Reynolds
          </h4>
          <p className="text-[#82888C] text-lg flex">
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
          </p>

          <p className="text-[#82888C] mt-4">
            Perfect spot for a relaxed meal. The food? Outstanding. The vibe?
            Impeccable. It’s the kind of place where you feel at home while
            enjoying every bite.
          </p>
        </div>

        <div className="flex flex-col items-center text-center bg-white rounded-md shadow-lg p-4 w-[335px]">
          <img
            src={Ramsey}
            alt="Gordon Ramsey"
            className="rounded-full mb-4"
            height={175}
            width={175}
          />
          <h4 className="text-[#000033] font-semibold text-lg">
            Gordon Ramsey
          </h4>
          <p className="text-[#82888C] text-lg flex">
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
          </p>

          <p className="text-[#82888C] mt-4">
            Absolutely brilliant! The food here is top-notch, full of flavor,
            and cooked to perfection. The atmosphere? Spot on – relaxed,
            welcoming, and just what you need to enjoy a great meal. Can't wait
            to come back and try more!
          </p>
        </div>
        <div className="flex flex-col items-center text-center bg-white rounded-md shadow-lg p-4 w-[335px] mt-32">
          <img
            src={Roger}
            alt="Uncle Roger"
            className="rounded-full mb-4"
            height={175}
            width={175}
          />
          <h4 className="text-[#000033] font-semibold text-lg">Uncle Roger</h4>
          <p className="text-[#82888C] text-lg flex">
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
            <span>
              <FaStar className="text-amberColor pr-1" />
            </span>
            <span>
              <FaStar className="text-[#82888C] pr-1" />
            </span>
          </p>

          <p className="text-[#82888C] mt-4">
            Very nice! The food here, fuuyouh, it’s so good, I want to slap my
            mama. Everything is cooked to perfection. Great vibe, friendly staff
            – definitely coming back!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
