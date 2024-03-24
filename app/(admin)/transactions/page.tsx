import { TransactionModal } from "@/components/admin/TransactionModal";

const TransactionPage = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl lg:text-3xl font-bold mb-12">Transactions</h1>
      <TransactionModal />
      <div className="mt-8"></div>
    </main>
  );
};

export default TransactionPage;
