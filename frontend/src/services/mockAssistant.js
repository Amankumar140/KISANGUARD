// Mock AI Assistant Service for KrishiFlow AI
// Provides context-aware, bilingual, intelligent responses for Indian agricultural supply chain

export const getSuggestedQuestions = (pathname = '', role = 'buyer', language = 'en') => {
  const isHi = language === 'hi';

  if (pathname.includes('/ai')) {
    if (role === 'farmer') {
      return isHi
        ? [
            "मुझे इस सप्ताह क्या बेचना चाहिए?",
            "मेरे निकट टमाटर किसे चाहिए?",
            "मुझे क्या मूल्य मिल सकता है?",
            "टमाटर की मांग क्यों बढ़ रही है?",
            "कौन से खरीदार मेरी उपज तलाश रहे हैं?",
            "मुझे कितनी मात्रा सूचीबद्ध करनी चाहिए?"
          ]
        : [
            "What should I sell this week?",
            "Who needs tomatoes near me?",
            "What price can I expect?",
            "Why is tomato demand increasing?",
            "Which buyers are looking for my produce?",
            "What quantity should I list?"
          ];
    }
    return isHi
      ? [
          "मैं 500 किग्रा टमाटर कहाँ से खरीद सकता हूँ?",
          "कौन से आपूर्तिकर्ता मेरा अनुरोध पूरा कर सकते हैं?",
          "मेरी कुल लैंडेड लागत क्या होगी?",
          "मुझे कब खरीद करनी चाहिए?",
          "टमाटर की मांग क्यों बढ़ रही है?",
          "क्या आप सबसे अच्छा आपूर्तिकर्ता संयोजन खोज सकते हैं?"
        ]
      : [
          "Where can I source 500 kg tomatoes?",
          "Which suppliers can fulfill my request?",
          "What will my landed cost be?",
          "When should I procure?",
          "Why is tomato demand increasing?",
          "Can you find the best supplier combination?"
        ];
  }

  if (pathname.includes('/logistics')) {
    return isHi
      ? [
          "यह रूट सबसे अच्छा क्यों है?",
          "कितनी दूरी बचाई गई है?",
          "क्या लॉजिस्टिक्स लागत कम की जा सकती है?",
          "वाहन का तापमान कितना है?"
        ]
      : [
          "Why is this route optimal?",
          "How much distance is saved?",
          "Can logistics cost be reduced?",
          "What is the reefer temperature?"
        ];
  }

  if (pathname.includes('/marketplace') || pathname.includes('/matching') || (role === 'buyer' && pathname.includes('/buyer'))) {
    return isHi
      ? [
          "500 किग्रा टमाटर की आपूर्ति कौन कर सकता है?",
          "प्रत्यक्ष किसान और स्मार्ट मिलान में क्या अंतर है?",
          "मुझे इस आवश्यकता के लिए कौन सा स्रोत तरीका उपयोग करना चाहिए?",
          "मेरी कुल लैंडेड लागत क्या होगी?"
        ]
      : [
          "Find farmers who can supply 500 kg tomatoes.",
          "Show me the difference between direct farmer and smart matching.",
          "Which sourcing method should I use for this requirement?",
          "What will my landed cost be?"
        ];
  }

  if (pathname.includes('/pricing')) {
    return isHi
      ? [
          "पारंपरिक बनाम KrishiFlow में क्या अंतर है?",
          "किसान को ₹22/किग्रा कैसे मिलता है?",
          "खरीदार की 10% बचत कैसे होती है?"
        ]
      : [
          "How does KrishiFlow improve farmer earnings?",
          "Where do the middleman savings go?",
          "How does the buyer save 10%?"
        ];
  }

  if (pathname.includes('/impact')) {
    return isHi
      ? [
          "फसल बर्बादी में कितनी कमी आई है?",
          "कितना कार्बन उत्सर्जन बचा?",
          "कितने छोटे किसान लाभान्वित हुए?"
        ]
      : [
          "How much food waste is reduced?",
          "How much carbon is saved?",
          "How many smallholders are empowered?"
        ];
  }

  if (pathname.includes('/farmer') || role === 'farmer') {
    return isHi
      ? [
          "किस फसल की मांग अधिक है?",
          "मुझे किस कीमत पर बेचने पर विचार करना चाहिए?",
          "पास के खरीदारों की मांग दिखाएँ।",
          "मेरी उपज का भुगतान कब होगा?"
        ]
      : [
          "Which crop has higher demand?",
          "What price should I consider?",
          "Show nearby buyer demand.",
          "When will my harvest payout arrive?"
        ];
  }

  // Default / Buyer Dashboard
  return isHi
    ? [
        "इस सप्ताह मांग कैसी है?",
        "मुझे किन फसलों की खरीद करनी चाहिए?",
        "रमेश कुमार की सिफारिश क्यों की गई?",
        "मेरे लंबित ऑर्डर दिखाएँ।"
      ]
    : [
        "How is demand looking this week?",
        "Which crops should I procure?",
        "Why is Ramesh Kumar a good supplier?",
        "Show me pending orders."
      ];
};

export const getQuickActions = (pathname = '', role = 'buyer', language = 'en') => {
  const isHi = language === 'hi';

  if (role === 'farmer' || pathname.includes('/farmer')) {
    return [
      { label: isHi ? 'मांग देखें' : 'View Demand', path: '/farmer/demand', query: 'Show nearby buyer demand' },
      { label: isHi ? 'अनुशंसित कीमत' : 'Recommended Price', path: '/pricing', query: 'What price should I consider?' },
      { label: isHi ? 'मेरे ऑर्डर' : 'My Orders', path: '/farmer/orders', query: 'Show my dispatches and orders' },
    ];
  }

  return [
    { label: isHi ? 'मार्केटप्लेस' : 'Marketplace', path: '/buyer/marketplace', query: 'Show me the difference between direct farmer and smart matching.' },
    { label: isHi ? 'आपूर्तिकर्ता खोजें' : 'Find Suppliers', path: '/buyer/marketplace', query: 'Find farmers who can supply 500 kg tomatoes.' },
    { label: isHi ? 'खरीद अनुरोध' : 'Create Demand', path: '/buyer/demand', query: 'How do I create a procurement request?' },
  ];
};

export const getAssistantResponse = async (userMessage, context = {}, language = 'en') => {
  // Simulate natural AI thinking delay (500-750ms)
  await new Promise((resolve) => setTimeout(resolve, 600));

  const msg = (userMessage || '').toLowerCase().trim();
  const isHi = language === 'hi';
  const pathname = context.pathname || '';
  const role = context.role || 'buyer';

  // Role-specific: Farmer queries
  if (role === 'farmer') {
    // Who needs tomatoes / nearby buyers
    if (
      msg.includes('who need') ||
      msg.includes('who needs') ||
      msg.includes('nearby buyers') ||
      msg.includes('which buyers') ||
      msg.includes('looking for') ||
      msg.includes('kise chahiye') ||
      msg.includes('खरीदार')
    ) {
      return {
        text: isHi
          ? "फ्रेशबाइट रेस्टोरेंट्स को वर्तमान में लगभग ₹22/किग्रा पर 180 किग्रा ग्रेड A टमाटर की आवश्यकता है। दिल्ली हॉस्पिटैलिटी ग्रुप की 25 सितंबर के लिए 300 किग्रा की अतिरिक्त मांग है।"
          : "FreshBite Restaurants currently needs 180 kg of Grade A tomatoes at approximately ₹22/kg. Delhi Hospitality Group has another 300 kg requirement for 25 Sep.",
        card: {
          title: isHi ? "नज़दीकी खरीदार मांग" : "Nearby Buyer Demand",
          crop: isHi ? "ग्रेड A टमाटर" : "Grade A Tomatoes",
          metric: "180 kg",
          metricLabel: isHi ? "फ्रेशबाइट मांग" : "FreshBite Demand",
          value: "₹22/kg",
          actionText: isHi ? "नज़दीकी मांग देखें" : "VIEW NEARBY DEMAND",
          actionPath: "/farmer/demand",
        },
      };
    }

    // What should I sell / quantity to list
    if (
      msg.includes('what should i sell') ||
      msg.includes('what quantity') ||
      msg.includes('quantity should i list') ||
      msg.includes('produce should i list') ||
      msg.includes('kya bechna') ||
      msg.includes('bechna') ||
      msg.includes('बेचना') ||
      msg.includes('सूचीबद्ध')
    ) {
      return {
        text: isHi
          ? "वर्तमान में टमाटर की मांग में +19% की वृद्धि और 320 किग्रा स्थानीय आपूर्ति कमी है। वर्तमान खरीदार मांग का लाभ उठाने के लिए ₹21–23/किग्रा पर 250 किग्रा ग्रेड A टमाटर सूचीबद्ध करने की सिफारिश की जाती है।"
          : "Tomato demand has a +19% projected surge with an estimated 320 kg local supply gap. We recommend listing 250 kg Grade A tomatoes at ₹21–23/kg to capture immediate institutional buyer demand.",
        card: {
          title: isHi ? "बिक्री अवसर अनुशंसा" : "Sales Opportunity",
          crop: isHi ? "टमाटर (ग्रेड A)" : "Tomato (Grade A)",
          metric: "250 kg",
          metricLabel: isHi ? "अनुशंसित सूची मात्रा" : "Recommended Quantity",
          value: "₹22/kg",
          actionText: isHi ? "उपज सूचीबद्ध करें" : "LIST PRODUCE",
          actionPath: "/farmer/produce",
        },
      };
    }

    // Price expectation for farmer
    if (
      msg.includes('price can i expect') ||
      msg.includes('what price') ||
      msg.includes('farmgate price') ||
      msg.includes('expected price') ||
      msg.includes('daam') ||
      msg.includes('कीमत') ||
      msg.includes('दाम') ||
      msg.includes('मूल्य')
    ) {
      return {
        text: isHi
          ? "वर्तमान प्रत्यक्ष खरीदार प्रस्ताव ग्रेड A टमाटर के लिए ₹21–23/किग्रा (औसत ₹22/किग्रा) हैं, जिसमें शून्य बिचौलिया कटौती और स्वचालित एस्क्रो सुरक्षा शामिल है।"
          : "Current direct buyer offers are around ₹21–23/kg (average ₹22/kg) for Grade A tomatoes with zero middleman deductions and instant escrow payout.",
        card: {
          title: isHi ? "अपेक्षित फार्म-गेट मूल्य" : "Expected Farmgate Price",
          crop: isHi ? "टमाटर ग्रेड A" : "Tomato Grade A",
          metric: "₹22/kg",
          metricLabel: isHi ? "शुद्ध किसान प्राप्ति" : "Net Farmgate Realization",
          value: "+46.6% vs Mandi",
          actionText: isHi ? "ऑफ़र देखें" : "VIEW OFFERS",
          actionPath: "/pricing",
        },
      };
    }
  }

  // Role-specific: Buyer queries
  if (role === 'buyer') {
    // Difference between direct farmer and smart matching
    if (
      msg.includes('difference between direct') ||
      msg.includes('direct farmer and smart matching') ||
      msg.includes('अंतर') && (msg.includes('प्रत्यक्ष') || msg.includes('स्मार्ट'))
    ) {
      return {
        text: isHi
          ? "प्रत्यक्ष किसान मोड आपको व्यक्तिगत उत्पादक को स्वयं चुनने और 1:1 अनुबंध करने की सुविधा देता है। स्मार्ट मिलान मोड बड़े लॉट (जैसे 500 किग्रा) को पूरा करने के लिए कई किसानों की उपज को स्वचालित रूप से जोड़ता है और रूट को अनुकूलित करता है।"
          : "DIRECT FARMER mode lets you select and purchase directly from an individual producer (1:1 trade). SMART MATCHING combines harvest volume from multiple verified producers to fulfill larger enterprise requirements with unified logistics and 10% lower landed costs.",
        card: {
          title: isHi ? "स्रोत पद्धति तुलना" : "Sourcing Methods",
          crop: isHi ? "मार्केटप्लेस विकल्प" : "Marketplace Options",
          metric: "2 Modes",
          metricLabel: isHi ? "उपलब्ध विकल्प" : "Available Options",
          value: isHi ? "प्रत्यक्ष vs स्मार्ट" : "Direct vs Smart",
          actionText: isHi ? "मार्केटप्लेस खोलें" : "OPEN MARKETPLACE",
          actionPath: "/buyer/marketplace",
        },
      };
    }

    // Which sourcing method should I use
    if (
      msg.includes('which sourcing method') ||
      msg.includes('which method should i use') ||
      msg.includes('which mode') ||
      msg.includes('कौन सा तरीका') ||
      msg.includes('कौन सा स्रोत')
    ) {
      return {
        text: isHi
          ? "यदि आपकी आवश्यकता 250 किग्रा से कम है या आप किसी विशिष्ट किसान के साथ काम करना चाहते हैं, तो 'प्रत्यक्ष किसान' चुनें। 500 किग्रा या उससे अधिक की संस्थागत आवश्यकताओं के लिए, 'स्मार्ट मिलान' चुनें ताकि कई किसानों से अनुकूलित समूहन और न्यूनतम लॉजिस्टिक्स दूरी मिल सके।"
          : "For smaller quantities (<250 kg) or when you want 1:1 producer relationships, choose DIRECT FARMER. For larger volumes (like 500 kg+) where no single smallholder has enough volume, choose SMART MATCHING to aggregate supply and optimize reefer routes.",
        card: {
          title: isHi ? "स्रोत अनुशंसा" : "Sourcing Recommendation",
          crop: isHi ? "मांग आधार पर" : "Based on Requirement",
          metric: "500 kg → Smart",
          metricLabel: isHi ? "अनुशंसित मोड" : "Recommended Mode",
          value: "94% Match Confidence",
          actionText: isHi ? "मार्केटप्लेस में स्रोत करें" : "SOURCE IN MARKETPLACE",
          actionPath: "/buyer/marketplace",
        },
      };
    }

    // Who can supply / where can I source 500 kg / supplier combination
    if (
      msg.includes('who can supply') ||
      msg.includes('find farmers') ||
      msg.includes('source 500') ||
      msg.includes('500 kg') ||
      msg.includes('suppliers can fulfill') ||
      msg.includes('supplier combination') ||
      msg.includes('best supplier') ||
      msg.includes('ramesh') ||
      msg.includes('आपूर्तिकर्ता')
    ) {
      return {
        text: isHi
          ? "तीन सत्यापित उत्पादक मिलकर 500 किग्रा आपूर्ति पूरी कर सकते हैं: रमेश कुमार 250 किग्रा (दादरी, ₹22/किग्रा), सीता देवी 150 किग्रा (जेवर, ₹21.50/किग्रा) और राजेश यादव 100 किग्रा (ग्रेटर नोएडा, ₹22/किग्रा)। कुल लैंडेड लागत: ₹27/किग्रा।"
          : "Three verified producers collectively fulfill your 500 kg requirement: Ramesh Kumar (250 kg @ ₹22/kg, Dadri), Sita Devi (150 kg @ ₹21.50/kg, Jewar), and Rajesh Yadav (100 kg @ ₹22/kg, Greater Noida). Estimated landed cost: ₹27/kg (10% savings vs mandi).",
        card: {
          title: isHi ? "सत्यापित आपूर्तिकर्ता क्लस्टर" : "Verified Supplier Cluster",
          crop: isHi ? "टमाटर (500 किग्रा बैच)" : "Tomato (500 kg Batch)",
          metric: "3 Farmers",
          metricLabel: isHi ? "क्लस्टर किसान" : "Clustered Farmers",
          value: "500 kg @ ₹27/kg Landed",
          actionText: isHi ? "मार्केटप्लेस में देखें" : "VIEW IN MARKETPLACE",
          actionPath: "/buyer/marketplace",
        },
      };
    }

    // Landed cost for buyer
    if (
      msg.includes('landed cost') ||
      msg.includes('procurement cost') ||
      msg.includes('what will my landed') ||
      msg.includes('cost') ||
      msg.includes('लागत')
    ) {
      return {
        text: isHi
          ? "सीधी खरीद ₹22/किग्रा + लॉजिस्टिक्स/प्लेटफ़ॉर्म शुल्क मिलाकर ₹27/किग्रा कुल लैंडेड लागत बनती है, जो पारंपरिक थोक मंडी ₹30/किग्रा की तुलना में ₹3/किग्रा (-10%) की शुद्ध बचत प्रदान करती है।"
          : "Direct procurement at ₹22/kg + ₹5 logistics and platform handling yields a landed cost of ₹27/kg, generating net savings of ₹3/kg (10% lower) compared to traditional wholesale at ₹30/kg.",
        card: {
          title: isHi ? "खरीद अर्थशास्त्र" : "Landed Cost Economics",
          crop: isHi ? "टमाटर ग्रेड A" : "Tomato Grade A",
          metric: "₹27/kg",
          metricLabel: isHi ? "कुल लैंडेड लागत" : "Landed Cost",
          value: "₹3/kg Savings",
          actionText: isHi ? "मूल्य विवरण देखें" : "VIEW PRICE BREAKDOWN",
          actionPath: "/pricing",
        },
      };
    }

    // When should I procure
    if (
      msg.includes('when should i procure') ||
      msg.includes('when to buy') ||
      msg.includes('procurement window') ||
      msg.includes('kab kharid')
    ) {
      return {
        text: isHi
          ? "अगले 7 दिनों के भीतर खरीद की योजना बनाएं ताकि 2 अक्तूबर को संभावित मांग चरम और 320 किग्रा आपूर्ति कमी से बचा जा सके।"
          : "Secure procurement within the next 7 days before the projected demand peak on Oct 2 to avoid spot market surcharges and secure 500 kg volume.",
        card: {
          title: isHi ? "खरीद समय अनुशंसा" : "Procurement Window",
          crop: isHi ? "टमाटर" : "Tomato",
          metric: "7 Days",
          metricLabel: isHi ? "शिखर से पहले का समय" : "Days Before Peak",
          value: "₹22/kg Lock-in",
          actionText: isHi ? "खरीद अनुरोध बनाएं" : "CREATE REQUEST",
          actionPath: "/buyer/demand",
        },
      };
    }
  }

  // Why is demand increasing (common driver explanation)
  if (
    msg.includes('why') && (
      msg.includes('demand') ||
      msg.includes('increasing') ||
      msg.includes('surge') ||
      msg.includes('बढ़')
    )
  ) {
    return {
      text: isHi
        ? "दिल्ली-NCR में आगामी त्योहारी सप्ताहांत के कारण संस्थागत होटल और रेस्तरां उपभोग सूचकांक में +24% की वृद्धि हुई है, जबकि पश्चिमी उत्तर प्रदेश में मानसूनी मौसम के कारण मंडी आवक में कमी आई है।"
        : "Institutional restaurant dining demand in Delhi-NCR is up 24% for upcoming festival weekends, while regional Western UP arrivals face temporary transportation delays.",
      card: {
        title: isHi ? "मांग वृद्धि चालक" : "Demand Surge Drivers",
        crop: isHi ? "टमाटर (दिल्ली-NCR)" : "Tomato (Delhi-NCR)",
        metric: "+19%",
        metricLabel: isHi ? "नेटवर्क मांग उछाल" : "Network Surge",
        value: "2,500 kg",
        actionText: isHi ? "पूर्वानुमान देखें" : "VIEW FORECAST",
        actionPath: "/ai",
      },
    };
  }

  // Fallback Demand & Which crops to procure
  if (
    msg.includes('highest demand') ||
    msg.includes('which crop') ||
    msg.includes('demand looking') ||
    msg.includes('what should i procure') ||
    msg.includes('kin faslon') ||
    msg.includes('maang') ||
    msg.includes('मांग') ||
    msg.includes('फसल') ||
    msg.includes('खरीद')
  ) {
    return {
      text: isHi
        ? "वर्तमान लाइव डेटा के अनुसार, दिल्ली NCR में **टमाटर (Tomato)** की मांग में सबसे तीव्र वृद्धि देखी जा रही है।\n\n- **वर्तमान मांग:** 2,100 किग्रा\n- **अनुमानित मांग:** 2,500 किग्रा (+19% वृद्धि)\n- **अनुमानित कमी:** 320 किग्रा\n\nकीमतें बढ़ने से पहले निकटतम FPO से 300-320 किग्रा अतिरिक्त आपूर्ति सुरक्षित करने की सलाह दी जाती है।"
        : "Based on current market intelligence, **Tomato** has the strongest projected demand surge in Delhi NCR.\n\n- **Current Demand:** 2,100 kg\n- **Predicted Demand:** 2,500 kg (+19% surge)\n- **Anticipated Supply Gap:** 320 kg\n\nIt is recommended to secure an additional 300–320 kg buffer from local FPOs before wholesale mandi rates rise.",
      card: {
        title: isHi ? "AI मांग पूर्वानुमान अलर्ट" : "AI Demand Forecast Alert",
        crop: isHi ? "टमाटर (Tomato Grade A)" : "Tomato (Grade A)",
        metric: "+19%",
        metricLabel: isHi ? "मांग वृद्धि (अगले सप्ताह)" : "Demand Surge (Next 7 Days)",
        value: "2,500 kg",
        actionText: isHi ? "मांग पूर्वानुमान खोलें" : "Open Demand Forecast",
        actionPath: "/ai"
      }
    };
  }

  // 3. Logistics & Route optimization
  if (
    msg.includes('logistics') ||
    msg.includes('route') ||
    msg.includes('distance') ||
    msg.includes('cost') ||
    msg.includes('saved') ||
    msg.includes('temperature') ||
    msg.includes('reefer') ||
    msg.includes('रूट') ||
    msg.includes('दूरी') ||
    msg.includes('लॉजिस्टिक्स') ||
    msg.includes('गाड़ी')
  ) {
    return {
      text: isHi
        ? "कृषिFlow AI मल्टी-स्टॉप क्लस्टर एल्गोरिथम का उपयोग करता है, जो कई छोटे किसानों से एक ही वाहन में उपज एकत्र करता है:\n\n- **अनुकूलित मार्ग दूरी:** 42 किमी (पारंपरिक 61 किमी की तुलना में)\n- **बचाई गई दूरी:** 19 किमी (-31% बचत)\n- **अनुमानित परिवहन समय:** 1 घंटा 35 मिनट\n- **कुल मालभाड़ा लागत:** ₹850 (केवल ₹1.70/किग्रा)\n- **कोल्ड-चेन सुरक्षा:** टाटा ऐस EV रेफ़र (सक्रिय 11°C तापमान नियंत्रण)\n- **CO₂ बचत:** 4.2 किग्रा कार्बन उत्सर्जन की रोकथाम।"
        : "KrishiFlow AI deploys dynamic multi-stop aggregation algorithms, bundling smallholder harvests into a unified refrigerated run:\n\n- **Optimized Total Distance:** 42 km (vs. 61 km for separate dispatches)\n- **Distance Saved:** 19 km (-31% road mileage reduction)\n- **Estimated Transit Time:** 1h 35m\n- **Total Freight Cost:** ₹850 (Just ₹1.70/kg landed freight)\n- **Cold-Chain Assurance:** Tata Ace EV Reefer active at 11°C\n- **Environmental Gain:** 4.2 kg CO₂ tailpipe emissions prevented.",
      card: {
        title: isHi ? "अनुकूलित मार्ग स्थिति" : "Optimized Route Status",
        crop: isHi ? "दादरी → बुलंदशहर → सेक्टर 62 नोएडा" : "Dadri → Bulandshahr → Noida Hub",
        metric: "19 km",
        metricLabel: isHi ? "सड़क दूरी की सीधी बचत" : "Road Distance Saved (-31%)",
        value: "42 km • ₹850 Freight",
        actionText: isHi ? "रूट देखें" : "View Route",
        actionPath: "/logistics"
      }
    };
  }

  // 4. Pricing / Economics / Farmer earnings
  if (
    msg.includes('price') ||
    msg.includes('earning') ||
    msg.includes('margin') ||
    msg.includes('middleman') ||
    msg.includes('rupee') ||
    msg.includes('कीमत') ||
    msg.includes('कमाई') ||
    msg.includes('रुपये') ||
    msg.includes('बचत') ||
    msg.includes('आढ़तिया')
  ) {
    return {
      text: isHi
        ? "कृषिFlow पारदर्शी एल्गोरिथम के माध्यम से बिचौलियों के भारी कमीशन को समाप्त करता है:\n\n**पारंपरिक मंडी प्रणाली (₹30/किग्रा):**\n- किसान को मिलता है: ₹15/किग्रा (मात्र 50%)\n- बिचौलिया आढ़तिया कमीशन: ₹10/किग्रा\n- अनियंत्रित लॉजिस्टिक्स: ₹5/किग्रा\n\n**कृषिFlow AI प्रणाली (₹27/किग्रा):**\n- किसान को सीधा भुगतान: ₹22/किग्रा (+46.6% की सीधी वृद्धि)\n- कुशल समूहित लॉजिस्टिक्स: ₹3/किग्रा\n- प्लेटफ़ॉर्म एवं गुणवत्ता शुल्क: ₹2/किग्रा\n- खरीदार को बचत: ₹3/किग्रा (-10% सीधी बचत)\n\nभुगतान डिजिटल गुणवत्ता जांच के बाद तुरंत UPI एस्क्रो द्वारा सुरक्षित होता है।"
        : "KrishiFlow replaces opaque multi-tier commission agent cuts with transparent, automated matching:\n\n**Traditional Mandi System (Buyer pays ₹30/kg):**\n- Farmer receives: ₹15/kg (only 50% of value)\n- Intermediary margins: ₹10/kg (Kacha & Pakka Arhtiya cuts)\n- Fragmented logistics: ₹5/kg\n\n**KrishiFlow AI System (Buyer pays ₹27/kg):**\n- Farmer receives: ₹22/kg (+46.6% higher direct farmgate payout)\n- Clustered multi-pickup logistics: ₹3/kg\n- Platform & QA verification fee: ₹2/kg\n- Buyer cost savings: 10.0% direct reduction\n\nSettlement is executed directly into farmer accounts via instant UPI escrow.",
      card: {
        title: isHi ? "आर्थिक मूल्य तुलना" : "Fair Economic Breakdown",
        crop: isHi ? "टमाटर (प्रति किलोग्राम)" : "Tomato (Per kg landed)",
        metric: "+46.6%",
        metricLabel: isHi ? "किसान की अतिरिक्त आय" : "Farmer Income Gain (₹22 vs ₹15)",
        value: "₹27 Buyer Landed (Save 10%)",
        actionText: isHi ? "मूल्य विवरण देखें" : "View Price Breakdown",
        actionPath: "/pricing"
      }
    };
  }

  // 5. Orders / Pending orders / Dispatch
  if (
    msg.includes('order') ||
    msg.includes('pending') ||
    msg.includes('dispatch') ||
    msg.includes('track') ||
    msg.includes('status') ||
    msg.includes('ऑर्डर') ||
    msg.includes('लंबित') ||
    msg.includes('ट्रैक') ||
    msg.includes('स्थिति')
  ) {
    return {
      text: isHi
        ? "वर्तमान में सक्रिय खरीद बैच **#KF-2026-0903** की स्थिति:\n\n- **मात्रा:** 500 किग्रा टमाटर (ग्रेड A)\n- **वर्तमान चरण:** रास्ते में (In Transit)\n- **पिकअप प्रगति:** रमेश कुमार, सीता देवी और ग्रीन वैली FPO से पिकअप पूर्ण\n- **अनुमानित डिलीवरी:** आज सुबह 11:30 बजे (फ्रेशबाइट सेंट्रल किचन, नोएडा सेक्टर 62)\n- **सुरक्षा:** डिजिटल वजन और गुणवत्ता जांच (कठोरता 8.4/10) सत्यापित।"
        : "Status for active procurement batch **#KF-2026-0903**:\n\n- **Volume:** 500 kg Grade A Tomato\n- **Current Milestone:** In Transit to Hub\n- **Pickup Status:** Completed at Ramesh Kumar, Sita Devi & Green Valley FPO\n- **Estimated Delivery:** Today at 11:30 AM (FreshBite Central Kitchen, Sec 62)\n- **Quality Verification:** Firmness 8.4/10, Grade A calibrated.",
      card: {
        title: isHi ? "लाइव ऑर्डर ट्रैकिंग" : "Live Order Dispatch",
        crop: isHi ? "बैच #KF-2026-0903" : "Batch #KF-2026-0903",
        metric: isHi ? "रास्ते में" : "In Transit",
        metricLabel: isHi ? "आगमन समय: आज 11:30 AM" : "ETA: Today 11:30 AM",
        value: "500 kg Tomato",
        actionText: isHi ? "ऑर्डर देखें" : "View Orders",
        actionPath: "/orders"
      }
    };
  }

  // 6. Impact / Sustainability / Carbon
  if (
    msg.includes('impact') ||
    msg.includes('waste') ||
    msg.includes('carbon') ||
    msg.includes('sustainab') ||
    msg.includes('महिला') ||
    msg.includes('प्रभाव') ||
    msg.includes('बर्बादी')
  ) {
    return {
      text: isHi
        ? "कृषिFlow आपूर्ति श्रृंखला प्रभाव सारांश:\n\n- **फसल बर्बादी में कमी:** कटाई के बाद उपज बर्बादी 28% से घटकर मात्र 6.2% रह गई है।\n- **कार्बन उत्सर्जन:** 38.5 मीट्रिक टन CO₂eq की रोकथाम हुई है।\n- **किसान सशक्तिकरण:** 1,240+ छोटे किसान सीधे जुड़े हैं।\n- **महिला सहभागिता:** 41% महिला किसान FPO समूहों में सक्रिय रूप से जुड़ी हैं।"
        : "KrishiFlow verifiable supply-chain impact metrics:\n\n- **Post-Harvest Spoilage:** Cut from 28% down to just 6.2% with 3-hour cold farmgate collection.\n- **Carbon Reduction:** 38.5 MT CO₂eq avoided via route clustering.\n- **Smallholder Empowerment:** 1,240+ small & marginal farmers.\n- **Inclusivity:** 41% women farmers represented across FPO cohorts.",
      card: {
        title: isHi ? "पर्यावरण एवं सामाजिक प्रभाव" : "Supply Chain Impact",
        crop: isHi ? "खाद्य बर्बादी में कमी" : "Food Spoilage Reduction",
        metric: "6.2%",
        metricLabel: isHi ? "28% से घटकर 6.2% पर" : "Down from 28% to 6.2%",
        value: "1,240+ Farmers Empowered",
        actionText: isHi ? "प्रभाव डैशबोर्ड देखें" : "View Impact",
        actionPath: "/impact"
      }
    };
  }

  // 7. Context fallback based on page
  if (pathname.includes('/ai')) {
    if (role === 'farmer') {
      return {
        text: isHi
          ? "आप **मांग इंटेलिजेंस (Demand Intelligence)** देख रहे हैं। संस्थागत खरीदारों (होटल और रेस्तरां) को अगले सप्ताह 320 किग्रा ग्रेड A टमाटर की तत्काल आवश्यकता है। अपनी फसल सीधे लिस्ट करके ₹22/किग्रा का मूल्य प्राप्त करें।"
          : "You are viewing **Demand Intelligence** for producers. Institutional buyers are facing a 320 kg Grade A tomato shortage next week. Listing your harvest now allows you to secure direct farmgate orders at ₹22/kg without middleman deductions.",
        card: {
          title: isHi ? "मांग अवसर" : "Buyer Demand Alert",
          crop: "Tomato (Grade A)",
          metric: "+19%",
          metricLabel: isHi ? "खरीदार मांग वृद्धि" : "Buyer Demand Surge",
          value: "320 kg Deficit",
          actionText: isHi ? "मांग देखें" : "View Demand",
          actionPath: "/farmer/demand"
        }
      };
    }
    return {
      text: isHi
        ? "आप वर्तमान में **मांग पूर्वानुमान (Demand Intelligence)** पृष्ठ पर हैं। हमारा AI मॉडल दिल्ली NCR के रेस्तराओं, शादियों और आगामी त्योहारों के डेटा का विश्लेषण कर 3 सप्ताह पहले मांग की भविष्यवाणी करता है। टमाटर में 19% की संभावित वृद्धि दर्ज हुई है।"
        : "You are currently on the **Demand Intelligence** analytics page. Our ensemble predictive model aggregates mandi arrivals and buyer schedules to forecast peak deficits. We anticipate a 320 kg tomato shortage next week in Delhi NCR.",
      card: {
        title: isHi ? "AI विश्लेषण" : "AI Forecast Overview",
        crop: "Tomato (Delhi NCR)",
        metric: "+19%",
        metricLabel: isHi ? "अनुमानित मांग वृद्धि" : "Projected Demand Growth",
        value: "2,500 kg Forecast",
        actionText: isHi ? "खरीद अनुरोध बनाएं" : "Create Procurement Request",
        actionPath: "/buyer/demand"
      }
    };
  }

  // 8. General fallback
  return {
    text: isHi
      ? "मुझे आपका प्रश्न पूरी तरह समझ नहीं आया। मैं मांग, आपूर्तिकर्ता, कीमत, लॉजिस्टिक्स, ऑर्डर या कृषिFlow के उपयोग में आपकी मदद कर सकता हूँ।"
      : "I'm not sure I understood that. I can help with demand, suppliers, prices, logistics, orders, or using KrishiFlow.",
    card: {
      title: isHi ? "सहायता विकल्प" : "Suggested Assistance",
      crop: isHi ? "कृषिFlow AI सहायक" : "KrishiFlow AI Engine",
      metric: "94.8%",
      metricLabel: isHi ? "सिस्टम तत्परता" : "System Readiness",
      value: isHi ? "मांग • मिलान • लॉजिस्टिक्स" : "Demand • Matching • Fleet",
      actionText: isHi ? "डैशबोर्ड पर जाएँ" : "Go to Dashboard",
      actionPath: role === 'farmer' ? "/farmer" : "/buyer"
    }
  };
};

export default {
  getSuggestedQuestions,
  getQuickActions,
  getAssistantResponse,
};
