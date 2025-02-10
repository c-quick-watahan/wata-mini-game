// import { initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   collection,
//   getDocs,
// } from "firebase/firestore";
// import { Career, Id } from "../interfaces/Game";
// import { firebaseConfig } from "@/lib/firebase/config";

// const app = initializeApp(firebaseConfig);
// const db = getFirestore();

// export const careers: Career[] = [
//   {
//     careerId: "sashimi-chef",
//     careerName: "Sashimi Chef",
//     games: [
//       {
//         gameId: "sashimi-game",
//         name: "Sashimi Game",
//         filename: "sushi",
//         sortableItems: [
//           {
//             id: 0,
//             rowId: "bottom",
//             title: "ウロコを書く",
//             content: "sushi_0.png",
//           },
//           {
//             id: 1,
//             rowId: "bottom",
//             title: "3枚におろす",
//             content: "sushi_1.png",
//           },
//           {
//             id: 2,
//             rowId: "bottom",
//             title: "皮を引く",
//             content: "sushi_2.png",
//           },
//           {
//             id: 3,
//             rowId: "bottom",
//             title: "スライス",
//             content: "sushi_3.png",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     careerId: "pastry-chef",
//     careerName: "Pastry Chef",
//     games: [
//       {
//         gameId: "cake-decorating",
//         name: "Cake Decorating",
//         filename: "cake",
//         sortableItems: [
//           {
//             id: 0,
//             rowId: "bottom",
//             title: "Bake the cake",
//             content: "cake_0.png",
//           },
//           {
//             id: 1,
//             rowId: "bottom",
//             title: "Apply frosting",
//             content: "cake_1.png",
//           },
//           {
//             id: 2,
//             rowId: "bottom",
//             title: "Add decorations",
//             content: "cake_2.png",
//           },
//           {
//             id: 3,
//             rowId: "bottom",
//             title: "Serve the cake",
//             content: "cake_3.png",
//           },
//         ],
//       },
//       {
//         gameId: "cookie-baking",
//         name: "Cookie Baking",
//         filename: "cookie",
//         sortableItems: [
//           {
//             id: 0,
//             rowId: "bottom",
//             title: "Mix ingredients",
//             content: "cookie_0.png",
//           },
//           {
//             id: 1,
//             rowId: "bottom",
//             title: "Shape cookies",
//             content: "cookie_1.png",
//           },
//           {
//             id: 2,
//             rowId: "bottom",
//             title: "Bake cookies",
//             content: "cookie_2.png",
//           },
//           {
//             id: 3,
//             rowId: "bottom",
//             title: "Cool and serve",
//             content: "cookie_3.png",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     careerId: "barista",
//     careerName: "Barista",
//     games: [
//       {
//         gameId: "coffee-brewing",
//         name: "Coffee Brewing",
//         filename: "coffee",
//         sortableItems: [
//           {
//             id: 0,
//             rowId: "bottom",
//             title: "Grind beans",
//             content: "coffee_0.png",
//           },
//           {
//             id: 1,
//             rowId: "bottom",
//             title: "Brew coffee",
//             content: "coffee_1.png",
//           },
//           {
//             id: 2,
//             rowId: "bottom",
//             title: "Pour coffee",
//             content: "coffee_2.png",
//           },
//           {
//             id: 3,
//             rowId: "bottom",
//             title: "Serve coffee",
//             content: "coffee_3.png",
//           },
//         ],
//       },
//       {
//         gameId: "latte-art",
//         name: "Latte Art",
//         filename: "latte",
//         sortableItems: [
//           {
//             id: 0,
//             rowId: "bottom",
//             title: "Steam milk",
//             content: "latte_0.png",
//           },
//           {
//             id: 1,
//             rowId: "bottom",
//             title: "Pour milk",
//             content: "latte_1.png",
//           },
//           {
//             id: 2,
//             rowId: "bottom",
//             title: "Create art",
//             content: "latte_2.png",
//           },
//           {
//             id: 3,
//             rowId: "bottom",
//             title: "Serve latte",
//             content: "latte_3.png",
//           },
//         ],
//       },
//     ],
//   },
// ];

// async function addCareersToFirestore() {
//   if (!careers || !db) return;
//   const careersCollectionRef = collection(db, "careers");
//   const careersCollectionSnap = await getDocs(careersCollectionRef);

//   if (careersCollectionSnap) {
//     console.log("Careers collection does not exist.");
//   }
//   for (const career of careers) {
//     const careerRef = doc(db, "careers", career.careerId.toString());
//     await setDoc(careerRef, career);
//   }
// }

// addCareersToFirestore().catch(console.error);
// //comment
