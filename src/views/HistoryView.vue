<template>
    <div class="container mt-4">
        <loader v-if="loading"></loader>
        <div v-else class="row row-cols-1 row-cols-md-4 g-4">
            <div class="col" v-for="(item, index) in responseData" v-bind:key="index">
                <div class="card h-100 w-100 custom-card" @click="moveToSinglePrediction(item.id)">
                    <div class="card-body">
                        {{ shortenString(item["text"]) }}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            responseData: []
        }
    },
    methods: {
        async getPredictions() {
            const token = this.$store.getters.getUserToken;
            const response = await fetch('http://0.0.0.0:8000/v1/predictions/', {
                method: "GET",
                headers: { authorization: token }
            })
            const responseData = await response.json()
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to authenticate.')
                throw error
            }

            this.responseData = responseData 
            this.loading = false;
        },
        moveToSinglePrediction(predictionIndex) {
            this.$router.push("/history".concat("/", predictionIndex.toString()));
        },
        shortenString(text) {
            text = text.replace(/[\r\n]/gm, '');
            if (text.length > 100) {
                return text.slice(0, 100) + "...";
            }
            return text;
        }
    },
    created() {
        this.getPredictions()
    }
}
</script>

<style>
.custom-card:hover {
    box-shadow: 5px 5px 5px #198754d3;
}
</style>