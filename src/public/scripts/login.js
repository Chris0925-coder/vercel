const form1 = document.getElementById("login");
const url = `https://wvlhqwzk-3000.use2.devtunnels.ms/login`;

function form() {
  // console.log(form1)

  form1.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form1);

    // console.log("Message:", formData.get("email"), formData.get("control"));
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("username"),
        control: formData.get("password"),
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    alert("Login successfully!");
  });
}

form();
