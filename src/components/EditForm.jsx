import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState("");

  const handleInput = (name, value) => {
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("students")
        .select()
        .eq("student_id", id)
        .single();

      if (error) {
        console.warn("ERROR");
      } else {
        setStudent(data);
      }
    };

    fetchSmoothie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student) return;

    const { data, error } = await supabase
      .from("students")
      .update(student)
      .eq("student_id", id);

    toast.success("Student info updated");

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);

    console.log(data, error);
  };

  return (
    <>
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
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Update student info
              </h3>
              <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="student_id"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only"
                  >
                    Student ID
                  </label>
                  <input
                    type="number"
                    name="student_id"
                    id="student_id"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                    value={student && student.student_id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="202300"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="full_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                    value={student && student.full_name}
                    placeholder="Full Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                    value={student && student.email}
                    placeholder="Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default EditForm;
