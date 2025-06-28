const connectDB = require("../../config/db");
const favoritoService = require("./services");
const verifyToken = require("../../config/auth");

exports.main = async (event, context) => {
  await connectDB();
  // Verificar autenticación antes de cualquier acción
  const authResult = await verifyToken(event);
  if (authResult && authResult.statusCode) return authResult;
  const userId = authResult.userId;

  const { httpMethod, pathParameters, body } = event;
  try {
    switch (httpMethod) {
      case "GET":
        if (pathParameters && pathParameters.id) {
          const favorito = await favoritoService.getFavoritoById(
            pathParameters.id,
            userId
          );
          if (!favorito) return { statusCode: 404, body: "No encontrado" };
          return { statusCode: 200, body: JSON.stringify(favorito) };
        } else {
          const favoritos = await favoritoService.getAllFavoritos(userId);
          return { statusCode: 200, body: JSON.stringify(favoritos) };
        }
      case "POST":
        const nuevo = await favoritoService.createFavorito(JSON.parse(body));
        return { statusCode: 201, body: JSON.stringify(nuevo) };
      case "PUT":
        if (!pathParameters || !pathParameters.id)
          return { statusCode: 400, body: "ID requerido" };
        const actualizado = await favoritoService.updateFavorito(
          pathParameters.id,
          JSON.parse(body)
        );
        if (!actualizado) return { statusCode: 404, body: "No encontrado" };
        return { statusCode: 200, body: JSON.stringify(actualizado) };
      case "DELETE":
        if (!pathParameters || !pathParameters.id)
          return { statusCode: 400, body: "ID requerido" };
        const eliminado = await favoritoService.deleteFavorito(
          pathParameters.id
        );
        if (!eliminado) return { statusCode: 404, body: "No encontrado" };
        return { statusCode: 204 };
      default:
        return { statusCode: 405, body: "Método no permitido" };
    }
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
