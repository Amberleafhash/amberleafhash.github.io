import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xoidtnrimwwelwvybdrr.supabase.co';         // Replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaWR0bnJpbXd3ZWx3dnliZHJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMTExODgsImV4cCI6MjA2NzU4NzE4OH0.hTyNWIxBAXB9r6wiKvFGmWBaxW3_2xLmgXudPNEI1SM';                        // Replace with your anon/public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
