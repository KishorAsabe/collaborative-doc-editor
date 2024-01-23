// /src/components/TextEditor.js
import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// Retrieve the user data from localStorage
const userDataString = localStorage.getItem("userData");
// Parse the user data string into a JavaScript object
const userData = userDataString ? JSON.parse(userDataString) : null;

const SAVE_INTERVAL_MS = 2000;

const TextEditor = () => {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const s = io("https://text-ed-backend.onrender.com/");// Update with your backend URL 
    
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");

    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 overflow-hidden">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">CollabWriteHub</div>
          <div className="text-white text-sm font-semibold">
            Welcome, {userData?.firstName || "Guest"}
          </div>
          <div className="flex gap-4">
            <button
              className="text-white hover:text-gray-300"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="text-white hover:text-gray-300"
              onClick={() => navigate("/saveddocs")}
            >
              Documents
            </button>
            <button
              className="text-white hover:text-gray-300"
              onClick={() => navigate("/logout")}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <div ref={wrapperRef}></div>
      </div>
    </>
  );
};

export default TextEditor;
