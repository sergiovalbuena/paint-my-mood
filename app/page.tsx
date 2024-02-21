'use client'
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";


export default function Home() {
//state variables
const [rows, setRows] = useState(2);
const [input, setInput] = useState("");
const [loding, setLoading] = useState(false);


useEffect(() => {
  const inputTimeout = setTimeout(() => {
    runPredicitons();
  }, 1000);

  return () => clearTimeout(inputTimeout);
}, [input]);

async function runPredicitons() {
  if(input){
    setLoading(true);
  //send api call
const res = await axios.post('api/emotion', {input: input})
console.log(res);
    setLoading(false);

  }
}


function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>): void {
  setInput(event.target.value);
  //increase the number of rows if required
  const newRows = Math.max(1, Math.ceil(event.target.scrollHeight/20))
  setRows(newRows);
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="lg:text-4xl text-2xl font-mono font-semibold tracking-tight">🎨🖌️ Paint My Mood </h1>
            <div className="border-2 border-black p-4 rounded-lg">
              <textarea 
              rows={rows}
              onChange={handleInputChange}
              placeholder='how are you feeling right now?...'
                className='outline-none block w-full text-sm placeholder-slate-600'>
              </textarea>
              
            </div>
              <p>{input}</p>

    </main>
  );
}
