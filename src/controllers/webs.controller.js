let controller = {};

controller.fundation = async (req, res) => {
  res.render("crcv.html", { title: "CRCV" });
};

controller.contacto = async (req, res) => {
  res.render("pages/contacto.html", { title: "COMPARTIENDO SONRISAS" });
};

controller.video = async (req, res) => {
  res.render("pages/video.html", { title: "COMPARTIENDO SONRISAS" });
};

export default controller;
