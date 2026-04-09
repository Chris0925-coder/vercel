let controller = {};

controller.fundation = async (req, res) => {
  res.render("fundation.html", { title: "COMPARTIENDO SONRISAS" });
};

controller.contacto = async (req, res) => {
  console.log(
    res.render("pages/contacto.html", { title: "COMPARTIENDO SONRISAS" }),
  );
  res.render("/pages/contacto.html", { title: "COMPARTIENDO SONRISAS" });
};

controller.video = async (req, res) => {
  res.render("/pages/video.html", { title: "COMPARTIENDO SONRISAS" });
};

export default controller;
