import { lazy, useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ErrorData from "../../Data/ErrorData";
import { MdOutlineError } from "react-icons/md";
const LoadingSpinner = lazy(() => import("../Common/LoadingSpinner"));
const PasswordSwitcher = lazy(() => import("../Common/PasswordSwitcher"));
// create sweet alert object
const Alert = withReactContent(Swal);

const CreateHelpAccount = () => {
  const [errorCode, setErrorCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfPassword, setIsConfPassword] = useState(true);
  const [isPassword, setIsPassword] = useState(true);

  // custom allert function with sweet alert 2
  const setAlert = (icon, title, desc) => {
    return Alert.fire({
      icon: icon,
      title: title,
      text: desc,
    });
  };

  // submit registration form
  const handleSubmit = async (e) => {
    // clear previous errors
    setErrorCode(null);
    // remove default form submission
    e.preventDefault();
    // get data from form fields as FormData object
    const formData = new FormData(e.target);
    // change loading state to true
    setIsLoading(true);
    // send data using axios post function
    await axios
      .post("/create_hns", formData)
      .then((response) => {
        if (response.status === 200) {
          if (response.data === 200)
            setAlert(
              "success",
              "Registration success",
              "Successfully sent the email verification message to given email."
            );
          else if (response.data === 15)
            setAlert("error", "Registration failed", ErrorData[15]);
          setIsLoading(false);
          setErrorCode(response.data);
        } else {
          setAlert("error", "Registration failed", ErrorData[500]);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setAlert("error", "Registration failed", ErrorData[500]);
        setIsLoading(false);
      });
  };
  // error messages
  const errorContainer = (errCode) => {
    return (
      <p className="flex items-center gap-x-1 font-Poppins text-sm font-semibold text-red-500">
        <MdOutlineError /> {ErrorData[errCode]}
      </p>
    );
  };

  return (
    <Card className="w-full max-w-4xl place-self-center">
      {/* loading */}
      {isLoading && <LoadingSpinner />}
      <form
        className="flex flex-col gap-4 font-Poppins"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mb-3 text-center text-xl font-medium md:text-2xl">
          <h1>New Help & Support Staff Member Registration Form </h1>
        </div>
        <div>
          <Label htmlFor="name" value="Member Name" />
          <TextInput id="name" name="name" required type="text" />
        </div>
        <div>
          <Label htmlFor="email" value="Member email" />
          <TextInput
            id="email"
            name="email"
            placeholder="user@gmail.com"
            required
            type="email"
          />
          {/* error text */}
          {[7, 10].includes(errorCode) && errorContainer(errorCode)}
        </div>
        <div className="flex flex-col space-y-3 font-Poppins lg:flex-row lg:space-x-2 lg:space-y-0">
          <div className="relative w-full">
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              name="initial_password"
              required
              placeholder="********"
              type={isPassword ? "password" : "text"}
            />
            <PasswordSwitcher
              isPassword={isPassword}
              setIsPassword={setIsPassword}
            />
            {/* error text */}
            {errorCode === 8 && errorContainer(errorCode)}
          </div>
          <div className="relative w-full">
            <Label htmlFor="Repassword" value="Confirm Password" />
            <TextInput
              id="Repassword"
              name="confirm_initial_password"
              required
              placeholder="********"
              type={isConfPassword ? "password" : "text"}
            />
            <PasswordSwitcher
              isPassword={isConfPassword}
              setIsPassword={setIsConfPassword}
            />
            {/* error text */}
            {errorCode === 9 && errorContainer(errorCode)}
          </div>
        </div>
        <div className="mt-5 flex w-full justify-center font-Poppins">
          <Button type="submit" className="w-full max-w-sm" name="register">
            Register
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default CreateHelpAccount;
