export const TOKEN_SECRET = "some secret key";

export const config = {
  application: {
    cors: {
      server: [
        {
          origin: "localhost:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre127.0.0.1
          credentials: true,
        },
      ],
    },
  },
};
