const QuestionNavigation = () => {
  const questions = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex flex-wrap gap-2 justify-center">
      {questions.map((num) => (
        <button
          key={num}
          className="w-8 h-8 text-sm rounded bg-gray-200 hover:bg-blue-500 hover:text-white transition"
        >
          {num}
        </button>
      ))}
    </div>
  );
};
export default QuestionNavigation;
