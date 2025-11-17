async function messages() {
  const url = await fetch("/submit").then((msg) => msg.json());
  // console.log(url);

  let messages = document.querySelector("#messages");
  let item = messages.querySelector("item:nth-child(2)");
  let itemB = messages.querySelector("item:nth-child(3)");

  url.forEach((element) => {
    let b = document.createElement("div");
    // b.innerHTML = `<button name="del-btn" value="${element.id}">${element.id}</button>`;

    // console.log(element);

    b.innerHTML += `
                    <article class="msg">
                      <p>Email: ${element.email}</p>
                      <p>Message: ${element.control}</p>
                    </article>`;

    b.setAttribute("name", "del");
    b.setAttribute("class", "del");
    b.setAttribute("value", element.id);

    let c = document.createElement("button");
    c.setAttribute("name", "del-btn");
    c.setAttribute("value", element.id);

    c.innerHTML += `<span> ${element.id} </span>`;

    // console.log(document.querySelector("#messages > div"));

    // delBTN(b);
    messages.insertBefore(b, item);
    messages.insertBefore(c, itemB);

    delBTN(c);
  });
}

// document.querySelector("#messages > div:nth-child(5)")
messages();

function delBTN(a) {
  // console.log(a);
  // a.forEach((btn) => {
  // console.log(a.value);
  a.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(a.value);
    await fetch(`/submit/${a.value}`, {
      method: "DELETE",
      body: a.value,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        // window.location.href = "https://soporte-tecnico.pages.dev/";
        window.location.reload();
      })
      .catch((error) => console.error("Error:", error));
  });
  // });
}

// const btns = document.getElementsByClassName("del");

// console.log(btns);

// delBTN(Array.from(btns));
// delBTN(b);

// messages();

// https://wvlhqwzk-3000.use2.devtunnels.ms

// function form() {
// console.log(form1)

// form1.addEventListener("submit", async function (event) {
//   event.preventDefault();
// Prevent default form submission
//     const formData = new FormData(form1);

//     console.log("Message:", formData.get("email"), formData.get("control"));
//     await fetch(url, {
//       method: "POST",
//       body: JSON.stringify({
//         email: formData.get("email"),
//         control: formData.get("control"),
//       }),
//     })
//       .then((response) => response.text())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => console.error("Error:", error));

//     alert("Form submitted successfully!");
//   });
// }

// form();
