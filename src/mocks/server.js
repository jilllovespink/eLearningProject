import { createServer, Model, Response } from "miragejs";

export function makeServer() {
  createServer({
    models: {
      user: Model,
    },
    seeds(server) {
      server.db.loadData({
        users: [
          { email: "user@test.com", password: "123456", role: "User" },
          { email: "brand@test.com", password: "123456", role: "Brand" },
        ],
      });
    },
    routes() {
      this.namespace = "api";

      this.post("/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = schema.db.users.findBy({ email, password });

        if (!user) {
          return new Response(401, {}, { error: "帳號或密碼錯誤" });
        }
        return {
          token: `${user.role.toLowerCase()}-token`,
          role: user.role,
          user: {
            name: `${user.role} 測試者`,
            email,
          },
        };
      });
    },
  });
}
