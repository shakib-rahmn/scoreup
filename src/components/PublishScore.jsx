import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { BiEditAlt } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const PublishScore = () => {
  const [results, setResult] = useState();

  useEffect(() => {
    const getResult = async () => {
      const { data, error } = await supabase
        .from("result")
        .select()
        .order("created_at", { ascending: true });

      if (error) {
        console.warn(error);
      } else if (data) {
        setResult(data);
      }
    };

    getResult();
  }, []);

  const handleDelete = async (id) => {
    const { data } = await supabase
      .from("result")
      .delete()
      .eq("id", id)
      .select();

    if (data) {
      toast.success("Result Removed!");

      setTimeout(() => {
        window.location.reload();
      }, 400);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl mb-10">Published Result</h2>

      <form className="mx-1 mb-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search student id"
            required=""
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md rounded-md mx-1">
        <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 min-w-[140px]">
                Student ID
              </th>
              <th scope="col" className="px-6 py-3">
                Marks
              </th>
              <th scope="col" className="px-6 py-3 min-w-[160px]">
                Exam Title
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {results ? (
              results?.map((result) => (
                <tr
                  key={result.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{result.student_id}</td>
                  <td className="px-6 py-4">{result.marks}</td>
                  <td className="px-6 py-4">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {" "}
                      {result.exam_name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center flex-wrap items-center">
                      <a
                        type="button"
                        onClick={() => handleDelete(result.id)}
                        className="px-3 py-[6px] text-xs font-medium text-center inline-flex gap-1 items-center text-red-500 border-2 border-red-400 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td className="px-6 py-4">
                  <div role="status" className="space-y-2.5 animate-pulse">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div role="status" className="space-y-2.5 animate-pulse">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div role="status" className="space-y-2.5 animate-pulse">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2 justify-center flex-wrap items-center">
                    <a
                      type="button"
                      className="px-3 py-[6px] text-xs font-medium text-center inline-flex gap-1 items-center text-blue-400 border-2 border-blue-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                    >
                      <BiEditAlt className="w-4 h-4" />
                      Edit
                    </a>

                    <a
                      type="button"
                      className="px-3 py-[6px] text-xs font-medium text-center inline-flex gap-1 items-center text-red-500 border-2 border-red-400 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PublishScore;
