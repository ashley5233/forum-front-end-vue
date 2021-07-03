<template>
  <div>
    <h2 class="my-4">所有評論：</h2>

    <div v-for="comment in Comments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
          type="button"
          class="btn btn-danger float-right"
        >
          Delete
        </button>
        <h3>
          <a href="#"> {{ comment.User.name }} </a>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ comment.createdAt | fromNow }}
        </footer>
      </blockquote>
      <hr />
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
import { mapState } from "vuex";

export default {
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      Comments: this.restaurantComments,
    };
  },
  watch: {
    restaurantComments(newValue) {
      this.Comments = {
        ...this.Comments,
        ...newValue,
      };
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },

  methods: {
    handleDeleteButtonClick(commentId) {
      this.$emit("after-delete-comment", commentId);
    },
  },
};
</script>