const button = document.querySelector(".nav-button");
const menu = document.querySelector(".collapse");

button.addEventListener("click", () => {
  menu.classList.toggle("navbar-collapse");
});

const blog = document.getElementById("blog");
const showUserMsg = document.getElementById("users_msg");
const cblog = blog.querySelector(".item:nth-child(2)");
const cblogB = blog.querySelector(".item:nth-child(3)");
const cmsg = showUserMsg.querySelector(".item:nth-child(2)");
const newDiv = document.createElement("div");
const newArticle = document.createElement("div");
const card = document.querySelector(".body-card");

async function setCookie(cname, cvalue, exdays) {
  let d = new Date();

  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();

  document.cookie = (await cname) + "=" + cvalue + ";" + expires + ";path=/";
  // document.cookie =  `${encodeURIComponent(cname)}=${encodeURIComponent(cvalue)};${expires};path=/`;
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
  // let decodedCookie = decodeURIComponent(document.cookie);

  setCookie(cname, "", -1);
  // decodedCookie.split(";").forEach((cookie) => {
  //     console.log(cookie);
  // const nombre = cookie.split("=")[0].trim();
  // console.log(nombre);
  // setCookie(nombre," ", -1);
  // });
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
  return "";
}

const message = document.getElementById("message");
const form = document.getElementById("form");
// const url = "https://visits-woad.vercel.app/crcv/login";
const url = "http://localhost:3000/crcv/test";

function login() {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    message.style.color = "#009900";
    message.innerText = "Iniciando sesion...";
    const formData = new FormData(form);

    let result = await fetch(url, {
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
        message.style.color = "#990000";
        message.innerText = error;
      });

    console.log(result);

    console.log(!result.error);
    console.log(setCookie("token", result, 7));
    if (!result.error) {
      await setCookie("token", result, 7);
      // card.setAttribute("id", "hidden");
      // showUserMsg.removeAttribute("class");
      // blog.removeAttribute("class");

      // window.location.reload();
    } else {
      removeCookie("token");
      card.removeAttribute("id");
      showUserMsg.setAttribute("class", "hidden");
      blog.setAttribute("class", "hidden");

      // window.location.reload();

      message.style.color = "#990000";
      message.innerText = result.error;
    }
  });
}

login();

function content(visitas, dominio, fecha, clicks) {
  newDiv.innerHTML += `
    <article>
      <h4>Dominio: ${dominio}</h4>
      <p>Total de visitas: <span>${visitas}</span></p>
      <p>Última visita: <span>${fecha}</span></p>
      <p>Clicks: <span>${clicks}</span></p>
    </article>
  `;

  blog.insertBefore(newDiv, cblog);
}

function contentB(visitas, dominio, fecha) {
  newDiv.innerHTML += `
    <article>
      <h4>Ruta de página: ${dominio}</h4>
      <p>Visitas: <span>${visitas}</span></p>
      <p>Fecha: <span>${fecha}</span></p>
    </article>
  `;

  blog.insertBefore(newDiv, cblogB);
}

function contentC(nombre, email, phone, control, date) {
  newArticle.innerHTML += `
    <article>
      <h4>Nombre: ${nombre}</h4>
      <p>Correo: <a href="mailto:${email}" target="_blank"><span>${email}</span></a></p>
      <p>Telefono: <a target="_blank" href="https://wa.me/${phone}"><span>${phone}</span></a></p>
      <p>Comentario: <span>${control}</span></p>
      <span>${date}</span>
    </article>
    <br><hr>
  `;

  showUserMsg.insertBefore(newArticle, cmsg);
}

const token = getCookie("token");

async function fetchContent() {
  let result = await fetch(`https://visits-woad.vercel.app/crcv/login`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Methods": "GET,HEAD,POST,OPTIONS",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error.message);
      blog.style.color = "#990000";
      blog.innerText = error.message;
    });

  if (result.message === "Invalid token") {
    removeCookie("token");
    card.removeAttribute("id");
    blog.setAttribute("id", "hidden");

    return (message.innerText = result.message + " Inicia sesion");
  }

  if (!result.error) {
    // console.log(result.rows[0]);
    // result.rows[0].forEach(res => {
    let sumVisitas = result.rows[0][0] + result.rows[0][4];
    // console.log(sumVisitas);
    content(
      sumVisitas,
      result.rows[0][1],
      result.rows[0][2],
      result.rows[0][3],
    );
    contentB(result.rows[0][4], result.rows[0][6], result.rows[0][5]);

    // return await ;
    // })
  }
}

async function showMSG() {
  // let token = getCookie("token");

  let result = await fetch(`https://visits-woad.vercel.app/crcv/submit`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Methods": "GET,HEAD,POST,PATCH",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error.message);
      showUserMsg.style.color = "#990000";
      showUserMsg.innerText = error.message;
    });

  // console.log(result.message);

  if (!result.error) {
    let mensage = result;

    mensage.forEach((msg) => {
      contentC(msg.name, msg.email, msg.phone, msg.control, msg.date);
    });
    // result.rows[0].forEach(res => {

    // return await ;
    // })
  }
}

// const sectionAdForm = document.getElementById('submit-ad');

function showViews() {
  if (detectCookie("token")) {
    card.setAttribute("id", "hidden");
    showUserMsg.removeAttribute("class");
    blog.removeAttribute("class");
    fetchContent();
    showMSG();
    // sectionAdForm.removeAttribute("class", "hidden");
  } else {
    card.removeAttribute("id");
    showUserMsg.setAttribute("class", "hidden");
    blog.setAttribute("class", "hidden");
    message.innerText = "Inicia sesion";
  }
}

showViews();
