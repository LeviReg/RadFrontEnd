<template>
  <div>
    <b-field label="Search">
      <b-input v-model="query" @change.native="onSearch"></b-input>
    </b-field>

    <p v-if="books && books.length" class="m-b-md m-t-lg">
      Found
      <span class="has-text-primary has-text-weight-bold ">{{
        books.length
      }}</span>
      results
    </p>
    <div class="columns is-multiline">
      <template v-if="books && books.length">
        <div v-for="book in books" :key="book.etag" class="column is-3">
          <Book :book="book" />
        </div>
      </template>
      <div
        v-else
        class="column is-centered has-text-centered is-size-4 m-t-lg has-text-grey"
      >
        <b-icon size="is-large" icon="magnify"></b-icon>
        <p class="m-l-md">Search...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Book from './Book';

export default {
  components: {
    Book
  },
  data() {
    return {
      books: [],
      query: ''
    };
  },
  methods: {
    onSearch() {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${this.query}`)
        .then(response => {
          this.books = response.data.items;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style></style>
