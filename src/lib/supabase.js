import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://anaxqfzewcyoyjrflcqy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuYXhxZnpld2N5b3lqcmZsY3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NDM5MzIsImV4cCI6MjA1OTUxOTkzMn0.SK3QPQGKeTDkPpm-d7v8yWyhYYnqQm31XqK1tzxMnfU';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);