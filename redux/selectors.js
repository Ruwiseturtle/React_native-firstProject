export const selectGetPosts = (state) => state.postsStore.posts;
export const selectIsLoading = (state) => state.postsStore.isLoading;
export const selectErrorLoadPosts = (state) => state.postsStore.error;

export const selectCurrentUser = (state) => state.authStore.currentUser;
export const selectToken = (state) => state.authStore.token;

export const selectUsers = (state) => state.usersStore.users;