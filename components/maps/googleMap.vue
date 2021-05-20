<template>
  <iframe frameBorder="0" :src="mapsSourceUrl"> </iframe>
</template>

<script>
export default {
  props: {
    latitude: {
      type: [String, Number],
      required: true,
    },
    longitude: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    mapsSourceUrl() {
      const api = process.env.MAPS_API
      const params = `${this.latitude},${this.longitude}`
      return `https://www.google.com/maps/embed/v1/search?key=${api}&q=${params}`
    },
  },
}
</script>

<style></style>
