export function validation(values, setError) {
  const { first_name, last_name, email } = values;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (first_name.trim() === "") {
    setError({
      first_name: "Please enter a first name",
    });
    return false;
  } else if (last_name.trim() === "") {
    setError({
      last_name: "Please enter a last name",
    });
    return false;
  } else if (email.trim() === "") {
    setError({
      email: "Please enter a valid email",
    });
    return false;
  } else if (!emailRegex.test(email)) {
    setError({ email: "Please enter a valid email" });
    return false;
  } else {
    setError({});
    return true;
  }
}
