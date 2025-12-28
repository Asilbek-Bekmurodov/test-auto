import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Sahifa topilmadi</p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Bosh sahifa
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition"
        >
          Orqaga
        </button>
      </div>
    </div>
  );
};

export default NotFound;
