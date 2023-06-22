import { AnswerObj } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObj | undefined;
  Qnumber: number;
  totalQuestions: number;
};

const Question = ({
  question,
  answers,
  callback,
  userAnswer,
  Qnumber,
  totalQuestions,
}: Props) => {
    console.log(answers);
    
  return <div>
    <p className="number">
        Question: {Qnumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question}}></p>
    <div>
        {
            answers.map((ans, i) => (
                <div key={i}>
                    <button value={ans} disabled={!!userAnswer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: ans}}></span>
                    </button>
                </div>
            ))
        }
    </div>
  </div>;
};

export default Question;
