<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <div class="col-3" v-for="user in users" :key="user.id">
        <a href="#">
          <img :src="user.image | emptyImage" width="140px" height="140px" />
        </a>
        <h2>{{ user.name }}</h2>
        <span class="badge badge-secondary"
          >追蹤人數：{{ user.FollowerCount }}</span
        >
        <p class="mt-3">
          <button
            type="button"
            class="btn btn-danger"
            v-if="user.isFollowed"
            @click.stop.prevent="deleteFollowing(user.id)"
          >
            取消追蹤
          </button>
          <button
            type="button"
            class="btn btn-primary"
            v-else
            @click.stop.prevent="addFollowing(user.id)"
          >
            追蹤
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import { emptyImageFilter } from "./../utils/mixins";
import userAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "UsersTop",
  mixins: [emptyImageFilter],
  components: {
    NavTabs,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await userAPI.getTopUsers();
        this.users = data.users;
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法載入資料",
        });
      }
    },
    async addFollowing(userId) {
      try {
        const { data } = await userAPI.addFollowing({ userId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user;
          }
          if (user.id === userId) {
            return {
              ...user,
              FollowerCount: user.FollowerCount + 1,
              isFollowed: true,
            };
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法加入我的最愛",
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await userAPI.deleteFollowing({ userId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user;
          } else if (user.id === userId) {
            return {
              ...user,
              FollowerCount: user.FollowerCount - 1,
              isFollowed: false,
            };
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法移除我的最愛",
        });
      }
    },
  },
};
</script>