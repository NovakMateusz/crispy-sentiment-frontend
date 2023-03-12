<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4 d-flex justify-content-center">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <div v-if="externalServiceError">
                            <h5 class="card-title mb-1">External Service Error</h5>
                        </div>
                        <div v-else>
                            <h5 class="card-title mb-1">Backend model card</h5>
                            <hr>
                            <div v-if="loading">
                                <div class="d-flex justify-content-center">
                                    <span class="loader"></span>
                                </div>
                            </div>
                            <div v-else>
                                <h6 class="card-subtitle mb-3"> <span class="text-muted">Model name: </span> <span
                                        class="text-right">{{ responseData['name'] }}</span></h6>
                                <h6 class="card-subtitle mb-1 text-muted">Metrics</h6>
                                <h6 class="card-subtitle mb-1 ms-4"> <span class="text-muted">Precision: </span>{{
                                    responseData['metrics']['precision'] }}</h6>
                                <h6 class="card-subtitle mb-1 ms-4"> <span class="text-muted">Recall: </span> {{
                                    responseData['metrics']['recall'] }}</h6>
                                <h6 class="card-subtitle ms-4"> <span class="text-muted">f1: </span> {{
                                    responseData['metrics']['f1'] }}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            externalServiceError: false,
            loading: true,
            responseData: {}
        }
    },
    methods: {
        async sendRequest() {
            this.loading = true;
            const baseUrl = 'http://localhost:8000/';
            const url = new URL('api/v1/information', baseUrl);
            try {
                const data = await fetch(
                    url,
                    {
                        method: 'GET',
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
                // fix on backend
                data['metrics']['precision'] = data['metrics']['precision'].toFixed(2);
                data['metrics']['recall'] = data['metrics']['recal'].toFixed(2);
                data['metrics']['f1'] = data['metrics']['f1'].toFixed(2);

                this.responseData = data;
            } catch (error) {
                this.externalServiceError = true;
            }
            this.loading = false;
        }
    },
    beforeMount() {
        this.sendRequest();
    }
}
</script>
