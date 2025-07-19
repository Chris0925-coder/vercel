export const TOKEN_SECRET = "some secret key";

export const config = {
  application: {
    cors: {
      server: [
        {
          origin: "*", //servidor que deseas que consuma o (*) en caso que sea acceso libre 127.0.0.1
          credentials: true,
        },
      ],
    },
  },
};
