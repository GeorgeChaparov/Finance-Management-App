"use server"

export async function signin(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const email = formData.get("email");
  
  if (!username || !password || !email) {
    console.log("No empty fields allowed.");
  }

  const response = await fetch("/api/users", {
    method: "POST", 
    body: JSON.stringify({username: username, password: password, email: email})
  })

  if(!response.ok) {
    console.log(await response.text());
    return;
  }
}