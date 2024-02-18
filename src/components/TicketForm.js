import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketForm = ({ onSubmit, initialValues = {}, isUpdate = false }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [priority, setPriority] = useState(initialValues.priority || "low");
  const [attachment, setAttachment] = useState(initialValues.attachment || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !priority) {
      alert("Please fill out all fields");
    } else {
      const data = {
        title,
        description,
        priority,
        attachment,
        status: "Reported",
      };
      onSubmit(data);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute left-4 top-4"
        onClick={() => navigate("/tickets")}
      >
        Back
      </button>
      <img src="/mts.png" alt="Logo" className="mx-auto h-24 w-24" />
      <h1 className="text-2xl font-bold mb-4">Create Ticket</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md ">
        <form className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="title"
              value={title}
              placeholder="Enter ticket title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              id="description"
              placeholder="Enter ticket description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="priority"
            >
              Priority
            </label>
            <div className="relative">
              <button
                type="button"
                id="priority"
                onClick={() => setIsOpen(!isOpen)}
                role="combobox"
                aria-controls="radix-:r1t:"
                aria-expanded="false"
                aria-autocomplete="none"
                dir="ltr"
                data-state="closed"
                className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
              >
                <span style={{ PointerEvents: "none" }}>{priority}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 opacity-50"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              {isOpen && (
                <div className="absolute bg-white border border-input rounded-md w-full">
                  <button
                    className="w-full text-left my-1 border-b border-input px-3 py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPriority("low");
                      setIsOpen(false);
                    }}
                  >
                    low
                  </button>
                  <button
                    className="w-full text-left my-1 border-b border-input px-3 py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPriority("medium");
                      setIsOpen(false);
                    }}
                  >
                    medium
                  </button>
                  <button
                    className="w-full text-left my-1 border-b border-input px-3 py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPriority("high");
                      setIsOpen(false);
                    }}
                  >
                    high
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="attachment"
            >
              Attachment
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              id="attachment"
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white w-full"
          >
            {isUpdate ? "Update Ticket" : "Create Ticket"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default TicketForm;
