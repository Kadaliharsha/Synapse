import React, { useState, useEffect } from "react";
import {
  BsEmojiGrinFill,
  BsEmojiLaughingFill,
  BsEmojiSmileFill,
  BsEmojiFrownFill,
  BsEmojiAngryFill,
} from "react-icons/bs";
import questionsData from "../../assets/questions.json";
import Cookies from "js-cookie";
import API from "../../api/api";

const getRandomQuestions = (questions) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

const FeedbackForm = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ text: "", color: "" });
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    setSelectedQuestions(getRandomQuestions(questionsData));
  }, []);

  const handleChange = (question, score) => {
    setFormData({ ...formData, [question]: score });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userStr = localStorage.getItem("user");
    const email = userStr ? JSON.parse(userStr).email : null;
    if (!email) {
      setMessage({
        text: "You must be logged in to submit feedback.",
        color: "text-red-600",
      });
      return;
    }

    const formattedDate = new Date().toISOString().split("T")[0];
    const totalScore = Object.values(formData).reduce(
      (acc, score) => acc + score,
      0
    );

    try {
      const feedback = { email, date: formattedDate, totalScore };

      // Check for existing feedback
      let existingScores = {};
      try {
        const checkResponse = await API.get(`/user/feedback/${email}`);
        if (checkResponse.status === 200) {
          existingScores = checkResponse.data.scores || {};
        }
      } catch (err) {
        if (err.response && err.response.status !== 404) {
          throw err; // Only ignore 404 errors
        }
      }

      if (existingScores[formattedDate]) {
        setMessage({
          text: "Feedback for today already submitted. Please try again tomorrow.",
          color: "text-orange-500",
        });
        return;
      }

      // Submit feedback
      const response = await API.post("/user/feedback", feedback);
      setMessage({
        text: response.data,
        color: "text-green-600",
      });
      setFormData({});
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage({
        text: "Error submitting feedback. Please try again.",
        color: "text-red-600",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 w-[900px] bg-white shadow-md rounded-lg mt-11 mb-11">
      <h2 className="text-5xl font-bold text-[#109948] text-center mb-10">
        Daily Mood Assignment
      </h2>
      <form onSubmit={handleSubmit}>
        {selectedQuestions.map((question, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={question}
              className="block text-gray-700 font-medium text-2xl mb-4"
            >
              {index + 1}. {question}
            </label>
            <div className="flex justify-between">
              {[2, 4, 6, 8, 10].map((score) => {
                let Icon;
                switch (score) {
                  case 2:
                    Icon = BsEmojiAngryFill;
                    break;
                  case 4:
                    Icon = BsEmojiFrownFill;
                    break;
                  case 6:
                    Icon = BsEmojiSmileFill;
                    break;
                  case 8:
                    Icon = BsEmojiLaughingFill;
                    break;
                  case 10:
                    Icon = BsEmojiGrinFill;
                    break;
                  default:
                    return null;
                }

                return (
                  <label key={score} className="cursor-pointer text-3xl mb-4">
                    <input
                      type="radio"
                      name={question}
                      value={score}
                      onChange={() => handleChange(question, score)}
                      className="hidden"
                    />
                    <Icon
                      size={32}
                      className={`transition-colors ${formData[question] === score
                        ? "text-yellow-500"
                        : "text-gray-400"
                        }`}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full h-[50px] text-white font-medium py-2 px-4 text-xl rounded-md bg-[#1F1F1F] hover:bg-black transition"
        >
          Submit Feedback
        </button>
      </form>

      {message.text && (
        <div className={`mt-4 text-center text-lg ${message.color}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
