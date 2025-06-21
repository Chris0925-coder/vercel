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
