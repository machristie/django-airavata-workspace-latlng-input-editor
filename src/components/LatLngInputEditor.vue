<template>
    <div class="latlng-map"></div>
</template>

<script>
import {InputEditorMixin} from 'django-airavata-workspace-plugin-api'

import 'leaflet/dist/leaflet.css'
// See https://github.com/Leaflet/Leaflet/issues/4968 and
// https://github.com/Leaflet/Leaflet/pull/5771 for more info on this issue
// Looks like it may be fixed on master
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css' // Re-uses images from ~leaflet package
import L from 'leaflet'
import 'leaflet-defaulticon-compatibility'

export default {
    mixins: [InputEditorMixin],
    name: 'lat-lng-input-editor',
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            marker: L.marker(),
            map: null,
        }
    },
    methods: {
        onMapClick(e) {
            this.marker.setLatLng(e.latlng).addTo(this.map);
            this.data = e.latlng.lat + ", " + e.latlng.lng;
            this.valueChanged();
        },
        convertStringToLatLng(latlngString) {
            const matches = /(-?\d+\.\d+),\s*(-?\d+\.\d+)/.exec(latlngString);
            if (matches && matches.length === 3) {
                const lat = parseFloat(matches[1]);
                const lng = parseFloat(matches[2]);
                return L.latLng(lat, lng);
            } else {
                return null;
            }
        }
    },
    mounted: function() {
        this.map = L.map(this.$el).setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.map.on('click', this.onMapClick);

        // If initially has a value, add a marker to the map
        if (this.value) {

            const latlng = this.convertStringToLatLng(this.value);
            if (latlng) {
                this.marker
                    .setLatLng(latlng)
                    .addTo(this.map);
            }
        }
    },
    destroyed: function() {
        this.map.remove();
    }
}
</script>

<style scoped>
.latlng-map {
    height: 400px;
}
</style>

