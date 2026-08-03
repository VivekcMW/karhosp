export const SPECIALTIES = [
  { id: "cataract", key: "cataract" },
  { id: "retina", key: "retina" },
  { id: "glaucoma", key: "glaucoma" },
  { id: "pediatric", key: "pediatric" },
] as const;

export const DOCTORS = [
  // Cataract Specialists
  {
    id: "d1",
    name: "Dr. Sharad Anil Kolvekar",
    exp: 15,
    specialty: "cataract",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&h=500&q=80",
  },
  {
    id: "d2",
    name: "Dr. Siddhi Pandit",
    exp: 10,
    specialty: "cataract",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&h=500&q=80",
  },
  {
    id: "d4",
    name: "Dr. Priya Naik",
    exp: 8,
    specialty: "cataract",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&h=500&q=80",
  },
  
  // Retina Specialists
  {
    id: "d5",
    name: "Dr. Anand Desai",
    exp: 18,
    specialty: "retina",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&h=500&q=80",
  },
  {
    id: "d6",
    name: "Dr. Meera Kulkarni",
    exp: 12,
    specialty: "retina",
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&h=500&q=80",
  },
  
  // Glaucoma Specialists
  {
    id: "d3",
    name: "Dr. Ravindra Bhat",
    exp: 12,
    specialty: "glaucoma",
    photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&h=500&q=80",
  },
  
  // Pediatric Specialists
  {
    id: "d7",
    name: "Dr. Kavita Hegde",
    exp: 14,
    specialty: "pediatric",
    photo: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=400&h=500&q=80",
  },
] as const;
