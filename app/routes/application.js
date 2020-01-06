import { get } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import firebase from 'firebase/app';

export default Route.extend({
    session: service(),
    firebaseApp: service(),
    beforeModel: function() {
      return get(this, 'session').fetch().catch(() => {});
    },
    actions: {
        logout() {
            return this.get('session').invalidate();
        },
        async login() {
            const auth = await this.get('firebaseApp').auth();
            const provider = new firebase.auth.GoogleAuthProvider();
            return auth.signInWithPopup(provider)
            .then((result => {
                console.log(result)
                console.log(this.get('session'),"session")
            }));
        }
    }

});