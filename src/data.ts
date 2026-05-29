import { Product, BlogArticle, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'thinkpad-x1-carbon',
    title: 'Lenovo ThinkPad X1 Carbon Gen 8',
    category: 'laptops',
    priceKes: 54999,
    originalPriceKes: 75000,
    condition: 'Refurbished (Excellent)',
    storage: '512GB NVMe SSD',
    ram: '16GB DDR4',
    batteryHealth: '89%',
    warranty: '6 Months Local Warranty',
    rating: 4.9,
    reviewsCount: 34,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
      'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=800&q=80'
    ],
    description: 'The ultimate business companion. Ultra-thin, super-durable chassis, gorgeous Full-HD display, and the legendary ThinkPad backlit keyboard. Fully tested, serviced, and loaded with Windows 11 Pro.',
    inStock: true,
    quantityLeft: 3,
    tags: ['Best Seller', 'SAM DEALS Choice', 'Limited Stock'],
    keySpecs: [
      { label: 'Processor', value: 'Intel Core i7 10th Gen' },
      { label: 'RAM', value: '16GB LPDDR3' },
      { label: 'Storage', value: '512GB PCIe NVMe SSD' },
      { label: 'Screen', value: '14" FHD IPS Anti-Glare' },
      { label: 'Weight', value: '1.09 kg' },
      { label: 'Keyboard', value: 'Backlit, UK/US Layout' }
    ],
    isDealOfTheDay: true
  },
  {
    id: 'iphone-13-pro-max',
    title: 'Apple iPhone 13 Pro Max (Graphite)',
    category: 'smartphones',
    priceKes: 89999,
    originalPriceKes: 105000,
    condition: 'Refurbished (Excellent)',
    storage: '256GB',
    ram: '6GB',
    batteryHealth: '92% (Original)',
    warranty: '3 Months Check Warranty',
    rating: 4.8,
    reviewsCount: 47,
    images: [
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80'
    ],
    description: 'Triple-lens system with Cinematic Mode, ProMotion 120Hz display, and exceptional battery life. Glass is pristine, absolute minimal frame wear. Face ID fully active.',
    inStock: true,
    quantityLeft: 2,
    tags: ['Popular', 'Pay on Delivery Available', 'Fast Moving'],
    keySpecs: [
      { label: 'Display', value: '6.7" Super Retina XDR' },
      { label: 'Chipset', value: 'Apple A15 Bionic' },
      { label: 'Battery Health', value: '92% Peak Performance' },
      { label: 'Camera', value: '12MP Triple System + LiDAR' },
      { label: 'Face ID', value: 'Fully Functional' },
      { label: 'Network', value: '5G Enabled, Single/eSIM' }
    ],
    isDealOfTheDay: true
  },
  {
    id: 'hp-elitebook-840-g8',
    title: 'HP EliteBook 840 G8 Premium Ultrabook',
    category: 'laptops',
    priceKes: 61999,
    originalPriceKes: 82000,
    condition: 'Refurbished (Excellent)',
    storage: '256GB NVMe SSD',
    ram: '16GB DDR4',
    batteryHealth: '91%',
    warranty: '6 Months Local Warranty',
    rating: 4.7,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80'
    ],
    description: 'Stunning premium aluminum body. Designed for executives, program developers, and researchers. Fast multitasking, high-security fingerprint login, and crystal clear Bang & Olufsen sound.',
    inStock: true,
    quantityLeft: 4,
    tags: ['Verified Dealer', 'Highly Rated', 'Pay on Delivery'],
    keySpecs: [
      { label: 'Processor', value: 'Intel Core i5 11th Gen vPro' },
      { label: 'RAM', value: '16GB DDR4 (Upgradable)' },
      { label: 'Storage', value: '256GB PCIe SSD' },
      { label: 'Screen', value: '14" Full-HD IPS' },
      { label: 'Security', value: 'Fingerprint & IR Camera' },
      { label: 'Audio', value: 'Bang & Olufsen Stereo' }
    ]
  },
  {
    id: 'ps5-slim-console',
    title: 'Sony PlayStation 5 Slim Digital Edition',
    category: 'gaming',
    priceKes: 59999,
    originalPriceKes: 68000,
    condition: 'Open Box',
    storage: '1TB Custom SSD',
    ram: '16GB GDDR6',
    batteryHealth: 'N/A',
    warranty: '12 Months Shop Warranty',
    rating: 4.9,
    reviewsCount: 28,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80'
    ],
    description: 'Immerse Yourself in 4K high-refresh gaming. Digital Slim Edition takes up less space but delivers full core speeds and graphics power. Complete with 1 original DualSense controller and all cables.',
    inStock: true,
    quantityLeft: 2,
    tags: ['Hard to Find', 'Gamers Hub', 'Best Price'],
    keySpecs: [
      { label: 'Storage', value: '1TB Custom High-Speed NVMe' },
      { label: 'Graphics', value: '4K 120Hz, Ray Tracing Support' },
      { label: 'Controller', value: '1x DualSense Cosmic Wireless' },
      { label: 'Condition', value: 'Used for Testing, Box Opened' },
      { label: 'Bonus', value: 'Preloaded Free Games Starter Pack' }
    ]
  },
  {
    id: 'samsung-s22-ultra',
    title: 'Samsung Galaxy S22 Ultra 5G (Phantom Black)',
    category: 'smartphones',
    priceKes: 67999,
    originalPriceKes: 85000,
    condition: 'Refurbished (Excellent)',
    storage: '256GB',
    ram: '12GB',
    batteryHealth: '87% (Certified)',
    warranty: '3 Months Check Warranty',
    rating: 4.8,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80'
    ],
    description: 'The powerhouse Android with embedded S-Pen stylus. 108MP Quad Camera with crazy 100x Space Zoom. Gorgeous Dynamic AMOLED 2X display. Minimal body micro-scratches, glass perfectly intact.',
    inStock: true,
    quantityLeft: 3,
    tags: ['Flagship Plug', 'S-Pen Included', 'Refurbished Hero'],
    keySpecs: [
      { label: 'Display', value: '6.8" Quad HD+ 120Hz' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 1' },
      { label: 'RAM', value: '12GB High-Speed' },
      { label: 'Stylus', value: 'Embedded Active S-Pen' },
      { label: 'Camera', value: '108MP Main + 10x Optical Tele' },
      { label: 'Charging', value: '45W Fast Charge Active' }
    ],
    isDealOfTheDay: false
  },
  {
    id: 'oraimo-freepods-4',
    title: 'Oraimo FreePods 4 Active Noise Cancelling Earbuds',
    category: 'accessories',
    priceKes: 4800,
    originalPriceKes: 6000,
    condition: 'Brand New',
    storage: 'N/A',
    ram: 'N/A',
    batteryHealth: '100% (New)',
    warranty: '1 Year Oraimo Kenya Sealed',
    rating: 4.6,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
    ],
    description: 'Highest ranked budget lifestyle earbuds in Kenya. Out-of-the-box ANC up to 30dB, customized bass tuning app, 35.5 hrs total playtime with fast charge case, low-latency gaming mode.',
    inStock: true,
    quantityLeft: 12,
    tags: ['Brand New Sealed', 'Best Value', 'Hot Accessory'],
    keySpecs: [
      { label: 'Noise Control', value: 'Active Noise Cancelling (ANC)' },
      { label: 'Battery Life', value: 'Up to 35.5 Hours with Case' },
      { label: 'Bluetooth', value: 'V5.2 Low Latency' },
      { label: 'Water Proof', value: 'IPX5 Sweat & Splash Guard' },
      { label: 'App Control', value: 'Oraimo Sound App Support' }
    ]
  },
  {
    id: 'apple-watch-se-cell',
    title: 'Apple Watch SE 2nd Gen (44mm GPS + Cellular)',
    category: 'smartwatches',
    priceKes: 31999,
    originalPriceKes: 39000,
    condition: 'Open Box',
    storage: '32GB',
    ram: 'N/A',
    batteryHealth: '96%',
    warranty: '3 Months Shop Warranty',
    rating: 4.7,
    reviewsCount: 15,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&q=80'
    ],
    description: 'Track workouts, sleep quality, and receive calls/texts directly without having your iPhone nearby. Cellular eSIM package ready to activate on Safaricom. Like brand new, generic box.',
    inStock: true,
    quantityLeft: 2,
    tags: ['Cellular Active', 'Smart Watch King', 'Clean Condition'],
    keySpecs: [
      { label: 'Size', value: '44mm Aluminum Case' },
      { label: 'Network', value: 'eSIM Cellular + GPS Active' },
      { label: 'Chip', value: 'S8 SiP Dual-Core' },
      { label: 'Battery Health', value: '96% Max Capacity' },
      { label: 'Sensors', value: 'Heart Rate, Fall Detection' }
    ]
  },
  {
    id: 'hp-elitebook-840-g6',
    title: 'HP EliteBook 840 G6 Budgets Best',
    category: 'laptops',
    priceKes: 34999,
    originalPriceKes: 48000,
    condition: 'Refurbished (Excellent)',
    storage: '256GB SSD',
    ram: '8GB DDR4',
    batteryHealth: '86%',
    warranty: '6 Months Local Warranty',
    rating: 4.6,
    reviewsCount: 61,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80'
    ],
    description: 'One of the best-selling budget laptops in Nairobi & Ruiru. Excellent aluminum build, core i5 8th generation handles accounting software, office work, online classes and browsing effortlessly.',
    inStock: true,
    quantityLeft: 5,
    tags: ['Best Under 40K', 'Super Budget', 'Students Choice'],
    keySpecs: [
      { label: 'Processor', value: 'Intel Core i5 8th Gen' },
      { label: 'RAM', value: '8GB DDR4 (Upgradable to 32GB)' },
      { label: 'Storage', value: '256GB NVMe M.2 SSD' },
      { label: 'Keyboard', value: 'Backlit Splash Resistant' },
      { label: 'Connectivity', value: 'Type-C, Thunderbolt, HDMI, LAN' },
      { label: 'Display', value: '14" FHD Anti-Glare display' }
    ]
  },
  {
    id: 'vitron-32-smart-tv',
    title: 'Vitron 32" Smart Android TV (HTC3218S)',
    category: 'tvs',
    priceKes: 12999,
    originalPriceKes: 16500,
    condition: 'Brand New',
    warranty: '12 Months Local Warranty',
    rating: 4.5,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80',
      'https://images.unsplash.com/photo-1552975084-6e027cd345c2?w=800&q=80'
    ],
    description: 'Enjoy crisp high-definition picture and seamless access to apps. Powered by Android TV with Netflix, Prime Video, YouTube, and browser built-in. Ideal for small-to-md living spaces, offices, and bedsitters.',
    inStock: true,
    quantityLeft: 8,
    tags: ['Best Budget Smart TV', 'Built-in Wi-Fi', 'Android OS'],
    keySpecs: [
      { label: 'Screen Size', value: '32 Inches' },
      { label: 'Resolution', value: 'HD Ready (1366 x 768)' },
      { label: 'OS', value: 'Android Smart TV Platform' },
      { label: 'Ports', value: '2x HDMI, 2x USB, AV In, Coaxial' },
      { label: 'Audio', value: 'Built-in Box Speakers' },
      { label: 'Connectivity', value: 'Wi-Fi, Ethernet, Screen Mirroring' }
    ]
  },
  {
    id: 'hisense-43-smart-4k-tv',
    title: 'Hisense 43" Smart UHD 4K Frameless TV',
    category: 'tvs',
    priceKes: 28999,
    originalPriceKes: 34500,
    condition: 'Brand New',
    warranty: '12 Months Manufacturer Warranty',
    rating: 4.8,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80',
      'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&q=80'
    ],
    description: 'Immerse yourself of true 4K quality with HDR10+ and Dolby Vision. Frameless design blends elegantly into any decor. Incredible smart platform VIDAA with fast loading and certified apps.',
    inStock: true,
    quantityLeft: 5,
    tags: ['4K Ultra HD', 'Dolby Vision', 'Premium Frameless'],
    keySpecs: [
      { label: 'Screen Size', value: '43 Inches' },
      { label: 'Resolution', value: '4K Ultra HD (3840 x 2160)' },
      { label: 'OS', value: 'VIDAA U Smart OS' },
      { label: 'Display Technology', value: 'Direct LED Backlit Backplane' },
      { label: 'Sound', value: 'DTS Studio Sound / Dolby Audio' },
      { label: 'Inputs', value: '3x HDMI, 2x USB, Dual-band Wi-Fi' }
    ]
  },
  {
    id: 'samsung-55-crystal-uhd-tv',
    title: 'Samsung 55" CU7000 Crystal UHD 4K Smart TV',
    category: 'tvs',
    priceKes: 48999,
    originalPriceKes: 58000,
    condition: 'Open Box',
    warranty: '12 Months Shop Warranty',
    rating: 4.9,
    reviewsCount: 14,
    images: [
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80',
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&q=80'
    ],
    description: 'PurColor technology pulls you in for vibrant real-to-life images. Powerful Crystal Processor upscale everything to beautiful 4K. Tizen OS features Samsung Smart Hub, web browser, and gaming dashboard.',
    inStock: true,
    quantityLeft: 2,
    tags: ['Samsung Crystal', 'Smart Tizen Hub', 'Stunning Detail'],
    keySpecs: [
      { label: 'Screen Size', value: '55 Inches' },
      { label: 'Resolution', value: '4K Crystal UHD (3840 x 2160)' },
      { label: 'OS', value: 'Tizen Smart OS' },
      { label: 'Processor', value: 'Crystal Processor 4K' },
      { label: 'Smart Integration', value: 'Samsung Smart Things, AirPlay 2' },
      { label: 'Audio', value: 'Object Tracking Sound Lite (OTS)' }
    ],
    isDealOfTheDay: true
  },
  {
    id: 'royal-24-digital-tv',
    title: 'Royal 24" Digital LED TV (RY2400)',
    category: 'tvs',
    priceKes: 7999,
    originalPriceKes: 10500,
    condition: 'Brand New',
    warranty: '12 Months Local Warranty',
    rating: 4.4,
    reviewsCount: 11,
    images: [
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&q=80'
    ],
    description: 'Compact, efficient and highly reliable. Built in free-to-air digital decoder means you watch direct local channels without an external decoder. Very low power consumption, ideal for solar setup too!',
    inStock: true,
    quantityLeft: 12,
    tags: ['Digital TV', 'Low Voltage Energy', 'Budget Option'],
    keySpecs: [
      { label: 'Screen Size', value: '24 Inches' },
      { label: 'Decoder Type', value: 'DVB-T2 / S2 Free To Air' },
      { label: 'Resolution', value: 'HD Ready Display' },
      { label: 'Inputs', value: '1x HDMI, 1x USB (Power & Media Player)' },
      { label: 'Warranty', value: '1 Year Brand Certified' },
      { label: 'Power Consumption', value: 'Under 35 Watts' }
    ]
  },
  {
    id: 'sony-bravia-32-smart-tv',
    title: 'Sony Bravia 32" W830K Smart LED TV',
    category: 'tvs',
    priceKes: 24500,
    originalPriceKes: 29000,
    condition: 'Brand New',
    warranty: '12 Months Shop Warranty',
    rating: 4.7,
    reviewsCount: 23,
    images: [
      'https://images.unsplash.com/photo-1552975084-6e027cd345c2?w=800&q=80',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80'
    ],
    description: 'Crafted with legendary Sony clarity, HDR processing, and Clear Phase Audio. Android smart operating system loaded with Google Assistant, Chromecast, YouTube, and top entertainment panels.',
    inStock: true,
    quantityLeft: 4,
    tags: ['Sony Engine', 'Google TV', 'Premium Color Spectrum'],
    keySpecs: [
      { label: 'Screen Size', value: '32 Inches' },
      { label: 'Resolution', value: 'HD HDR Compatible' },
      { label: 'Image Engine', value: 'X-Reality PRO Resolution Upscaler' },
      { label: 'OS', value: 'Google/Android Smart Interface' },
      { label: 'Sound Clarity', value: 'Clear Phase Audio 20W' },
      { label: 'Protection', value: 'X-Protection PRO (Anti-Lightning/Humidity)' }
    ]
  },
  {
    id: 'sayona-21-subwoofer',
    title: 'Sayona 2.1 Channel Subwoofer Sound System',
    category: 'woofers',
    priceKes: 5999,
    originalPriceKes: 8000,
    condition: 'Brand New',
    warranty: '12 Months Warranty',
    rating: 4.6,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80'
    ],
    description: 'Transform your audio entertainment. Features strong, deep bass and crystal-clear high frequencies. Integrated Bluetooth, USB ports, FM radio tuner, SD card support, and full interactive remote.',
    inStock: true,
    quantityLeft: 10,
    tags: ['Super Heavy Bass', 'Bluetooth 5.0', 'Sayona Original'],
    keySpecs: [
      { label: 'Configuration', value: '2.1 Surround (1 Subwoofer + 2 Satellites)' },
      { label: 'Power Output', value: '8,000W PMPO (60W RMS)' },
      { label: 'Bluetooth Distance', value: 'Up to 10 Meters Range' },
      { label: 'Media InputPorts', value: 'Bluetooth, USB, SD Card, RCA Aux' },
      { label: 'Control Panel', value: 'Front LED display, Master Volume knobs' },
      { label: 'Frequencies', value: '38Hz - 20KHz response' }
    ]
  },
  {
    id: 'von-31-subwoofer-ves0303fs',
    title: 'Von 3.1 Channel Subwoofer Sound System (VES0303FS)',
    category: 'woofers',
    priceKes: 10999,
    originalPriceKes: 13500,
    condition: 'Brand New',
    warranty: '12 Months Manufacturer Warranty',
    rating: 4.7,
    reviewsCount: 16,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80'
    ],
    description: 'Unmatched fidelity and bass control. Features a dedicated center speaker driver for super clear dialogues and lyrics. Elegant wooden cabinets prevent resonance and amplify sound rich qualities.',
    inStock: true,
    quantityLeft: 6,
    tags: ['Von Engineering', 'Dialogue Enhancer', 'Beautiful Wooden Finish'],
    keySpecs: [
      { label: 'Configuration', value: '3.1 Surround system' },
      { label: 'Total RMS Power', value: '95W RMS Output' },
      { label: 'Cabinet Shell', value: 'Solid Acoustical MDF Wood' },
      { label: 'Feature Pins', value: 'Bluetooth, LED Digital display, Remote, FM' },
      { label: 'Audio In', value: 'Stereo Aux, Optical Input Port' }
    ]
  },
  {
    id: 'sony-51-home-theater',
    title: 'Sony 5.1 Channel Home Theater Surround System',
    category: 'woofers',
    priceKes: 22500,
    originalPriceKes: 27000,
    condition: 'Open Box',
    warranty: '6 Months Local Warranty',
    rating: 4.9,
    reviewsCount: 15,
    images: [
      'https://images.unsplash.com/photo-1544605151-5fac6d3e6919?w=800&q=80',
      'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=800&q=80'
    ],
    description: 'Genuine cinema Surround sound at homie. S-Master digital amplifier ensures massive volumes with absolute clarity. Includes center speaker, two front, two rear tallboy satellites, and a powerful sub.',
    inStock: true,
    quantityLeft: 3,
    tags: ['Cinema Surround', 'Sony Audio Master', 'Ultimate Bass'],
    keySpecs: [
      { label: 'Configuration', value: '5.1 Channel True Surround' },
      { label: 'Power RMS', value: '300W RMS Total output' },
      { label: 'Amplifier', value: 'S-Master Digital 24-bit' },
      { label: 'HDMI Support', value: 'HDMI ARC out (for simple single TV link)' },
      { label: 'Format Decode', value: 'Dolby Digital, Pro Logic II' }
    ]
  },
  {
    id: 'vitron-21-subwoofer-v527',
    title: 'Vitron 2.1 Bluetooth Subwoofer (V-527)',
    category: 'woofers',
    priceKes: 4800,
    originalPriceKes: 6500,
    condition: 'Brand New',
    warranty: '12 Months Warranty',
    rating: 4.5,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80'
    ],
    description: 'The absolute best-selling budget subwoofer in Ruiru and Nairobi. Compact form-factor with massive room-filling capabilities. Fully Bluetooth enabled, plug-play USB, and reliable remote control.',
    inStock: true,
    quantityLeft: 15,
    tags: ['Affordable King', 'Verified Plug Best Sell', 'Compact Power'],
    keySpecs: [
      { label: 'Configuration', value: '2.1 Multimedia Speaker System' },
      { label: 'Power output', value: '3,000W PMPO (35W RMS)' },
      { label: 'Inputs Supported', value: 'Bluetooth, FM Radio, SD, USB disk' },
      { label: 'Equalizer Presets', value: 'Jazz, Rock, Classic, Normal' },
      { label: 'Special Function', value: 'Low bass crossover, high-pitched satellites' }
    ]
  },
  {
    id: 'amaze-31-subwoofer-rgb',
    title: 'Amaze 3.1 Multimedia Heavy Woofer System',
    category: 'woofers',
    priceKes: 8999,
    originalPriceKes: 11500,
    condition: 'Brand New',
    warranty: '12 Months Warranty',
    rating: 4.6,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80'
    ],
    description: 'Set the perfect vibe with active sound-responsive pulse RGB LED lights. Built for youth and gaming setups, it delivers ultra-low frequency bass that gets your heartbeat going.',
    inStock: true,
    quantityLeft: 7,
    tags: ['Active Lights', 'RGB Party Vibes', 'Loud & Clear'],
    keySpecs: [
      { label: 'Configuration', value: '3.1 Media center speakers' },
      { label: 'Power output', value: '75W RMS High-Fidelity' },
      { label: 'Lighting', value: 'Active Sound-pulse LED RGB Front panel' },
      { label: 'Karaoke function', value: 'Dual Mic Ports with Echo control' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Charles Njuguna (SAM DEALS Rep)',
    location: 'Ruiru, Bypass',
    text: 'These guys are the real plug! Bought a refurbished ThinkPad X1 Carbon for my tech workspace and it runs like brand new. They brought it straight to Quickmart Bypass, checked everything together before making the M-Pesa transfer. 100% genuine.',
    rating: 5,
    date: '2 weeks ago',
    deviceBought: 'ThinkPad X1 Carbon',
    verified: true
  },
  {
    id: 't2',
    name: 'Mercy Aoko',
    location: 'Nairobi, CBD',
    text: 'Ordered the iPhone 13 Pro Max with 92% battery health. Was very scared buying online, but they offered pay-on-delivery. Hand-delivered by courier in CBD, I ran Face ID and storage checks, the camera is insanely crisp. God bless your honesty!',
    rating: 5,
    date: '1 month ago',
    deviceBought: 'iPhone 13 Pro Max',
    verified: true
  },
  {
    id: 't3',
    name: 'Kamau Techie',
    location: 'Juja, JKUAT',
    text: 'Trade-in process is seamless. Brought my old HP EliteBook G5, estimated its value on their site, topped up 12k on top on WhatsApp, and picked up a high-spec Core/i7 EliteBook G8. Deal of a lifetime.',
    rating: 5,
    date: '3 weeks ago',
    deviceBought: 'HP EliteBook 840 G8',
    verified: true
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'laptops-under-40k',
    title: 'Top 5 Best Refurbished Laptops Under 40,000 KES in Kenya (2026)',
    excerpt: 'Looking for a powerful laptop for development, school, or business on a tight budget? Check out our tested picks that punch far above their prices.',
    category: 'Laptops Buying Guide',
    date: 'May 15, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
    content: `Buying a laptop in Kenya shouldn't put you into massive debt. If you are a student at JKUAT or Kenyatta University, or starting a remote workforce business, you need high speed without the heavy pricing.

### The Refurbished Secret
In Kenya, brand new laptops under 40K are often loaded with slow Celeron processors, weak plastic bodies, and slow hard disk drives (HDD) that will lag in a week.
By choosing commercial-grade refurbished laptops like the HP EliteBook or Lenovo ThinkPad, you get:
1. **Core i5 Processors** with rapid speed.
2. **Solid State Drives (SSD)** that boot Windows in 10 seconds.
3. **Aluminum/Carbon alloy shells** built to military durability standards.

### Our Recommended Models:
* **HP EliteBook 840 G6:** Retails at roughly 34,999 KES. Boasts Intel Core i5 8th Gen, 8GB RAM, and a beautiful sleek silver brushed chassis.
* **Lenovo ThinkPad T490:** Sells around 38,000 KES. Built for robust coders. Heavy-duty keyboard, incredible thermals, and easily repairable.

**Verdict:** Skip low-spec brand-new entry laptops. Focus on high-end commercial refurbished machines for the best speed/price ratio!`,
    relatedProductIds: ['hp-elitebook-840-g6']
  },
  {
    id: 'refurbished-vs-new-iphone',
    title: '7 Crucial Things to Check Before Buying a Refurbished iPhone on Nairobi Streets',
    excerpt: 'Do not get scammed with a fake screen, bypassed iCloud, or a cloned serial number. Read this before paying a single shilling.',
    category: 'Apple & Security',
    date: 'May 24, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    content: `Nairobi and Ruiru streets are filled with "iPhone Plugs," but not all are genuine. Many sell refurbished phones with replaced cheap screens or bad aftermarket software. Here is the ultimate check checklist from SAM DEALS team:

### 1. Battery Health Degradation
Ensure it says **"Maximum Capacity"** and is original. If it says "Unknown Part," the battery was replaced with a cheap non-certified counterfeit. Aim for 85%+ or genuine certified replacements.

### 2. Apple Face ID & TrueTone Status
Go to Settings -> Display. If TrueTone toggle is missing, the screen has been replaced with a cheap third-party LCD display instead of an original OLED. Check Face ID setup to confirm infrared sensors are undamaged.

### 3. iCloud Bypass Check
Always hard reset the phone in front of the seller before paying. Some locked phones run custom scripts that hide the original locked iCloud. Doing a **Factory Reset** forces the device to verify with Apple Servers. If bypassed, it will lock immediately.

### 4. 3uTools Check
Request the seller to connect the device to 3uTools utility on PC. It instantly lists all parts changed (Front camera, back glass, battery) and issues a score. At SAM DEALS, we verify every phone on 3uTools and provide a full checklist printout to our buyers.

**Our Pledge:** We do the heavy work by pre-testing elements using certified diagnostic software so you can buy with total peace of mind. Check our catalog of 100% verified iPhones.`,
    relatedProductIds: ['iphone-13-pro-max', 'samsung-s22-ultra']
  }
];

export const TRADE_IN_DEVICES = [
  { brand: 'Apple', model: 'iPhone 11 (64GB/128GB)', potentialValueKes: 25000 },
  { brand: 'Apple', model: 'iPhone 12 Pro (128GB)', potentialValueKes: 48000 },
  { brand: 'Apple', model: 'iPhone XR (128GB)', potentialValueKes: 20000 },
  { brand: 'Samsung', model: 'Galaxy S21 Ultra', potentialValueKes: 40000 },
  { brand: 'Samsung', model: 'Galaxy S20 Plus', potentialValueKes: 24000 },
  { brand: 'Lenovo', model: 'ThinkPad Core i5 (8th Gen)', potentialValueKes: 15000 },
  { brand: 'HP', model: 'EliteBook Core i5 (8th Gen)', potentialValueKes: 16000 }
];

const rawNumber = ((import.meta as any).env?.VITE_WHATSAPP_NUMBER || '254740334579').replace(/[^0-9]/g, '');
export const WHATSAPP_NUMBER = rawNumber.startsWith('0') ? '254' + rawNumber.substring(1) : rawNumber;

