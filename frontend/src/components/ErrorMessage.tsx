import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

interface props {
  title: string;
  description: string;
}

const ErrorMessage = ({ title, description }: props) => {
  return (
    <Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">{title} </span>
      {description}
    </Alert>
  );
};

export default ErrorMessage;
