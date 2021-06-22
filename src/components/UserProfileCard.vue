<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="user.profile.image" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ user.profile.name }}</h5>
          <p class="card-text">{{ user.profile.email }}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ user.profile.Comments.length }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ user.profile.FavoritedRestaurants.length }}</strong>
              收藏的餐廳
            </li>
            <li>
              <strong>{{ user.profile.Followings.length }}</strong> followings
              (追蹤者)
            </li>
            <li>
              <strong>{{ user.profile.Followers.length }}</strong> followers
              (追隨者)
            </li>
          </ul>
          <p>
            <router-link to="/users/1/edit" v-if="user.profile.isAdmin"
              ><button type="submit" class="btn btn-primary">
                edit
              </button></router-link
            >
          </p>
          <p class="mt-3">
            <button
              type="button"
              class="btn btn-danger"
              v-if="user.isFollowed"
              @click.stop.prevent="handleDeleteFollow"
            >
              取消追蹤
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-else
              @click.stop.prevent="handleAddFollow"
            >
              追蹤
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfileCard",
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
    };
  },
  methods: {
    handleAddFollow() {
      this.$emit("add-follow");
    },
    handleDeleteFollow() {
      this.$emit("delete-follow");
    },
  },
};
</script>