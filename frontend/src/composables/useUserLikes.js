import { inject, computed } from 'vue'

//composable to check if user has liked a blog or not.
export const useUserLikes = (blogId, likedBy) => {
  const { user } = inject('user')

  const userId = computed(()=> {
    if(user && user.value) {
      return user.value.id
    }
    return null
  })

  const userHasLiked = computed(() => {
    if (user.value && user.value.liked_blogs && user.value.liked_blogs.length) {
      return user.value.liked_blogs.find(b => b.id === blogId)
    }
    return null
  })

  return {
    userId,
    userHasLiked,
  }
}