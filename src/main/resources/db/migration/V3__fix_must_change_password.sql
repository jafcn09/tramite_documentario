-- Fix must_change_password for existing users to allow login
-- Set all users to false so they don't get HTTP 428 error on login
-- This prevents HTTP 428 PRECONDITION_REQUIRED error during authentication
UPDATE usuarios SET must_change_password = FALSE;
