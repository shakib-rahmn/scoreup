import { Link } from "react-router-dom"
import notFound from "../images/not-found.png"

const NotFound = () => {
  return (
    <div className="mx-auto text-center">
      <img src={notFound} alt="" width={340} className="mx-auto mb-10"/>

      <h2 className="text-2xl mb-6">Page not found!</h2>

      <Link to="/dashboard" className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-5 py-2.5 text-center mr-2 mb-2 ">Back to dashboard</Link>
    </div>
  )
}

export default NotFound