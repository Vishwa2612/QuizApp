import { useState } from 'react';
import Questions from './Questions';
import SubmittedForm from './SubmittedForm';
import { useHistory } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Addquestion = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [forms, setForms] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState(true);
  const [correctOption,setCorrectOption]=useState('');
  const history = useHistory();

  const addQuestion = () => {
    if (!newQuestion.trim() || options.every((opt) => !opt.trim())) {
      return;
    }
    const newQuestionObject = {
      text: newQuestion,
      options: [...options],
      correctOption: correctOption,
    };
    setQuestions([...questions, newQuestionObject]);
    setNewQuestion('');
    setOptions(['']);
    setCorrectOption('');
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const updateQuestionText = (index, newText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = newText;
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex, optionIndex, newOption) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = newOption;
    setQuestions(updatedQuestions);
  };
  

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selectedOption = optionIndex;
    setQuestions(updatedQuestions);
  };

  const submitForm = async() => {
    if (questions.length === 0) {
      alert("Please add atleast one question before submitting.");
      return;
    }
    const randomLink = Math.random().toString(36).substring(2, 15);
    const newForm = {
      link: randomLink,
      questions:[...questions],
    };
    try {
      const formsCollection = collection(db, 'forms');
      await addDoc(formsCollection, newForm);
      alert(newForm.link);
      setForms([...forms, newForm]);
      setDisplayedQuestions(false);
      history.push('/forms');
    } catch (error) {
      console.error('Error adding document: ', error);
      
    }
  };

  return (
    <div className='bg-violet-400 h-[2000px]'>
      <div className="max-w-2xl mx-auto p-4 border border-gray-300 rounded bg-blue-500">
        <div className="mb-4 mt-2">
          <label className="block text-gray-800 text-sm font-bold mb-2">
            Add Question:
          </label>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded mb-2 bg-white"
            placeholder="Question"
          />
          <label className="block text-gray-800 text-sm font-bold mb-2">
            Correct Option:
          </label>
          <input
            type="text"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded mb-2 bg-white"
            placeholder="Correct Option"
          />
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                className="w-full px-3 py-2 border border-gray-700 rounded mr-2 bg-white"
                placeholder={`Option ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => addOption()}
                className="bg-green-500 text-white px-2 py-1 rounded ml-2 border border-gray-600"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2 border border-gray-600"
              >
                -
              </button>
            </div>
          ))}
          <button
            onClick={addQuestion}
            className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded border border-black"
          >
            Add Question
          </button>
        </div>

        { displayedQuestions && (
        <div className="mt-4">
          {questions.map((question, questionIndex) => (
            <Questions
              key={questionIndex}
              question={question}
              onUpdateQuestion={(newText) => updateQuestionText(questionIndex, newText)}
              onUpdateOption={(optionIndex, newOption) =>
                updateOption(questionIndex, optionIndex, newOption)
              }
              submitted={!displayedQuestions}
            />
          ))}
        </div>
        )}

        <div className="mt-8">
          <h2 className="text-lg font-bold mb-2">Forms:</h2>
          {forms.length > 0 ? (
            forms.map((form, index) => (
              <div key={index} className="mb-4">
                <SubmittedForm 
                  questions={form.questions} 
                  onOptionChange={(selectedOption)=>handleOptionChange(index,selectedOption)}  
                />
              </div>
            ))
          ) : (
            <p>No forms available</p>
          )}
          <button onClick={submitForm} className="bg-green-500 text-white px-4 py-2 border border-black rounded">
            Submit Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addquestion;
