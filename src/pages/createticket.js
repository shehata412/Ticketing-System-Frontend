import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

const CreateTicket = () => {
  const [priority,setPriority] = useState('low');
  const navigate = useNavigate();
    return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute left-4 top-4"
        onClick={() => navigate('/tickets')}>
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
        placeholder="Enter ticket title"
        required=""
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
        required=""
      ></textarea>
    </div>
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="priority"
      >
        Priority
      </label>
      <button
        type="button"
        role="combobox"
        aria-controls="radix-:r1t:"
        aria-expanded="false"
        aria-autocomplete="none"
        dir="ltr"
        data-state="closed"
        className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
      >
        <span style={{PointerEvents: 'none'}}>Low</span>
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
      <select
        value={priority}
        onChange={e=> setPriority(e.target.value)}
        aria-hidden="true"
        tabIndex="-1"
        style={{
            position: "absolute", 
            border: "0px", 
            width: "1px", 
            height: "1px", 
            padding: "0px", 
            margin: "-1px", 
            overflow: "hidden", 
            clip: "rect(0px, 0px, 0px, 0px)", 
            whiteSpace: "nowrap", 
            overflowWrap: "normal"
          }}
      >
        <option value="low">
          Low
        </option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="attachment"
      >
        Attachment
      </label>
      <input
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        id="attachment"
        type="file"
      />
    </div>
    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white w-full">
      Create Ticket
    </button>
  </form>
  </div>
</main>
    )
}

export default CreateTicket;
