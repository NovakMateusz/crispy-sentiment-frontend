<template>
    <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">

            <div class="mt-4">

                <div v-if="isReady === true" class="card bg-white border-white border-0">

                    <div class="card-body">
                        <div class="row">
                            <div class="col-4">
                                <img class="img-fluid text-center" src="brain.png" alt="Avatar" />
                            </div>
                            <div class="col-8 align-self-center">
                                <h3 class="card-title text-left m-0">Model Card</h3>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-3"></div>
                            <div class="col-6">
                                <p class="card-text mb-1">
                                    <strong>Name: </strong>
                                    <a class="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                        data-bs-toggle="modal" data-bs-target="#explanationModal"
                                        @click="setModalInfo('model')">
                                        {{ modelName }}
                                    </a>
                                </p>
                                <p class="card-text mb-1"><strong>Metrics:</strong></p>
                                <p class="card-text mb-1" style="text-indent:40px;"><a
                                        class="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                        data-bs-toggle="modal" data-bs-target="#explanationModal"
                                        @click="setModalInfo('precision')">Precision</a>: {{ precision }}
                                </p>
                                <p class="card-text mb-1" style="text-indent:40px;"><a
                                        class="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                        data-bs-toggle="modal" data-bs-target="#explanationModal"
                                        @click="setModalInfo('recall')">Recall</a>: {{ recall }}
                                </p>
                                <p class="card-text mb-1" style="text-indent:40px;"><a
                                        class="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                        data-bs-toggle="modal" data-bs-target="#explanationModal"
                                        @click="setModalInfo('f1')">f1</a>:
                                    {{ f1 }}</p>
                            </div>
                            <div class="col-6"></div>
                        </div>

                    </div>

                </div>

                <loader v-else></loader>

            </div>
        </div>
        <div class="col-sm-4"></div>
    </div>


    <div class="modal fade" id="explanationModal" tabindex="-1" aria-labelledby="explanationModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="explanationModalLabel"> {{ modalTitle }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-justify">
                    <p class="card-text">{{ modalBody }}</p>
                    <p><a target="_blank" class="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" :href="modalSource">Source</a></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { isProxy, toRaw } from 'vue';


export default {
    data() {
        return {
            isReady: false,

            modelName: '',
            precision: '',
            recall: '',
            f1: '',

            modalTitle: '',
            modalBody: '',
            modalSource: '',

            extraDocumentation: null
        }
    },
    created() {
        this.getModelInformation();
    },
    methods: {
        async getModelInformation() {

            const response = await fetch("http://0.0.0.0:8000/v1/info");
            const modelInfo = await response.json();

            this.modelName = modelInfo['name'];
            this.precision = modelInfo['metrics']['precision'];
            this.recall = modelInfo['metrics']['recall'];
            this.f1 = modelInfo['metrics']['f1'];

            if ('documentation' in modelInfo) {
                this.extraDocumentation = modelInfo['documentation']
            }

            this.isReady = true;
        },
        setModalInfo(documentationCase) {
            switch (documentationCase) {
                case 'model':
                    var data = toRaw(this.extraDocumentation['model']);
                    this.modalTitle = this.modelName;
                    this.modalBody = data['text'];
                    this.modalSource = data['source']
                    break;

                case 'precision':
                    var data = toRaw(this.extraDocumentation['precision']);
                    this.modalTitle = 'Precision Score';
                    this.modalBody = data['text'];
                    this.modalSource = data['source']
                    break

                case 'recall':
                    var data = toRaw(this.extraDocumentation['recall']);
                    this.modalTitle = 'Recall Score';
                    this.modalBody = data['text'];
                    this.modalSource = data['source']
                    break

                case 'f1':
                    var data = toRaw(this.extraDocumentation['f1']);
                    this.modalTitle = 'f1 Score';
                    this.modalBody = data['text'];
                    this.modalSource = data['source']
                    break
            }
        }
    }
}
</script>



