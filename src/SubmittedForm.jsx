import React from 'react';

const SubmittedForm = ({ questions, onOptionChange }) => {
  return (
    <div className='border border-black p-2 rounded-[10px] bg-yellow-100'>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className='mb-4'>
          <h3 className='text-lg font-bold mb-2'>{question.text}</h3>
          <div>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className='mb-2'>
                <input
                  type='radio'
                  value={option}
                  checked={question.selectedOption === optionIndex}
                  onChange={() => onOptionChange(questionIndex, optionIndex)}
                />
                <label
                  className='ml-2'>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubmittedForm;
