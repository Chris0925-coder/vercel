async function messages() {
  const url = await fetch("/submit").then((msg) => msg.json());
  // console.log(url);

  url.forEach((element) => {
    // console.log(element);

    document.querySelector(
      "#messages"
    ).innerHTML += `<article class="msg"><p>Email: ${element.email}</p><p>Message: ${element.control}</p></article>`;
  });
}

messages();

// https://wvlhqwzk-3000.use2.devtunnels.ms

function form() {
  // console.log(form1)

  form1.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form1);

    console.log("Message:", formData.get("email"), formData.get("control"));
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        control: formData.get("control"),
      }),
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    alert("Form submitted successfully!");
  });
}

form();
