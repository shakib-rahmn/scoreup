import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { RiAddFill } from "react-icons/ri";
import { BiRefresh, BiEditAlt } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const StudentTable = () => {
  const [students, setStudents] = useState();
  const [addStudentStatus, setAddStudentStatus] = useState(false);
  const [addStudentFrom, setAddStudentForm] = useState({});

  useEffect(() => {
    getStudents();
  }, []);

  const handleDelete = async (id) => {
    const { data } = await supabase
      .from("students")
      .delete()
      .eq("id", id)
      .select();

      if(data) {
        toast.success("Student Removed!");

        setTimeout(() => {
          window.location.reload();
        }, 400);
      }
  };

  const handleInput = (name, value) => {
    setAddStudentForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getStudents = async () => {
    const { data, error } = await supabase.from("students").select().order('created_at', { ascending: true });

    if (error) {
      console.warn(error);
    } else if (data) {
      setStudents(data);
    }
  };

  const addStudent = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from("students")
      .insert(addStudentFrom)
      .select()
      .order('created_at', { ascending: false });

    if (error) {
      console.warn(error);
    } else if (data) {
      console.log(data);

      toast.success("New Student Added!");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex flex-wrap items-center justify-between px-1 gap-4 mb-10">
        <h2 className="text-2xl">Enrolled Students</h2>

        <div className="flex items-center gap-2">
          <a
            href="#!"
            onClick={() => setAddStudentStatus(!addStudentStatus)}
            className="flex items-center justify-center gap-[4px] max-w-max rounded-lg text-white bg-emerald-500 font-bold py-1 px-4 border-2 border-emerald-400 transition duration-300 hover:bg-transparent hover:text-slate-600 text-sm"
          >
            <div>
              <RiAddFill className="w-6 h-6" />
            </div>
            Add Student
          </a>

          <a
            href=""
            className="grid place-content-center border-2 border-emerald-500 rounded-lg py-[5px] px-[6px]"
          >
            <BiRefresh className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* add student form */}
      <div
        className={`transition-all duration-300 ${
          addStudentStatus
            ? "opacity-100 max-h-full visible"
            : "opacity-0 max-h-0 mb-0 invisible"
        }`}
      >
        <form action="" onSubmit={addStudent}>
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <input
              type="number"
              name="student_id"
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 max-lg:w-full lg:min-w-[30%]"
              placeholder="Student ID"
              required=""
            />

            <input
              type="text"
              name="full_name"
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 max-lg:w-full lg:min-w-[30%]"
              placeholder="Full Name"
              required=""
            />

            <input
              type="email"
              name="email"
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 max-lg:w-full lg:min-w-[30%]"
              placeholder="name@mail.com"
              required=""
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-[4px] rounded-lg text-white bg-emerald-500 font-bold py-2 px-4 border-2 border-emerald-400 transition duration-300 hover:bg-transparent hover:text-slate-600 text-sm"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      {/* student table */}
      <div className="relative mb-10 mx-1 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4 min-w-[140px]">
                Student ID
              </th>
              <th scope="col" className="px-6 py-4 min-w-[140px]">
                Full Name
              </th>
              <th scope="col" className="px-6 py-4">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {students ? (
              students?.map((student) => (
                <tr
                  key={student.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{student.student_id}</td>
                  <td className="px-6 py-4">{student.full_name}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center flex-wrap items-center">
                      <Link
                        type="button"
                        to={'/' + student.student_id}
                        className="px-3 py-[6px] text-xs font-medium text-center inline-flex gap-1 items-center text-blue-400 border-2 border-blue-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                      >
                        <BiEditAlt className="w-4 h-4" />
                        Edit
                      </Link>

                      <a
                        type="button"
                        onClick={() => handleDelete(student.id)}
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

export default StudentTable;
