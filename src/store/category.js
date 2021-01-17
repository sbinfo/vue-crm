import firebase from "firebase/app";

export default {
    actions: {
        async createCategory({ commit, dispatch }, { title, limit }) {
            try {
                // Получаем id пользователья чтобы категорию записать именно к нужному пользователью
                const uid = await dispatch('getUid');
                // Через firebase сначало создаем по указанному пути нужную папку если его не сушествует
                // И записываем нужную категорию через push. После этого firebase вернеть категорию
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit });
                // firebase возврашает обьекты у которого id записать в поле key
                // во фронте я буду использовать этот ключь как id
                return { title, limit, id: category.key };
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    }
}