import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

const Publish = () => {
  const [studens, setStudents] = useState();
  const [addResultForm, setAddResultForm] = useState({});

  useEffect(() => {
    const getStudents = async () => {
      const { data, error } = await supabase
        .from("students")
        .select()
        .order("created_at", { ascending: false });

      if (error) {
        console.warn(error);
      } else if (data) {
        setStudents(data);
        console.log(data);
      }
    };

    getStudents();
  }, []);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setAddResultForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addResult = async (event) => {
    event.preventDefault();
    console.log(addResultForm);
    const { data, error } = await supabase
      .from("result")
      .insert(addResultForm)
      .select();

    if (error) {
      console.warn(error);
    } else if (data) {
      console.log(data);

      toast.success("Marks Added!");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`flex justify-center items-center w-full h-[calc(100%-1px)] max-h-full p-4`}
      >
        <div className="relative w-full min-w-[240px] max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white">
            <div className="px-6 py-6 lg:px-8">
              <h2 className="mb-6 text-2xl font-medium text-gray-900 dark:text-white">
                Publish Test Score
              </h2>
              <form
                className="space-y-6"
                action="#"
                onSubmit={(event) => addResult(event)}
              >
                {/* exam name */}
                <div>
                  <label
                    htmlFor="exam_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Exam Type
                  </label>
                  <select
                    id="exam_name"
                    name="exam_name"
                    onChange={(event) => handleInput(event)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue>Select Type</option>
                    <option value="Class Test 01">Class Test 01</option>
                    <option value="Class Test 02">Class Test 02</option>
                    <option value="Midterm">Midterm</option>
                    <option value="Final">Final</option>
                  </select>
                </div>

                {/* student list */}
                <div>
                  <label
                    htmlFor="student_id"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Student ID
                  </label>
                  <select
                    id="student_id"
                    name="student_id"
                    onChange={(event) => handleInput(event)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue>Select ID</option>
                    {studens &&
                      studens.map((student) => (
                        <option key={student.id} value={student.student_id}>
                          {student.student_id}
                        </option>
                      ))}
                  </select>
                </div>

                {/* score */}
                <div>
                  <label
                    htmlFor="marks"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only"
                  >
                    Marks
                  </label>
                  <input
                    type="number"
                    name="marks"
                    id="marks"
                    placeholder="00"
                    onChange={(event) => handleInput(event)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Publish
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Publish;
