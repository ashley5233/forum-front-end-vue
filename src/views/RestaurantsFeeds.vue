<template>
  <div class="container py-5">
    <NavTabs />

    <h1 class="mt-5">最新動態</h1>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
        <NewestResutaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <!-- 最新評論 NewestComments-->
        <h3>最新評論</h3>
        <NewestComments :comments="comments" />
      </div>
    </div>
  </div>
</template>
<script>
import NavTabs from "../components/NavTabs.vue";
import NewestResutaurants from "../components/NewestRestaurants.vue";
import NewestComments from "../components/NewestComments.vue";
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    NavTabs,
    NewestResutaurants,
    NewestComments,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    async fetchFeeds() {
      try {
        const response = await restaurantsAPI.getFeeds();
        const { restaurants, comments } = response.data;
        this.restaurants = restaurants;
        this.comments = comments;
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法取得資料",
        });
      }
    },
  },
};
</script>