<template>
  <div id="app">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <p class="has-text-primary has-text-weight-bold	">MyBookClub</p>
        </b-navbar-item>
      </template>
      <template v-if="accessToken" slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/books' }">
          Books
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/clubs' }">
          Clubs
        </b-navbar-item>
        <!-- <b-navbar-dropdown label="Info">
          <b-navbar-item href="#">
            About
          </b-navbar-item>
          <b-navbar-item href="#">
            Contact
          </b-navbar-item>
        </b-navbar-dropdown> -->
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div v-if="!accessToken" class="buttons">
            <a class="button is-primary" @click="isSignupModalActive = true">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" @click="isModalActive = true">
              Log in
            </a>
          </div>
          <div v-if="accessToken" class="buttons">
            <a class="button is-primary" @click="logout">
              <strong>Logout</strong>
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <b-modal :active.sync="isSignupModalActive" :width="640" scroll="keep">
      <form @submit.prevent="signup">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Sign up</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Email">
              <b-input
                v-model="email"
                type="email"
                :value="email"
                placeholder="Your email"
                required
              >
              </b-input>
            </b-field>
            <b-field label="First Name">
              <b-input
                v-model="fname"
                type="text"
                :value="fname"
                placeholder="First name"
                required
              >
              </b-input>
            </b-field>
            <b-field label="Last Name">
              <b-input
                v-model="lname"
                type="text"
                :value="lname"
                placeholder="Last name"
                required
              >
              </b-input>
            </b-field>

            <b-field label="Password">
              <b-input
                v-model="password"
                type="password"
                :value="password"
                password-reveal
                placeholder="Your password"
                required
              >
              </b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button"
              type="button"
              @click="isSignupModalActive = false"
            >
              Close
            </button>
            <button class="button is-primary" type="submit">Sign up!</button>
          </footer>
        </div>
      </form>
    </b-modal>

    <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
      <form @submit.prevent="login">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Login</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Email">
              <b-input
                v-model="email"
                type="email"
                :value="email"
                placeholder="Your email"
                required
              >
              </b-input>
            </b-field>

            <b-field label="Password">
              <b-input
                v-model="password"
                type="password"
                :value="password"
                password-reveal
                placeholder="Your password"
                required
              >
              </b-input>
            </b-field>

            <b-checkbox>Remember me</b-checkbox>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">
              Close
            </button>
            <button class="button is-primary" type="submit">Login</button>
          </footer>
        </div>
      </form>
    </b-modal>

    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isModalActive: false,
      email: '',
      password: '',
      isSignupModalActive: false,
      lname: '',
      fname: ''
    };
  },
  computed: {
    ...mapState(['accessToken'])
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', { email: this.email, password: this.password })
        .then(res => {
          console.log(res);
          this.isModalActive = false;
          this.$router.push({ path: '/clubs' });
        })
        .catch(err => console.log(err));
    },
    signup() {
      this.$store
        .dispatch('signup', {
          email: this.email,
          password: this.password,
          confirmpassword: this.password,
          fname: this.fname,
          lname: this.lname
        })
        .then(res => {
          console.log(res);
          this.isSignupModalActive = false;
          this.isModalActive = true;
        })
        .catch(err => console.log(err));
    },
    logout() {
      this.$store
        .dispatch('logout')
        .then(res => {
          console.log(res);
          this.$router.push({ path: '/' });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style></style>
