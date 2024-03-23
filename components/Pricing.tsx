import { cn } from "@/lib/utils";
import Link from "next/link";

interface PricingTabProps {
  popular?: boolean;
  planName: string;
  price: number;
  planDescription: string;
  features: string[];
}

function PricingTab(props: PricingTabProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5",
        props.popular && "border-emerald-500"
      )}
    >
      {props.popular && (
        <div className="absolute top-0 right-0 mr-6 -mt-3">
          <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-emerald-500 text-white rounded-full shadow-sm shadow-slate-950/5">
            Recommended
          </div>
        </div>
      )}
      <div className="mb-5">
        <div className="text-slate-900 dark:text-slate-200 font-semibold mb-1">
          {props.planName}
        </div>
        <div className="inline-flex items-baseline mb-2">
          <span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">
            $
          </span>
          <span className="text-slate-900 dark:text-slate-200 font-bold text-4xl">
            {props.price}
          </span>
        </div>
        <div className="text-sm text-slate-500 mb-5">
          {props.planDescription}
        </div>
        <Link href="/">
          <button className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150">
            Get HoardWise
          </button>
        </Link>
      </div>
      <div className="text-slate-900 dark:text-slate-200 font-medium mb-3">
        Includes:
      </div>
      <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
        {props.features.map((feature, index) => {
          return (
            <li key={index} className="flex items-center">
              <svg
                className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
              </svg>
              <span>{feature}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function PricingTable() {
  return (
    <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-2 items-start lg:max-w-2xl">
      {/* Pricing tab 1 */}
      <PricingTab
        planName="Free"
        price={0}
        planDescription="Free version. No credit card required."
        features={[
          "View Reports and analytics",
          "Create Budgets",
          "Create Categories",
          "Manually insert transactions",
        ]}
      />

      {/* Pricing tab 2 */}
      <PricingTab
        popular={true}
        planName="Pro"
        price={20}
        planDescription="One-time payment, then it's yours forever."
        features={[
          "View Reports and analytics",
          "Create Budgets & Categories",
          "Upload PDF Account Summary",
          "AI-powered financial insights",
        ]}
      />
    </div>
  );
}
