// components/Question.tsx
import React, { useState } from "react";
import { QuestionType } from "@/data";

interface QuestionProps {
  data: QuestionType[];
  index: number;
  onSubmit: (selectedOption: string | null) => void;
  onFinish: () => void;
  onNextQuestion: () => void;
}

export const Question: React.FC<QuestionProps> = ({
  data,
  index,
  onSubmit,
  onFinish,
  onNextQuestion,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const handleNextQuestion = () => {
    onNextQuestion();
    setSelectedIdx(null);
  };

  return (
    <div className="flex flex-col gap-4 transition-all">
      <h2 className="text-lg">{data[index].question}</h2>
      {data[index].options.map((option, idx) => (
        <div key={option}>
          <label
            htmlFor={`question_${option}`}
            className={
              idx === selectedIdx
                ? "text-left flex items-center border-gray-300 bg-purple-600 text-white hover:bg-purple-700 border-2 rounded-full p-2 px-4 transition-all"
                : "text-left flex items-center border-gray-300 hover:bg-gray-100 border-2 rounded-full p-2 px-4 transition-all"
            }
          >
            <span
              className={`text-xl mr-3 font-medium ${
                idx === selectedIdx ? "text-yellow-400" : "text-purple-800"
              }`}
            >
              {String.fromCharCode(65 + idx)}
            </span>
            {option}
          </label>
          <input
            className="hidden"
            id={`question_${option}`}
            type="radio"
            value={option}
            name={`answer`}
            onChange={() => {
              onSubmit(option);
              setSelectedIdx(idx);
            }}
          />
        </div>
      ))}
      <div className="flex justify-end w-full gap-2 mt-5">
        <button
          className="px-4 py-2 rounded-full hover:bg-gray-200 text-gray-800 transition-all border-2 border-gray-200"
          onClick={onFinish}
        >
          Selesai
        </button>
        {index < data.length - 1 && (
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-all"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
