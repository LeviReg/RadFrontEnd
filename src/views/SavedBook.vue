<template>
  <div>
    <div class="card">
      <!-- <div class="card-image">
                  <figure class="image is-3by2">
                    <img
                      :src="book.volumeInfo.imageLinks.thumbnail"
                      alt="Placeholder image"
                    />
                  </figure>
                </div> -->
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
            <!-- <b-rate
              v-model="book.volumeInfo.averageRating"
              :show-score="true"
            ></b-rate> -->
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
