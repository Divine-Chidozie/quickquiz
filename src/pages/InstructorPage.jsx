import { useState, useEffect } from "react";

function InstructorPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("questions")) || [];
      const validQuestions = saved.filter((q) => q && q.question && q.options);
      setAllQuestions(validQuestions);
    } catch {
      setAllQuestions([]);
    }
  }, []);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !question ||
      options.some((opt) => opt.trim() === "") ||
      !correctAnswer
    ) {
      alert("Please fill in all fields and select the correct answer!");
      return;
    }

    const newQuestion = {
      id: Date.now(),
      question,
      options,
      correctAnswer,
    };

    const updatedQuestions = [...allQuestions, newQuestion];
    setAllQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Instructor Page</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{
              width: "60%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {options.map((opt, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              style={{
                width: "40%",
                padding: "8px",
                marginRight: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="radio"
              name="correct"
              value={opt}
              checked={correctAnswer === opt}
              onChange={() => setCorrectAnswer(opt)}
            />
            <label style={{ marginLeft: "5px" }}>Mark as Correct</label>
          </div>
        ))}

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#006400")
          }
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "green")}
        >
          Add Question
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>All Questions</h3>
      {allQuestions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {allQuestions.map((q) => (
            <li
              key={q.id}
              style={{
                marginBottom: "15px",
                textAlign: "left",
                display: "inline-block",
                width: "100%",
              }}
            >
              <strong>{q.question}</strong>
              <ul style={{ paddingLeft: "20px" }}>
                {q.options.map((opt, i) => (
                  <li
                    key={i}
                    style={{
                      color: opt === q.correctAnswer ? "green" : "black",
                    }}
                  >
                    {opt} {opt === q.correctAnswer ? "(Correct)" : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InstructorPage;
