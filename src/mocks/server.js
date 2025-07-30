// import { createServer, Model, Response } from "miragejs";

// // 假資料：講師列表
// const instructors = [
//   {
//     id: "a1",
//     name: "Amy",
//     bio: "數位行銷專家，擁有 8 年實戰經驗，擅長社群行銷與品牌經營。",
//   },
//   {
//     id: "a2",
//     name: "Benjamin",
//     bio: "資深軟體工程師，專精 JavaScript 與後端開發。",
//   },
//   {
//     id: "a3",
//     name: "Catherine",
//     bio: "數位行銷顧問，精通 SEO 與內容行銷策略。",
//   },
//   { id: "a4", name: "Darren", bio: "程式語言講師，熟悉多種語言與演算法設計。" },
//   {
//     id: "a5",
//     name: "Ethan",
//     bio: "投資理財專家，擁有多年股市與基金操作經驗。",
//   },
// ];

// // 假資料：課程分類
// const categories = [
//   {
//     id: "c1",
//     name: "數位行銷類",
//     description: "這是關於數位行銷課的簡介段落。",
//   },
//   {
//     id: "c2",
//     name: "程式語言類",
//     description: "這是關於程式語言課的簡介段落。",
//   },
//   {
//     id: "c3",
//     name: "投資理財類",
//     description: "這是關於投資理財課的簡介段落。",
//   },
// ];

// // 假資料：課程列表（每門課只綁定 ID，詳細資訊用 route 補全）
// const courses = [
//   {
//     id: "1",
//     title: "社群媒體行銷策略入門",
//     description:
//       "學習如何規劃與執行有效的社群媒體行銷計畫，提升品牌曝光與互動。",
//     category: {
//       id: "c1",
//       name: "數位行銷類",
//     },
//     instructorId: "a1",
//     videos: [
//       {
//         id: "v1",
//         title: "課程介紹",
//         url: "https://www.youtube.com/embed/sample1",
//       },
//       {
//         id: "v2",
//         title: "社群平台分析",
//         url: "https://www.youtube.com/embed/sample2",
//       },
//     ],
//   },
//   {
//     id: "2",
//     title: "內容行銷與文案撰寫技巧",
//     description: "掌握內容行銷精髓與撰寫吸引人的文案技巧，讓行銷更具說服力。",
//     category: {
//       id: "c1",
//       name: "數位行銷類",
//     },
//     instructorId: "a1",
//     videos: [
//       {
//         id: "v3",
//         title: "內容策略制定",
//         url: "https://www.youtube.com/embed/sample3",
//       },
//       {
//         id: "v4",
//         title: "文案寫作技巧",
//         url: "https://www.youtube.com/embed/sample4",
//       },
//     ],
//   },
//   {
//     id: "3",
//     title: "SEO 優化實戰",
//     description: "深入了解搜尋引擎運作，提升網站排名與自然流量。",
//     category: {
//       id: "c1",
//       name: "數位行銷類",
//     },
//     instructorId: "a3",
//     videos: [
//       {
//         id: "v5",
//         title: "SEO 基礎",
//         url: "https://www.youtube.com/embed/sample5",
//       },
//       {
//         id: "v6",
//         title: "關鍵字策略",
//         url: "https://www.youtube.com/embed/sample6",
//       },
//     ],
//   },
//   {
//     id: "4",
//     title: "品牌經營與數位廣告投放",
//     description: "學習品牌塑造技巧與數位廣告操作，精準觸及目標客群。",
//     category: {
//       id: "c1",
//       name: "數位行銷類",
//     },
//     instructorId: "a3",
//     videos: [
//       {
//         id: "v7",
//         title: "品牌策略",
//         url: "https://www.youtube.com/embed/sample7",
//       },
//       {
//         id: "v8",
//         title: "廣告投放實務",
//         url: "https://www.youtube.com/embed/sample8",
//       },
//     ],
//   },
//   {
//     id: "5",
//     title: "JavaScript 基礎與應用",
//     description: "從零開始學習 JavaScript，掌握網頁互動與動態效果開發。",
//     category: {
//       id: "c2",
//       name: "程式語言類",
//     },
//     // j
//     instructorId: "a2",
//     videos: [
//       {
//         id: "v9",
//         title: "JS 語法基礎",
//         url: "https://www.youtube.com/embed/sample9",
//       },
//       {
//         id: "v10",
//         title: "DOM 操作",
//         url: "https://www.youtube.com/embed/sample10",
//       },
//     ],
//   },
//   {
//     id: "6",
//     title: "Python 程式設計入門",
//     description: "介紹 Python 基本語法及常用函式，適合初學者入門。",
//     category: {
//       id: "c2",
//       name: "程式語言類",
//     },
//     instructorId: "a4",
//     videos: [
//       {
//         id: "v11",
//         title: "Python 基礎",
//         url: "https://www.youtube.com/embed/sample11",
//       },
//       {
//         id: "v12",
//         title: "資料結構",
//         url: "https://www.youtube.com/embed/sample12",
//       },
//     ],
//   },
//   {
//     id: "7",
//     title: "演算法與資料結構實作",
//     description: "學習常見演算法與資料結構，強化程式設計能力。",
//     category: {
//       id: "c2",
//       name: "程式語言類",
//     },
//     instructorId: "a4",
//     videos: [
//       {
//         id: "v13",
//         title: "排序演算法",
//         url: "https://www.youtube.com/embed/sample13",
//       },
//       {
//         id: "v14",
//         title: "樹與圖",
//         url: "https://www.youtube.com/embed/sample14",
//       },
//     ],
//   },
//   {
//     id: "8",
//     title: "股市投資入門",
//     description: "理解股市運作機制，掌握基礎投資策略與風險控管。",
//     category: {
//       id: "c3",
//       name: "投資理財類",
//     },
//     instructorId: "a5",
//     videos: [
//       {
//         id: "v15",
//         title: "股市基礎",
//         url: "https://www.youtube.com/embed/sample15",
//       },
//       {
//         id: "v16",
//         title: "投資組合管理",
//         url: "https://www.youtube.com/embed/sample16",
//       },
//     ],
//   },
//   {
//     id: "9",
//     title: "基金與理財規劃",
//     description: "學習基金種類及理財規劃技巧，提升資產增值能力。",
//     category: {
//       id: "c3",
//       name: "投資理財類",
//     },
//     instructorId: "a5",
//     videos: [
//       {
//         id: "v17",
//         title: "基金介紹",
//         url: "https://www.youtube.com/embed/sample17",
//       },
//       {
//         id: "v18",
//         title: "理財規劃",
//         url: "https://www.youtube.com/embed/sample18",
//       },
//     ],
//   },
// ];

// export function makeServer() {
//   createServer({
//     models: {
//       user: Model,
//       instructor: Model,
//       category: Model,
//     },

//     seeds(server) {
//       server.db.loadData({
//         users: [
//           { email: "user@test.com", password: "123456", role: "User" },
//           { email: "brand@test.com", password: "123456", role: "Brand" },
//         ],
//         categories,
//         courses,
//         instructors,
//       });
//     },

//     routes() {
//       this.namespace = "api";

//       // 所有課程（僅列表）
//       this.get("/courses", () => {
//         return { courses };
//       });

//       // 單一課程（詳細資料，含講師與分類）
//       this.get("/courses/:id", (schema, request) => {
//         const { id } = request.params;
//         const course = schema.db.courses.find(id);

//         if (!course) {
//           return new Response(404, {}, { error: "Course not found" });
//         }

//         const instructor = instructors.find(
//           (i) => i.id === course.instructorId
//         );

//         const categoryId = course.category?.id;
//         const category = categoryId
//           ? schema.db.categories.find(categoryId)
//           : null;

//         return {
//           course: {
//             ...course,
//             instructor,
//             category,
//           },
//         };
//       });

//       // 單一講師
//       this.get("/instructors/:id", (schema, request) => {
//         const { id } = request.params;
//         const instructor = schema.db.instructors.find(id);

//         if (!instructor) {
//           return new Response(404, {}, { error: "Instructor not found" });
//         }

//         return { instructor };
//       });

//       this.get("/categories", (schema) => {
//         return {
//           categories: schema.db.categories,
//         };
//       });
//       // 分類
//       this.get("/categories/:id", (schema, request) => {
//         const { id } = request.params;
//         const category = schema.db.categories.find(id);

//         if (!category) {
//           return new Response(404, {}, { error: "Category not found" });
//         }

//         return { category };
//       });

//       // 模擬登入
//       this.post("/login", (schema, request) => {
//         const { email, password } = JSON.parse(request.requestBody);
//         const user = schema.db.users.findBy({ email, password });

//         if (!user) {
//           return new Response(401, {}, { error: "帳號或密碼錯誤" });
//         }

//         return {
//           token: `${user.role.toLowerCase()}-token`,
//           role: user.role,
//           user: {
//             name: `${user.role} 測試者`,
//             email,
//           },
//         };
//       });
//     },
//   });
// }
