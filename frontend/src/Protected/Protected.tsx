import { Suspense } from "react";
import { Navigate } from "react-router";

interface ProtectedProps {
  children: JSX.Element;
  isValid: boolean;
  redirectRoute: string;
}

const Protected = ({ children, isValid, redirectRoute }: ProtectedProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <div className="mx-auto border-2 border-t-0 border-r-0 border-white rounded-full w-9 h-9 animate-spin"></div>
        </div>
      }
    >
      {isValid ? children : <Navigate to={redirectRoute} />}
    </Suspense>
  );
};

export default Protected;
