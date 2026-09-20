// Mock orders for KrishiFlow AI

export const MOCK_ORDERS_FULL = [
  {
    id: 'ORD-2048',
    buyer: 'FreshBite Restaurants', buyerHi: 'फ्रेशबाइट रेस्टोरेंट्स',
    farmer: 'Ramesh Kumar', farmerHi: 'रमेश कुमार',
    crop: 'Tomato', cropHi: 'टमाटर', cropId: 'tomato',
    quantityKg: 250, pricePerKg: 22,
    totalValue: 5500, totalValueFormatted: '₹5,500',
    status: 'pickupScheduled', statusLabel: 'Pickup Scheduled', statusLabelHi: 'पिकअप निर्धारित',
    pickupDate: '2026-09-20', deliveryDate: '2026-09-20',
    paymentStatus: 'escrow', paymentStatusLabel: 'In Escrow', paymentStatusLabelHi: 'एस्क्रो में',
    grade: 'Grade A',
  },
  {
    id: 'ORD-2047',
    buyer: 'FreshBite Restaurants', buyerHi: 'फ्रेशबाइट रेस्टोरेंट्स',
    farmer: 'Sita Devi', farmerHi: 'सीता देवी',
    crop: 'Tomato', cropHi: 'टमाटर', cropId: 'tomato',
    quantityKg: 150, pricePerKg: 21.5,
    totalValue: 3225, totalValueFormatted: '₹3,225',
    status: 'pickupScheduled', statusLabel: 'Pickup Scheduled', statusLabelHi: 'पिकअप निर्धारित',
    pickupDate: '2026-09-20', deliveryDate: '2026-09-20',
    paymentStatus: 'escrow', paymentStatusLabel: 'In Escrow', paymentStatusLabelHi: 'एस्क्रो में',
    grade: 'Grade A',
  },
  {
    id: 'ORD-2046',
    buyer: 'FreshBite Restaurants', buyerHi: 'फ्रेशबाइट रेस्टोरेंट्स',
    farmer: 'Rajesh Yadav', farmerHi: 'राजेश यादव',
    crop: 'Tomato', cropHi: 'टमाटर', cropId: 'tomato',
    quantityKg: 100, pricePerKg: 22,
    totalValue: 2200, totalValueFormatted: '₹2,200',
    status: 'confirmed', statusLabel: 'Confirmed', statusLabelHi: 'पुष्ट',
    pickupDate: '2026-09-20', deliveryDate: '2026-09-20',
    paymentStatus: 'escrow', paymentStatusLabel: 'In Escrow', paymentStatusLabelHi: 'एस्क्रो में',
    grade: 'Grade A',
  },
  {
    id: 'ORD-2045',
    buyer: 'Delhi Hospitality Group', buyerHi: 'दिल्ली हॉस्पिटैलिटी ग्रुप',
    farmer: 'Ramesh Kumar', farmerHi: 'रमेश कुमार',
    crop: 'Potato', cropHi: 'आलू', cropId: 'potato',
    quantityKg: 400, pricePerKg: 18,
    totalValue: 7200, totalValueFormatted: '₹7,200',
    status: 'inTransit', statusLabel: 'In Transit', statusLabelHi: 'रास्ते में',
    pickupDate: '2026-09-19', deliveryDate: '2026-09-19',
    paymentStatus: 'escrow', paymentStatusLabel: 'In Escrow', paymentStatusLabelHi: 'एस्क्रो में',
    grade: 'Grade A',
  },
  {
    id: 'ORD-2044',
    buyer: 'UrbanMart Retail', buyerHi: 'अर्बनमार्ट रिटेल',
    farmer: 'Anita Sharma', farmerHi: 'अनिता शर्मा',
    crop: 'Potato', cropHi: 'आलू', cropId: 'potato',
    quantityKg: 350, pricePerKg: 17,
    totalValue: 5950, totalValueFormatted: '₹5,950',
    status: 'delivered', statusLabel: 'Delivered', statusLabelHi: 'डिलीवर',
    pickupDate: '2026-09-18', deliveryDate: '2026-09-18',
    paymentStatus: 'completed', paymentStatusLabel: 'Paid', paymentStatusLabelHi: 'भुगतान पूर्ण',
    grade: 'Grade A',
  },
  {
    id: 'ORD-2043',
    buyer: 'Noida Foods Pvt Ltd', buyerHi: 'नोएडा फूड्स प्रा. लि.',
    farmer: 'Vijay Singh', farmerHi: 'विजय सिंह',
    crop: 'Onion', cropHi: 'प्याज़', cropId: 'onion',
    quantityKg: 450, pricePerKg: 24,
    totalValue: 10800, totalValueFormatted: '₹10,800',
    status: 'delivered', statusLabel: 'Delivered', statusLabelHi: 'डिलीवर',
    pickupDate: '2026-09-17', deliveryDate: '2026-09-17',
    paymentStatus: 'completed', paymentStatusLabel: 'Paid', paymentStatusLabelHi: 'भुगतान पूर्ण',
    grade: 'Grade A',
  },
  {
    id: 'ORD-2042',
    buyer: 'GreenPlate Kitchens', buyerHi: 'ग्रीनप्लेट किचन',
    farmer: 'Sunita Devi', farmerHi: 'सुनीता देवी',
    crop: 'Carrot', cropHi: 'गाजर', cropId: 'carrot',
    quantityKg: 200, pricePerKg: 28,
    totalValue: 5600, totalValueFormatted: '₹5,600',
    status: 'delivered', statusLabel: 'Delivered', statusLabelHi: 'डिलीवर',
    pickupDate: '2026-09-16', deliveryDate: '2026-09-16',
    paymentStatus: 'completed', paymentStatusLabel: 'Paid', paymentStatusLabelHi: 'भुगतान पूर्ण',
    grade: 'Grade A',
  },
  {
    id: 'ORD-2041',
    buyer: 'MetroFresh Retail', buyerHi: 'मेट्रोफ्रेश रिटेल',
    farmer: 'Pooja Verma', farmerHi: 'पूजा वर्मा',
    crop: 'Cauliflower', cropHi: 'फूलगोभी', cropId: 'cauliflower',
    quantityKg: 200, pricePerKg: 23,
    totalValue: 4600, totalValueFormatted: '₹4,600',
    status: 'delivered', statusLabel: 'Delivered', statusLabelHi: 'डिलीवर',
    pickupDate: '2026-09-15', deliveryDate: '2026-09-15',
    paymentStatus: 'pending', paymentStatusLabel: 'Payment Pending', paymentStatusLabelHi: 'भुगतान लंबित',
    grade: 'Grade A',
  },
  {
    id: 'ORD-2040',
    buyer: 'Harvest Basket', buyerHi: 'हार्वेस्ट बास्केट',
    farmer: 'Mahesh Pal', farmerHi: 'महेश पाल',
    crop: 'Wheat', cropHi: 'गेहूं', cropId: 'wheat',
    quantityKg: 800, pricePerKg: 32,
    totalValue: 25600, totalValueFormatted: '₹25,600',
    status: 'delivered', statusLabel: 'Delivered', statusLabelHi: 'डिलीवर',
    pickupDate: '2026-09-14', deliveryDate: '2026-09-14',
    paymentStatus: 'completed', paymentStatusLabel: 'Paid', paymentStatusLabelHi: 'भुगतान पूर्ण',
    grade: 'Grade A',
  },
  {
    id: 'ORD-2039',
    buyer: 'NCR Caterers', buyerHi: 'NCR कैटरर्स',
    farmer: 'Sita Devi', farmerHi: 'सीता देवी',
    crop: 'Onion', cropHi: 'प्याज़', cropId: 'onion',
    quantityKg: 200, pricePerKg: 25,
    totalValue: 5000, totalValueFormatted: '₹5,000',
    status: 'delivered', statusLabel: 'Delivered', statusLabelHi: 'डिलीवर',
    pickupDate: '2026-09-13', deliveryDate: '2026-09-13',
    paymentStatus: 'completed', paymentStatusLabel: 'Paid', paymentStatusLabelHi: 'भुगतान पूर्ण',
    grade: 'Grade A',
  },
];

// Get orders by role
export const getOrdersForFarmer = (farmerName = 'Ramesh Kumar') => {
  return MOCK_ORDERS_FULL.filter(o => o.farmer === farmerName);
};

export const getOrdersForBuyer = () => {
  return MOCK_ORDERS_FULL;
};

export const getPendingOrdersCount = (role, name) => {
  if (role === 'farmer') {
    return MOCK_ORDERS_FULL.filter(o => o.farmer === name && !['delivered'].includes(o.status)).length;
  }
  return MOCK_ORDERS_FULL.filter(o => !['delivered'].includes(o.status)).length;
};
