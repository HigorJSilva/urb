export const jwtConstants = {
  secret: process.env.SECRET ?? 'secret',
  expiresIn: '1w',
};
