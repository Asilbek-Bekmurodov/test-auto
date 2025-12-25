import AnswerItem from "../AnswerItem/AnswerItem";

const AnswerList = () => {
  const answers = ["A javob", "B javob", "C javob", "D javob"];

  return (
    <div className="col-span-2 flex flex-col gap-4">
      {answers.map((answer, index) => (
        <AnswerItem key={index} text={answer} active={index === 0} />
      ))}
    </div>
  );
};
export default AnswerList;
