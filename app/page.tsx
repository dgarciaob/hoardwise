import Link from "next/link";
import Image from "next/image";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import Logo from "@/components/Logo";
import FeaturesSection from "@/components/Features";
import PricingTable from "@/components/Pricing";

import { UserButton, auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  return (
    <main className="selection:bg-emerald-200" id="init">
      <nav className="mx-auto max-w-5xl flex items-center justify-between py-4 px-8">
        <div className="flex flex-row items-center space-x-2">
          <Link href="/">
            <Logo />
          </Link>
          <Link href="/">
            <p className="text-xl font-bold">HoardWise</p>
          </Link>
        </div>
        <div className="hidden md:flex flex-row space-x-8">
          <Link
            href="/#features"
            className="hover:text-muted-foreground transition-all duration-300"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="hover:text-muted-foreground transition-all duration-300"
          >
            Pricing
          </Link>
        </div>
        {userId ? (
          <div className="hidden md:flex flex-row space-x-4 items-center">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div className="hidden md:flex flex-row space-x-4 items-center">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger className="flex md:hidden">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent className="flex flex-col max-w-72">
            <div className="flex flex-row items-center space-x-2">
              <Link href="/">
                <Logo />
              </Link>
              <Link href="/">
                <p className="text-xl font-bold">HoardWise</p>
              </Link>
            </div>

            <div className="mt-24 flex flex-col space-y-16">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/#features"
                  className="hover:text-muted-foreground transition-all duration-300"
                >
                  Features
                </Link>
                <Link
                  href="/#pricing"
                  className="hover:text-muted-foreground transition-all duration-300"
                >
                  Pricing
                </Link>
              </div>

              {userId ? (
                <div className="flex flex-row items-center space-x-12">
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="flex flex-col space-y-4 items-center">
                  <Link href="/sign-in">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>

      <section className="mx-auto max-w-5xl flex flex-col items-center justify-center py-16 px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight">
          Seamless finance tracker for everyone
        </h1>
        <p className="text-xl text-center text-muted-foreground mt-5 md:mt-6 lg:mt-8 lg:max-w-xl">
          HoardWise helps you keep track of your finances and make better
          financial decisions.
        </p>
        <div className="mt-8">
          <Link href="/#pricing">
            <Button size="lg" className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-12 animate-circle-grow">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image
              src="/hoarddashboard.png"
              width={2560}
              height={1664}
              alt="Product preview"
              quality={100}
              className="rounded-md bg-white shadow-2xl ring-1  ring-gray-900/10"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 lg:px-8 mt-48">
        <h2 className="text-4xl md:text-6xl font-bold text-center tracking-tight">
          Worried about making ends meet?
        </h2>
        <p className="text-xl text-center text-muted-foreground mt-5 md:mt-6 lg:mt-8">
          HoardWise is designed to be simple and easy to use for everyone.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
          <Card className="pt-6 hover:bg-muted transition-all duration-300">
            <CardContent>
              <CardTitle>Track your expenses</CardTitle>
              <p className="text-muted-foreground mt-2">
                Keep track of your expenses and know where your money is going.
              </p>
            </CardContent>
          </Card>
          <Card className="pt-6 hover:bg-muted transition-all duration-300">
            <CardContent>
              <CardTitle>Set financial goals</CardTitle>
              <p className="text-muted-foreground mt-2">
                Set financial goals and track your progress towards them.
              </p>
            </CardContent>
          </Card>
          <Card className="pt-6 hover:bg-muted transition-all duration-300">
            <CardContent>
              <CardTitle>Get insights</CardTitle>
              <p className="text-muted-foreground mt-2">
                Get insights into your spending habits and make better financial
                decisions.
              </p>
            </CardContent>
          </Card>
          <Card className="pt-6 hover:bg-muted transition-all duration-300">
            <CardContent>
              <CardTitle>Secure and private</CardTitle>
              <p className="text-muted-foreground mt-2">
                Your data is secure and private. We do not share your data with
                anyone.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        className="max-w-screen-2xl mx-auto px-6 lg:px-8 mt-48"
        id="features"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center tracking-tight">
          Keep it simple with our Features
        </h2>
        <FeaturesSection />
      </section>

      <section
        className="mx-auto max-w-5xl px-6 lg:px-8 mt-48 selection:bg-sky-300"
        id="pricing"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center tracking-tight mb-24">
          Pricing for all
        </h2>
        <PricingTable />
      </section>

      <footer className="mx-auto max-w-5xl px-6 lg:px-8 mt-48 py-12">
        <div className="flex flex-col items-center space-y-4">
          <Link href="/#init">
            <Logo />
          </Link>
          <p className="text-center text-muted-foreground">
            &copy; 2024 HoardWise. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
