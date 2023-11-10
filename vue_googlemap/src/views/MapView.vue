<template>
  <span>Distance: {{ distance }}</span>
  <GMapMap :center="center" :zoom="18" map-type-id="terrain" style="width: 100vw; height: 100vh">
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :icon="m.icon"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="getDistance(m.id, m.position)"
      >
        <GMapInfoWindow
          :opened="selectedMarkerId == m.id"
          :options=" {
                  pixelOffset: {
                    width: 10, height: 0
                  },
                  maxWidth: 320,
                  maxHeight: 320,
          }"
        >
          <InfoWindow :data="m"></InfoWindow>
        </GMapInfoWindow>
      </GMapMarker>
  </GMapMap>
</template>
<script>
import { useGeolocation } from './useGeolocation'
import { isProxy, toRaw } from 'vue';
import axios from 'axios'
import InfoWindow from '../components/InfoWindow.vue';
export default {
    data() {
        const { coords } = useGeolocation();
        const foodvendor = './images/food.png';
        const localmarket = './images/market.png';
        const store247 = './images/247.png';
        const supermarket = './images/store.png';
        return {
            selectedMarkerId: -1,
            coords,
            distance: 0,
            center: { lat: 21.0070115, lng: 105.8414017 },
            markers: [
                {
                    id: 0,
                    name: 'Chợ nhỏ',
                    des: 'Khu chợ nhỏ gần ký túc xá',
                    img: 'https://static2.yan.vn/YanNews/2167221/201708/20170818-021910-tri_0018_1200x795.png',
                    icon: localmarket,
                    position: {
                        lat: 21.0050115,
                        lng: 105.8414017,
                    },
                },
                {
                    id: 1,
                    name: 'Siêu thị',
                    des: 'Siêu thị với đầy ắp đồ',
                    img: 'https://cdnmedia.baotintuc.vn/Upload/pTMF1jgWpbjY1m8G1xWUsg/files/2023/01/sieuthi29Tet/samtet09.JPG',
                    icon: supermarket,
                    position: {
                        lat: 21.0060115,
                        lng: 105.8414017,
                    },
                },
                {
                    id: 2,
                    name: 'Hàng rong',
                    des: 'Hàng rong cạnh cổng trường',
                    img: 'https://lawnet.vn/uploads/image/2019/11/02/030831370.jpg',
                    icon: foodvendor,
                    position: {
                        lat: 21.0060115,
                        lng: 105.8455017,
                    },
                },
                {
                    id: 3,
                    name: 'Cửa hàng tiện lợi',
                    des: 'Cửa hàng tiện lợi 24/7',
                    img: 'https://simg.zalopay.com.vn/zlp-website/assets/cua_hang_tien_loi_circle_k_22ca86b5d5.jpg',
                    icon: store247,
                    position: {
                        lat: 21.0060115,
                        lng: 105.8404017,
                    },
                },
                {
                    id: 4,
                    name: 'Chợ nhỏ',
                    des: 'Khu chợ nhỏ gần ký túc xá',
                    img: 'https://static2.yan.vn/YanNews/2167221/201708/20170818-021910-tri_0018_1200x795.png',
                    icon: localmarket,
                    position: {
                        lat: 21.0000115,
                        lng: 105.8414017,
                    },
                },
                {
                    id: 5,
                    name: 'Siêu thị',
                    des: 'Siêu thị với đầy ắp đồ',
                    img: 'https://cdnmedia.baotintuc.vn/Upload/pTMF1jgWpbjY1m8G1xWUsg/files/2023/01/sieuthi29Tet/samtet09.JPG',
                    icon: supermarket,
                    position: {
                        lat: 21.0020115,
                        lng: 105.8414017,
                    },
                },
                {
                    id: 6,
                    name: 'Hàng rong',
                    des: 'Hàng rong cạnh cổng trường',
                    img: 'https://lawnet.vn/uploads/image/2019/11/02/030831370.jpg',
                    icon: foodvendor,
                    position: {
                        lat: 21.0060115,
                        lng: 105.8405017,
                    },
                },
                {
                    id: 7,
                    name: 'Cửa hàng tiện lợi',
                    des: 'Cửa hàng tiện lợi 24/7',
                    img: 'https://simg.zalopay.com.vn/zlp-website/assets/cua_hang_tien_loi_circle_k_22ca86b5d5.jpg',
                    icon: store247,
                    position: {
                        lat: 21.0090115,
                        lng: 105.8404017,
                    },
                },
            ],
        };
    },
    methods: {
        getDistance(id, p) {
            this.selectedMarkerId = id;
            const position = toRaw(p);
            console.log("current:", this.coords, "to:", position);
            const corDelete = 'https://cors-anywhere.herokuapp.com/';
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${position.lat}, ${position.lng}&origins=${this.coords.latitude}, ${this.coords.longitude}&key=AIzaSyDclRsTPAiKysxHZyYhZ4Qn0NBNO6ulHJ8`;
            const config = {
                method: 'get',
                url: corDelete + url,
                secure: false,
            };
            axios(config).then(response => {
                console.log(response);
                this.distance = response.data.rows[0].elements[0].distance.text;
                console.log(this.distance);
            }).catch(err => {
                console.error(err);
            });
        }
    },
    components: { InfoWindow }
}
</script>