// Mock user profiles for KrishiFlow AI demo

export const MOCK_USER_FARMER = {
  id: 'farmer',
  name: 'Ramesh Kumar',
  nameHi: 'रमेश कुमार',
  role: 'farmer',
  roleLabel: 'Producer / Farmer',
  roleLabelHi: 'उत्पादक / किसान',
  initials: 'RK',
  phone: '+91 98112 45892',
  location: 'Dadri, Gautam Buddha Nagar',
  locationHi: 'दादरी, गौतम बुद्ध नगर',
  organization: 'Dadri Farm Gate #1',
  organizationHi: 'दादरी फार्म गेट #1',
  district: 'Gautam Buddha Nagar',
  state: 'Uttar Pradesh',
  rating: 4.9,
  verified: true,
};

export const MOCK_USER_BUYER = {
  id: 'buyer',
  name: 'Priya Sharma',
  nameHi: 'प्रिया शर्मा',
  role: 'buyer',
  roleLabel: 'Enterprise Buyer',
  roleLabelHi: 'संस्थागत खरीदार',
  initials: 'PS',
  phone: '+91 99100 32145',
  location: 'Sector 62, Noida',
  locationHi: 'सेक्टर 62, नोएडा',
  organization: 'FreshBite Restaurants',
  organizationHi: 'फ्रेशबाइट रेस्टोरेंट्स',
  designation: 'Procurement Head',
  designationHi: 'खरीद प्रमुख',
  rating: 4.9,
};

export const ADDITIONAL_FARMERS = [
  { id: 'af1', name: 'Ramesh Kumar', nameHi: 'रमेश कुमार' },
  { id: 'af2', name: 'Sita Devi', nameHi: 'सीता देवी' },
  { id: 'af3', name: 'Rajesh Yadav', nameHi: 'राजेश यादव' },
  { id: 'af4', name: 'Anita Sharma', nameHi: 'अनिता शर्मा' },
];

export const ADDITIONAL_BUYERS = [
  { id: 'ab1', name: 'FreshBite Restaurants', nameHi: 'फ्रेशबाइट रेस्टोरेंट्स' },
  { id: 'ab2', name: 'Delhi Hospitality Group', nameHi: 'दिल्ली हॉस्पिटैलिटी ग्रुप' },
  { id: 'ab3', name: 'UrbanMart Retail', nameHi: 'अर्बनमार्ट रिटेल' },
  { id: 'ab4', name: 'Noida Foods Pvt Ltd', nameHi: 'नोएडा फूड्स प्राइवेट लिमिटेड' },
];

export const getCurrentUser = (role) => {
  return role === 'farmer' ? MOCK_USER_FARMER : MOCK_USER_BUYER;
};
