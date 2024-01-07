import React from 'react';

const Questions = ({ question, onUpdateQuestion, onUpdateOption }) => {
  return (
    <div className="mb-4 p-4 border border-gray-300 rounded bg-gray-100">
      <h3 className="text-lg font-bold mb-2">{question.text}</h3>
      <ul className="list-disc pl-4">
        {question.options.map((option, optionIndex) => (
          <p key={optionIndex} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                value={option}
                className="mr-2"
              />
              {option}
            </label>
          </p>
        ))}
      </ul>
      <p className="mt-2 text-sm">Edit question</p>
      <input
        type="text"
        value={question.text}
        onChange={(e) => onUpdateQuestion(e.target.value)}
        className="w-full px-3 py-2 border border-gray-500 rounded mb-2 bg-white"
        placeholder="Edit Question"
      />
    </div>
  );
};

export default Questions;
