import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startTest,
  updateTypedText,
  setTimer,
  calculateWPM,
  calculateAccuracy,
  completeTest,
  resetTest,
} from '../redux/typingSlice';
import { RootState, AppDispatch } from '../redux/store'; 

const TypingTest = () => {
  const dispatch: AppDispatch = useDispatch();
  const { paragraph, typedText, timer, wpm, accuracy, isTestStarted, isTestCompleted } = useSelector(
    (state: RootState) => state.typing
  );

  const paragraphs = [
    "The sun was setting behind the hills, casting an orange glow over the landscape. Birds chirped in the trees as the cool breeze rustled the leaves. It was a perfect time to reflect on the day's events and relax.",
    "In the distance, the mountains stood tall, their peaks dusted with snow. The air was crisp and clean, carrying the scent of pine trees. A small stream flowed nearby, its waters gurgling softly as they moved over the rocks. This serene environment provided a much-needed escape from the hustle and bustle of daily life.",
    "At the local café, the aroma of freshly brewed coffee filled the air. Patrons sat at small tables, sipping their drinks and chatting with friends. The sound of soft jazz played in the background, adding to the cozy atmosphere. It was the kind of place where you could lose track of time and enjoy the moment.",
    "The city was waking up, the streets slowly filling with the sounds of traffic and people. Vendors set up their stalls, offering fresh fruits and vegetables to passersby. The sun peeked through the buildings, casting long shadows on the sidewalk. It was the start of another busy day in the heart of the metropolis.",
    "A gentle rain began to fall, the droplets creating ripples in the puddles on the ground . People hurried along, opening umbrellas and adjusting their coats. Despite the wet weather, there was something refreshing about the rain's arrival.",
  ];

  // Select a random paragraph for the test
  const getRandomParagraph = () => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length); 
    return paragraphs[randomIndex];
  };

  // Initialize the test
  const startNewTest = () => {
    dispatch(startTest(getRandomParagraph()));
  };

  // Timer logic
  useEffect(() => {
    if (!isTestStarted) return;

    const startTime = Date.now();

    const interval = setInterval(() => {
      if (!isTestCompleted) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000); // in seconds
        dispatch(setTimer(elapsed));
        dispatch(calculateWPM());
        dispatch(calculateAccuracy());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, isTestStarted, isTestCompleted]);

  // Key press handler
  const handleKeyPress = (event: KeyboardEvent) => {
    if (!isTestStarted || isTestCompleted) return;

    if (event.key === 'Backspace') {
      dispatch(updateTypedText(typedText.slice(0, -1)));
    } else if (event.key !== 'Shift' && event.key !== 'Enter') {
      // Start the test automatically when the first key is pressed
      if (!isTestStarted) dispatch(startTest(getRandomParagraph()));
      dispatch(updateTypedText(typedText + event.key));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [typedText, isTestStarted, isTestCompleted]);

  // Check if test is completed
  useEffect(() => {
    if (typedText.length === paragraph.length) {
      dispatch(completeTest());
    }
  }, [typedText, paragraph, dispatch]);

  // Restart the test
  const restartTest = () => {
    dispatch(resetTest());
    startNewTest();
  };

  return (
    <div className=" flex items-center justify-center bg-white p-6">
      <div className="w-full text-center">
      
        
        <div className="flex justify-center mb-6">
          <div className="w-full text-xl sm:text-2xl lg:text-4xl font-serif leading-relaxed text-center">
            <div className="flex flex-wrap justify-center gap-1 text-gray-700 font-medium">
              {paragraph.split('').map((char, index) => {
                const typedChar = typedText[index];
                return (
                  <span
                    key={index}
                    className={`transition-all ${
                      typedChar === undefined
                        ? 'text-gray-600'
                        : typedChar === char
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xl font-semibold text-gray-700">
          <p>Time: <span className="text-blue-600">{timer}s</span></p>
          <p>WPM: <span className="text-blue-600">{wpm}</span></p>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          {isTestCompleted ? (
            <button
              onClick={restartTest}
              className="px-6 py-3 bg-blue-600 text-white rounded-full text-lg shadow-md hover:bg-blue-700 transition"
            >
              Restart Test
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TypingTest;
