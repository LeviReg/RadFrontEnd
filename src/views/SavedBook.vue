<template>
  <div>
    <div class="card">
      <div class="card-content">
        <p class="subtitle is-6">
          Added: {{ format(new Date(book.DateCreated), 'dd-MM-yyyy') }}
        </p>

        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="book.CoverURL" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ book.Title }}</p>
            <p class="subtitle is-6">
              {{ book.Author }}
            </p>
          </div>
        </div>

        <div class="content">
          {{ book.Description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  props: ['book'],
  data() {
    return {
      format
    };
  },
  created() {},
  methods: {}
};
</script>

<style></style>
