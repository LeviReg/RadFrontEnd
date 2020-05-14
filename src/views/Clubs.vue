<template>
  <div class="container">
    <b-tabs position="is-centered" class="block">
      <b-tab-item label="Browse">
        <div class="columns is-multiline">
          <template v-if="allClubs && allClubs.length">
            <div
              v-for="club in allClubs"
              :key="club.BookClubId"
              class="column is-3"
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
              class="column is-3"
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
    format
  }),
  methods: {
    ...mapActions(['postClub', 'getMyClubs']),
    submitPostClub() {
      this.postClub({ name: this.name })
        .then(response => {
          this.myClubs.push(response);
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
