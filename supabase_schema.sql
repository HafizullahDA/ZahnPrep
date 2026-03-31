-- schema: supabase/schema.sql
-- Goal: Set up user profiles with friction-free onboarding (30 free MCQs)

-- 1. User Profiles (extension of auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  free_mcqs_remaining INTEGER DEFAULT 30, -- The friction-free onboarding hook
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Subscriptions
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan_type TEXT NOT NULL, -- e.g., 'monthly_199', 'annual_1999'
  status TEXT NOT NULL, -- e.g., 'active', 'canceled', 'past_due'
  current_period_start TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Credit Transactions (Audit Trail)
CREATE TABLE credit_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL, -- Positive for adding (+2000), Negative for spending (-15)
  transaction_type TEXT NOT NULL, -- 'monthly_reset', 'booster_79', 'pdf_upload', 'mcq_generation'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Function: Get User Credit Balance
CREATE OR REPLACE FUNCTION get_user_credit_balance(target_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  total_balance INTEGER;
BEGIN
  SELECT COALESCE(SUM(amount), 0) INTO total_balance
  FROM credit_transactions
  WHERE user_id = target_user_id;
  
  RETURN total_balance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
