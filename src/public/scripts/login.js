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

//  headers: {
//         "Content-Type": "application/json; charset=utf-8",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Methods": "GET,HEAD,POST,OPTIONS",
//       },
// Accept: "application/json, text/plain, */*",

// 2025:WebDev30!?

// .then((data) => {
//         console.log(data);
//         if (data.ok) {

//           setCookie("token", data);
//         }
//       })

const form1 = document.getElementById("login");
const url = `//wvlhqwzk-3000.use2.devtunnels.ms/`;

async function formA() {
  form1.addEventListener("submit", async function (event) {
    // console.log(event);
    event.preventDefault();
    const formData = new FormData(form1);

    // console.log("Message:", formData.get("username"), formData.get("password"));

    let result = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Methods": "GET,HEAD,POST,OPTIONS",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });

    // console.log(!result.error);
    if (result.error)
      return (document.getElementById("message").innerText = result.error);

    setCookie("token", result);
    window.location.reload();
  });
}

formA();
