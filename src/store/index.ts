import useHomeStore from './modules/home'
import useUserStore from './modules/user'
export default () => {
    return {
        home: useHomeStore(),
        user: useUserStore(),
    }
}
