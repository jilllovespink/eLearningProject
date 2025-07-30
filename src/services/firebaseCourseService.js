import { database } from "@/services/firebase";
import { ref, get } from "firebase/database";

export async function getAllCourses() {
  const coursesRef = ref(database, "courses");
  const snapshot = await get(coursesRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    // Realtime Database 回傳物件，要轉成陣列帶 id
    return Object.entries(data).map(([id, course]) => ({ id, ...course }));
  } else {
    return [];
  }
}
