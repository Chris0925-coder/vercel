const updateBTN = document.getElementsByName("id");
const form = document.getElementById("form-update");
const fileInput = document.getElementById("images-update");
const files = fileInput.files;

const addForm = document.getElementById("form");
const addBTN = document.getElementById("add-btn");

// const formData = new FormData(form);
// console.log(formData);
// console.log(fileInput);
// console.log(files);
const data = fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  // console.log(e);
  // console.log(file);

  return file;
});

async function addArticle() {
  // addForm.forEach((btn) => {
  // console.log(btn.value);
  addForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    // formData.append("filename", file)
    const formData = new FormData(addForm);
    // const filename = formData.get("filename");
    // console.log(formData);
    // console.log(filename);
    // console.log(updateBTN);
    // console.log(formData.get("filename-b"));

    let result = await fetch(`/articles`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json; charset=utf-8",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Methods": "GET,PUT,POST,OPTIONS",
      // },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Added article successfully!");
          window.location.reload();
        } else {
          alert("Failed to send the form submission.");
        }
      })
      .catch((error) => console.error("Error:", error));

    // console.log(result);
    // });
  });
}

addArticle();

function update() {
  updateBTN.forEach((btn) => {
    // console.log(btn.value);
    btn.addEventListener("click", async function (event) {
      event.preventDefault();
      // formData.append("filename", file)
      const formData = new FormData(form);
      // const filename = formData.get("filename");
      // console.log(formData);
      // console.log(filename);
      // console.log(updateBTN);
      // console.log(formData.get("filename-b"));

      let result = await fetch(`/articles/${btn.value}`, {
        method: "PUT",
        // headers: {
        //   "Content-Type": "application/json; charset=utf-8",
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Methods": "GET,PUT,POST,OPTIONS",
        // },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert("Update article successfully!");
          } else {
            alert("Failed to update the form submission.");
          }
        })
        .catch((error) => console.error("Error:", error));

      // console.log(result);
    });
  });
}

update();

const deleteBTN = document.getElementsByName("btn-delete");

function deleteArticle() {
  deleteBTN.forEach((btn) => {
    // console.log(btn);
    btn.addEventListener("click", async function (event) {
      // const formData = new FormData(form);
      // console.log(formData);
      // console.log(updateBTN);
      // console.log(formData.get("filename-b"));
      event.preventDefault();

      // console.log("Delete " + btn.value);
      let result = await fetch(`/articles/${btn.value}`, {
        method: "DELETE",
        // headers: {
        //   "Content-Type": "application/json; charset=utf-8",
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Methods": "GET,HEADERS,POST,OPTIONS",
        // },
        body: JSON.stringify({
          id: btn.value,
          // title: formData.get("title"),
          // paragraph: formData.get("paragraph"),
          // images: formData.get("filename-b"),
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("DELETE article successfully!");
            window.location.reload();
          } else {
            alert("Failed to delete the form submission.");
          }
        })
        .catch((error) => console.error("Error:", error));

      // console.log(result);
    });
  });
}

deleteArticle();
