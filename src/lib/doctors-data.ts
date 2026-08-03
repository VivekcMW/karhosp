export const SPECIALTIES = [
  { id: "cataract", key: "cataract" },
  { id: "retina", key: "retina" },
  { id: "glaucoma", key: "glaucoma" },
  { id: "pediatric", key: "pediatric" },
] as const;

export const DOCTORS = [
  // Cataract & Refractive Surgery Specialist
  {
    id: "d1",
    name: "Dr. Ravindra Bhat",
    exp: 15,
    specialty: "cataract",
    photo: "/doctors/dr-ravindra-bhat.jpg",
  },
  
  // Medical Retina & Cataract Specialist
  {
    id: "d2",
    name: "Dr. Siddhi Pandit",
    exp: 15,
    specialty: "retina",
    photo: "/doctors/dr-siddhi-pandit.jpg",
  },
  
  // Cataract & Squint Specialist
  {
    id: "d3",
    name: "Dr. Sharad Anil Kolvekar",
    exp: 12,
    specialty: "cataract",
    photo: "/doctors/dr-sharad-kolvekar.jpg",
  },
] as const;
