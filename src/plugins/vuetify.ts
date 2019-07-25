import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';


Vue.use(Vuetify);
export default new Vuetify ({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        themes: {
             light: {
                primary: colors.pink.accent2, // #E53935
                secondary: colors.pink.lighten4, // #FFCDD2
                accent: colors.blue.base, // #3F51B5
             } 
        }
    }

})