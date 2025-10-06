import { useState, useEffect } from "react";

// Helper function to shuffle an array
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

function StudentPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("questions")) || [];
      const validQuestions = saved.filter((q) => q && q.question && q.options);

      // Shuffle questions and their options
      const shuffledQuestions = shuffleArray(
        validQuestions.map((q) => ({
          ...q,
          options: shuffleArray(q.options),
        }))
      );

      setQuestions(shuffledQuestions);
    } catch {
      setQuestions([]);
    }
  }, []);

  const handleAnswer = (questionId, selectedOption) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
    }
  };

  const handleSubmit = () => {
    let newScore = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        newScore += 1;
      }
    });

    setScore(newScore);
    setSubmitted(true);
  };

  const handleRetake = () => {
    // Re-shuffle questions and reset everything
    const reshuffled = shuffleArray(
      questions.map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
    setQuestions(reshuffled);
    setAnswers({});
    setScore(0);
    setSubmitted(false);
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

                  let backgroundColor = "#f0f0f0";
                  if (submitted) {
                    if (isSelected && isCorrect)
                      backgroundColor = "#d4edda"; // green
                    else if (isSelected && !isCorrect)
                      backgroundColor = "#f8d7da"; // red
                  } else if (isSelected) {
                    backgroundColor = "#cce5ff"; // blue before submit
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(q.id, opt)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px",
                        marginBottom: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        backgroundColor,
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                    >
                      {opt}
                      {submitted &&
                        isSelected &&
                        (isCorrect ? " ✅ Correct" : " ❌ Wrong")}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button
              onClick={handleSubmit}
              style={{
                padding: "10px 20px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Submit Answers
            </button>
          ) : (
            <div style={{ marginTop: "20px" }}>
              <h3>
                Your Score: {score} / {questions.length}
              </h3>
              <button
                onClick={handleRetake}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentPage;
