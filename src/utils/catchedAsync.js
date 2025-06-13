export const catchedAsync = (fn, b) => {
  return (req, res, next) => {
    fn(req, res).catch((err) => {
      res.status(400).render(b, { title: "HI", message: err.message });
      next(err);
    });
  };
};
