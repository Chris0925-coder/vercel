export const TOKEN_SECRET = process.env.JW_SECRET;
// process.loadEnvFile();

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
