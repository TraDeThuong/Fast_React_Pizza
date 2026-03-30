import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="text-5xl mb-4">😢</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Something went wrong
        </h1>

        {/* Error message */}
        <p className="text-gray-600 mb-6 break-words">
          {error?.data || error?.message || "Unexpected error occurred."}
        </p>

        {/* Button */}
        <LinkButton to = {-1} variant="primay">
          Go back
        </LinkButton>

      </div>

    </div>
  );
}

export default Error;