import { Button, Card, Label, TextInput } from "flowbite-react";

const EditAccount = () => {
  return (
    <Card className="dark:bg-slate-700">
      <div className="text-center text-2xl font-semibold tracking-wide ">
        Edit Account{" "}
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row ">
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="fname" value="First Name" />
            </div>
            <TextInput id="fname" required type="text" />
          </div>

          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="lname" value="Last Name" />
            </div>
            <TextInput id="lname" required type="text" />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row ">
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="contactno" value="Contact No" />
            </div>
            <TextInput
              id="contactno"
              placeholder="123-456-79-78"
              required
              type="text"
            />
          </div>
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              placeholder="abc@gmail.com"
              required
              type="email"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="address" value="Address" />
          </div>
          <TextInput id="address" placeholder="Colombo" required type="text" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput id="password" placeholder="" required type="password" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repassword" value="Confirm password" />
          </div>
          <TextInput
            id="repassword"
            placeholder="abc@gmail.com"
            required
            type="password"
          />
        </div>

        {/* <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div> */}
        <Button type="submit">Edit Account</Button>
      </form>
    </Card>
  );
};
export default EditAccount;