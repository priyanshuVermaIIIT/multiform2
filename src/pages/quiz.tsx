import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setQuestions, selectAnswer, calculateScore } from "../redux/quizSlice";
import axios from "axios";

const QuizPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(5);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [mandatory, setMandatory] = useState<string>("mandatory"); 

  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const selectedAnswers = useSelector(
    (state: RootState) => state.quiz.selectedAnswers
  );
  const score = useSelector((state: RootState) => state.quiz.score);

  
  const fetchQuestions = async (amount: number) => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${amount}`
      );
      const formattedQuestions = response.data.results.map((q: any) => ({
        question: q.question,
        options: [...q.incorrect_answers, q.correct_answer].sort(
          () => Math.random() - 0.5
        ),
        correctAnswer: q.correct_answer,
      }));
      dispatch(setQuestions(formattedQuestions));
      setTimeRemaining(amount * 60);
      setIsSubmitted(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Timer functionality
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeRemaining, isSubmitted]);

  
  const handleSubmit = () => {
    dispatch(calculateScore());
    setIsSubmitted(true);
  };

  
  const areAllQuestionsAnswered = questions.every(
    (_, index) => selectedAnswers[index] !== null && selectedAnswers[index] !== ""
  );

  
//   useEffect(() => {
//     console.log("Selected Answers:", selectedAnswers);
//   }, [selectedAnswers]);

  
  const isSubmitDisabled =
    mandatory === "mandatory" && !areAllQuestionsAnswered;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10 px-5">
      <h1 className="text-8xl font-bold text-blue-600 mb-2">Welcome to the Quiz</h1>
      <p className="text-2xl font-serif text-blue-950 mb-20">
        Enter the no. of questions you want to answer
      </p>

     
      <div className="flex items-center space-x-3 mb-5">
        <select
          disabled={!isSubmitted}
          value={mandatory}
          onChange={(e) => setMandatory(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="mandatory">Mandatory</option>
          <option value="non-mandatory">Non-Mandatory</option>
        </select>
        <input
          disabled={!isSubmitted}
          type="number"
          min="5"
          max="50"
          value={inputValue}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 5 && value <= 50) {
              setInputValue(value);
            }
          }}
          className="border border-gray-300 p-2 rounded-md w-20 text-center"
        />
        <button
          onClick={() => fetchQuestions(inputValue)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          disabled={!isSubmitted}
        >
          Search
        </button>
      </div>

     
      {timeRemaining > 0 && !isSubmitted && (
        <div className="mb-5 text-lg text-red-500">
          Time Remaining: {Math.floor(timeRemaining / 60)}:
          {timeRemaining % 60 < 10
            ? `0${timeRemaining % 60}`
            : timeRemaining % 60}
        </div>
      )}

      
      {questions.length > 0 && (
        <div className="w-full max-w-4xl">
          {questions.map((q, index) => (
            <div
              key={index}
              className="mb-5 border p-4 rounded-md shadow-md bg-white"
            >
              <p className="text-lg font-semibold mb-2">
                {index + 1}. {q.question}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {q.options.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className={`flex items-center p-2 border rounded-md cursor-pointer ${
                      isSubmitted &&
                      (option === q.correctAnswer
                        ? "bg-green-100 border-green-500"
                        : selectedAnswers[index] === option &&
                          "bg-red-100 border-red-500")
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAnswers[index] === option}
                      onChange={() =>
                        dispatch(
                          selectAnswer({
                            questionIndex: index,
                            selectedAnswer: option,
                          })
                        )
                      }
                      disabled={isSubmitted}
                      className="mr-2"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      
      {questions.length > 0 && (
        <div className="mt-5">
          <button
            onClick={handleSubmit}
            disabled={isSubmitted || isSubmitDisabled} 
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition disabled:bg-gray-400"
          >
            {isSubmitted ? "Submitted" : "Submit"}
          </button>
        </div>
      )}

    
      {isSubmitted && (
        <div className="mt-5 p-4 bg-white rounded-md shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">Result</h2>
          <p className="text-lg">Your Score: {score}</p>
          <div className="mt-5">
            {questions.map((q, index) => (
              <div
                key={index}
                className={`p-3 rounded-md mb-3 ${
                  selectedAnswers[index] === q.correctAnswer
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                } border`}
              >
                <p>
                  <strong>Question {index + 1}:</strong> {q.question}
                </p>
                <p>
                  <strong>Your Answer:</strong>{" "}
                  {selectedAnswers[index] || (
                    <span className="text-gray-500">Not Answered</span>
                  )}
                </p>
                <p>
                  <strong>Correct Answer:</strong> {q.correctAnswer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
