function setCookie(cname, cvalue, exdays) {
  let d = new Date();

  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();

  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function removeCookie(cname) {
  getCookie(cname, "", -1);
}

function detectCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0 && name.length != c.length) {
      return true;
    }
  }
  return false;
}

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
      .then((data) => {
        console.log(data);
        setCookie("token", data);
      })
      .catch((error) => console.error("Error:", error));

    // alert("Login successfully!");
  });
}

form();
