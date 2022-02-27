import { useEffect, useState } from "react";
import axios from "axios";

export type Result = Question[];

export interface Question {
  question: string;
  questionID: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  answer: string;
  isCorrect: boolean;
}

export const Quiz = () => {
  const [questions, setQuestions] = useState<Result>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    axios.get("http://localhost:5000").then((res: any) => {
      setQuestions(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <div>
      {loading ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : (
        <div>
          {currentQuestion === questions.length ? (
            <div>
              You got {score} out of {questions?.length} right!
              {score === 0 && <h1>Damn you kinda suck though</h1>}
              {score === 1 && <h1>Wow, i'm disappointed...</h1>}
              {score === 2 && <h1>Decent I guess.</h1>}
              {score === 3 && (
                <h1>You used google... disappointmentm, you are - Yoda</h1>
              )}
            </div>
          ) : (
            <>
              <h1>{questions[currentQuestion]?.question}</h1>
              {questions[currentQuestion].options.map((option) => {
                const { id, answer, isCorrect } = option;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      if (isCorrect) {
                        setScore((prev) => prev + 1);
                        setCurrentQuestion((prev) => prev + 1);
                      } else {
                        setCurrentQuestion((prev) => prev + 1);
                      }
                    }}
                  >
                    {answer}
                  </button>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};
