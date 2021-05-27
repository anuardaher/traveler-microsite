<template>
  <div class="spinner-wrapper">
    <div class="spinner"></div>
    <div class="searching-text">{{ $t('searching') }}</div>
  </div>
</template>

<style scoped>
.spinner-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
}
.spinner {
  width: 80px;
  height: 80px;
  margin: 20px auto;
  background-color: var(--secondary);

  border-radius: 100%;
  -webkit-animation: sk-scaleout 1.3s infinite ease-in-out;
  animation: sk-scaleout 1.3s infinite ease-in-out;
}

.searching-text {
  font-size: 1.4rem;
  font-weight: 800;
}

@-webkit-keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
</style>
