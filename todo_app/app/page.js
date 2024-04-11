"use client"
import Todolist from "@/Components/Todolist";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <>
      <ToastContainer position="top-center"
        autoClose={2000} />
      <Todolist />
    </>
  );
}
