<template>
  <div class="container mt-4">
    <form @submit.prevent>
      <div>
        <label for="textToPredict" class="form-label"><strong>Check sentiment</strong></label>
        <textarea id="textToPredict" class="form-control" v-model="text"></textarea>
      </div>
      <div class="my-1">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="fullTextBasedOption" id="fullTextBasedOption"
            value="full-text-based" checked v-model="radioSelect">
          <label class="form-check-label" for="fullTextBasedOption">Full text based</label>
        </div>
        <div class="form-check form-check-inline my-1">
          <input class="form-check-input" type="radio" name="sentenceBasedOption" id="sentenceBasedOption"
            value="sentence-based" v-model="radioSelect">
          <label class="form-check-label" for="sentenceBasedOption">Sentence based</label>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <button class="btn btn-success" @click="resetInput">Reset</button>
        <span>
          <button class="btn btn-success me-2" @click="getTextSentiment">Submit</button>
          <button v-if="isLoggedIn" class="btn btn-success ms-2" @click="saveTextSentiment">Save</button>
        </span>


      </div>
    </form>

    <div v-if="showSentiment" class="mt-4">
      <div v-if="externalServiceError">
        <h1>External Service Error</h1>
      </div>
      <div v-else>
        <loader v-if="loading"></loader>
        <div v-else>
          <display-analysis-card :responseList="outputData"></display-analysis-card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import insertTags from "../helpers/index.js"

export default {
  data() {
    return {
      text: '',
      radioSelect: 'full-text-based',
      showSentiment: false,
      responseData: [],
      outputData: '',
      loading: false,
      externalServiceError: false,
    }
  },
  methods: {
    resetInput() {
      this.text = '';
      this.responseData = [];
      if (this.showSentiment === true) {
        this.showSentiment = false;
      }
    },
    async getTextSentiment() {
      const baseUrl = 'http://0.0.0.0:8000/v1/';

      if (this.text !== '') {
        this.showSentiment = true;
        this.loading = true;
        let url;
        switch (this.radioSelect) {
          case 'full-text-based':
            url = new URL('predict', baseUrl);
            break;
          case 'sentence-based':
            url = new URL('predict-sentence', baseUrl);
            break;
          default:
            alert('Internal server error');
            return;
        }

        try {
          const response = await fetch(url, { method: "POST", body: JSON.stringify({ text: this.text }) });
          if (response.ok) {

            this.responseData = await response.json();
            this.outputData = insertTags(this.text, this.responseData);
            this.externalServiceError = false;
            this.loading = false;

          } else {
            this.externalServiceError = true;
          }

        } catch (error) {
          console.log(error);
          this.externalServiceError = true;
        }
      }
    },
    async saveTextSentiment() {

      console.log(this.responseData);

      if (this.text && this.responseData) {
        const token = this.$store.getters.getUserToken;
        const response = await fetch('http://0.0.0.0:8000/v1/predictions', {
          method: "POST",
          headers: { authorization: token },
          body: JSON.stringify({
            "raw-text": this.text,
            "annotations": this.responseData
          })
        })
        const responseData = await response.json()
        if (!response.ok) {
          const error = new Error(responseData.message || 'Failed to authenticate.')
          throw error
        }
        console.log(responseData);
      }
      else{
        "..."
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
}
</script>

<style>
textarea {
  height: 200px;
  resize: none;
}

.form-check-input:focus {
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, .25);
  border-color: #198754;
}

.form-check-input:checked {
  border-color: #198754;
  background-color: #198754;
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, .25);
  border-color: #198754;
}

.form-control:focus-visible {
  outline-color: rgb(25, 135, 84);
}
</style>