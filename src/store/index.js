import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const http = axios.create({
  baseURL: 'https://localhost:44375/'
});

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    user: null
  },
  mutations: {
    updateToken(state, token) {
      state.accessToken = token;
      localStorage.setItem('accessToken', token);
    },
    updateUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    login({ commit }, loginDetails) {
      const body = `username=${loginDetails.email}&password=${loginDetails.password}&grant_type=password`;

      return http
        .post('/token', body)
        .then(res => {
          commit('updateToken', res.data.access_token);
          return res.data;
        })
        .catch(err => console.log(err));
    },
    signup(_, signupDetails) {
      return http
        .post('/api/account/register', signupDetails)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    postClub(_, clubDetails) {
      return http
        .post('/api/bookclubs', clubDetails)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    getMyClubs() {
      return http
        .get('/api/bookclubs/user')
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    logout({ commit }) {
      return http
        .post('/api/account/logout')
        .then(res => {
          commit('updateToken', null);

          localStorage.removeItem('accessToken');
          return res.data;
        })
        .catch(err => console.log(err));
    },
    getBookClub(_, bookClubId) {
      return http
        .get(`/api/bookclubs/${bookClubId}`)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    getAllBookClubs() {
      return http
        .get('/api/bookclubs')
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    getClubMembers(_, bookClubId) {
      return http
        .get(`/api/bookclub/members/${bookClubId}`)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    postAssignment(_, assignment) {
      return http
        .post('/api/assignments', assignment)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    postClubMember(_, data) {
      return http
        .post('/api/bookclubmembers', data)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    getAssignmentsByClub(_, bookClubId) {
      return http
        .get(`/api/assignments/club/${bookClubId}`)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    getAssignment(_, assignmentId) {
      return http
        .get(`/api/assignments/${assignmentId}`)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    postBook(_, bookData) {
      return http
        .post('/api/books', bookData)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    getBooks() {
      return http
        .get('/api/books/user')
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    getBooksByAssignment(assignmentId) {
      return http
        .get(`/api/books/assignment/${assignmentId}`)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    getUserInfo({ commit }) {
      return http
        .get('/api/account/userinfo')
        .then(res => {
          commit('updateUser', res.data);

          return res.data;
        })
        .catch(err => console.log(err));
    },
    deleteClub(_, BookClubId) {
      return http
        .delete(`/api/bookclubs/${BookClubId}`)
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    }
  },
  modules: {}
});
