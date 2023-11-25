async function handleSignOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.log("error signing out");
  else {
    resetSession();
    resetUser();
  }
}
