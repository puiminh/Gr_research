<template>
  <span>Distance: {{ distance }}</span>
  <GMapMap :center="center" :zoom="18" map-type-id="terrain" style="width: 100vw; height: 100vh">
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="getDistance(m.position)"
      >
        <GMapInfoWindow
          :options=" {
                  pixelOffset: {
                    width: 10, height: 0
                  },
                  maxWidth: 320,
                  maxHeight: 320,
          }"
        >
          <div>

          </div>
        </GMapInfoWindow>
      </GMapMarker>
  </GMapMap>
</template>
<script>
import { useGeolocation } from './useGeolocation'
import { isProxy, toRaw } from 'vue';
import axios from 'axios'
export default {
  data() {
    const { coords } = useGeolocation();
    return {
      coords,
      distance: 0,
      center: { lat: 21.0070115, lng: 105.8414017 },
      markers: [
        {
          name: 'Chợ nhỏ',
          des: 'Khu chợ nhỏ gần ký túc xá',
          position: {
            lat: 21.0050115,
            lng: 105.8414017,
          },
        },
        {
          name: 'Siêu thị',
          des: 'Siêu thị với đầy ắp đồ',
          position: {
            lat: 21.0060115,
            lng: 105.8414017,
          },
        },
      ],
    }
  },
  methods: {
    getDistance(p) {
      const position = toRaw(p)
      console.log("current:", this.coords, "to:", position)
      const corDelete = 'https://cors-anywhere.herokuapp.com/'
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${position.lat}, ${position.lng}&origins=${this.coords.latitude}, ${this.coords.longitude}&key=AIzaSyDclRsTPAiKysxHZyYhZ4Qn0NBNO6ulHJ8`
      
      const config = {
        method: 'get',
        url: corDelete + url,
        secure: false,
      }
      axios(config).then(response => {
        console.log(response)
        this.distance = response.data.rows[0].elements[0].distance.text
        console.log(this.distance)
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>