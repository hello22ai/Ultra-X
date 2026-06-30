import { Pa } from "./ui";

export const whyFeatures = [
  { t: "AI-Powered Interface", d: "Learns what your family loves and surfaces it first.", c: "var(--accent)", i: <Pa d="M12 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" c="var(--accent)" /> },
  { t: "Voice Search", d: "Find any show or channel just by asking.", c: "var(--accent2)", i: <><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" stroke="var(--accent2)" strokeWidth="1.7" /><Pa d="M19 11a7 7 0 0 1-14 0M12 18v3" c="var(--accent2)" /></> },
  { t: "Fast Streaming", d: "Zero-buffer playback even in 4K.", c: "var(--accent3)", i: <Pa d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" c="var(--accent3)" /> },
  { t: "Family Friendly", d: "Profiles and parental controls built in.", c: "var(--accent)", i: <><circle cx="9" cy="8" r="3" stroke="var(--accent)" strokeWidth="1.7" /><circle cx="17" cy="9" r="2.4" stroke="var(--accent)" strokeWidth="1.7" /><Pa d="M3 20c0-3 2.7-5 6-5s6 2 6 5M15 20c0-2 1.5-3.6 4-3.6" c="var(--accent)" /></> },
  { t: "HD & 4K Quality", d: "Crystal-clear picture with HDR support.", c: "var(--accent2)", i: <><rect x="3" y="5" width="18" height="14" rx="2" stroke="var(--accent2)" strokeWidth="1.7" /><Pa d="M7 10v4M7 12h2.5M9.5 10v4M13 10v4h2.5" c="var(--accent2)" w={1.5} /></> },
  { t: "Multi-Language", d: "10+ languages and regional content.", c: "var(--accent3)", i: <><circle cx="12" cy="12" r="9" stroke="var(--accent3)" strokeWidth="1.7" /><Pa d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" c="var(--accent3)" w={1.4} /></> },
];

export const appFeatures = ["Live TV", "Multiple Profiles", "Parental Controls", "TV Guide", "Catch-Up TV", "Video Library"];

export const contentCats = [
  { t: "Indian Channels", m: "Worldwide · 1,200+", img: "/tiles/cats/1.jpg" },
  { t: "Pakistani Channels", m: "400+ live", img: "/tiles/cats/2.jpg" },
  { t: "Live Sports", m: "Every league", img: "/tiles/cats/3.jpg" },
  { t: "Movies & Cinema", m: "50,000+ titles", img: "/tiles/cats/4.jpg" },
  { t: "Kids Content", m: "Safe & fun", img: "/tiles/cats/5.jpg" },
  { t: "Music TV", m: "Charts & live", img: "/tiles/cats/6.jpg" },
  { t: "International", m: "150+ countries", img: "/tiles/cats/7.jpg" },
  { t: "Regional Languages", m: "10+ languages", img: "/tiles/cats/8.jpg" },
];

export const products = [
  { label: "Box X", short: "Ultra X", badge: "Flagship · Latest model", accent: "var(--accent)", glow: "color-mix(in srgb,var(--accent) 30%,transparent)", name: "Box X", price: "From $129", desc: "Our flagship entertainment device, delivering premium streaming performance with AI and voice control built in.", features: ["Thousands of live channels", "Voice control remote", "AI-powered interface", "4K HDR streaming", "Subscription included"] },
  { label: "Hybrid 3", short: "Hybrid 3", badge: "All-rounder", accent: "var(--accent3)", glow: "color-mix(in srgb,var(--accent3) 30%,transparent)", name: "Hybrid 3", price: "From $79", desc: "Live TV, radio and on-demand in one affordable box — perfect for the everyday living room.", features: ["Live TV & radio", "Video on demand", "Android apps", "Pause & rewind", "Bluetooth remote"] },
  { label: "Pro Edition", short: "Pro", badge: "Power user", accent: "var(--accent2)", glow: "color-mix(in srgb,var(--accent2) 30%,transparent)", name: "Pro Edition", price: "From $169", desc: "Ultra HD streaming with the full OTT app suite and cloud streaming for the most demanding viewers.", features: ["Ultra HD streaming", "All OTT apps", "TV series & movies", "Cloud streaming", "Priority support"] },
];

export const compareRows: [string, string, string, string][] = [
  ["Storage", "16 GB", "32 GB", "64 GB"], ["RAM", "2 GB", "4 GB", "4 GB"], ["Android Version", "11", "13", "13"],
  ["Voice Remote", "—", "✓", "✓"], ["HD Support", "✓", "✓", "✓"], ["4K Support", "—", "✓", "✓"],
  ["Dual-Band WiFi", "✓", "✓", "✓"], ["Bluetooth", "✓", "✓", "✓"], ["USB Port", "1", "2", "2"],
  ["Catch-Up TV", "✓", "✓", "✓"], ["Mobile App", "✓", "✓", "✓"], ["Support", "Standard", "24×7", "Priority"],
];

export const specs: [string, string][] = [
  ["HDR Support", "M4 6h16v12H4zM7 10v4M7 12h3M10 10v4"], ["AI Processor", "M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 7h10v10H7z"],
  ["Fast CPU", "M12 8v8M8 12h8M5 5h14v14H5z"], ["Bluetooth", "M7 7l10 10-5 4V3l5 4L7 17"],
  ["Dual-Band WiFi", "M5 12a10 10 0 0 1 14 0M8 15a6 6 0 0 1 8 0M12 18h.01"], ["HDMI Output", "M3 9h18v6H3zM6 15v2h12v-2"],
  ["USB Port", "M12 3v14M12 17a2 2 0 0 0 2-2V9M9 7l3-4 3 4"], ["Screen Casting", "M3 5h18v14H3zM3 12a6 6 0 0 1 6 6M3 16a2 2 0 0 1 2 2"],
  ["Android OS", "M7 9a5 5 0 0 1 10 0v7H7zM9 5L8 3M15 5l1-2M10 12h.01M14 12h.01"], ["Zero-Buffer Tech", "M12 3a9 9 0 1 0 9 9M12 8v4l3 2"],
];

export const inbox: [string, string][] = [
  ["Streaming Device", "M4 8h16v8H4zM9 20h6"], ["Bluetooth Remote", "M8 2h8v20H8zM12 6h.01M12 10h.01"],
  ["HDMI Cable", "M5 9h6V6h2v3h6v6h-3v3h-2v-3H5z"], ["Power Adapter", "M13 2L4 14h7l-1 8 10-12h-7z"],
  ["User Manual", "M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM9 8h6M9 12h6"],
];

export const steps = [
  { n: "1", t: "Connect to TV", d: "Plug the box into any HDMI port.", c: "var(--accent)", p: "M3 9h18v6H3zM6 15v2h12v-2" },
  { n: "2", t: "Pair the remote", d: "Hold the Bluetooth button to pair.", c: "var(--accent2)", p: "M8 2h8v20H8zM12 6v.01M12 10v.01" },
  { n: "3", t: "Connect WiFi", d: "Pick your network and sign in.", c: "var(--accent3)", p: "M5 12a10 10 0 0 1 14 0M8 15a6 6 0 0 1 8 0M12 18h.01" },
  { n: "4", t: "Activate plan", d: "Enter your code to go live.", c: "var(--accent)", p: "M12 3a9 9 0 1 0 9 9M8 12l3 3 6-7" },
  { n: "5", t: "Start watching", d: "Sit back and enjoy the show.", c: "var(--accent2)", p: "M8 5v14l11-7z" },
];

export const testimonials = [
  { q: "Excellent picture quality and amazing customer service. Setup took five minutes.", name: "Priya Sharma", role: "Verified buyer · Toronto", in: "PS", g: "linear-gradient(135deg,var(--accent),var(--accent2))" },
  { q: "Easy setup and a great streaming experience — the kids haven't stopped watching.", name: "James Okafor", role: "Verified buyer · London", in: "JO", g: "linear-gradient(135deg,var(--accent3),var(--accent))" },
  { q: "Perfect for watching international channels. Finally everything in one place.", name: "Anil Mehta", role: "Verified buyer · Sydney", in: "AM", g: "linear-gradient(135deg,var(--accent2),var(--accent3))" },
  { q: "The voice remote is brilliant and there's zero buffering, even on the 4K stuff.", name: "Sara Lindqvist", role: "Verified buyer · Singapore", in: "SL", g: "linear-gradient(135deg,var(--accent),var(--accent3))" },
];

export const faqData: [string, string][] = [
  ["How do I install my device?", "Plug the box into your TV's HDMI port, connect power, and follow the on-screen guide. The whole setup takes about five minutes — no technician needed."],
  ["How do I connect to WiFi?", "On first boot, choose your network from the list and enter your password. Ultra X supports dual-band 2.4GHz and 5GHz WiFi, plus wired Ethernet on Box X and Pro."],
  ["How do I update the software?", "Updates install automatically overnight. You can also check manually under Settings → System → Software Update at any time."],
  ["How do I recharge my subscription?", "Open the Recharge section in the app or on your account page, choose a plan, and pay securely. Your service renews instantly — no reboot required."],
  ["How do I reset the device?", "Go to Settings → System → Factory Reset, or hold the reset pin for 10 seconds. Your account and subscription stay safe."],
  ["How do I install apps?", "Browse the built-in app store from the home screen and install with one click. Box X and Pro support the full OTT app suite."],
  ["Why is buffering happening?", "Buffering is almost always a network issue. Move the box closer to your router or switch to 5GHz WiFi. Our Zero-Buffer tech handles the rest."],
  ["How do I use my phone as a remote?", "Install the free Ultra X app, sign in with the same account, and tap the remote icon. Your phone instantly becomes a full touch remote with voice search."],
];

export const TVTABS = ["For You", "Sports", "Movies", "Kids"];
const setOf = (cat: string, order: number[]) => order.map((n) => `/tiles/sets/${cat}/${n}.jpg`);
export const TVSETS = [
  setOf("foryou", [1, 2, 3, 4, 5, 6, 7, 1]),
  setOf("sports", [1, 2, 3, 4, 5, 6, 7, 2]),
  setOf("movies", [1, 2, 3, 4, 5, 6, 7, 3]),
  setOf("kids", [1, 2, 3, 4, 5, 6, 7, 8]),
];
