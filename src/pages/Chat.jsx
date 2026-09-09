import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mockResponses from "../data/mockResponses";

const quickQuestions = [
  "What schemes are available?",
  "How can I register a cooperative?",
  "Check my grievance status",
  "Tell me about cooperative loans",
];

const getTimeStamp = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const getMockReply = (text) => {
  const normalized = text.toLowerCase();

  for (const [key, value] of Object.entries(mockResponses)) {
    if (value.keywords?.some((keyword) => normalized.includes(keyword))) {
      return {
        text: value.response,
        source: value.source,
      };
    }
  }

  return {
    text: mockResponses.default.response,
    source: mockResponses.default.source,
  };
};

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "Namaste! I can help with cooperative registration, schemes, grievances, and local support.",
      timestamp: getTimeStamp(),
    },
  ]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState("");
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const responseTimersRef = useRef(new Set());

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const initialMessage = location.state?.initialMessage;
    if (initialMessage) {
      setMessage(initialMessage);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return undefined;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage((prev) => (prev ? `${prev} ${transcript}`.trim() : transcript));
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      setIsListening(false);
      setVoiceMessage(event.error === "not-allowed" ? "Microphone permission was denied." : "Voice input could not be started.");
    };
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      responseTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      responseTimersRef.current.clear();
    };
  }, [navigate]);

  const addMessage = (sender, text) => ({
    id: Date.now() + Math.random(),
    sender,
    text,
    timestamp: getTimeStamp(),
  });

  const sendMessage = (payload = message) => {
    const trimmed = payload.trim();
    if (!trimmed) return;

    const userMessage = addMessage("user", trimmed);
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    const responseTimer = window.setTimeout(() => {
      const reply = getMockReply(trimmed);
      setMessages((prev) => [...prev, { ...addMessage("assistant", reply.text), source: reply.source }]);
      setIsTyping(false);
      responseTimersRef.current.delete(responseTimer);
    }, 1000);
    responseTimersRef.current.add(responseTimer);
  };

  const handleVoice = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setVoiceMessage("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    try {
      setVoiceMessage("");
      recognition.start();
      setIsListening(true);
    } catch {
      setVoiceMessage("Voice input is already active. Please try again shortly.");
      setIsListening(false);
    }
  };

  const clearConversation = () => {
    responseTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    responseTimersRef.current.clear();
    setMessages([]);
    setIsTyping(false);
    setMessage("");
    setVoiceMessage("");
  };

  return (
    <main className="chat-page page-animated">
      <div className="page-heading">
        <div>
          <span className="eyebrow">AI ASSISTANT</span>
          <h1>SAH-SAMARTH</h1>
          <p>Your multilingual AI assistant for cooperative-related queries.</p>
        </div>

        <div className="chat-heading-actions">
          <button type="button" className="secondary-btn clear-chat-btn" onClick={clearConversation}>
            Clear chat
          </button>
          <div className="status-pill" aria-live="polite">
            <span className="status-dot"></span>
            Online
          </div>
        </div>
      </div>

      <div className="chat-shell">
        {messages.length === 0 ? (
          <div className="empty-state panel-surface">
            <div className="empty-icon">💬</div>
            <h3>No chat yet</h3>
            <p>Ask a question to start your conversation.</p>
          </div>
        ) : (
          <div className="chat-window">
            {messages.map((item) => (
              <div key={item.id} className={`chat-message ${item.sender}`}>
                <div className="message-avatar" aria-hidden="true">
                  {item.sender === "assistant" ? "✦" : "S"}
                </div>

                <div className="message-content">
                  <div className="message-meta">
                    <strong>
                      {item.sender === "assistant" ? "SAH-SAMARTH" : "You"}
                    </strong>
                    <span>{item.timestamp}</span>
                  </div>
                  <p>{item.text}</p>
                  {item.source && <small className="message-source">Source: {item.source}</small>}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message assistant typing-row" aria-live="polite">
                <div className="message-avatar" aria-hidden="true">✦</div>
                <div className="message-content typing-bubble">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            {voiceMessage && <div className="chat-notice" role="status">{voiceMessage}</div>}
          </div>
        )}

        <div className="chat-toolbar">
          <div className="quick-pills" aria-label="Quick prompts">
            {quickQuestions.map((question, index) => (
              <button
                type="button"
                key={index}
                className="quick-pill"
                onClick={() => sendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>

          <div className="chat-actions">
            <button
              type="button"
              className={`voice-btn ${isListening ? "listening" : ""}`}
              aria-label="Use voice input"
              onClick={handleVoice}
            >
              🎙️
            </button>

            <label className="sr-only" htmlFor="chat-input">
              Type your question
            </label>

            <div className="chat-input-wrap">
              <input
                id="chat-input"
                ref={inputRef}
                type="text"
                placeholder="Type your question here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                aria-label="Type your question"
              />

              <button
                type="button"
                className="send-btn"
                onClick={() => sendMessage()}
                disabled={!message.trim()}
              >
                Send <span aria-hidden="true">➤</span>
              </button>
            </div>
          </div>

          <div className="language-row" aria-label="Supported languages">
            <span aria-hidden="true">🌐</span>
            <span>Supports Hindi, Marathi, Kannada, English</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chat;