import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

interface props {
  title: string;
  description: string;
}

const InfoMessage = ({ title, description }: props) => {
  return (
    <Alert color="info" icon={HiInformationCircle}>
      <span className="font-medium">{title}. </span>
      {description}.
    </Alert>
  );
};

export default InfoMessage;
