const updateBTN = document.getElementsByName("btn-id");
const form = document.getElementById("form");

// console.log(form);

function update() {
  updateBTN.forEach((btn) => {
    // console.log(btn);
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const formData = new FormData(form);
      // console.log(formData);
      // console.log(updateBTN);
      // console.log(formData.get("filename-b"));

      let result = await fetch(`/articles/${btn.value}`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json; charset=utf-8",
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Methods": "GET,HEADERS,POST,OPTIONS",
        // },
        body: JSON.stringify({
          id: btn.value,
          title: formData.get("title"),
          paragraph: formData.get("paragraph"),
          images: formData.get("filename"),
          link: formData.get("link"),
        }),
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
