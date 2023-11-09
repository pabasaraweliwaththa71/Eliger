import { lazy, useState } from "react";
import { Button, FileInput, Label, TextInput, Select } from "flowbite-react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ErrorData from "../../Data/ErrorData";
import { MdOutlineError } from "react-icons/md";
const LoadingSpinner = lazy(() => import("../Common/LoadingSpinner"));

// create sweet alert object
const Alert = withReactContent(Swal);

const BankDetails = ({ status = false }) => {
  const [errorCode, setErrorCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const bankList = [
    "People's Bank",
    "Bank of Ceylon",
    "Hatton National Bank",
    "Sampath Bank",
    "Commercial Bank",
    "NDB",
    "NSB",
  ];

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
      .post("/create_driver", formData)
      .then((response) => {
        if (response.status === 200) {
          if (response.data === 200)
            setAlert(
              "success",
              "Bank details submit success",
              "Your bank details is send to approval."
            );
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

  // bank details form
  const bankDetailsForm = () => {
    return (
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => handleSubmit(e)}
        encType="multipart/form-data"
      >
        {/* beneficiary name */}
        <div>
          <Label
            htmlFor="beneficiary"
            value="Beneficiary Name"
            className="after:ml-0.5 after:text-red-500 after:content-['*']"
          />
          <TextInput
            id="beneficiary"
            placeholder="John Perera"
            required
            type="text"
            name="beneficiary"
            className="inputs"
          />
          {/* error text */}
          {errorCode === 50 && errorContainer(errorCode)}
        </div>
        {/* bank */}
        <div>
          <Label
            htmlFor="bank"
            value="Bank"
            className="after:ml-0.5 after:text-red-500 after:content-['*']"
          />

          <Select id="bank" name="bank" required className="inputs">
            {bankList.map((bank, key) => {
              return (
                <option value={bank} key={key}>
                  {bank}
                </option>
              );
            })}
          </Select>
          {/* error text */}
          {errorCode === 51 && errorContainer(errorCode)}
        </div>
        {/* branch */}
        <div>
          <Label
            htmlFor="branch"
            value="Branch"
            className="after:ml-0.5 after:text-red-500 after:content-['*']"
          />
          <TextInput
            id="branch"
            required
            type="branch"
            name="branch"
            className="inputs"
          />
          {/* error text */}
          {errorCode === 52 && errorContainer(errorCode)}
        </div>
        {/* account number */}
        <div>
          <Label
            htmlFor="address"
            value="Address"
            className="after:ml-0.5 after:text-red-500 after:content-['*']"
          />
          <TextInput
            id="address"
            required
            type="text"
            name="address"
            placeholder=""
            className="inputs"
          />
          {/* error text */}
          {errorCode === 11 && errorContainer(errorCode)}
        </div>
        {/* statement doc */}
        <div>
          <Label
            htmlFor="statement"
            value="Bank Statement / 1st page of passbook"
            className="after:ml-0.5 after:text-red-500 after:content-['*']"
          />

          <FileInput
            id="statement"
            name="statement"
            required
            accept=".png,.jpeg,.jpg"
            helperText="Accept png , jpg , jpeg only.File size should be less than 2MB."
            className="inputs"
          />
          {/* error text */}
          {[54, 55, 56, 57].includes(errorCode) && errorContainer(errorCode)}
        </div>
        <div className="mt-5 flex w-full justify-center font-Poppins">
          <Button type="submit" className="w-full max-w-sm">
            Submit for Approval
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="h-full w-full max-w-4xl">
      {/* loading */}
      {isLoading && <LoadingSpinner />}

      <div className="mb-9 font-Poppins text-2xl font-medium">
        Setup Bank Details
      </div>

      {/* bank details form for new accounts */}
      {!status && bankDetailsForm()}
    </div>
  );
};
export default BankDetails;