import { LatestExpense, Expense, Beneficiary, ExpensesTable, ExpenseForm, BeneficiariesTableType, LatestExpenseRaw, BeneficiaryForm, MonthlyExpense } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";

// export function fetchCardData() {
//     return {
//         totalKamai: 1,
//         totalKharcha: 2,
//         totalBakaya: 3,
//         totalUdhari: 4,
//     };
// }

export async function fetchCardData() {
    try {
      // You can probably combine these into a single SQL query
      // However, we are intentionally splitting them to demonstrate
      // how to initialize multiple queries in parallel with JS.
      const kamaiCountsPromise = sql`
        SELECT COUNT(*)
        FROM expenses
        WHERE expenses.type = 'kamai'`;
      const udharCountsPromise = sql`
        SELECT COUNT(*)
        FROM expenses
        WHERE expenses.type = 'udhar'`;
      const kharchaCountsPromise = sql`
      SELECT COUNT(*)
      FROM expenses
      WHERE expenses.type = 'kharcha'`;
      const bakayaCountsPromise = sql`
      SELECT COUNT(*)
      FROM expenses
      WHERE expenses.type = 'bakaya'`;
  
      const data = await Promise.all([
        kamaiCountsPromise,
        kharchaCountsPromise,
        udharCountsPromise,
        bakayaCountsPromise
      ]);
      
      const kamaiCounts = Number(data[0].rows[0].count ?? '0');
      const kharchaCounts = Number(data[1].rows[0].count ?? '0');
      const udharCounts = Number(data[2].rows[0].count ?? '0');
      const bakayaCounts = Number(data[3].rows[0].cont ?? '0');
  
      return {
        kamaiCounts,
        kharchaCounts,
        udharCounts,
        bakayaCounts,
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch card data.');
    }
  }

// export function fetchFilteredExpenses(query: string, page: number) {
//     const filteredExpenses : Expense[] = [
//         {
//             id: "1",
//             name: "Chai",
//             amount: 10,
//             date: "12/4/24",
//             type: "kharcha"
//         }
//     ]

//     return filteredExpenses;
// }

// export function fetchExpenseById(id: string) {
//     const expense : Expense= {
//         id: id,
//         name: "Chai",
//         amount: 10,
//         date: "12/3/24",
//         type: "kharcha"
//     }

//     return expense;
// }

// export async function fetchBeneficiaries() {
//     try {
//         const data = await sql<Beneficiary>`
//           SELECT
//             id,
//             name
//           FROM beneficiaries
//           ORDER BY name ASC
//         `;
    
//         const customers = data.rows;
//         return customers;
//       } catch (err) {
//         console.error('Database Error:', err);
//         throw new Error('Failed to fetch all customers.');
//       }
// }


export async function fetchLatestExpenses() {
    try {
      const data = await sql<LatestExpenseRaw>`
        SELECT expenses.amount, beneficiaries.name, expenses.id
        FROM expenses
        JOIN beneficiaries ON expenses.beneficiary_id = beneficiaries.id
        ORDER BY expenses.date DESC
        LIMIT 5`;
  
      const latestExpenses = data.rows;
      return latestExpenses;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest expenses.');
    }
  }


// export function fetchMonthlyExpenses() {
//     return [
//         {
//             month: 'jan',
//             expenses: 1000
//         },
//         {
//             month: 'feb',
//             expenses: 1000
//         },
//         {
//             month: 'mar',
//             expenses: 1500
//         },
//         {
//             month: 'apr',
//             expenses: 1300
//         }
//     ]
// }

// export function fetchLatestExpenses() {
//     const latestExpenses : LatestExpense[] = [
//         {
//             id: "1",
//             name: "chay",
//             amount: 4,
//             date: "12/3/24"
//         }
//     ]

//     return latestExpenses;
// }

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredExpenses(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const expenses = await sql<ExpensesTable>`
      SELECT
        expenses.id,
        beneficiaries.name,
        expenses.date,
        expenses.amount,
        expenses.type
      FROM expenses
      JOIN beneficiaries ON expenses.beneficiary_id = beneficiaries.id
      WHERE
        beneficiaries.name ILIKE ${`%${query}%`} OR
        expenses.amount::text ILIKE ${`%${query}%`} OR
        expenses.date::text ILIKE ${`%${query}%`} OR
        expenses.type ILIKE ${`%${query}%`}
      ORDER BY expenses.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return expenses.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expenses.');
  }
}

export async function fetchExpenseById(id: string) {
    try {
      const data = await sql<ExpenseForm>`
        SELECT
          expenses.id,
          expenses.beneficiary_id,
          expenses.amount,
          expenses.date,
          expenses.type
        FROM expenses
        WHERE expenses.id = ${id};
      `;
  
        const expense = data.rows;
  
      return expense[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch expense.');
    }
}

export async function fetchBeneficiaries() {
    try {
      const data = await sql<Beneficiary>`
        SELECT
          id,
          name
        FROM beneficiaries
        ORDER BY name ASC
      `;
  
      const beneficiaries = data.rows;
      return beneficiaries;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all beneficiaries.');
    }
}

export async function fetchBeneficiariesById(id: string) : Promise<BeneficiaryForm> {
    try {
        const data = await sql<BeneficiaryForm>`
        SELECT id, name
        FROM beneficiaries
        WHERE id = ${id}
        `;

        const beneficiaries = data.rows;
        
        return beneficiaries[0];
    } catch(error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch all beneficiary.');
    }
}


export async function fetchFilteredBeneficiaries(query: string, currentPage: number) {

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
      const data = await sql<BeneficiariesTableType>`
          SELECT
            beneficiaries.id AS id,
            beneficiaries.name AS name,
            COUNT(expenses.id) AS total_transactions,
            SUM(CASE WHEN expenses.type = 'kharcha' THEN expenses.amount ELSE 0 END) AS total_kharcha,
            SUM(CASE WHEN expenses.type = 'kamai' THEN expenses.amount ELSE 0 END) AS total_kamai,
            SUM(CASE WHEN expenses.type = 'udhar' THEN expenses.amount ELSE 0 END) AS total_udhar,
            SUM(CASE WHEN expenses.type = 'bakaya' THEN expenses.amount ELSE 0 END) AS total_bakaya
          FROM beneficiaries
          LEFT JOIN expenses ON beneficiaries.id = expenses.beneficiary_id
          WHERE
            beneficiaries.name ILIKE ${`%${query}%`}
          GROUP BY beneficiaries.id, beneficiaries.name
          ORDER BY beneficiaries.name ASC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
  
      const beneficiaries = data.rows;
  
      return beneficiaries;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch beneficiaries table.');
    }
  }
  
export async function fetchMonthlyExpenses(): Promise<any>{
  try {
    const data = await sql`
      SELECT TO_CHAR(expenses.date, 'Month') as month, SUM(amount) as expenses
      FROM expenses
      WHERE EXTRACT(YEAR FROM expenses.date) = EXTRACT(YEAR FROM NOW())
      GROUP BY expenses.date
      LIMIT 12;
    `;

    const monthlyExpenses = data.rows;
    return monthlyExpenses;
  } catch(err) {
    console.error("Database error: ", err);
    throw new Error(`Database Error: Failed to fetch Monthly Expenses. ${err}`);
  }
}