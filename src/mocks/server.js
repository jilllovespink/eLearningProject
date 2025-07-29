import { createServer, Model, Response } from "miragejs";
import courses from "../data/courses.json";

// 假資料：課程分類
const categories = [
  {
    id: "human-resources",
    name: "人力資源",
    description: "學習人才招募、績效管理與組織發展等核心HR技能。",
  },
  {
    id: "entrepreneurship",
    name: "創業育成",
    description: "探索創業流程、募資技巧與新創企業經營策略。",
  },
  {
    id: "general-knowledge",
    name: "綜合知識",
    description: "跨領域知識匯整，提升全方位思維與學習力。",
  },
  {
    id: "marketing",
    name: "行銷流通",
    description: "掌握品牌推廣、數位行銷與通路經營等實務技巧。",
  },
  {
    id: "finance",
    name: "財務融通",
    description: "建立財務分析、會計基礎與資金規劃能力。",
  },
  {
    id: "information-tech",
    name: "資訊科技",
    description: "深入了解程式設計、資料庫與資訊系統應用。",
  },
];

export function makeServer() {
  createServer({
    models: {
      user: Model,
      instructor: Model,
      category: Model,
    },

    seeds(server) {
      server.db.loadData({
        users: [
          { email: "user@test.com", password: "123456", role: "User" },
          { email: "brand@test.com", password: "123456", role: "Brand" },
        ],
        categories,
        courses,
      });
    },

    routes() {
      this.namespace = "api";

      // 所有課程（僅列表）
      this.get("/courses", () => {
        return { courses };
      });

      // 單一課程（詳細資料，含講師與分類）
      this.get("/courses/:id", (schema, request) => {
        const { id } = request.params;
        const course = schema.db.courses.find(id);

        if (!course) {
          return new Response(404, {}, { error: "Course not found" });
        }

        const categoryId = course.category?.id;
        const category =
          schema.db.categories.findBy({ name: course.category }) || null;

        return {
          course: {
            ...course,
            category,
          },
        };
      });

      //   // 單一講師
      //   this.get("/instructors/:id", (schema, request) => {
      //     const { id } = request.params;
      //     const instructor = schema.db.instructors.find(id);

      //     if (!instructor) {
      //       return new Response(404, {}, { error: "Instructor not found" });
      //     }

      //     return { instructor };
      //   });

      this.get("/categories", (schema) => {
        return {
          categories: schema.db.categories,
        };
      });
      // 分類
      this.get("/categories/:id", (schema, request) => {
        const { id } = request.params;
        const category = schema.db.categories.find(id);

        if (!category) {
          return new Response(404, {}, { error: "Category not found" });
        }

        return { category };
      });

      // 模擬登入
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
