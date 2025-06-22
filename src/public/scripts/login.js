const form1 = document.getElementById("login");
const url = `https://wvlhqwzk-3000.use2.devtunnels.ms/`;

function form() {
  //   console.log(form1);

  form1.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form1);

    console.log("Message:", formData.get("username"), formData.get("password"));
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    alert("Login successfully!");
  });
}

form();
