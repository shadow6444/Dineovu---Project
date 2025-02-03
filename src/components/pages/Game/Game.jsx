import Cards from "../../../assets/Game2.jpeg";
import Chess from "../../../assets/chess.jpg";
import Board from "../../../assets/boardgames.jpg";
import Card from "../../../assets/cardgames.jpg";
import Dart from "../../../assets/darts.jpg";
import Carom from "../../../assets/carom.jpg";
import Jenga from "../../../assets/jengo.jpg";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Game = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#FD9727] to-[#F1B500] h-56">
        <Link
          to="/home"
          className="flex items-center gap-2 text-lg text-white pt-6 pl-8 font-medium hover:underline whitespace-nowrap"
        >
          <span className="bg-white p-2 rounded-full">
            <FaArrowLeft className="text-amberColor" />
          </span>
          Go Back
        </Link>
        <h1 className="text-white font-medium text-2xl pt-6 pl-24">
          Bored From Waiting - <br /> Lets Spend Time playing Games
        </h1>
      </section>
      {/* Game Section */}
      <section className="w-full flex flex-col items-center px-16 py-8">
        <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
          Free Time Games!
        </h1>
        <div className="flex justify-center text-center items-center gap-12 flex-wrap w-full max-w-7xl">
          <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-[335px]">
            <img
              src={Chess}
              alt="Chess Game"
              className="rounded-md mb-4"
              height={209}
              width={335}
            />
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Chess
                </h4>
                <p className="text-[#82888C] text-sm">
                  Test your strategy and concentration and play the classic game
                  of chess
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-[335px]">
            <img
              src={Board}
              alt="Board Game"
              className="rounded-md mb-4"
              height={209}
              width={335}
            />
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Board Game
                </h4>
                <p className="text-[#82888C] text-sm">
                  Enjoy classics like Scrabble, Monopoly, and Catan
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-[335px]">
            <img
              src={Card}
              alt="Card Game"
              className="rounded-md mb-4"
              height={209}
              width={335}
            />
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Cards
                </h4>
                <p className="text-[#82888C] text-sm">
                  From Poker to Uno, indulge in some friendly competition
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-[335px]">
            <img
              src={Dart}
              alt="Dart Game"
              className="rounded-md mb-4"
              height={209}
              width={335}
            />
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Darts
                </h4>
                <p className="text-[#82888C] text-sm">
                  Aim, throw, and hit the bullseye! Classic café game
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-[335px]">
            <img
              src={Carom}
              alt="Carom Game"
              className="rounded-md mb-4"
              height={209}
              width={335}
            />
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Carrom
                </h4>
                <p className="text-[#82888C] text-sm">
                  A classic strike-and-pocket game for casual fun
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-[335px]">
            <img
              src={Jenga}
              alt="Jenga Game"
              className="rounded-md mb-4"
              height={209}
              width={335}
            />
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Jenga
                </h4>
                <p className="text-[#82888C] text-sm">
                  Build, balance, and hope it doesn't topple over
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Game;
