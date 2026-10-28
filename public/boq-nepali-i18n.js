/**
 * Butwal Construction & Builders - BOQ Nepali Translation Engine (नेपाली अनुवाद इन्जिन)
 * Provides 100% full-document translation of the generated BOQ area into Nepali,
 * while leaving the user input sidebar in English as requested.
 */
const root = typeof window !== 'undefined' ? window : globalThis;

root.boqLanguage = root.boqLanguage || 'en';

// Helper: Convert numeric amount into formal Nepali monetary words (अक्षरमा रकम)
root.numberToNepaliWords = function(num) {
    if (!num || isNaN(num) || num <= 0) return "";
    num = Math.round(num);
    const ones = [
        "", "एक", "दुई", "तीन", "चार", "पाँच", "छ", "सात", "आठ", "नौ", "दश",
        "एघार", "बाह्र", "तेह्र", "चौध", "पन्ध्र", "सोह्र", "सत्र", "अठार", "उन्नाइस", "बीस",
        "एक्काइस", "बाइस", "तेइस", "चौबीस", "पच्चीस", "छब्बीस", "सत्ताइस", "अट्ठाइस", "उनन्तीस", "तीस",
        "एकतीस", "बत्तीस", "तेत्तीस", "चौंतीस", "पैंतीस", "छत्तीीस", "सरतीस", "अठतीस", "उनन्चालीस", "चालीस",
        "एकचालीस", "बयालीस", "त्रिचालीस", "चवालीस", "पैंतालीस", "छयालीस", "सच्चालीस", "अठ्चालीस", "उनपचास", "पचास",
        "एकाउन्न", "बाउन्न", "त्रिपन्न", "चौपन्न", "पचपन्न", "छपन्न", "सन्ताउन्न", "अन्ठाउन्न", "उनन्साठ्ठी", "साठ्ठी",
        "एकसट्ठी", "बाइसट्ठी", "त्रिसट्ठी", "चौंसट्ठी", "पैंसट्ठी", "छयसट्ठी", "सतसट्ठी", "अठसट्ठी", "उनन्सत्तरी", "सत्तरी",
        "एकहत्तर", "बहत्तर", "त्रिहत्तर", "चौहत्तर", "पचहत्तर", "छयहत्तर", "सतहत्तर", "अठहत्तर", "उनासी", "असी",
        "एकासी", "बयासी", "तिरासी", "चौरासी", "पचासी", "छयासी", "सतासी", "अठासी", "उनान्नब्बे", "नब्बे",
        "एकान्नब्बे", "बयानब्बे", "त्रियान्नब्बे", "चौरान्नब्बे", "पन्चानब्बे", "छयान्नब्बे", "सन्तान्नब्बे", "अन्ठान्ब्बे", "उनान्सय", "सय"
    ];

    let words = [];
    const crore = Math.floor(num / 10000000);
    num %= 10000000;
    const lakh = Math.floor(num / 100000);
    num %= 100000;
    const thousand = Math.floor(num / 1000);
    num %= 1000;
    const hundred = Math.floor(num / 100);
    const rem = num % 100;

    if (crore > 0) words.push((ones[crore] || crore) + " करोड");
    if (lakh > 0) words.push((ones[lakh] || lakh) + " लाख");
    if (thousand > 0) words.push((ones[thousand] || thousand) + " हजार");
    if (hundred > 0) words.push((ones[hundred] || hundred) + " सय");
    if (rem > 0) words.push(ones[rem] || rem);

    return words.length > 0 ? "अक्षरमा: " + words.join(" ") + " रुपैयाँ मात्र" : "";
};

// Category Title Translations (A through O)
root.BOQ_NEPALI_CATEGORIES = {
    "cat_a": "क. प्रारम्भिक तयारी तथा साइट व्यवस्थापन कार्य (Preliminaries & Site Setup)",
    "cat_b": "ख. जग तथा माटो खन्ने, भर्ने र सोलिङ कार्य (Earthwork, Excavation & Soling)",
    "cat_c": "ग. प्लेन सिमेन्ट कंक्रिट कार्य - पिसिसी १:३:६ (PCC Foundation Bedding)",
    "cat_d": "घ. सब-स्ट्रक्चर पिलिन्थ बिम तथा फुटिङ आरसीसी (Substructure RCC M20 Works)",
    "cat_roofing_tin": "घ१. जस्ता पाता छाना तथा ट्रस कार्य (Lightweight Steel Truss & CGI Roof)",
    "cat_e": "ङ. इँटा चिनाई / गाह्रो लगाउने कार्य (Brick Masonry Works)",
    "cat_f": "च. सिमेन्ट प्लास्टर तथा फिनिसिङ कार्य (Plaster & Surface Finishes)",
    "cat_g": "छ. भुइँ तथा भित्ता टायल फ्लोरिङ कार्य (Flooring & Tiling Works)",
    "cat_h": "ज. ढोका, झ्याल तथा काठ/युपिभिसि कार्य (Doors, Windows & Openings)",
    "cat_i": "झ. जलरोधक वाटरप्रूफिङ कार्य (Waterproofing & Damp Treatment)",
    "cat_j": "ञ. भित्ता पुट्टी तथा रङरोगन कार्य (Painting & Surface Decoration)",
    "cat_k": "ट. विद्युतीकरण, कन्ड्युट तथा वाइरिङ कार्य (Electrical Conduits & Wiring)",
    "cat_l": "ठ. खानेपानी, प्लम्बिङ तथा ढल निकास कार्य (Plumbing & Sanitary Installations)",
    "cat_m": "ड. भान्सा कोठा मोडुलर तथा सिङ्क कार्य (Kitchen Specialties & Granite)",
    "cat_n": "ढ. बाहिरी पूर्वाधार, पानी ट्याङ्की र सेप्टिक ट्याङ्की (Water Storage & External Utilities)",
    "cat_o": "ण. विविध तथा अन्तिम हस्तान्तरण कार्य (Miscellaneous & Handover Works)"
};

// Unit Translations
root.BOQ_NEPALI_UNITS = {
    "Sqm": "वर्ग मिटर",
    "Cum": "घन मिटर",
    "Sq.ft": "वर्ग फिट",
    "Rft": "रनिङ फिट",
    "MT": "मेट्रिक टन",
    "Kg": "के.जी.",
    "Bag": "बोरा",
    "Bags": "बोरा",
    "Pcs": "गोटा",
    "Nos": "गोटा",
    "Set": "सेट",
    "Job": "लट (काम)",
    "Ltr": "लिटर"
};

// Floor Name Translations
root.BOQ_NEPALI_FLOORS = {
    "Ground Floor": "भुइँ तल्ला (Ground Floor)",
    "First Floor": "पहिलो तल्ला (1st Floor)",
    "Second Floor": "दोस्रो तल्ला (2nd Floor)",
    "Third Floor": "तेस्रो तल्ला (3rd Floor)",
    "Fourth Floor": "चौथो तल्ला (4th Floor)",
    "Fifth Floor": "पाँचौँ तल्ला (5th Floor)",
    "Top Floor (Tin Roof)": "माथिल्लो तल्ला (जस्ता पाता छाना)"
};

// Item-specific Nepali Translations
root.BOQ_NEPALI_ITEMS = {
    // A. Preliminaries
    "prelim_mob": "साइट कार्यालय तथा गोदाम: निर्माण स्थलमा सिमेन्ट, डन्डी र औजार सुरक्षित राख्न अस्थायी गोदाम तथा कामदार/सुरक्षा टहरा निर्माण",
    "prelim_temp_fac": "अस्थायी बिजुली र पानी व्यवस्था: निर्माण कार्य अवधिभर आवश्यक पर्ने अस्थायी बिजुली बत्ती, मोटर र पानी आपूर्ति व्यवस्थापन",
    "prelim_safety_ppe": "कामदार सुरक्षा तथा पिपिई: कामदारहरूका लागि हेल्मेट, सेफ्टी जुत्ता, ज्याकेट, प्राथमिक उपचार बाकस तथा साइट सुरक्षा व्यवस्था",
    "prelim_setting_out": "लेआउट तथा सेन्टर लाइन: इन्जिनियरिङ नक्सा बमोजिम थिओडोलाइट/फित्ता प्रयोग गरी पिलर ग्रिड, जगको खाडल र लेआउट मार्किङ",
    "prelim_cleaning": "साइट सरसफाइ: निर्माण सुरु गर्नुपूर्व झाडी, बुट्यान, माटोको माथिल्लो फोहोर लेयर हटाई जमिन सम्याउने कार्य",
    "prelim_transport": "ढुवानी तथा सामग्री व्यवस्थापन: निर्माण स्थलसम्म ठूला टिपर/ट्रकबाट निर्माण सामग्री ढुवानी, अनलोडिङ र सुरक्षित भण्डारण",
    "demolition_debris": "पुरानो संरचना भत्काउने तथा फोहोर व्यवस्थापन: सम्झौता अनुसार पुरानो संरचना सुरक्षित भत्काई निस्किएको भग्नावशेष साइट बाहिर ढुवानी",

    // B. Earthwork & Soling
    "earth_excavation": "जगको माटो खन्ने कार्य: पिलर फुटिङ खाडल, पिलिन्थ बिम नाली तथा जमिनमुनिको माटो डिजाइन गहिराइसम्म खन्ने कार्य",
    "earth_disposal": "खनेको बढी माटो फाल्ने: निर्माण स्थलभित्र नचाहिने बढी माटो गाडीमा लोड गरी बाहिर तोकिएको ठाउँमा सुरक्षित ढुवानी",
    "earth_backfilling": "माटो पुनः भर्ने कार्य: जगको फुटिङ र पिलिन्थ बिम वरिपरि छानीएको माटो वा बालुवा हाली तह-तहमा पानी हाल्दै कम्प्याक्ट गर्ने",
    "earth_compaction": "दुर्लुस तथा रोलिङ कार्य: सोलिङ गर्नुपूर्व जमिनको सतहलाई मेकानिकल भाइब्रेटर/कम्प्याक्टरले राम्रोसँग थिच्ने",
    "earth_antitermite": "धमिरा नियन्त्रण उपचार (Anti-Termite): जग, पिलिन्थ बिम र भुइँ तल्लामुनि गुणस्तरीय धमिरा प्रतिरोधी केमिकल स्प्रे गर्ने",
    "earth_sand_filling": "नदीको बालुवा भर्ने: भुइँ तल्लाको ढलानमुनि ओस रोक्न ५० मिमी (२ इन्च) बाक्लो नदीको सफा बालुवाको लेयर बिछ्याउने",

    // C. PCC Foundation
    "pcc_footing_bed": "फुटिङमुनि पिसिसी (१:३:६): पिलर फुटिङ खाडलको तल्लो भागमा ७५ मिमी (३ इन्च) बाक्लो प्लेन सिमेन्ट कंक्रिट बिछ्याउने कार्य",
    "pcc_plinth_bed": "पिलिन्थ बिममुनि पिसिसी (१:३:६): पिलिन्थ टाई बिमको आधारमा ७५ मिमी बाक्लो प्लेन सिमेन्ट कंक्रिट लेयर",
    "pcc_soling": "इँटा वा ढुङ्गाको सुक्खा सोलिङ: जगको खाडल तथा भुइँ तल्लामुनि राम्रोसँग मिलाएर पहिलो नम्बर सुक्खा इँटा/ढुङ्गा सोलिङ गर्ने कार्य",

    // D. Substructure & Superstructure RCC
    "fnd_footing_concrete": "फुटिङ आरसीसी कंक्रिट (M20): पिलर जगको ट्रापेजोइडल फुटिङमा १:१.५:३ अनुपातको मेसिन मिक्स आरसीसी कंक्रिट तथा भाइब्रेटर कार्य",
    "fnd_masonry": "पिलिन्थमुनि इँटा गाह्रो: पिलिन्थ बिम अड्याउन १:४ सिमेन्ट-बालुवा मसलामा पहिलो नम्बर इँटाको मजबुत चिनाई कार्य",
    "fnd_reinforcement": "जगको डन्डी कार्य (Fe500D TMT): फुटिङ जाली (१०/१२ मिमी) र पिलरको स्टार्टर रड काट्ने, मोड्ने तथा तारले बाँध्ने कार्य",
    "fnd_dpc": "डिपिसी ड्याम प्रुफ कोर्स (१:१.५:३): भुइँबाट आउने चिसो र ओस रोक्न पिलिन्थ लेभलमा ४० मिमी बाक्लो वाटरप्रुफ कंक्रिट डिपिसी",
    "fnd_plinth_beam": "पिलिन्थ टाई बिम (RCC M20): जमिनको सतहमा सबै पिलर जोड्ने निरन्तर आरसीसी टाई बिम ढलान तथा कम्प्याक्सन कार्य",
    "rcc_column_shaft": "पिलर आरसीसी ढलान (RCC M20): सम्पूर्ण तल्लाका पिलरहरूमा गुणस्तरीय मेसिन मिक्स कंक्रिट ढलान तथा सुइरो भाइब्रेटर कार्य",
    "rcc_beam_slab": "बिम तथा छतको स्ल्याब ढलान (RCC M20): प्रत्येक तल्लाको बिम, छतको स्ल्याब र भर्‍याङमा १:१.५:३ अनुपातको मेसिन मिक्स ढलान कार्य",
    "rebar_fabrication": "डन्डी काट्ने, मोड्ने तथा बाँध्ने कार्य (Fe500D): इन्जिनियरिङ ड्रइङ अनुसार बिम, स्ल्याब, पिलर र भर्‍याङमा TMT डन्डी बाँध्ने कार्य",
    "formwork_shuttering": "फर्मा तथा सटरिङ कार्य: वाटरप्रुफ प्लाइउड तथा स्टिल प्लेट प्रयोग गरी पिलर, बिम र स्ल्याबको मजबुत फर्मा ठोक्ने र अड्याउने कार्य",

    // D1. Roofing Tin & Steel Truss
    "roof_cgi_sheets": "कलर-कोटेड जस्ता पाता छाना: तोकिएको गेजको गुणस्तरीय रंगिन जस्ता पाता, स्क्रू, वासर र सिलिकन सहित जडान",
    "roof_steel_truss": "स्ट्रक्चरल स्टिल ट्रस तथा पर्लिन: हलुका स्टिल ट्युबुलर सेक्सनबाट ट्रस फ्रेम फेब्रिकेसन, वेल्डिङ तथा एन्टी-रस्ट प्राइमर",
    "roof_rainwater_gutters": "पानीको नाली तथा डाउनपाइप: छानाबाट खस्ने पानी सुरक्षित निकासका लागि ०.५० मिमी रंगिन जीआई नाली र पाइप जडान",

    // E. Masonry
    "mas_ext_9in": "बाहिरी ९ इन्च इँटा चिनाई: १:४ सिमेन्ट-बालुवा मसलामा पहिलो नम्बर रातो इँटाको बाहिरी मजबुत गाह्रो चिनाई कार्य",
    "mas_int_4in": "भित्री ४.५ इन्च पार्टिसन गाह्रो: १:४ सिमेन्ट मसलामा कोठाहरू छुट्याउने पहिलो नम्बर इँटाको पार्टिसन पर्खाल कार्य",
    "mas_parapet": "छतको प्यारापेट पर्खाल: छतको किनारामा सुरक्षाका लागि ३ फिट उचाइको १:४ मसलाको इँटा गाह्रो तथा कभरिङ",
    "mas_decorative": "सजावटी तथा भेन्टिलेसन गाह्रो: डिजाइन अनुसार हनीकम भेन्टिलेसन इँटा गाह्रो तथा पर्खाल सजावट कार्य",

    // F. Plaster
    "plaster_internal": "भित्री सिमेन्ट प्लास्टर: भित्ता तथा सिलिङमा १२ मिमी बाक्लो १:४ सिमेन्ट-बालुवा मसलाको चिल्लो र लेभल प्लास्टर (चिकेन मेस सहित)",
    "plaster_external": "बाहिरी सिमेन्ट प्लास्टर: बाहिरी भित्तामा १५ मिमी बाक्लो १:४ मसलाको डबल-कोट स्पन्ज फिनिस वाटरप्रुफ प्लास्टर कार्य",
    "plaster_ceiling": "सिलिङ प्लास्टर: आरसीसी छतको तल्लो सतहमा ६ मिमी बाक्लो १:३ मसलाको चिल्लो सिमेन्ट प्लास्टर",
    "plaster_waterproof": "वाटरप्रुफिङ प्लास्टर: बाथरुम, ट्याङ्की र प्यारापेटमा डाक्टर फिक्सिट केमिकल मिसाएर गरिने १५ मिमी बाक्लो जलरोधक प्लास्टर",

    // G. Flooring & Tiling
    "tile_floor_main": "भुइँ टायल (Vitrified Tiles): बैठक, सुत्ने र लबी कोठाहरूमा २'×२' वा २.५'×२.५' डबल-चार्ज प्रिमियम भिट्रिफाइड टायल फ्लोरिङ",
    "tile_toilet": "शौचालय टायल: बाथरुमको भुइँमा एन्टि-स्किड (नचिप्लिने) टायल र भित्तामा ५ फिट उचाइसम्म ग्ल्याजिड सेरामिक टायल",
    "tile_kitchen": "भान्सा टायल: भान्साको भुइँमा प्रिमियम म्याट टायल र काउन्टरमाथि २ फिट उचाइसम्म पानी र तेल प्रतिरोधी ग्ल्याजिड टायल",
    "tile_balcony_terrace": "बाल्कोनी टायल: खुला बाल्कोनी र बरण्डामा घाम-पानी प्रतिरोधी एन्टि-स्किड बाहिरी टायल फ्लोरिङ",
    "tile_verandah_terrace": "बरण्डा टायल: मुख्य प्रवेशद्वार र बरण्डामा भारी लोड थाम्ने डिजाइनदार सेरामिक/भिट्रिफाइड टायल फ्लोरिङ",
    "tile_stair_granite_mix": "भर्‍याङ ग्रेनाइट/टायल फिनिस: भर्‍याङको स्टेप (ट्रेड र राइजर) मा सिंगल मोल्डिङ जेट ब्ल्याक ग्रेनाइट वा टायल फिनिस",
    "stair_single_moulding": "भर्‍याङ नोजिङ तथा मोल्डिङ: भर्‍याङको किनारामा खुट्टा नठोकियोस् भनेर गरिने चिल्लो सिंगल-मोल्डिङ नोजिङ ग्राइन्डिङ",
    "tile_skirting": "टायल स्कर्टिङ: भित्ताको तल्लो भागमा १०० मिमी (४ इन्च) उचाइको म्याचिङ भिट्रिफाइड टायल स्कर्टिङ",
    "tile_adhesive_grout": "टायल एड्हेसिभ तथा इपोक्सी ग्राउट: टायल टाँस्न उच्च शक्ति भएको पोलिमर एड्हेसिभ र जोर्नीमा वाटरप्रुफ इपोक्सी ग्राउटिङ",
    "false_ceiling_system": "फल्स सिलिङ कार्य: बैठक कोठामा मेटल फ्रेम र जिप्सम बोर्डबाट आकर्षक डिजाइनको फल्स सिलिङ निर्माण",

    // H. Doors & Windows
    "door_main": "मुख्य प्रवेश ढोका / गेट: रोजाइ अनुसार सालको काठ / प्रिमियम ल्यामिनेटेड / वाटरप्रुफ पिभिसि ढोका (सालको चौकाठ र कम्प्युटराइज्ड लक सहित)",
    "door_internal": "कोठाको भित्री ढोका: ३२ मिमी बाक्लो ल्यामिनेटेड फ्लस ढोका, सालको काठको चौकाठ, एसएस कब्जा, टावर बोल्ट तथा लक",
    "door_toilet": "शौचालय / बाथरुम ढोका: वाटरप्रुफ रिजिड PVC मोल्डेड ढोका, म्याचिङ uPVC चौकाठ (फ्रेम), कब्जा तथा एआई ड्रप लक (१००% पानी प्रतिरोधी)",
    "win_aluminum_upvc": "झ्यालहरू (UPVC Windows): ३-ट्र्याक स्लाइडिङ युपिभिसि प्रोफाइल, ५ मिमी टफन्ड ग्लास र लामखुट्टे जाली सहितका झ्यालहरू",
    "win_ventilators": "भेन्टिलेसन (Ventilators): बाथरुम र स्टोरका लागि फ्रोस्टेड ग्लास र एक्जस्ट फ्यान राख्ने ठाउँ भएको युपिभिसि भेन्टिलेटर",
    "door_hardware": "ढोकाको हार्डवेयर तथा कब्जा: हेभी-ड्युटी एसएस ३०४ बल-बेयरिङ कब्जा, म्याग्नेटिक डोर स्टपर, ह्यान्डल तथा सिलिकन सिलिङ",

    // I. Waterproofing
    "wp_foundation_plinth": "पिलिन्थ डिपिसी वाटरप्रूफिङ: जमिनबाट भित्तामा ओस आउन नदिन पिलिन्थ बिममा केमिकल वाटरप्रुफिङ कोरिडोर",
    "wp_sunken_slab": "शौचालय सङ्कन स्ल्याब वाटरप्रूफिङ: बाथरुमको तल्लो ढलानमा २ कोट पोलिमर वाटरप्रुफिङ स्लर्री र केमिकल सिलिङ",
    "wp_terrace": "छतको वाटरप्रूफिङ: आरसीसी छतको माथिल्लो सतहमा घाम-पानी प्रतिरोधी इलास्टोमेरिक वाटरप्रुफिङ कोटिङ",
    "wp_water_tanks": "पानी ट्याङ्की वाटरप्रूफिङ: भूमिगत पानी ट्याङ्कीको भित्री सतहमा पिउने पानीका लागि सुरक्षित क्रिस्टलाइन वाटरप्रुफिङ",

    // J. Painting
    get "paint_interior"() {
        const hasPutty = typeof document !== "undefined" ? (document.getElementById("includeInteriorPutty")?.checked !== false) : true;
        return hasPutty 
            ? "भित्री रङरोगन: भित्री भित्तामा २ कोट प्रिमियम वाल पुट्टी, १ कोट प्राइमर र २ कोट एक्रेलिक इमल्सन रङ (+१०% खेर जाने समावेश)" 
            : "भित्री रङरोगन: भित्री भित्तामा वाल पुट्टी बाहेक (डाइरेक्ट प्लास्टरमा) १ कोट प्राइमर र २ कोट इमल्सन रङ (+१०% खेर जाने समावेश)";
    },
    "paint_exterior": "बाहिरी वेदरकोट रङ: बाहिरी भित्तामा १ कोट सिलिकन प्राइमर र २ कोट मौसम प्रतिरोधी वेदरकोट इमल्सन",
    "paint_ceiling": "छतको भित्री रङ: सिलिङमा २ कोट चम्किलो सेतो एक्रेलिक इमल्सन पेन्ट कार्य",
    "paint_enamel_polish": "इनामेल पेन्ट तथा काठ पोलिस: झ्यालको ग्रिल र फलामे रेलिङमा सिन्थेटिक इनामेल पेन्ट तथा काठको पोलिस कार्य",

    // K. Electrical
    "elec_conduits": "कन्सिल्ड बिजुली पाइप: ढलान तथा भित्ताभित्र हेभी पिभिसि कन्ड्युट पाइप र जक्सन बक्स बिछ्याउने कार्य",
    "elec_ceiling_lights": "सिलिङ लाइट पोइन्टहरू: प्रत्येक कोठामा सिलिङ लाइट तथा डाउनलाइटका लागि सुरक्षित कन्सिल्ड वाइरिङ पोइन्ट",
    "elec_wall_lights": "भित्ते लाइट पोइन्टहरू: कोठा तथा बाथरुमका लागि भित्तामा ब्र्याकेट लाइट वाइरिङ पोइन्ट",
    "elec_ceiling_fans": "पंखाको पोइन्ट (Fan Points): छतमा हुक, वाइरिङ तथा फ्यान रेगुलेटर जडानका लागि डेडिकेटेड पोइन्ट",
    "elec_wire_light": "लाइटिङ वाइरिङ (१.० वर्ग मिमी): बत्ती र पंखाका लागि राठी केबल वा सो सरहको आगो प्रतिरोधी तामाको तार (FRLS)",
    "elec_wire_sockets": "सामान्य सकेट वाइरिङ (१.५ वर्ग मिमी): ६ एम्पियर मोबाइल, टिभी र सामान्य प्लग सकेटका लागि तामाको तार",
    "elec_wire_power": "पावर सकेट वाइरिङ (२.५ वर्ग मिमी): १६ एम्पियर फ्रिज, हिटर, गिजिर र ओभनका लागि हेभी तामाको तार",
    "elec_wire_ac_mains": "एसी तथा मेन लाइन वाइरिङ (४.० र ६.० वर्ग मिमी): एयर कन्डिसनर (AC) र मुख्य मिटरदेखि डिबीसम्मको मेन केबल",
    "elec_metal_boxes": "कन्सिल्ड मेटल स्विच बक्स: भित्ताभित्र गाडिने जिआई मोडुलर स्विच बक्स र फ्यान हुक बक्सहरू",
    "elec_switches_sockets": "मोडुलर स्विच तथा सकेट: प्रिमियम एमजी/केलिनो मोडुलर स्विच, सकेट, पावर प्लग र कभर प्लेट जडान",
    "elec_db_mcb": "मेन डिस्ट्रीयुसन बोर्ड (MCB DB): ४-पोल आइसोलेटर र प्रत्येक रुमको छुट्टाछुट्टै एमसीबी सहितको मेन प्यानल",
    "elec_earthing": "अर्थिङ सिस्टम: सुरक्षित तामाको रड/प्लेट र केमिकल अर्थिङ कम्पाउन्ड सहितको मजबुत अर्थिङ व्यवस्था",

    // L. Plumbing & Sanitary
    "plumb_cpvc_supply": "खानेपानी पाइप (CPVC Pipes): चिसो तथा तातो पानी वितरणका लागि गुणस्तरीय CPVC पाइप तथा फिटिङ्स",
    "plumb_cpvc_riser": "मेन राइजर पाइप (१ इन्च CPVC): छतको ट्याङ्कीबाट प्रत्येक तल्लासम्म पानी झार्ने हेभी मेन पाइपलाइन",
    "plumb_upvc_drain": "ढल निकास पाइप (११० मिमी SWR): शौचालयको दिसा-पिसाब सेप्टिक ट्याङ्कीसम्म लैजाने हेभी युपिभिसि ढल पाइप",
    "plumb_upvc_waste": "फोहोर पानी पाइप (७५ मिमी): बाथरुम, भान्सा र बेसिनको फोहोर पानी नालीसम्म लैजाने युपिभिसि वेस्ट पाइप",
    "plumb_sewer_line": "भूमिगत मुख्य ढल पाइप: जमिनमुनि ११०/१६० मिमी हेभी सिमेन्ट/पिभिसि ढल पाइपलाइन र चेम्बर निर्माण",
    "plumb_valves": "कन्ट्रोल भल्भ तथा बल्स: ब्रासको बल भल्भ, गेट भल्भ र प्रत्येक बाथरुमको छुट्टै कन्ट्रोल कक जडान",
    "plumb_sundries": "प्लम्बिङ फुटकर सामग्री: सीपीभिसि सोल्भेन्ट, टेफ्लोन टेप, क्ल्याम्प तथा ग्यास्केट जडान सामग्री",
    "san_wc": "कमोड / वाटर क्लोजेट: वेस्टर्न प्यान वा इन्डियन कमोड, सफ्ट-क्लोज सिट कभर तथा डुअल फ्लस सिस्टर्न जडान",
    "san_jet": "हेल्थ फसेट / जेट स्प्रे: १.५ मिटर लामो लचिलो एसएस पाइप सहितको ब्रास क्रोम जेट स्प्रे",
    "san_shower": "ओभरहेड सावर सेट: भित्ताभित्र कन्सिल्ड मिक्सर सहितको क्रोम-प्लेटेड ओभरहेड सावर सेट",
    "san_basin": "हात धुने बेसिन (Wash Basin): सेरामिक वाश बेसिन, पिल्लर ट्याप, वेस्ट जाली र बोतल ट्र्याप जडान",

    // M. Kitchen Specialties
    "kit_std_sink": "भान्साको सिङ्क (SS Sink): ३०४ ग्रेड स्टेनलेस स्टिलको सिंगल/डबल बाउल सिङ्क तथा लचिलो सिङ्क कक ट्याप",
    "kit_std_slab": "भान्साको काउन्टरटप (Black Granite): १८ मिमी बाक्लो जेट ब्ल्याक ग्रेनाइट काउन्टरटप र भित्ता पट्टी फिनिस",
    "kit_provisions": "भान्साको पूर्वाधार: चिम्नीको पाइप निस्कने प्वाल, आरओ (RO) फिल्टर पोइन्ट र माइक्रोवेभ पावर सकेट",

    // N. External Works & Utilities
    "ext_water_tank": "भूमिगत आरसीसी पानी ट्याङ्की: जमिनमुनि वाटरप्रुफिङ र म्यानहोल कभर सहितको आरसीसी रिजर्भ पानी ट्याङ्की",
    "ext_septic_tank": "सेप्टिक ट्याङ्की तथा सोक पिट: ढल प्रशोधनका लागि २ चेम्बर सेप्टिक ट्याङ्की र गिट्टी भरिएको सोक पिट निर्माण",
    "ext_kitchen_soak": "भान्साको छुट्टै सोक पिट: भान्साको चिल्लो पानी छान्नका लागि छुट्टै सोक पिट निर्माण",
    "ext_overhead_tank": "छतको ओभरहेड पानी ट्याङ्की: छतमा Kishan वा सो सरहको तीन-लेयर हेभी पानी ट्याङ्की जडान",
    "ext_site_apron": "घर वरिपरिको एप्रन तथा नाली: घरको जग सुरक्षित राख्न वरिपरि ७५० मिमी चौडा पिसिसी एप्रन र पानी नाली",

    // O. Miscellaneous
    "misc_window_grilles": "झ्यालको सुरक्षा ग्रिल: झ्यालहरूमा चोरी रोक्न १२ मिमी मजबुत स्क्वायर बारको एमएस सुरक्षा ग्रिल र पेन्ट",
    "misc_railings": "भर्‍याङ र बाल्कोनी रेलिङ: भर्‍याङ तथा बाल्कोनीमा एसएस ३०४ ग्रेड स्टेनलेस स्टिल वा ग्लास रेलिङ",
    "misc_wardrobes": "सुत्ने कोठाको वार्डरोब: तोकिएको कोठामा फुल-हाइट प्रिमियम बोर्डबाट निर्मित आन्तरिक कपडा दराज",
    "misc_final_cleaning": "अन्तिम साइट सरसफाइ: घर हस्तान्तरण गर्नुअघि सम्पूर्ण टायल, झ्यालको सिसा र कोठाहरू केमिकलले सफा गर्ने",
    "misc_asbuilt_handover": "हस्तान्तरण तथा ड्रइङ कागजात: निर्माण सम्पन्न भएपछि घरको फाइनल ड्रइङ, ग्यारेन्टी कार्ड र चाबी हस्तान्तरण"
};

/**
 * Apply Nepali / English Static DOM labels to the generated BOQ area
 */
root.applyBoqLanguageDOM = function(isNp) {
    if (typeof document === 'undefined') return;

    // Document Main Titles
    const mainTitle = document.getElementById('docMainTitle');
    if (mainTitle) mainTitle.textContent = isNp ? "परिमाण विवरण तथा लागत इस्टिमेट (BOQ)" : "BILL OF QUANTITIES (BOQ)";
    const subTitle = document.getElementById('docSubTitle');
    if (subTitle) subTitle.textContent = isNp ? "विस्तृत निर्माण लागत तथा दर विश्लेषण (DETAILED ESTIMATE)" : "DETAILED ESTIMATE & RATE ANALYSIS";

    // Cover Page Elements
    const coverTitle = document.getElementById('coverProposalTitle');
    if (coverTitle) coverTitle.innerHTML = isNp ? "आयोजना<br><span class=\"font-normal\">प्रस्तावना</span>" : "PROJECT<br><span class=\"font-normal\">PROPOSAL</span>";
    const coverContractor = document.getElementById('coverContractorLabel');
    if (coverContractor) coverContractor.textContent = isNp ? "निर्माण व्यवसायी:" : "CONTRACTOR:";
    const coverSupplier = document.getElementById('coverSupplierLabel');
    if (coverSupplier) coverSupplier.textContent = isNp ? "सामग्री आपूर्तिकर्ता:" : "SUPPLIER:";
    const coverClientPrefix = document.getElementById('coverClientPrefix');
    if (coverClientPrefix) coverClientPrefix.textContent = isNp ? "सेवाग्राही / ग्राहक:" : "Client:";
    const coverLocPrefix = document.getElementById('coverLocPrefix');
    if (coverLocPrefix) coverLocPrefix.textContent = isNp ? "आयोजना स्थल / ठेगाना:" : "Location:";
    const coverDistributor = document.getElementById('coverDistributorLabel');
    if (coverDistributor) coverDistributor.textContent = isNp ? "आधिकारिक बिक्रेता:" : "OFFICIAL DISTRIBUTOR:";
    const coverSince = document.getElementById('coverSinceLabel');
    if (coverSince) coverSince.textContent = isNp ? "वि.सं. २०७६ देखि" : "Since 2076";

    // Section 1 Heading
    const sec1Header = document.getElementById('sec1HeaderTitle');
    if (sec1Header) sec1Header.textContent = isNp ? "१. तल्ला अनुसार क्षेत्रफल तथा सिभिल निर्माण लागत (Floor-wise Built-up Area)" : "1. Floor-wise Built-up Area & Base Civil Framework";
    const sec1Sub = document.getElementById('sec1Subtitle');
    if (sec1Sub) sec1Sub.textContent = isNp ? "भित्ते क्षेत्रफल तथा बाल्कोनी क्षेत्रफल अनुसार छुट्टाछुट्टै सिभिल लागत विवरण" : "Differentiated wall area & cantilever balcony rates breakdown";

    // Section 2 Heading
    const sec2Header = document.getElementById('sec2HeaderTitle');
    if (sec2Header) sec2Header.textContent = isNp ? "२. कोठा, फिनिसिङ तथा आन्तरिक निर्माण विवरण (Architectural Finishes)" : "2. Architectural Finishes, Ceiling & Interior Specialties Breakdown";
    const sec2Sub = document.getElementById('sec2Subtitle');
    if (sec2Sub) sec2Sub.textContent = isNp ? "प्रत्येक तल्लाको कोठा विवरण, फल्स सिलिङ, टायल फ्लोरिङ तथा इन्टेरियर" : "Detailed room allocation, false ceiling specifications and premium vitrified flooring per floor level";

    // Grand Total Banner Title
    const gtTitle = document.getElementById('grandTotalBannerTitle');
    if (gtTitle) gtTitle.textContent = isNp ? "कुल निर्माण लागत (Total Project Construction Cost)" : "Total Project Construction Cost";

    // Section 3 Material Requirements
    const sec3Header = document.getElementById('sec3HeaderTitle');
    if (sec3Header) sec3Header.textContent = isNp ? "३. मुख्य निर्माण सामग्री परिमाण विवरण (Key Material Requirements)" : "3. Key Material Requirements (Scaled to Columns & Built-up Area)";
    const sec3Sub = document.getElementById('sec3Subtitle');
    if (sec3Sub) sec3Sub.textContent = isNp ? "निर्माण कार्यका लागि आवश्यक मुख्य कच्चा सामग्रीको अनुमानित परिमाण (+१०% खेर जाने समावेश)" : "Estimated net material quantities (+10% engineering wastage included)";

    // Section 4 Detailed BOQ Table
    const sec4Header = document.getElementById('sec4HeaderTitle');
    if (sec4Header) sec4Header.textContent = isNp ? "४. विस्तृत निर्माण परिमाण तालिका (Detailed BOQ Schedule)" : "4. Detailed Quantity Schedule (BOQ)";
    const sec4Sub = document.getElementById('sec4Subtitle');
    if (sec4Sub) sec4Sub.textContent = isNp ? "इन्जिनियरिङ मापदण्ड अनुसार १६ वटा निर्माण उप-शीर्षकहरूको विस्तृत परिमाण" : "Engineering material & execution quantities schedule (Categories A through O)";
    const searchInput = document.getElementById('boqSearchInput');
    if (searchInput) searchInput.placeholder = isNp ? "काम खोज्नुहोस्..." : "Search BOQ items...";

    // Section 5 Custom Items
    const sec5Header = document.getElementById('customItemsHeaderTitle');
    if (sec5Header) sec5Header.textContent = isNp ? "५. थप निर्माण कार्य, मर्मत तथा अन्य सामग्री (Out of BOQ & Custom Additions)" : "5. Out of BOQ, Renovation & Custom Additions";

    // Signatures
    const sigPrepRole = document.getElementById('dispPreparedRole');
    if (sigPrepRole) sigPrepRole.textContent = isNp ? "इस्टिमेट तयार गर्ने" : "Prepared By";
    const sigSupRole = document.getElementById('dispSupervisingRole');
    if (sigSupRole) sigSupRole.textContent = isNp ? "जाँच गर्ने (साइट इन्जिनियर)" : "Supervising Engineer";
    const sigAppRole = document.getElementById('dispApprovedRole');
    if (sigAppRole) sigAppRole.textContent = isNp ? "स्वीकृत गर्ने (प्रबन्ध निर्देशक)" : "Director / Approved By";
};

/**
 * Render Nepali Material & Quality Specifications Agreement (Clause 1 to 18)
 */
root.renderNepaliMaterialSpecs = function(s) {
    return `
        <div class="mt-8 mb-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-slate-800 avoid-break">
            <!-- Section Header -->
            <div class="border-b-2 border-orange-500 pb-3 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <i class="fas fa-file-contract text-orange-600"></i> सामग्री गुणस्तर तथा प्राविधिक मापदण्ड सम्झौता पत्र
                    </h3>
                    <p class="text-[10px] text-slate-500 mt-0.5">भवन निर्माणमा प्रयोग हुने सम्पूर्ण निर्माण सामग्रीको गुणस्तर, स्वीकृत ब्रान्ड तथा प्राविधिक मापदण्ड</p>
                </div>
                <span class="self-start sm:self-center text-[9px] bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded border border-emerald-200 uppercase tracking-wider">नेपाल गुणस्तर (NS) प्रमाणित</span>
            </div>

            <!-- Introductory Purpose -->
            <div class="mb-6 p-4 bg-orange-50/50 rounded-lg border border-orange-100 text-[10.5px] leading-relaxed text-slate-700">
                <h4 class="font-bold text-slate-900 text-xs mb-1.5 flex items-center gap-1.5">
                    <span class="text-orange-600 font-mono">१.</span> यस सम्झौता पत्रको उद्देश्य
                </h4>
                <p>यो सामग्री तथा गुणस्तर सम्झौता पत्र यस लागत इस्टिमेट (BOQ) को अभिन्न अङ्ग हो। यसको उद्देश्य यस आयोजनामा प्रयोग हुने सम्पूर्ण मुख्य निर्माण सामग्रीको गुणस्तर, ब्रान्ड, प्राविधिक मापदण्ड र कार्यशैली स्पष्ट गर्नु हो।</p>
                <p class="mt-1.5">हाम्रो मुख्य उद्देश्य निरन्तर गुणस्तरीय सामग्री, दक्ष प्राविधिक जनशक्ति र दिगो मजबुत संरचना सुनिश्चित गर्नु हो। तल उल्लेखित सामग्रीहरू कम्पनीको तोकिएको गुणस्तर मापदण्ड अनुसार हुन्।</p>
            </div>

            <!-- Detailed 18-clause Spec Sheet -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-[10px] leading-relaxed">
                <!-- 2. Cement -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">२.</span> सिमेन्ट (Cement)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">स्वीकृत ब्रान्ड:</span> <span class="text-orange-700 font-bold">${s.cement}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> आरसीसी स्ट्रक्चरल ढलान (फुटिङ, पिलर, बिम र स्ल्याब) का लागि ओपिसि (OPC 43/53 ग्रेड) सिमेन्ट प्रयोग गरिनेछ। प्लास्टर र गाह्रो चिनाईका लागि गुणस्तरीय पिपिसि (PPC) सिमेन्ट प्रयोग गरिनेछ। डल्ला परेको वा पुरानो सिमेन्ट प्रयोग गरिने छैन।</div>
                    </div>
                </div>

                <!-- 3. Steel Rebar -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">३.</span> डन्डी / फलामे छड (Steel Rebar)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">स्वीकृत ब्रान्ड:</span> <span class="text-orange-700 font-bold">${s.rod}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> सम्पूर्ण आरसीसी निर्माण कार्यमा उच्च शक्तिको भूकम्प प्रतिरोधी TMT Fe500D ग्रेड डन्डी प्रयोग गरिनेछ। रडको खिया, तेल वा ग्रिज सफा गरेर इन्जिनियरिङ ड्रइङ अनुसार उपयुक्त ओभरल्यापिङ र हुक मोडेर १८ गेजको कालो तारले मजबुत बाँधिनेछ।</div>
                    </div>
                </div>

                <!-- 4. Coarse Aggregate -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">४.</span> गिट्टी (Coarse Aggregate)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">सामग्री प्रकार:</span> <span class="text-slate-900 font-medium">${s.aggregate}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> कंक्रिट ढलानका लागि कडा, सफा र उचित ग्रेडिङ भएको १० मिमी देखि २० मिमी साइजको मेसिन क्रस्ड गिट्टी प्रयोग गरिनेछ। गिट्टी माटो, धुलो र जैविक फोहोरमुक्त हुनेछ।</div>
                    </div>
                </div>

                <!-- 5. Coarse Sand -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">५.</span> बाक्लो बालुवा (Coarse Sand)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">सामग्री प्रकार:</span> <span class="text-slate-900 font-medium">${s.coarse_sand}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> कंक्रिट ढलान तथा आरसीसी कार्यका लागि नदीको धोइएको सफा मोटो बालुवा प्रयोग गरिनेछ, जसमा ५% भन्दा बढी हिलो वा लेदो हुने छैन।</div>
                    </div>
                </div>

                <!-- 6. Fine Sand -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">६.</span> प्लास्टर बालुवा (Plaster / Fine Sand)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">सामग्री प्रकार:</span> <span class="text-slate-900 font-medium">${s.fine_sand}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> भित्ता तथा सिलिङ प्लास्टरका लागि मसिनो जालीमा छानेको डबल-वाश नदीको सफा बालुवा प्रयोग गरिनेछ, जसले भित्तामा चिरा पर्न नदिई चिल्लो फिनिस दिन्छ।</div>
                    </div>
                </div>

                <!-- 7. Bricks -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">७.</span> इँटा चिनाई (Bricks)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">ग्रेड तथा ब्रान्ड:</span> <span class="text-slate-900 font-medium">${s.brick}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> गाह्रो चिनाईमा चिम्नीमा राम्रोसँग पाकेको, एकनासको साइज र कडा पहिलो नम्बर रातो इँटा प्रयोग गरिनेछ। चिनाई गर्नुअघि इँटालाई पानीमा राम्रोसँग भिजाएर १:४ सिमेन्ट मसलामा जोडिनेछ।</div>
                    </div>
                </div>

                <!-- 8. Pipes & Water Tank -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">८.</span> खानेपानी पाइप तथा ट्याङ्की (Pipes & Water Tank)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">स्वीकृत ब्रान्ड:</span> <span class="text-orange-700 font-bold">${s.pipes}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> चिसो तथा तातो पानी वितरणका लागि Kishan CPVC/PPR हेभी पाइप तथा फिटिङ्स प्रयोग गरिनेछ। ढल निकासका लागि ११० मिमी SWR PVC पाइप प्रयोग गरिनेछ। छतमा गुणस्तरीय ३-लेयर पानी ट्याङ्की जडान गरिनेछ।</div>
                    </div>
                </div>

                <!-- 9. Sanitary & Bathware -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">९.</span> सेनेटरी तथा बाथरुम फिटिङ्स (Sanitary & Bathware)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">स्वीकृत ब्रान्ड:</span> <span class="text-orange-700 font-bold">${s.sanitary}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> प्रत्येक बाथरुममा सफ्ट-क्लोज सिट कभर सहितको कमोड, क्रोम पिल्लर ट्याप सहितको सेरामिक बेसिन, लचिलो ब्रास जेट स्प्रे र ओभरहेड सावर सेट जडान गरिनेछ।</div>
                    </div>
                </div>

                <!-- 10. Paint & Coatings -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">१०.</span> रङरोगन तथा वाल पुट्टी (Paint & Surface Coatings)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">स्वीकृत ब्रान्ड:</span> <span class="text-orange-700 font-bold">${s.paint}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> भित्री भित्तामा २ कोट प्रिमियम वाल पुट्टी, १ कोट प्राइमर र २ कोट एक्रेलिक इमल्सन पेन्ट लगाइनेछ। बाहिरी भित्तामा घाम-पानी र लेउ प्रतिरोधी सिलिकन वेदरकोट पेन्ट २ कोट लगाइनेछ।</div>
                    </div>
                </div>

                <!-- 11. Waterproofing -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">११.</span> जलरोधक वाटरप्रूफिङ (Waterproofing System)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">प्रविधि तथा केमिकल:</span> <span class="text-slate-900 font-medium">Dr. Fixit / Brij Additives Polymer Waterproofing</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> बाथरुमको सङ्कन स्ल्याब, पिलिन्थ डिपिसी र छतमा २ कोट पोलिमर वाटरप्रुफिङ स्लर्री र केमिकल कोरिडोर प्रयोग गरिनेछ, जसले घरलाई ओस र चुहावटबाट १००% सुरक्षित राख्छ।</div>
                    </div>
                </div>

                <!-- 12. False Ceiling -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">१२.</span> फल्स सिलिङ (False Ceiling)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">प्रकार:</span> <span class="text-slate-900 font-medium">${s.false_ceiling}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> बैठक कोठामा जीआई च्यानल मेटल फ्रेम र १२ मिमी जिप्सम बोर्ड प्रयोग गरी आकर्षक कन्सिल्ड लाइट र कोभ लाइट सहितको फल्स सिलिङ निर्माण गरिनेछ।</div>
                    </div>
                </div>

                <!-- 13. Electrical Wires & Cables -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">१३.</span> विद्युतीय तार तथा केबल (Electrical Wires)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">स्वीकृत ब्रान्ड:</span> <span class="text-orange-700 font-bold">${s.wire}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> सुरक्षित विद्युतीकरणका लागि राठी केबल वा सो सरहको आगो प्रतिरोधी (FRLS) मल्टि-स्ट्र्यान्ड तामाको तार प्रयोग गरिनेछ। बत्तीका लागि १.० वर्ग मिमी, सकेटका लागि १.५ वर्ग मिमी र पावर लोडका लागि २.५/४.० वर्ग मिमी तार रहनेछ।</div>
                    </div>
                </div>

                <!-- 14. Door Frames -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">१४.</span> ढोकाको चौकाठ / फ्रेम (Door Frames)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">मुख्य चौकाठ:</span> <span class="text-slate-900 font-medium">${s.door_frame}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> मुख्य प्रवेशद्वार र कोठाहरूमा सुकाएको सालको काठको बलियो चौकाठ प्रयोग गरिनेछ। सबै शौचालय तथा बाथरुममा पानी, ओस र धमिराबाट शतप्रतिशत सुरक्षित रहने हेभी uPVC चौकाठ फ्रेम अनिवार्य प्रयोग गरिनेछ।</div>
                    </div>
                </div>

                <!-- 15. Windows -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">१५.</span> झ्यालहरू (Windows & Openings)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">झ्याल प्रणाली:</span> <span class="text-slate-900 font-medium">${s.windows}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> सम्पूर्ण झ्यालहरूमा स्टील रिइन्फोर्स्ड ३-ट्र्याक स्लाइडिङ युपिभिसि प्रोफाइल, ५ मिमी टफन्ड क्लियर ग्लास र एसएस लामखुट्टे जाली जडान गरिनेछ।</div>
                    </div>
                </div>

                <!-- 16. Doors & Shutters -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">१६.</span> ढोका तथा पल्ला (Doors & Shutters)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">कोठाको ढोका:</span> <span class="text-slate-900 font-medium">${s.doors}</span></div>
                        <div><span class="font-semibold text-slate-800">बाथरुम ढोका:</span> <span class="text-slate-900 font-medium">${s.upvc_openings}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> मुख्य ढोका ग्राहकको रोजाइ अनुसार सालको काठ, ल्यामिनेटेड वा वाटरप्रुफ PVC पल्ला हुनेछ। कोठामा ३२ मिमी ल्यामिनेटेड फ्लस ढोका र बाथरुममा वाटरप्रुफ PVC मोल्डेड पल्ला म्याचिङ uPVC फ्रेम सहित रहनेछ।</div>
                    </div>
                </div>

                <!-- 17. Switches & Accessories -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">१७.</span> स्विच तथा सकेट (Switches & Plates)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">स्वीकृत ब्रान्ड:</span> <span class="text-orange-700 font-bold">${s.switches}</span></div>
                        <div><span class="font-semibold text-slate-800">स्विच प्रकार:</span> <span class="text-slate-900 font-bold underline">${s.switches_type}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> ग्राहकको छनौट अनुसार प्रिमियम मोडुलर वा नन-मोडुलर स्विच, इन्डिकेटर, फ्यान रेगुलेटर र युनिभर्सल पावर सकेटहरू सुरक्षित ढंगले जडान गरिनेछ।</div>
                    </div>
                </div>

                <!-- 18. Tiles -->
                <div class="border-b border-slate-100 pb-4 avoid-break">
                    <h5 class="font-bold text-slate-900 text-[10.5px] mb-1 flex items-center gap-1.5">
                        <span class="text-orange-600 font-mono">१८.</span> टायल तथा फ्लोरिङ (Floor & Wall Tiles)
                    </h5>
                    <div class="space-y-1 text-slate-600">
                        <div><span class="font-semibold text-slate-800">स्वीकृत ब्रान्ड:</span> <span class="text-orange-700 font-bold">${s.tiles}</span></div>
                        <div><span class="font-semibold text-slate-800">विवरण:</span> बैठक र सुत्ने कोठामा प्रिमियम डबल-चार्ज भिट्रिफाइड टायल, बाथरुममा एन्टि-स्किड टायल र भित्तामा ५ फिटसम्म ग्ल्याजिड टायल पोलिमर एड्हेसिभ र वाटरप्रुफ इपोक्सी ग्राउट प्रयोग गरी बिछ्याइनेछ।</div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

/**
 * Main Toggle Function for BOQ Language
 */
root.toggleBoqLanguage = function() {
    root.boqLanguage = (root.boqLanguage === 'np') ? 'en' : 'np';
    const isNp = (root.boqLanguage === 'np');

    // Update Top Document Toolbar Button
    const btnText = document.getElementById('boqLangBtnText');
    const btn = document.getElementById('btnToggleBoqLang');
    if (btnText) {
        btnText.innerHTML = isNp ? 'English मा हेर्नुहोस्' : 'नेपालीमा हेर्नुहोस्';
    }
    if (btn) {
        if (isNp) {
            btn.className = 'bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer ring-1 ring-slate-600';
        } else {
            btn.className = 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer ring-1 ring-red-400/50';
        }
    }

    // Update Sidebar Toggle Button if present
    const sbBtn = document.getElementById('sidebarLangToggleBtn');
    if (sbBtn) {
        sbBtn.innerHTML = isNp ? '🇬🇧 English' : '🇳🇵 नेपालीमा';
    }

    if (root.showToast) {
        root.showToast(isNp ? 'BOQ नेपाली भाषामा अनुवाद गरियो (BOQ in Nepali)' : 'BOQ switched to English');
    }

    // Re-generate BOQ in chosen language
    if (root.generateBOQ) {
        root.generateBOQ();
    }

    if (root.autoSaveToCloudBackground) {
        root.autoSaveToCloudBackground();
    }
};

console.log("BOQ Nepali Translation Engine loaded successfully.");
