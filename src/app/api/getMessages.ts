const ka = {
  internal_server_error: "სერვერზე დაფიქსირდა შეცდომა",
  required: "შევსება სავალდებულოა",
  min: "მინ. 2 სიმბოლო",
  min6: "მინ. 6 სიმბოლო",
  passwords_do_not_match: "პაროლები არ ემთხვევა",
  invalid_email: "არასწორი ელ. ფოსტა",
  user_created: "რეგისტრაცია წარმატებით დასრულდა",
  all_fields_required: "აუცილებელია მოცემული ველების შევსება: ",
  email_used: "ელ. ფოსტა გამოყენებულია",
  invalid_credentials: "ელ.ფოსტა ან პაროლი არასწორია",
  success: "მოთხოვნა წარმატებით შესრულდა",
  unauthorized: "არაავტორიზებული",
  invalid_title: "სათაური არასწორია",
  invalid_content: "შიგთავსი არასწორია",
  not_found: "მონაცემები ვერ მოიძებნა",
  forbidden: "წვდომა აკრძალულია",
};

const en: typeof ka = {
  internal_server_error: "Internal Server Error",
  required: "შევსება სავალდებულოა",
  min: "min. 2 symbols",
  min6: "min. 6 symbols",
  passwords_do_not_match: "Passwords do not match",
  invalid_email: "Invalid email",
  user_created: "Registration Success",
  all_fields_required: "All fields are required: ",
  email_used: "Email is already in use",
  invalid_credentials: "Invalid credentials",
  success: "Request was successful",
  unauthorized: "Unauthorized",
  invalid_title: "Title is invalid",
  invalid_content: "Content is invalid",
  not_found: "Data not found",
  forbidden: "Access forbidden",
};

export default function getMessages(req: Request) {
  const lang = req.headers.get("Accept-Language") || "en";
  return lang === "ka" ? ka : en;
}
