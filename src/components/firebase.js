// firestore_crud.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, onSnapshot, updateDoc, deleteDoc, deleteField, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithRedirect,
	getRedirectResult,
	onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

const firebaseConfig = {
	apiKey: "**********************************",
	authDomain: "**********************************",
	projectId: "**************",
	storageBucket:"***********************",
	messagingSenderId: "*****************",
	appId: "**********************************",
	measurementId: "***************"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);
const auth = getAuth(app);

// // Google login function

// export async function googleLoginRedirect() {
// 	const provider = new GoogleAuthProvider();
// 	await signInWithRedirect(auth, provider);
// }

// export async function handleRedirectResult() {
// 	try {
// 		const result = await getRedirectResult(auth);
// 		if (result) {
// 			const user = result.user;
// 			localStorage.setItem("user", JSON.stringify(user));
// 			localStorage.setItem("Logined", "true");
// 			return user;
// 		}
// 		return null;
// 	} catch (err) {
// 		console.error("Redirect login failed:", err);
// 		throw err;
// 	}
// }

// export function onUserStateChanged(callback) {
// 	return onAuthStateChanged(auth, (user) => {
// 		if (user) {
// 			localStorage.setItem("user", JSON.stringify(user));
// 			localStorage.setItem("Logined", "true");
// 		} else {
// 			localStorage.removeItem("user");
// 			localStorage.removeItem("Logined");
// 		}
// 		callback(user);
// 	});
// }
const dbs = {
	addDocumentAutoId: async (collectionName, data) => {
		try {
			const docRef = await addDoc(collection(db, collectionName), data);
			// console.log("Document written with auto ID: ", docRef.id);
			return docRef.id;
		} catch (e) {
			console.error("Error adding document: ", e);
			throw e;
		}
	},
	addDocument: async (collectionName, documentId, data) => {
		try {
			await setDoc(doc(db, collectionName, documentId), data);
			// console.log(`Document written with ID: ${documentId}`);
		} catch (e) {
			console.error('Error adding document: ', e);
			throw e;
		}
	},

	readDocument: async (collectionName, documentId) => {
		const docRef = doc(db, collectionName, documentId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			// console.log('Document data:', docSnap.data());
			return docSnap.data();
		} else {
			console.log('No such document!');
			return null;
		}
	},

	readCollection: async (collectionName) => {
		try {
			const querySnapshot = await getDocs(collection(db, collectionName));
			const data = [];

			querySnapshot.forEach((doc) => {
				data.push({ id: doc.id, ...doc.data() });
			});

			// console.log("Fetched documents:", data);
			return data;
		} catch (error) {
			console.error(`Error reading collection "${collectionName}":`, error);
			throw new Error("Failed to fetch collection data");
		}
	},

	sortCollection: async (collectionName, field, direction = 'asc') => {
		try {
			const collectionRef = collection(db, collectionName);
			const q = query(collectionRef, orderBy(field, direction));
			const querySnapshot = await getDocs(q);
			const data = [];
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()} (sorted by ${field} ${direction})`);
				data.push({ id: doc.id, ...doc.data() });
			});
			return data;
		} catch (error) {
			console.error('Error sorting collection:', error);
			throw error;
		}
	},

	whereCollection: async (collectionName, field, operator, value) => {
		try {
			const collectionRef = collection(db, collectionName);
			const q = query(collectionRef, where(field, operator, value));
			const querySnapshot = await getDocs(q);
			const data = [];
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()} (filtered where ${field} ${operator} ${value})`);
				data.push({ id: doc.id, ...doc.data() });
			});
			return data;
		} catch (error) {
			console.error('Error filtering collection:', error);
			throw error;
		}
	},
	whereAndSortCollection: async (collectionName, fieldWhere, operator, valueWhere, fieldOrder, directionOrder = 'asc') => {
		try {
			const collectionRef = collection(db, collectionName);
			const q = query(collectionRef, where(fieldWhere, operator, valueWhere), orderBy(fieldOrder, directionOrder));
			const querySnapshot = await getDocs(q);
			const data = [];
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()} (filtered where ${fieldWhere} ${operator} ${valueWhere}, sorted by ${fieldOrder} ${directionOrder})`);
				data.push({ id: doc.id, ...doc.data() });
			});
			return data;
		} catch (error) {
			console.error('Error filtering and sorting collection:', error);
			throw error;
		}
	},

	updateDocument: async (collectionName, documentId, data) => {
		const docRef = doc(db, collectionName, documentId);

		try {
			await updateDoc(docRef, data);
			console.log('Document updated successfully');
		} catch (e) {
			console.error('Error updating document: ', e);
			throw e;
		}
	},

	updateOrSetDocument: async (collectionName, documentId, data) => {
		const docRef = doc(db, collectionName, documentId);

		try {
			await setDoc(docRef, data, { merge: true });
			console.log('Document updated or set successfully');
		} catch (e) {
			console.error('Error updating or setting document: ', e);
			throw e;
		}
	},

	deleteDocument: async (collectionName, documentId) => {
		try {
			await deleteDoc(doc(db, collectionName, documentId));
			console.log('Document deleted successfully');
		} catch (e) {
			console.error('Error deleting document: ', e);
			throw e;
		}
	},
	deleteBy: async (collectionName, column, value) => {
		const docs = await hive.whereCollection(collectionName, column, "==", value);
		for (const docItem of docs) {
			await hive.deleteDocument(collectionName, docItem.id);
			console.log(`Deleted document with ID: ${docItem.id}`);
		}
	},
	updateBy: async (collectionName, column, value, data) => {
		const docs = await hive.whereCollection(collectionName, column, "==", value);
		for (const docItem of docs) {
			await hive.updateDocument(collectionName, docItem.id, data);
			console.log(`Updated document with ID: ${docItem.id}`);
		}
	}
};

export default dbs;
