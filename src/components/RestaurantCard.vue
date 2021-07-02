<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        :src="restaurant.image"
        alt="Card image cap"
        width="286px"
        height="180px"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <a href="#"> {{ restaurant.name }} </a>
        </p>
        <span class="badge badge-secondary">{{
          restaurant.Category.name
        }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button
          type="button"
          v-if="restaurant.isFavorited"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
          class="btn btn-danger btn-border favorite mr-2"
        >
          移除最愛
        </button>
        <button
          type="button"
          v-else
          @click.stop.prevent="addFavorite(restaurant.id)"
          class="btn btn-primary btn-border favorite mr-2"
        >
          加到最愛
        </button>
        <button
          type="button"
          v-if="restaurant.isLiked"
          @click.stop.prevent="deleteLike(restaurant.id)"
          class="btn btn-danger like mr-2"
        >
          Unlike
        </button>
        <button
          type="button"
          v-else
          @click.stop.prevent="addLike(restaurant.id)"
          class="btn btn-primary like mr-2"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import userAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "RestaurantCard",
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
    };
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        const { data } = await userAPI.addFavorite({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法加入餐廳，請稍後再試",
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data } = await userAPI.deleteFavorite({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法加入餐廳，請稍後再試",
        });
      }
    },
    async addLike(restaurantId) {
      try {
        const { data } = await userAPI.addLike({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法加入，請稍後再試",
        });
      }
    },
    async deleteLike(restaurantId) {
      const { data } = await userAPI.deleteLike({ restaurantId });
      if (data.status !== "success") {
        throw new Error(data.message);
      }
      this.restaurant = {
        ...this.restaurant,
        isLiked: false,
      };
    },
  },
};
</script>