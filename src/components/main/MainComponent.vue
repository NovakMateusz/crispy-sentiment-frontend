<template>
    <section>
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
                <div>
                    <button class="btn btn-success me-1" @click="submitText">Submit</button>
                    <button class="btn btn-success ms-1" @click="resetInput">Reset input</button>
                </div>
            </form>

            <div v-if="showSentiment" class="mt-4">
                <p v-for="item in textFromResponse" :key="item">{{ item }}</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            radioSelect: 'full-text-based',
            showSentiment: false,
            textFromResponse: []
        }
    },
    methods: {
        submitText() {
            if (this.text !== '') {
                if (this.showSentiment === false) {
                    this.showSentiment = true;
                }
                this.textFromResponse = this.text.split(/\r?\n/);
            }

        },
        resetInput() {
            this.text = '';
            this.predictionText = [];
            if (this.showSentiment === true) {
                this.showSentiment = false;
            }
        }
    }
}
</script>

