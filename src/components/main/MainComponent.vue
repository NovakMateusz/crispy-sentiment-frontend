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
                <div class="d-flex justify-content-between">
                    <button class="btn btn-success" @click="sendRequest">Submit</button>
                    <button class="btn btn-success" @click="resetInput">Reset input</button>

                </div>
            </form>

            <div v-if="showSentiment" class="mt-4">
                <div v-if="externalServiceError">
                    <h1>External Service Error</h1>
                </div>
                <div v-else>
                    <div v-if="loading">
                        <div class="d-flex justify-content-center">
                            <span class="loader"></span>
                        </div>
                    </div>
                    <div v-else>
                        <response-display-component :responseList="responseData"></response-display-component>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>

const insertTags = (text, data) => {
    let old_start, old_stop;
    const sentencesArray = [];
    for (let i = 0; i <= data.length; i++) {
        const item = data[i];
        if (i == data.length) {
            if (old_stop != text.length) {
                sentencesArray.push(text.slice(old_stop));
            }
        } else {
            if (old_start !== undefined && old_stop !== undefined) {
                if (old_stop != item['start']) {
                    sentencesArray.push(text.slice(old_stop, item['start']));
                }
            }

            let htmlClass;
            switch (item['sentiment']) {
                case 'Positive':
                    htmlClass = 'text-success';
                    break;
                case 'Negative':
                    htmlClass = 'text-danger';
                    break;
                default:
                    alert('Internal server error');
                    return;
            }

            const start_tag = `<span class="${htmlClass}">`;
            const end_tag = '</span>';
            const temp_str = start_tag + text.slice(item['start'], item['stop']) + end_tag;
            sentencesArray.push(temp_str);
            old_start = item['start'];
            old_stop = item['stop'];
        }
    }
    const output = sentencesArray.join('');
    return output.replaceAll(/\r?\n/g, '<br>');
};

export default {
    data() {
        return {
            text: '',
            radioSelect: 'full-text-based',
            showSentiment: false,
            responseData: [],
            loading: false,
            externalServiceError: false
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
        async sendRequest() {
            const baseUrl = 'http://localhost:8000/';

            if (this.text !== '') {
                if (this.showSentiment === false) {
                    this.showSentiment = true;
                }
                this.loading = true;
                let url;
                switch (this.radioSelect) {
                    case 'full-text-based':
                        url = new URL('api/v1/predict', baseUrl);
                        break;
                    case 'sentence-based':
                        url = new URL('api/v1/predict-sentence', baseUrl);
                        break;
                    default:
                        alert('Internal server error');
                        return;
                }
                try {
                    const data = await fetch(
                        url,
                        {
                            method: 'POST',
                            body: JSON.stringify(
                                {
                                    text: this.text
                                }
                            )
                        }
                    ).then((response) => {
                        if (response.ok) {
                            this.externalServiceError = false;
                            return response.json();
                        }
                        else {
                            this.externalServiceError = true;
                        }
                    });
                    this.responseData = insertTags(this.text, data);
                } catch (error) {
                    this.externalServiceError = true;
                }
                this.loading = false;
            }
        },
    }
}
</script>

<style>
textarea {
    height: 200px;
    resize: none;
}

.loader {
    width: 48px;
    height: 48px;
    display: block;
    margin: 20px auto;
    position: relative;
    border: 3px solid #198754;
    border-radius: 50%;
    box-sizing: border-box;
    animation: animloader 2s linear infinite;
}

.loader::after {
    content: '';
    box-sizing: border-box;
    width: 6px;
    height: 24px;
    background: #198754;
    transform: rotate(-45deg);
    position: absolute;
    bottom: -20px;
    left: 46px;
}

@keyframes animloader {
    0% {
        transform: translate(-10px, -10px);
    }

    25% {
        transform: translate(-10px, 10px);
    }

    50% {
        transform: translate(10px, 10px);
    }

    75% {
        transform: translate(10px, -10px);
    }

    100% {
        transform: translate(-10px, -10px);
    }
}
</style>