import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Transition {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createAt: string;
}

// interface TransitionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

type TransitionInput = Omit<Transition, 'id' | 'createAt'>; // Retira os que for passado por paramentro

// type TransitionInput = Pick<Transition, 'title' | 'amount' | 'type' | 'category'>; Inclui na tipagem os tipos passados por paramentro

interface TransitionProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transition[];

  createTransaction: (transaction: TransitionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransitionProviderProps) {
  const [transactions, setTransactions] = useState<Transition[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransitionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction,
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
