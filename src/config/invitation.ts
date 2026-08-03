export const invitationConfig = {
  groom: {
    name: "Mujammil",
    fullName: "Mujammil Shaikh",
    parents: "Son of Mr. & Mrs. Rajjak & Parveen Shaikh",
  },
  bride: {
    name: "Zikra",
    fullName: "Zikra Shaikh",
    parents: "Daughter of Mr. & Mrs. Yusuf & Sana Shaikh",
  },
  event: {
    title: "THE RECEPTION",
    tagline: "WE INVITE YOU TO CELEBRATE OUR RECEPTION",
    date: "22 August 2026",
    isoDate: "2026-08-22T19:00:00+05:30",
    day: "Saturday",
    time: "7:00 PM onwards",
    venue: "SAPTAPADI MANGAL KARYALAY",
    address: "Katwan Khandoba Road",
    city: "Ahilyanagar (Ahmednagar), Maharashtra",
    mapsUrl: "https://maps.app.goo.gl/bJR1BSBodN4MBJd99",
    whatsappNumber: "919876543210", // Pre-filled RSVP WhatsApp number
  },
  messages: {
    openingSubtitle: "YOU ARE CORDIALLY INVITED",
    openingDate: "22 AUGUST 2026",
    blessingText: "With the blessings of our families",
    inviteText:
      "Together with our families, we invite you to join us as we celebrate a beautiful beginning and share an evening filled with love, laughter, and cherished memories.",
    coupleQuote: "Two hearts. One beautiful beginning.",
    rsvpTitle: "WE WOULD LOVE TO CELEBRATE WITH YOU",
    rsvpSubtitle: "Your presence will make our celebration even more special.",
    closingTitle: "THANK YOU",
    closingMessage:
      "We look forward to celebrating this special evening with you.",
    closingWithLove: "With Love,",
  },
  music: {
    title: "Soothing Reception Symphony",
    file: "/music/reception-music.mp3",
  },
  media: {
    openingBg: "/images/opening-bg.jpg",
    coupleHero: "/images/couple_muslim.png",
    closingBg: "/images/closing-bg.jpg",
    ogImage: "/images/couple_muslim.png",
    gallery: [
      {
        id: "1",
        src: "/images/gallery_1.png",
        alt: "Grand Reception Stage Setup",
        caption: "Opulent Chandeliers & Floral Arch Decor",
        span: "col-span-12 md:col-span-8 row-span-2",
      },
      {
        id: "2",
        src: "/images/gallery_2.png",
        alt: "Mujammil & Zikra Golden Moment",
        caption: "Sharing Smiles Under Golden Sparkles",
        span: "col-span-12 md:col-span-4 row-span-1",
      },
      {
        id: "3",
        src: "/images/gallery_3.png",
        alt: "Intricate Wedding Rings Details",
        caption: "Symbols of Eternal Togetherness",
        span: "col-span-12 md:col-span-4 row-span-1",
      },
      {
        id: "4",
        src: "/images/gallery_4.png",
        alt: "Henna & Gold Bangles Details",
        caption: "Traditional Elegance & Delicate Artistry",
        span: "col-span-12 md:col-span-4 row-span-1",
      },
      {
        id: "5",
        src: "/images/gallery_5.png",
        alt: "Candlelit Banquet Table",
        caption: "An Atmosphere of Royalty & Warmth",
        span: "col-span-12 md:col-span-4 row-span-1",
      },
      {
        id: "6",
        src: "/images/gallery_6.png",
        alt: "Shadow Walk of the Couple",
        caption: "A Journey of Grace into Forever",
        span: "col-span-12 md:col-span-4 row-span-1",
      },
    ],
  },
};

export type InvitationConfig = typeof invitationConfig;
