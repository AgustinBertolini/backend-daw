const authService = require("./services");

// Ejemplo de uso: crear token
// const token = await authService.createToken(userId);
// Ejemplo de uso: verificar token en DB
// const result = await authService.verifyTokenInDB(token);
// Ejemplo de uso: verificar token sin DB
// const result = authService.verifyToken(token);

module.exports = authService;
