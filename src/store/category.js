import firebase from "firebase/app";

export default {
    actions: {
        async fetchCategories({ commit, dispatch }) {
            try {
                const uid = await dispatch('getUid');
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};

                /* Возврашаем массив обьекттов. обьекты в виде {
                        title: categories[key].title,
                        limit: categories[key].limit,
                        id: key
                    } */ 
                return Object.keys(categories).map(key => ({ ...categories[key], id: key }))

            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
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
        },
        async updateCategory({ commit, dispatch }, { title, limit, id }) {
            try {
                const uid = await dispatch('getUid');
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit});
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async deleteCategory({ commit, dispatch }, catId) {
            try {
                const uid = await dispatch('getUid');
                await firebase.database().ref(`/users/${ uid }/categories/${ catId }`).remove();
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    }
}