-- schema: supabase/schema.sql
-- Goal: Set up users, Razorpay token mechanics, and the Spaced Repetition model.

-- 1. Users table (extension of auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT auth.uid() REFERENCES auth.users(id),
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Token Wallet (Segregated balances for Rollover rules)
CREATE TABLE IF NOT EXISTS public.user_credits (
  user_id uuid PRIMARY KEY REFERENCES public.users(id),
  subscription_balance integer DEFAULT 0,  -- Resets monthly
  booster_balance integer DEFAULT 0,       -- Persists across billing cycles until consumed
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT valid_subscription_balance CHECK (subscription_balance >= 0),
  CONSTRAINT valid_booster_balance CHECK (booster_balance >= 0)
);

-- 3. Transactions Ledger (Audit Trail)
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id),
  amount integer NOT NULL, -- Negative for deduction, Positive for refill
  transaction_type text NOT NULL, -- 'signup_gift', 'monthly_refill', 'booster_pack', 'mcq_generation', 'pdf_ocr'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Questions Data
CREATE TABLE IF NOT EXISTS public.questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_type text NOT NULL, -- UPSC, SSC_CGL, JKPSC
  subject text NOT NULL,
  topic text NOT NULL,
  question_text text NOT NULL,
  options jsonb NOT NULL,
  correct_answer text NOT NULL,
  explanation text NOT NULL,
  difficulty integer,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Mistake Book (Spaced Repetition SM-2 engine)
CREATE TABLE IF NOT EXISTS public.mistake_book_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id),
  question_id uuid REFERENCES public.questions(id),
  status text DEFAULT 'learning', -- 'learning', 'reviewing', 'mastered'
  ease_factor real DEFAULT 2.5,
  interval integer DEFAULT 1,
  next_review_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, question_id)
);

-- Automation: Grant 200 Free Credits on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  
  -- Grant Welcome Gift
  INSERT INTO public.user_credits (user_id, booster_balance)
  VALUES (new.id, 200);

  -- Log Transaction
  INSERT INTO public.credit_transactions (user_id, amount, transaction_type)
  VALUES (new.id, 200, 'signup_gift');

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
