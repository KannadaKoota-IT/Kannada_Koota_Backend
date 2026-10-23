// Kannada_Koota_Backend/scripts/seed_local_db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const LOCAL_URI = "mongodb://127.0.0.1:27017/kannada_koota";

async function seed() {
  console.log("Connecting to local MongoDB:", LOCAL_URI);
  await mongoose.connect(LOCAL_URI);
  console.log("Connected to local MongoDB successfully!");

  const db = mongoose.connection.db;

  // 1. Seed Events
  console.log("Seeding Events...");
  await db.collection("events").deleteMany({});
  const events = [
    {
      title: "HackEEE 4.0 - Kannada Tech Fest",
      title_k: "ಹ್ಯಾಕ್ಇಇಇ ೪.೦ - ಕನ್ನಡ ತಂತ್ರಜ್ಞಾನ ಉತ್ಸವ",
      description: "A 24-hour state-level innovation hackathon celebrating Karnataka Rajyotsava through technology, problem solving, and cultural bonding.",
      description_k: "ಕನ್ನಡದ ಬೆಳಕಲ್ಲಿ ತಂತ್ರಜ್ಞಾನವ ಬೆಳಗಿಸುವ ೨೪ ಗಂಟೆಗಳ ರಾಜ್ಯಮಟ್ಟದ ಹ್ಯಾಕಥಾನ್ ಸ್ಪರ್ಧೆ.",
      date: new Date("2026-11-14T10:00:00.000Z"),
      eventTime: "10:00 AM",
      imageUrl: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762023371/kannada_koota/thrqap6nefgip96fckqy.jpg",
      location: "13th Floor, BE Block, PES University",
      link: "https://forms.gle/yM9GK6qAkMZpRCrv9",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Kannadada Kannadi 2.0 - Quiz Championship",
      title_k: "ಕನ್ನಡದ ಕನ್ನಡಿ ೨.೦ - ರಸಪ್ರಶ್ನೆ ಸ್ಪರ್ಧೆ",
      description: "The ultimate quiz celebrating Karnataka's heritage, literature, cinema, and history. Exciting prizes and campus fame await!",
      description_k: "ನಮ್ಮ ನಾಡು, ನುಡಿ, ಸಾಹಿತ್ಯ ಮತ್ತು ಸಂಸ್ಕೃತಿಯನ್ನು ಆಚರಿಸುವ ಬೃಹತ್ ರಸಪ್ರಶ್ನೆ ಸ್ಪರ್ಧೆ.",
      date: new Date("2026-11-06T15:00:00.000Z"),
      eventTime: "03:00 PM",
      imageUrl: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762277624/kannada_koota/hvmju9z6xftzqeorpcxg.jpg",
      location: "BE Block Auditorium, PES University",
      link: "https://docs.google.com/forms",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Guruthu 2026 - Cultural Extravaganza",
      title_k: "ಗುರುತು ೨೦೨೬ - ಭವ್ಯ ಸಾಂಸ್ಕೃತಿಕ ಸಮ್ಮಿಲನ",
      description: "An artistic confluence of theatre, live music, folk dance, and thought-provoking talks with legendary Kannada achievers.",
      description_k: "ಕಲೆ, ಸಾಹಿತ್ಯ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಗರಿಮೆಯನ್ನು ಬಿಂಬಿಸುವ ಅದ್ಭುತ ರಂಗ ಉತ್ಸವ.",
      date: new Date("2026-11-05T16:00:00.000Z"),
      eventTime: "04:00 PM",
      imageUrl: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762149236/kannada_koota/deehqghowahrukqybbjw.jpg",
      location: "MRD Auditorium, PES University",
      link: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Sahithya Sambhrama - Book Fair & Literature Meet",
      title_k: "ಸಾಹಿತ್ಯ ಸಂಭ್ರಮ - ಪುಸ್ತಕ ಪ್ರದರ್ಶನ ಮತ್ತು ಸಂವಾದ",
      description: "Explore rare classical manuscripts, engage in poetic debates, and meet renowned authors in this annual celebration of Kannada letters.",
      description_k: "ಅಪರೂಪದ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಕೃತಿಗಳ ಪರಿಚಯ, ಗೋಷ್ಠಿ ಮತ್ತು ಪ್ರಸಿದ್ಧ ಸಾಹಿತಿಗಳೊಂದಿಗೆ ಸಂವಾದ.",
      date: new Date("2026-11-04T11:00:00.000Z"),
      eventTime: "11:00 AM",
      imageUrl: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762276627/kannada_koota/wovrcl6pivozn1ivxrrv.jpg",
      location: "GJBC Central Library, PES University",
      link: "",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  await db.collection("events").insertMany(events);
  console.log(`Seeded ${events.length} events.`);

  // 2. Seed Announcements
  console.log("Seeding Announcements...");
  await db.collection("announcements").deleteMany({});
  const announcements = [
    {
      title: "Kannada Rajyotsava 2026 Grand Auditions",
      title_k: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ ೨೦೨೬ - ರಂಗ ಮತ್ತು ನೃತ್ಯ ಆಯ್ಕೆ ಪ್ರಕ್ರಿಯೆ",
      message: "Auditions are now open for Theatre, Classical Music, and Folk Dance wings. All students across departments are invited!",
      message_k: "ನಾಟ್ಯ, ರಂಗಭೂಮಿ ಹಾಗೂ ಗಾಯನ ವಿಭಾಗಗಳಿಗೆ ಆಯ್ಕೆ ಪ್ರಕ್ರಿಯೆ ಆರಂಭವಾಗಿದೆ. ಆಸಕ್ತ ವಿದ್ಯಾರ್ಥಿಗಳು ನೋಂದಾಯಿಸಿಕೊಳ್ಳಿ.",
      mediaUrl: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1760424108/kannada_koota/sd0jr2otheywqwagvq5v.jpg",
      mediaType: "image",
      mediaPublicId: "kannada_koota/sd0jr2otheywqwagvq5v",
      link: "https://forms.gle",
      date: new Date("2026-10-28T00:00:00.000Z"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Kannada Kali Class - Batch Registration",
      title_k: "ಕನ್ನಡ ಕಲಿ ತರಗತಿ - ನೂತನ ತಂಡದ ಪ್ರವೇಶ",
      message: "Free conversational Kannada sessions for non-Karnataka students starting next Monday at Central Block.",
      message_k: "ಕರ್ನಾಟಕೇತರ ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಕನ್ನಡ ಕಲಿಕಾ ಉಚಿತ ತರಗತಿಗಳು ಮುಂದಿನ ಸೋಮವಾರದಿಂದ ಪ್ರಾರಂಭವಾಗಲಿವೆ.",
      mediaUrl: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762190142/kannada_koota/b76dkydkaz76jaal9wux.jpg",
      mediaType: "image",
      mediaPublicId: "kannada_koota/b76dkydkaz76jaal9wux",
      link: "",
      date: new Date("2026-10-25T00:00:00.000Z"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Annual Magazine Article Submissions Open",
      title_k: "ವಾರ್ಷಿಕ ಸಂಚಿಕೆಗಾಗಿ ಲೇಖನ ಮತ್ತು ಕವನ ಆಹ್ವಾನ",
      message: "Submit your original poems, essays, and artwork for our prestigious Rajyotsava souvenir 'Chiguru'.",
      message_k: "ಕೂಟದ ವಾರ್ಷಿಕ ಸಂಚಿಕೆ 'ಚಿಗುರು'ಗೆ ಕವನ, ಲೇಖನ ಮತ್ತು ಕಲಾಕೃತಿಗಳನ್ನು ಕಳುಹಿಸಲು ಕೊನೆಯ ದಿನಾಂಕ ಸಮೀಪಿಸುತ್ತಿದೆ.",
      mediaUrl: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762190317/kannada_koota/wsv3xpctfzht6q7u5woh.jpg",
      mediaType: "image",
      mediaPublicId: "kannada_koota/wsv3xpctfzht6q7u5woh",
      link: "",
      date: new Date("2026-10-20T00:00:00.000Z"),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  await db.collection("announcements").insertMany(announcements);
  console.log(`Seeded ${announcements.length} announcements.`);

  // 3. Seed Teams & TeamMembers
  console.log("Seeding Teams and Members...");
  await db.collection("teams").deleteMany({});
  await db.collection("teammembers").deleteMany({});

  const teamsData = [
    {
      team_name: "Core Leadership",
      team_name_k: "ಮುಖ್ಯ ನಾಯಕತ್ವ ಮಂಡಳಿ",
      team_photo: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1760077988/kannada_koota/higcgvvzdwpepzbnusim.jpg",
      order: 1,
      members: [
        {
          name: "Bhuvan Kumar",
          name_k: "ಭುವನ್ ಕುಮಾರ್",
          email: "bhuvan.koota@pes.edu",
          phone: "9876543210",
          role: "head",
          image_url: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1761940773/kannada_koota/ncj2h3grjg63kqgzbm0z.jpg"
        },
        {
          name: "Daivika",
          name_k: "ದೈವಿಕಾ",
          email: "daivika.koota@pes.edu",
          phone: "9876543211",
          role: "head",
          image_url: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1770498361/kannada_koota/jb2patmudtddn6em1hu5.jpg"
        }
      ]
    },
    {
      team_name: "Technical & Web Domain",
      team_name_k: "ತಾಂತ್ರಿಕ ಮತ್ತು ಜಾಲತಾಣ ವಿಭಾಗ",
      team_photo: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762188793/kannada_koota/x6apy4jukv7lyzv3j46d.jpg",
      order: 2,
      members: [
        {
          name: "Prasad",
          name_k: "ಪ್ರಸಾದ್",
          email: "prasad.tech@pes.edu",
          phone: "9876543212",
          role: "head",
          image_url: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1760079663/kannada_koota/h5fl9885tdrjakxpbent.jpg"
        },
        {
          name: "Jitendra Rathod",
          name_k: "ಜಿತೇಂದ್ರ ರಾಠೋಡ",
          email: "jittu.web@pes.edu",
          phone: "9876543213",
          role: "member",
          image_url: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1770497208/kannada_koota/eajzousdeuuqqtnatfbz.jpg"
        }
      ]
    },
    {
      team_name: "Design & Creative Media",
      team_name_k: "ವಿನ್ಯಾಸ ಮತ್ತು ಸೃಜನಶೀಲ ಮಾಧ್ಯಮ",
      team_photo: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762190511/kannada_koota/dz2mmgpczc4vwy149w6j.jpg",
      order: 3,
      members: [
        {
          name: "Spandana",
          name_k: "ಸ್ಪಂದನಾ",
          email: "spandana.design@pes.edu",
          phone: "9876543214",
          role: "head",
          image_url: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1769361525/kannada_koota/xzjj0z01o9belgpyef3t.jpg"
        }
      ]
    },
    {
      team_name: "Cultural & Performing Arts",
      team_name_k: "ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ರಂಗ ಕಲೆಗಳ ವಿಭಾಗ",
      team_photo: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762190445/kannada_koota/mrzzyajw9r7rzwib7l38.jpg",
      order: 4,
      members: [
        {
          name: "Manyata",
          name_k: "ಮಾನ್ಯತಾ",
          email: "manyata.arts@pes.edu",
          phone: "9876543215",
          role: "head",
          image_url: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762331120/kannada_koota/vlmhyyiyrs96f9ci4auq.jpg"
        }
      ]
    },
    {
      team_name: "PR & Event Management",
      team_name_k: "ಸಂಪರ್ಕ ಮತ್ತು ಕಾರ್ಯಕ್ರಮ ನಿರ್ವಹಣೆ",
      team_photo: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762187682/kannada_koota/exzuux7os3o5sejc0ody.jpg",
      order: 5,
      members: [
        {
          name: "Gourish",
          name_k: "ಗೌರೀಶ್",
          email: "gourish.pr@pes.edu",
          phone: "9876543216",
          role: "head",
          image_url: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762280183/kannada_koota/mdckuqrn7qlk0ivvpyrp.jpg"
        },
        {
          name: "Vivan Raj",
          name_k: "ವಿವನ್ ರಾಜ್",
          email: "vivan.evm@pes.edu",
          phone: "9876543217",
          role: "member",
          image_url: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762278741/kannada_koota/ccmr6olp5xh0yf1yhsmt.jpg"
        }
      ]
    }
  ];

  for (const t of teamsData) {
    const { members, ...teamObj } = t;
    teamObj.createdAt = new Date();
    teamObj.updatedAt = new Date();
    const teamRes = await db.collection("teams").insertOne(teamObj);
    const teamId = teamRes.insertedId;

    if (members && members.length > 0) {
      const formattedMembers = members.map(m => ({
        ...m,
        team: teamId,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      await db.collection("teammembers").insertMany(formattedMembers);
    }
  }
  console.log(`Seeded ${teamsData.length} teams and their members.`);

  // 4. Seed Gallery
  console.log("Seeding Gallery...");
  await db.collection("galleries").deleteMany({});
  const galleryItems = [
    {
      desc: "Raghu Dixit Live in Concert, Kannada Rajyotsava",
      mediaUrl: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1755860119/kannada_koota/nxwzvwm6sqtgbq5pjmgg.png",
      mediaType: "image",
      publicId: "kannada_koota/nxwzvwm6sqtgbq5pjmgg",
      order: 1,
      link: "https://instagram.com",
      uploadedAt: new Date()
    },
    {
      desc: "Flash Mob Celebration at Campus OAT",
      mediaUrl: "https://res.cloudinary.com/dkrlqklp1/video/upload/v1755860736/kannada_koota/ygrdw93gwiqftyk4r2l7.mp4",
      mediaType: "video",
      publicId: "kannada_koota/ygrdw93gwiqftyk4r2l7",
      order: 2,
      link: "",
      uploadedAt: new Date()
    },
    {
      desc: "Traditional Dollu Kunitha & Folk Rhythms",
      mediaUrl: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1759207320/kannada_koota/ua93qfard5o8omfhgqbh.png",
      mediaType: "image",
      publicId: "kannada_koota/ua93qfard5o8omfhgqbh",
      order: 3,
      link: "",
      uploadedAt: new Date()
    },
    {
      desc: "Yakshagana Vesha Performance - Cultural Heritage",
      mediaUrl: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762187682/kannada_koota/exzuux7os3o5sejc0ody.jpg",
      mediaType: "image",
      publicId: "kannada_koota/exzuux7os3o5sejc0ody",
      order: 4,
      link: "",
      uploadedAt: new Date()
    },
    {
      desc: "Hulivesha Folk Dance - High Energy Celebration",
      mediaUrl: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1762190560/kannada_koota/t7g9irkr38betdupsmyw.jpg",
      mediaType: "image",
      publicId: "kannada_koota/t7g9irkr38betdupsmyw",
      order: 5,
      link: "",
      uploadedAt: new Date()
    },
    {
      desc: "Vasuki Vaibhav Musical Night",
      mediaUrl: "https://res.cloudinary.com/dkrlqklp1/image/upload/v1761934424/kannada_koota/vyedbysy6vafylq7q71l.jpg",
      mediaType: "image",
      publicId: "kannada_koota/vyedbysy6vafylq7q71l",
      order: 6,
      link: "",
      uploadedAt: new Date()
    }
  ];
  await db.collection("galleries").insertMany(galleryItems);
  console.log(`Seeded ${galleryItems.length} gallery items.`);

  console.log("ALL LOCAL SEED DATA INSERTED SUCCESSFULLY!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
