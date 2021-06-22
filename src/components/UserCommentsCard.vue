<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ userComments.length }}</strong> 已評論餐廳
    </div>
    <div class="card-body">
      <router-link
        to="/restaurants/1"
        v-for="userComment in userComments"
        :key="userComment.id"
      >
        <img
          :src="userComment.Restaurant.image"
          width="60"
          height="60"
          class="avatar"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCommentsCard",
  props: {
    userCommentsCard: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      userComments: this.userCommentsCard,
    };
  },
};
</script>