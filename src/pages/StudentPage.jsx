import { useState, useEffect } from "react";

function StudentPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("questions")) || [];
      const validQuestions = saved.filter((q) => q && q.question && q.options);
      setQuestions(validQuestions);
    } catch {
      setQuestions([]);
    }
  }, []);

  const handleAnswer = (questionId, selectedOption, correctAnswer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));

    setScore((prev) => {
      const prevAnswer = answers[questionId];
      let newScore = prev;

      if (selectedOption === correctAnswer && prevAnswer !== correctAnswer)
        newScore += 1;
      if (prevAnswer === correctAnswer && selectedOption !== correctAnswer)
        newScore -= 1;

      return newScore;
    });
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Student Page</h2>

      {questions.length === 0 ? (
        <p>
          No questions available yet. Please wait for your instructor to add
          them.
        </p>
      ) : (
        <div>
          {questions.map((q) => (
            <div
              key={q.id}
              style={{
                marginBottom: "20px",
                display: "inline-block",
                width: "100%",
                textAlign: "left",
              }}
            >
              <strong>{q.question}</strong>
              <div style={{ marginTop: "5px" }}>
                {q.options.map((opt, index) => {
                  const isSelected = answers[q.id] === opt;
                  const isCorrect = opt === q.correctAnswer;
                  const backgroundColor = isSelected
                    ? isCorrect
                      ? "#d4edda"
                      : "#f8d7da"
                    : "#f0f0f0";

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(q.id, opt, q.correctAnswer)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px",
                        marginBottom: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        backgroundColor: backgroundColor,
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                    >
                      {opt}{" "}
                      {isSelected &&
                        (isCorrect ? ":Correct Answer ✅" : ":Failed ❌")}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <h3>
              Total Score: {score} / {questions.length}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentPage;
