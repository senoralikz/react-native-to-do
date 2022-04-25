// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// export const getTasks = async (setTasks) => {
//   try {
//     await getDocs(collection(db, "tasks")).then((response) => {
//       // console.log("this is the collection of tasks", response.docs)
//       let gettingTasks = [];
//       response.docs.forEach((doc) => {
//         gettingTasks.push({ ...doc.data(), taskId: doc.id });
//       });
//       console.log("getting tasks from getTasks in homescreen:", gettingTasks);
//       setTasks(gettingTasks);
//     });
//   } catch (error) {
//     console.error("could not get tasks:", error);
//   }
// };
