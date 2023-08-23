<template>
    <span class="loader"></span>
</template>

<style>
.loader {
    width: 48px;
    height: 48px;
    display: block;
    margin: 20px auto;
    position: relative;
    border: 4px solid #198754;
    border-radius: 50%;
    box-sizing: border-box;
    animation: loaderAnimation 2s linear infinite;
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

@keyframes loaderAnimation {
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