import {Metadata} from "next";
import Link from "next/link";

import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {LoginAuthForm} from "@/app/login/components/LoginAuthForm";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import {ThemeToggle} from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default async function AuthenticationPage() {
  const session = await getServerSession(options);
  if (session) {
    redirect("/");
  }
  return (
    <>
      <div className="container relative h-screen  flex-col items-center justify-center grid lg:max-w-none lg:px-0">
        <ThemeToggle className={"absolute left-4 top-4 md:left-8 md:top-8"} />
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Register
        </Link>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign inn</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to sing in
              </p>
            </div>
            <LoginAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
