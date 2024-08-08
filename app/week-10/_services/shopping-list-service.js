import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

// Função para obter itens do Firestore
export const getItems = async (userId) => {
  const items = [];
  const q = query(collection(db, "users", userId, "items"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
};

// Função para adicionar um item ao Firestore
export const addItem = async (userId, item) => {
  const docRef = await addDoc(collection(db, "users", userId, "items"), item);
  return docRef.id;
};
