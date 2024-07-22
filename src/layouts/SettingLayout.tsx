import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const SettingLayout = () => {
  return (
    <main className="flex  flex-1 flex-col gap-4  md:gap-8 ">
      <div className="grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link to="#" className="font-semibold text-primary">Account</Link>
          <Link to="#">Users</Link>
          <Link to="#">Billing</Link>
          <Link to="#">Channels</Link>
          <Link to="#">Organization</Link>
          <Link to="#">Beta Feature</Link>
          <Link to="#">Refer a Friend</Link>
        </nav>
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Used to identify your store in the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Email Address" />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                The directory within your project, in which your plugins are
                located.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <Input
                  placeholder="Password"
                  // defaultValue="/content/plugins"
                />
                <div className="flex items-center space-x-2">
                  {/* <Checkbox id="include" defaultChecked /> */}
                  <label
                    htmlFor="include"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    If you’d like to change your password, enter a new password
                    here
                  </label>
                </div>
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default SettingLayout;
