import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useState } from "react";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberForAMonth: false,
  });
  //@ts-ignore
  const { login, authUser } = useAuthStore();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData);
      toast.success("Login successful");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  console.log(authUser);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="overflow-hidden ">
            <CardContent className="grid p-0 md:grid-cols-2 min-h-[700px] ">
              <form
                className="p-6 md:p-8 flex flex-col justify-center gap-6"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-7">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-balance text-muted-foreground">
                      Login to your Attendify
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                  {/* rememberForAMonth */}
                  <div className="flex items-center justify-end space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.rememberForAMonth}
                      onCheckedChange={(e) =>
                        setFormData({
                          ...formData,
                          rememberForAMonth: e as boolean,
                        })
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me for a month
                    </label>
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="underline underline-offset-4">
                      Sign up
                    </a>
                  </div>
                </div>
              </form>
              <div className="relative hidden bg-muted md:block">
                <img
                  src="/placeholder.svg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
