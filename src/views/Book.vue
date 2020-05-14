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
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                :src="book.volumeInfo.imageLinks.thumbnail"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ book.volumeInfo.title }}</p>
            <p class="subtitle is-6">
              {{ book.volumeInfo.authors ? book.volumeInfo.authors[0] : '' }}
            </p>
            <b-rate
              v-model="book.volumeInfo.averageRating"
              :show-score="true"
            ></b-rate>
          </div>
        </div>

        <b-collapse
          aria-id="contentIdForA11y2"
          class="panel"
          animation="slide"
          :open.sync="isOpen"
        >
          <div
            slot="trigger"
            class="panel-heading"
            role="button"
            aria-controls="contentIdForA11y2"
          >
            <strong>Description</strong>
          </div>
          <div class="panel-block">
            <div class="content">
              {{ book.volumeInfo.description }}
              <br />
              <a :href="book.volumeInfo.previewLink">Preview</a>
              <br />
              <time
                >Published:
                {{
                  format(new Date(book.volumeInfo.publishedDate), 'dd-MM-yyyy')
                }}</time
              >
            </div>
          </div>
        </b-collapse>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="isModalActive = true">Add</a>
        <!-- <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delete</a> -->
      </footer>
    </div>

    <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
      <form @submit.prevent="addToCollection">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Add book</p>
          </header>
          <section class="modal-card-body">
            <p>Are you sure you want to add this book to your collection?</p>
          </section>
          <footer v-if="!inCollection" class="modal-card-foot">
            <button class="button" type="button" @click="isModalActive = false">
              Close
            </button>
            <button class="button is-primary" type="submit">Add</button>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  props: ['book', 'inCollection'],
  data() {
    return {
      format,
      isModalActive: false,
      isOpen: false
    };
  },
  created() {},
  methods: {
    addToCollection() {
      this.$store
        .dispatch('postBook', {
          Title: this.book.volumeInfo.title,
          Author: this.book.volumeInfo.authors
            ? this.book.volumeInfo.authors[0]
            : '',
          Genre: this.book.volumeInfo.categories
            ? this.book.volumeInfo.categories[0]
            : '',
          CoverURL: this.book.volumeInfo.imageLinks.thumbnail,
          Description: this.book.volumeInfo.description
        })
        .then(() => {
          this.isModalActive = false;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style></style>
