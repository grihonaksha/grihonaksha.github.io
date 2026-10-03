/* ============================================================
   PROJECTS DATA — নতুন প্রজেক্ট যোগ করার একমাত্র জায়গা
   ============================================================
   নতুন প্রজেক্ট যোগ করতে চাইলে:
   1) আপনার ছবি(গুলো) "images/" ফোল্ডারে রাখুন
   2) নিচের তালিকায় শেষে (অথবা যেকোনো জায়গায়) কমা দিয়ে
      { ... } আকারে একটা নতুন এন্ট্রি যোগ করুন, নিচের নমুনা অনুসরণ করে
   3) সেভ করে GitHub-এ শুধু এই ফাইল আর নতুন ছবিগুলো আপলোড করুন —
      index.html বা অন্য কোনো ফাইল বদলানোর দরকার নেই, হোমপেজ ও
      ডিটেইল পেজ দুটোই এই তালিকা থেকে নিজে থেকে তৈরি হয়ে যাবে

   প্রতিটা প্রজেক্টের ঘরগুলোর মানে:
   id          — ইউনিক নাম, শুধু ইংরেজি ছোট হাতের অক্ষর ও হাইফেন
                 (URL-এ ব্যবহার হয়, একবার দিলে পরে না পাল্টানোই ভালো)
   title       — প্রজেক্টের নাম
   location    — এলাকা/জায়গার নাম
   year        — সাল
   category    — ছোট এক লাইনের ট্যাগ, যেমন "Residential — new build"
   image       — মূল ছবির ফাইলের নাম (শুধু নাম, "images/" লেখার দরকার নেই)
   description — বিস্তারিত লেখা, এক বা একাধিক প্যারাগ্রাফ (নিচে অ্যারে হিসেবে)
   gallery     — (ঐচ্ছিক) আরও অতিরিক্ত ছবির নামের তালিকা, না থাকলে [] রাখুন
   ============================================================ */

const PROJECTS = [
  {
    id: "kadam-house",
    title: "Kadam House",
    location: "Dhanmondi",
    year: "2024",
    category: "Residential — new build",
    image: "project-1.jpg",
    description: [
      "একটি পারিবারিক বাসভবন, যেখানে প্রতিটি ঘর সরাসরি বাগানের দিকে খোলা।",
      "এখানে বিস্তারিত লেখা যোগ করুন — জমির আকার, নকশার ভাবনা, ব্যবহৃত উপকরণ, চ্যালেঞ্জ ও সমাধান।"
    ],
    gallery: []
  },
  {
    id: "uttara-library",
    title: "Uttara Community Library",
    location: "Uttara",
    year: "2023",
    category: "Civic — new build",
    image: "project-2.jpg",
    description: [
      "একটি কমিউনিটি লাইব্রেরি, প্রাকৃতিক আলো ও বাতাস চলাচলের ওপর গুরুত্ব দিয়ে নকশা করা।",
      "এখানে বিস্তারিত লেখা যোগ করুন।"
    ],
    gallery: []
  },
  {
    id: "old-town-courtyard",
    title: "Old Town Courtyard",
    location: "Old Dhaka",
    year: "2023",
    category: "Residential — renovation",
    image: "project-3.jpg",
    description: [
      "পুরনো ঢাকার একটি ঐতিহ্যবাহী বাড়ির সংস্কার, মূল কাঠামো রেখে ভেতরের অংশ নতুন করে সাজানো।",
      "এখানে বিস্তারিত লেখা যোগ করুন।"
    ],
    gallery: []
  },
  {
    id: "riverside-studio",
    title: "Riverside Studio",
    location: "Keraniganj",
    year: "2022",
    category: "Studio — new build",
    image: "project-4.jpg",
    description: [
      "নদীর ধারে একটি শিল্পীর স্টুডিও, জলের প্রতিফলিত আলোকে কাজে লাগিয়ে নকশা করা।",
      "এখানে বিস্তারিত লেখা যোগ করুন।"
    ],
    gallery: []
  },
  {
    id: "banani-clinic",
    title: "Banani Clinic",
    location: "Banani",
    year: "2022",
    category: "Institutional — interior",
    image: "project-5.jpg",
    description: [
      "একটি ছোট ক্লিনিকের অন্দরসজ্জা, শান্ত ও আশ্বস্তকর পরিবেশ তৈরির লক্ষ্যে।",
      "এখানে বিস্তারিত লেখা যোগ করুন।"
    ],
    gallery: []
  },
  {
    id: "green-terrace",
    title: "Green Terrace Apartments",
    location: "Bashundhara",
    year: "2021",
    category: "Residential — multi-unit",
    image: "project-6.jpg",
    description: [
      "একটি বহুতল আবাসিক ভবন, প্রতিটি ফ্ল্যাটের সাথে সবুজ টেরাস যুক্ত।",
      "এখানে বিস্তারিত লেখা যোগ করুন।"
    ],
    gallery: []
  }
];

// নতুন প্রজেক্ট যোগ করার নমুনা — এই আকারে একটা অবজেক্ট বানিয়ে
// PROJECTS.push({...}) দিয়ে যোগ করতে পারেন, অথবা উপরের তালিকায়
// শেষ এন্ট্রির পর কমা দিয়ে সরাসরি বসিয়ে দিতে পারেন:
//
// PROJECTS.push({
//   id: "notun-project",
//   title: "প্রজেক্টের নাম",
//   location: "এলাকার নাম",
//   year: "2026",
//   category: "Residential — new build",
//   image: "project-7.jpg",
//   description: [
//     "প্রথম প্যারাগ্রাফ।",
//     "দ্বিতীয় প্যারাগ্রাফ, প্রয়োজনে আরও যোগ করা যায়।"
//   ],
//   gallery: ["project-7-b.jpg", "project-7-c.jpg"]
// });
