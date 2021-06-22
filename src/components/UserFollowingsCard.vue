<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ following.length }}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <router-link
        :to="{ name: 'users', params: { id: follow.id } }"
        v-for="follow in following"
        :key="follow.id"
      >
        <img :src="follow.image" width="60" height="60" class="avatar" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFollowingsCard",
  props: {
    followings: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      following: this.followings,
    };
  },
};
</script>