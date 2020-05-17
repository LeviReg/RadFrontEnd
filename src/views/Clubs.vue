<template>
  <div class="container">
    <b-tabs position="is-centered" class="block">
      <b-tab-item label="Browse">
        <div class="columns is-multiline">
          <template v-if="allClubs && allClubs.length">
            <div
              v-for="club in allClubs"
              :key="club.BookClubId"
              class="column is-3 pointer is-hoverable"
              @click="gotoBookClub(club)"
            >
              <div class="card">
                <div class="card-content">
                  {{ club.Name }}
                  <p class="has-text-grey-light">
                    Created:
                    {{ format(new Date(club.DateCreated), 'dd-MM-yyyy') }}
                  </p>
                </div>
              </div>
            </div>
          </template>
          <div
            v-else
            class="column is-centered has-text-centered is-size-5 m-t-lg has-text-grey"
          >
            <p class="m-b-xs">The silence is so freaking loud!</p>
            <a
              class=" is-primary has-text-weight-bold"
              @click="isModalActive = true"
            >
              Create the first club!
            </a>
          </div>
        </div>
      </b-tab-item>
      <b-tab-item label="My Clubs">
        <div class="columns is-multiline">
          <div class="column is-12">
            <b-button
              size="is-large"
              icon-left="plus"
              @click="isModalActive = true"
            >
              Create club
            </b-button>
          </div>
          <template v-if="myClubs && myClubs.length">
            <div
              v-for="club in myClubs"
              :key="club.BookClubId"
              class="column is-3 pointer"
              @click="gotoBookClub(club)"
            >
              <div class="card">
                <div class="card-content">
                  {{ club.Name }}
                  <p class="has-text-grey-light">
                    Created:
                    {{ format(new Date(club.DateCreated), 'dd-MM-yyyy') }}
                  </p>
                </div>
              </div>
            </div>
          </template>
          <div
            v-else
            class="column is-centered has-text-centered is-size-5 m-t-lg has-text-grey"
          >
            <p>You are not a part of any clubs yet...</p>
            <p>Join a club or create one of your own!</p>
          </div>
        </div>
      </b-tab-item>
    </b-tabs>

    <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
      <form @submit.prevent="submitPostClub">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Create a club</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Club name">
              <b-input
                v-model="name"
                type="text"
                :value="name"
                placeholder="Name..."
                required
              >
              </b-input>
            </b-field>
            <b-field label="Description">
              <b-input
                v-model="description"
                type="text"
                :value="description"
                placeholder="What is your club about"
                required
              >
              </b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="isModalActive = false">
              Close
            </button>
            <button class="button is-primary" type="submit">Create</button>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { format } from 'date-fns';

export default {
  data: () => ({
    myClubs: [],
    allClubs: [],
    name: '',
    isModalActive: false,
    format,
    description: ''
  }),
  methods: {
    ...mapActions(['postClub', 'getMyClubs']),
    submitPostClub() {
      this.postClub({ name: this.name, description: this.description })
        .then(response => {
          this.myClubs.push(response);
          this.allClubs.push(response);
          this.isModalActive = false;
        })
        .catch(err => console.log(err));
    },
    gotoBookClub(club) {
      this.$router.push({
        name: 'BookClub',
        params: { bookClubId: club.BookClubId }
      });
    }
  },
  created() {
    this.getMyClubs()
      .then(response => {
        if (response) {
          this.myClubs = response;
        }
      })
      .catch(err => console.log(err));

    this.$store
      .dispatch('getAllBookClubs')
      .then(response => {
        this.allClubs.push(...response);
      })
      .catch(err => console.log(err));
  }
};
</script>

<style></style>
