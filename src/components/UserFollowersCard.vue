<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ follower.length }}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <router-link
        :to="{ name: 'users', params: { id: follower.id } }"
        v-for="follower in follower"
        :key="follower.id"
      >
        <img :src="follower.image" width="60" height="60" class="avatar" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFollowersCard",
  props: {
    followers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      follower: this.followers,
    };
  },
};
</script>