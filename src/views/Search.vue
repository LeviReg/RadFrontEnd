<template>
  <div>
    <b-field label="Search">
      <b-input v-model="query" @change.native="onSearch"></b-input>
    </b-field>

    <div class="columns is-multiline">
      <template v-if="books && books.length">
        <div v-for="book in books" :key="book.etag" class="column is-3">
          <Book :book="book" />
        </div>
      </template>
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
