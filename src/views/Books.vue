<template>
  <div class="container">
    <b-tabs position="is-centered" class="block" @input="getMyBooks()">
      <b-tab-item label="Browse">
        <!-- <b-field label="Search">
          <b-input v-model="query" @change.native="onSearch"></b-input>
        </b-field>

        <div class="columns is-multiline">
          <template v-if="books && books.length">
            <div v-for="book in books" :key="book.etag" class="column is-3">
              <Book :book="book" />
            </div>
          </template>
        </div> -->
        <Search />
      </b-tab-item>
      <b-tab-item label="My Collection">
        <div class="columns is-multiline">
          <template v-if="myBooks && myBooks.length">
            <div
              v-for="myBook in myBooks"
              :key="myBook.BookId"
              class="column is-3"
            >
              <SavedBook :book="myBook" />
            </div>
          </template>
          <div
            v-else
            class="column is-centered has-text-centered is-size-5 m-t-lg has-text-grey"
          >
            <p>You haven't added any books to your collection yet</p>
          </div>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios';
import SavedBook from './SavedBook';
import Search from './Search';

export default {
  components: {
    SavedBook,
    Search
  },
  data: () => ({
    books: [],
    query: '',
    axios,
    score: 1,
    myBooks: []
  }),
  created() {
    this.$store
      .dispatch('getBooks')
      .then(response => {
        this.myBooks = response;
      })
      .catch(err => console.log(err));
  },
  methods: {
    // onSearch() {
    //   axios
    //     .get(`https://www.googleapis.com/books/v1/volumes?q=${this.query}`)
    //     .then(response => {
    //       this.books = response.data.items;
    //     })
    //     .catch(err => console.log(err));
    // },
    getMyBooks() {
      this.$store
        .dispatch('getBooks')
        .then(response => {
          console.log(response);
          this.myBooks = response;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style></style>
