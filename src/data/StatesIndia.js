// const statesInIndia = [
//     "Andhra Pradesh",
//     "Arunachal Pradesh",
//     "Assam",
//     "Bihar",
//     "Chhattisgarh",
//     "Goa",
//     "Gujarat",
//     "Haryana",
//     "Himachal Pradesh",
//     "Jharkhand",
//     "Karnataka",
//     "Kerala",
//     "Madhya Pradesh",
//     "Maharashtra",
//     "Manipur",
//     "Meghalaya",
//     "Mizoram",
//     "Nagaland",
//     "Odisha",
//     "Punjab",
//     "Rajasthan",
//     "Sikkim",
//     "Tamil Nadu",
//     "Telangana",
//     "Tripura",
//     "Uttar Pradesh",
//     "Uttarakhand",
//     "West Bengal"
// ];

const statesAndCitiesInIndia = [
    {
        state: "Andhra Pradesh",
        cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kadapa", "Anantapur", "Kakinada"]
    },
    {
        state: "Arunachal Pradesh",
        cities: ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Bomdila", "Aalo", "Roing", "Tezu", "Khonsa"]
    },
    {
        state: "Assam",
        cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Karimganj", "Sivasagar"]
    },
    {
        state: "Bihar",
        cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar"]
    },
    {
        state: "Chhattisgarh",
        cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur", "Raigarh", "Ambikapur", "Mahasamund"]
    },
    {
        state: "Delhi",
        cities: ["New Delhi"]
    },
    {
        state: "Goa",
        cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Mormugao", "Sanguem", "Valpoi"]
    },
    {
        state: "Gujarat",
        cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari"]
    },
    {
        state: "Haryana",
        cities: ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"]
    },
    {
        state: "Himachal Pradesh",
        cities: ["Shimla", "Dharamshala", "Manali", "Solan", "Mandi", "Kullu", "Chamba", "Una", "Hamirpur", "Nahan"]
    },
    {
        state: "Jharkhand",
        cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Phusro", "Gumla"]
    },
    {
        state: "Karnataka",
        cities: ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Davangere", "Ballari", "Shivamogga", "Tumakuru", "Udupi"]
    },
    {
        state: "Kerala",
        cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Palakkad", "Malappuram", "Kannur", "Kottayam"]
    },
    {
        state: "Madhya Pradesh",
        cities: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Ratlam", "Rewa", "Satna", "Dewas"]
    },
    {
        state: "Maharashtra",
        cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Nanded"]
    },
    {
        state: "Manipur",
        cities: ["Imphal", "Churachandpur", "Thoubal", "Kakching", "Ukhrul", "Bishnupur", "Senapati", "Tamenglong", "Jiribam", "Moirang"]
    },
    {
        state: "Meghalaya",
        cities: ["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara", "Williamnagar", "Resubelpara", "Mairang", "Nongpoh", "Mawkyrwat"]
    },
    {
        state: "Mizoram",
        cities: ["Aizawl", "Lunglei", "Saiha", "Champhai", "Serchhip", "Kolasib", "Lawngtlai", "Mamit", "Bairabi", "Saitual"]
    },
    {
        state: "Nagaland",
        cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Phek", "Kiphire", "Longleng"]
    },
    {
        state: "Odisha",
        cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Baripada", "Bhadrak", "Jharsuguda"]
    },
    {
        state: "Punjab",
        cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Moga", "Pathankot", "Phagwara"]
    },
    {
        state: "Rajasthan",
        cities: ["Jaipur", "Jodhpur", "Kota", "Udaipur", "Ajmer", "Bikaner", "Bhilwara", "Alwar", "Bharatpur", "Pali"]
    },
    {
        state: "Sikkim",
        cities: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Singtam", "Rangpo", "Jorethang", "Ravangla", "Soreng", "Yuksom"]
    },
    {
        state: "Tamil Nadu",
        cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul"]
    },
    {
        state: "Telangana",
        cities: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda", "Siddipet", "Miryalaguda"]
    },
    {
        state: "Tripura",
        cities: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia", "Khowai", "Teliamura", "Ambassa", "Santirbazar", "Jogendranagar"]
    },
    {
        state: "Uttar Pradesh",
        cities: ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Moradabad", "Aligarh"]
    },
    {
        state: "Uttarakhand",
        cities: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Pithoragarh", "Almora", "Tehri"]
    },
    {
        state: "West Bengal",
        cities: ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Howrah", "Bardhaman", "Malda", "Kharagpur", "Haldia", "Raiganj"]
    }
];

export default statesAndCitiesInIndia