<template>
  <div>
    <div class="dark-background" />
    <transition tag="div" name="fade">
      <div class="options">
        <div class="options__close">
          <button type="button" @click="$emit('close')">X</button>
        </div>
        <h3>Select the language</h3>
        <ul>
          <li @click="selectLanguage('en')">
            <img src="/imgs/flags/united-kingdom.png" alt="english" />English
          </li>
          <li @click="selectLanguage('it')">
            <img src="/imgs/flags/italia.png" alt="italian" />Italian
          </li>
          <li @click="selectLanguage('pt')">
            <img src="/imgs/flags/brasil.png" alt="portuguese" /> Portuguese
          </li>
          <li @click="selectLanguage('es')">
            <img src="/imgs/flags/spain.png" alt="spanish" />Spanish
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    selectLanguage(language) {
      this.$emit('close')
      this.$router.push(this.$i18n.setLocale(language))
    },
  },
}
</script>

<style lang="scss">
.dark-background {
  position: fixed;
  left: 0;
  top: 0;
  background-color: black;
  width: 100%;
  height: 100%;
  z-index: 3;
  opacity: 0.8;
}
.options {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  min-height: 310px;
  background-color: var(--light);
  padding: 40px 20px;
  color: var(--primary);
  opacity: 1;
  z-index: 4;
  border-radius: 3px;

  &__close {
    position: absolute;
    top: -10px;
    right: -10px;

    button {
      font-weight: 700;
      border-radius: 50%;
      border: none;
      width: 32px;
      height: 32px;
      background-color: var(--secondary);
      color: var(--light);
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.1);
        filter: brightness(1.2);
      }
    }
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 25px;
    text-align: center;
  }

  ul {
    list-style: none;

    li {
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;

      &:not(:first-child) {
        margin-top: 15px;
      }

      &:hover {
        text-decoration: underline;
        filter: brightness(1.3);
      }
    }
  }
}
</style>
