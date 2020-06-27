import Facts from './components/Facts.vue';
import Fact from './components/Fact.vue';

export default [
    {
        path: '/',
        name:'facts',
        component: Facts,
    },
    {
        path:'/fact/:id',
        name:'fact',
        component: Fact,
    },
    {
        // will match everything
        path: '*',
        component: Facts,
    }
]