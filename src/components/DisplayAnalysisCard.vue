<template>
    <div class="row mb-4">
        <p class="mb-1 fs-6"> <strong> Result </strong>
            <span class="dot bg-success"></span> <span class="dot bg-danger"></span>
        </p>
        <div class="card">
            <div class="col-12 justify-paragraph" style="overflow-y:auto;">
                <div class="card-body" id="output-card">
                    <p class="card-text" v-html="responseList"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['responseList'],
};
</script>


<style>
.justify-paragraph {
    text-align: justify;
}

#output-card {
    padding-left: 12px;
    padding-right: 12px;
}

.dot {
    height: .75rem;
    width: .75rem;
    border-radius: 50%;
    display: inline-block;
}
</style>