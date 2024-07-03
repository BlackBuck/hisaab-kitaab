'use server';
import {z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import {redirect} from 'next/navigation';
import {signIn} from '@/auth';
import credentials from 'next-auth/providers/credentials';

const BeneficiaryFormSchema = z.object({
    id: z.string(),
    name: z.string(),
});


const FormSchema = z.object({
    id: z.string(),
    beneficiary_id: z.string({
      invalid_type_error: 'Please select a beneficiary.',
    }),
    amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),
    type: z.enum(['kharcha', 'kamai', 'udhar', 'bakaya'], {
      invalid_type_error: 'Please select an invoice type.',
    }),
    date: z.string(),
});

export type State = {
    errors?: {
        beneficiaryId?: string[];
        amount?: string[];
        type?: string[];
    };
    message?: string | null | undefined;
}

const CreateExpense = FormSchema.omit({id: true, date: true});

const UpdateExpense = FormSchema.omit({ id: true, date: true });

const DeleteBeneficiary = BeneficiaryFormSchema.omit({ name: true});

const CreateBeneficiary = BeneficiaryFormSchema.omit({ id: true});


export async function createExpense(prevState: State, formData: FormData) : Promise<any> {
    // Validate form using Zod
    const validatedFields = CreateExpense.safeParse({
      beneficiary_id: formData.get('beneficiaryId'),
      amount: formData.get('amount'),
      type: formData.get('type'),
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Expense.',
      };
    }
   
    // Prepare data for insertion into the database
    const { beneficiary_id, amount, type } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];
   
    // Insert data into the database
    try {
      await sql`
        INSERT INTO expenses (beneficiary_id, amount, type, date)
        VALUES (${beneficiary_id}, ${amount}, ${type}, ${date})
      `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Expense.',
      };
    }
   
    // Revalidate the cache for the expenses page and redirect the user.
    revalidatePath('/dashboard/expenses');
    redirect('/dashboard/expenses');
  }

 
export async function updateExpense(id: string, prevState: State, formData: FormData) : Promise<any> {
  
    const validatedFields = UpdateExpense.safeParse({
        beneficiary_id: formData.get('beneficiaryId'),
        amount: formData.get('amount'),
        type: formData.get('type'),
      });
     
      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Update Expense.',
        };
      }
     
      const { beneficiary_id, amount, type } = validatedFields.data;
 
  try {
    await sql`
    UPDATE expenses
    SET beneficiary_id = ${beneficiary_id}, amount = ${amount}, type = ${type}
    WHERE id = ${id}
  `;
  } catch(err) {
    return {
        message: "Database Error: Failed to update expense."
    }
  }
 
  revalidatePath('/dashboard/expenses');
  redirect('/dashboard/expenses');
}

export async function deleteExpense(id: string) {
    try {
        await sql`DELETE FROM expenses WHERE id = ${id}`;
    } catch(err) {
        return {
            message: "Database Error: Failed to Delete Expense"
        }
    }
    revalidatePath('/dashboard/expenses');
}

export async function createBeneficiary(formData: FormData) {
    const validatedFields = CreateBeneficiary.safeParse({
        name: formData.get('name'),
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Beneficiary.',
        };
    }
    
    const {name} = validatedFields.data;

    try {

        await sql`
        INSERT INTO beneficiaries(name)
        VALUES (${name})`;
    } catch(error) {
        return {
            message: "Database Error: Failed to create beneficiary."
        }
    }

    revalidatePath('/dashboard/beneficiaries');
    redirect("/dashboard/beneficiaries");
}

export async function udpateBenficiary(formData: FormData) {
    const validatedFields = BeneficiaryFormSchema.safeParse({
        id: formData.get('id'),
        name: formData.get('name'),
    });
    
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Update Beneficiary.',
        };
    }

    try {

        const {id, name} = validatedFields.data;

        await sql`
        UPDATE beneficiaries
        SET name = ${name}
        WHERE id = ${id}
        `;
        
    } catch(error) {
        return {
            message: "Database Error: Failed to Update Beneficiary."
        }
    }

    revalidatePath("/dashboard/beneficiaries");
    redirect("/dashboard/beneficiaries");
}

export async function deleteBeneficiary(id: string) {

    try {
        await sql`DELETE FROM beneficiaries WHERE id = ${id}`;
    } catch(err) {
        return {
            message: "Database Error: Failed to Delete Beneficiary"
        }
    }
    revalidatePath('/dashboard/beneficiaries');
}

export async function authenticate(prevState: string | undefined, formData: FormData) : Promise<any> {
    try {

        await signIn('credentials', formData);
    } catch(err) {
        // if(err instanceof AuthError) {
        //     switch(err.type) {
        //         case 'CredentialsSignin':
        //             return "Invalid credentials";
        //         default:
        //             return "Something went wrong.";
        //     }
        // }
        throw err;
    }
}