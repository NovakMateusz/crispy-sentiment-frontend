<template>
    <div class="container mt-4">
        <loader v-if="loading"></loader>
        <display-analysis-card v-else :responseList="outputData"></display-analysis-card>
        <button class="btn btn-success" @click="deletePrediction">Delete</button>
    </div>
</template>

<script>
import insertTags from "../helpers/index.js";

export default {
    data() {
        return {
            loading: true,
            outputData: null
        }
    },
    methods: {
        async getSinglePrediction() {
            const token = this.$store.getters.getUserToken;
            const URL = 'http://localhost:8000/v1/predictions/'.concat(this.$route.params["predictionId"].toString());


            const response = await fetch(URL, {
                method: "GET",
                headers: { Authorization: token }
            })
            const responseData = await response.json()
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to authenticate.')
                throw error
            }
            console.log(responseData);
            this.outputData = insertTags(responseData.text, responseData.annotations);
            this.loading = false;
        },
        async deletePrediction(){
            this.loading = true;

            const token = this.$store.getters.getUserToken;
            const URL = 'http://localhost:8000/v1/predictions/'.concat(this.$route.params["predictionId"].toString());

            const response = await fetch(URL, {
                method: "DELETE",
                headers: { Authorization: token }
            })
            const responseData = await response.json()
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to authenticate.')
                throw error
            }
            console.log(responseData);
            this.$router.replace("/history");
        }
    },
    created() {
        this.getSinglePrediction()
    }
}


</script>