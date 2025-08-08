<template>
  <!-- 左側：影片區 -->
  <div class="w-full md:w-2/3">
    <VideoPlayer :videoUrl="course.videoURL" />
  </div>

  <!-- <div v-else class="text-center py-10 text-gray-500">載入中...</div> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getDatabase, ref as dbRef, onValue } from 'firebase/database'
import VideoPlayer from '@/components/CourseDetails/CourseVideoPlayer.vue'

const route = useRoute()
const courseId = route.params.id || 'algorithms-data-structures'

const course = ref(null)

onMounted(() => {
  const db = getDatabase()
  const courseRef = dbRef(db, `courses/${courseId}`)

  onValue(courseRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      course.value = data
    }
  })
})
</script>
