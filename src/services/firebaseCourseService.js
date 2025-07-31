import { database } from "@/services/firebase";
import { ref, get } from "firebase/database";

export async function getAllCourses() {
  const coursesRef = ref(database, "courses");
  const instructorsRef = ref(database, "instructors");
  const categoriesRef = ref(database, "categories");

  try {
    const [coursesSnap, instructorsSnap, categoriesSnap] = await Promise.all([
      get(coursesRef),
      get(instructorsRef),
      get(categoriesRef),
    ]);

    const coursesData = coursesSnap.exists() ? coursesSnap.val() : {};
    const instructorsData = instructorsSnap.exists()
      ? instructorsSnap.val()
      : {};
    const categoriesData = categoriesSnap.exists() ? categoriesSnap.val() : {};

    const courses = Object.entries(coursesData).map(([id, course]) => ({
      id,
      ...course,
      instructor: instructorsData[course.instructorId] || null,
      category: categoriesData[course.category] || null,
    }));

    return courses;
  } catch (error) {
    console.error("資料載入失敗：", error);
    return [];
  }
}
