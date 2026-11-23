/* ==========================================================================
   BUNORA — Premium Burger Experience
   Complete Frontend Application (Vanilla JS + LocalStorage)
   ========================================================================== */

(() => {
        'use strict';

        /* ------------------------------------------------------------------------
           1. STORAGE KEYS & SAFE LOCALSTORAGE HELPERS
           ------------------------------------------------------------------------ */
        const STORAGE_KEYS = {
            LANG: 'bunora_lang',
            CART: 'bunora_cart',
            ORDERS: 'bunora_orders'
        };

        function loadFromStorage(key, fallback) {
            try {
                const raw = localStorage.getItem(key);
                return raw ? JSON.parse(raw) : fallback;
            } catch (err) {
                console.warn(`LocalStorage read error for "${key}":`, err);
                return fallback;
            }
        }

        function saveToStorage(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (err) {
                console.warn(`LocalStorage write error for "${key}":`, err);
            }
        }

        /* ------------------------------------------------------------------------
           2. BILINGUAL TRANSLATIONS (ARABIC & TURKISH)
           ------------------------------------------------------------------------ */
        const TRANSLATIONS = {
            tr: {
                tagline: 'Premium Burger Deneyimi',
                navWelcome: 'Ana Sayfa',
                navMenu: 'Menü',
                navOrders: 'Siparişlerim',
                cartLabel: 'Sepet',
                heroBadge: 'BUNORA • Premium Burger Experience',
                heroTitle: 'Ateşin Ustalarıyla Gerçek Burger Sanatını Keşfedin',
                heroSubtitle: '%100 dinlendirilmiş dana eti, günlük taze pişen artizan brioche ekmeği ve imza soslarımızla hazırlanan benzersiz bir lezzet deneyimi.',
                heroCta: 'Menüyü Keşfet',
                heroSecondaryCta: 'Siparişlerim',
                highlight1Title: '%100 Dinlendirilmiş Et',
                highlight1Sub: 'Katkısız & Günlük Taze',
                highlight2Title: 'Artizan Brioche',
                highlight2Sub: 'Her Sabah Fırından',
                highlight3Title: 'Özel İmza Soslar',
                highlight3Sub: 'Şefin Reçetesi',
                chefChoice: 'Şefin Seçimi',
                heroCardName: 'BUNORA Truffle Royale',
                menuEyebrow: 'Özenle Hazırlanan Lezzetler',
                menuTitle: 'BUNORA Menüsü',
                searchPlaceholder: 'Burger, tavuk, patates veya içecek ara...',
                allCategory: 'Tümü',
                resultsCount: '{count} ürün listeleniyor',
                customizeAdd: 'Seç ve Ekle',
                noResultsTitle: 'Aramanızla eşleşen ürün bulunamadı',
                noResultsSub: 'Farklı bir anahtar kelime deneyebilir veya tüm kategorileri görüntüleyebilirsiniz.',
                resetFilters: 'Filtreleri Sıfırla',
                selectSize: 'Boyut Seçimi',
                requiredLabel: 'Seçenek',
                freeAddons: 'Ücretsiz Ekstralar',
                freeLabel: 'Ücretsiz',
                paidAddons: 'Özel Ekstra Malzemeler',
                optionalLabel: 'İsteğe Bağlı',
                addToCart: 'Sepete Ekle',
                yourCart: 'Sepetiniz',
                emptyCartTitle: 'Sepetiniz şu an boş',
                emptyCartSub: 'Lezzetli burgerlerimizi keşfetmek için menüye göz atın.',
                totalAmount: 'Toplam Tutar',
                checkoutBtn: 'Siparişi Tamamla',
                demoCheckoutBadge: 'Demo Sipariş Onayı',
                checkoutTitle: 'Teslimat Yöntemi ve Bilgiler',
                methodDelivery: 'Adrese Teslimat',
                methodDeliverySub: 'Kapınıza kadar sıcak teslimat',
                methodPickup: 'Restorandan Gel-Al',
                methodPickupSub: 'Şubemizden hızlı teslim alın',
                demoFormHint: 'Bu bir tanıtım projesidir. Alanları doldurmadan da doğrudan siparişi tamamlayabilirsiniz.',
                fieldCustomerName: 'Müşteri Adı',
                placeholderName: 'Örn: Ahmet Yılmaz',
                fieldPhone: 'Telefon Numarası',
                placeholderPhone: '+90 555 000 00 00',
                fieldAddress: 'Teslimat Adresi',
                placeholderAddress: 'Mahalle, sokak, bina no...',
                itemsCountLabel: 'Ürün Adedi',
                payableTotal: 'Ödenecek Toplam',
                confirmOrderBtn: 'Siparişi Onayla',
                orderSuccessBadge: 'Sipariş Alındı',
                orderSuccessTitle: 'Siparişiniz Başarıyla Oluşturuldu!',
                orderSuccessMessage: 'BUNORA mutfağı siparişinizi hazırlamaya başladı. Sipariş detaylarınız tarayıcınıza kaydedildi.',
                orderNumberLabel: 'Sipariş Numarası',
                deliveryMethodLabel: 'Teslimat Yöntemi',
                orderDateLabel: 'Tarih ve Saat',
                viewPreviousOrdersBtn: 'Siparişlerimi Görüntüle',
                backToMenuBtn: 'Menüye Dön',
                ordersEyebrow: 'Yerel Sipariş Geçmişi',
                ordersSectionTitle: 'Siparişlerim',
                noOrdersTitle: 'Henüz kayıtlı bir siparişiniz yok',
                noOrdersSub: 'Menüden dilediğiniz lezzetleri sepetinize ekleyerek ilk siparişinizi oluşturabilirsiniz.',
                browseMenuBtn: 'Menüye Git',
                orderStatusDemo: 'Hazırlanıyor (Demo Sipariş)',
                viewDetails: 'Detayları Gör',
                hideDetails: 'Detayları Gizle',
                guestCustomer: 'Misafir Müşteri',
                addedToast: '"{name}" sepete eklendi!',
                footerDesc: 'Premium Burger Experience — Artizan tarifler, taze malzemeler ve modern gastronomi anlayışı.',
                footerDemoNote: 'BUNORA Demonstration Showcase • Tüm siparişler tarayıcınızda yerel olarak saklanır.'
            },
            ar: {
                tagline: 'تجربة البرغر الفاخرة',
                navWelcome: 'الرئيسية',
                navMenu: 'القائمة',
                navOrders: 'طلباتي السابقة',
                cartLabel: 'السلة',
                heroBadge: 'BUNORA • تجربة البرغر الفاخرة',
                heroTitle: 'اكتشف فن البرغر الحقيقي على أصوله',
                heroSubtitle: 'لحم بقري معتّق ١٠٠٪، خبز بريوش حرفي يُخبز طازجاً كل صباح، وصلصاتنا الخاصة المحضّرة بعناية لتمنحك تجربة لا تُنسى.',
                heroCta: 'ابدأ الآن',
                heroSecondaryCta: 'طلباتي السابقة',
                highlight1Title: 'لحم بقري معتّق ١٠٠٪',
                highlight1Sub: 'طازج يومياً بدون إضافات',
                highlight2Title: 'خبز بريوش حرفي',
                highlight2Sub: 'مخبوز طازجاً كل صباح',
                highlight3Title: 'صلصات الشيف الخاصة',
                highlight3Sub: 'وصفات حصرية مبتكرة',
                chefChoice: 'اختيار الشيف',
                heroCardName: 'بونورا ترافل رويال',
                menuEyebrow: 'نكهات محضّرة بشغف',
                menuTitle: 'قائمة طعام BUNORA',
                searchPlaceholder: 'ابحث عن برغر، دجاج، بطاطس أو مشروبات...',
                allCategory: 'الكل',
                resultsCount: 'يتم عرض {count} صنف',
                customizeAdd: 'اختر وأضف',
                noResultsTitle: 'لم يتم العثور على أصناف مطابقة لبحثك',
                noResultsSub: 'جرّب البحث بكلمة أخرى أو استعرض جميع الأقسام.',
                resetFilters: 'إعادة ضبط البحث',
                selectSize: 'اختر الحجم',
                requiredLabel: 'خيار',
                freeAddons: 'إضافات مجانية',
                freeLabel: 'مجاناً',
                paidAddons: 'إضافات مميزة',
                optionalLabel: 'اختياري',
                addToCart: 'أضف إلى السلة',
                yourCart: 'سلة التسوق',
                emptyCartTitle: 'سلة التسوق فارغة حالياً',
                emptyCartSub: 'تصفح قائمتنا واختر وجبتك المفضلة.',
                totalAmount: 'المجموع الكلي',
                checkoutBtn: 'إتمام الطلب',
                demoCheckoutBadge: 'تأكيد طلب تجريبي',
                checkoutTitle: 'طريقة الاستلام ومعلومات الطلب',
                methodDelivery: 'توصيل منزلي',
                methodDeliverySub: 'توصيل ساخن إلى باب منزلك',
                methodPickup: 'استلام من المطعم',
                methodPickupSub: 'استلم طلبك مباشرة من الفرع',
                demoFormHint: 'هذا موقع عرض تجريبي. يمكنك إتمام الطلب مباشرة حتى دون تعبئة الحقول.',
                fieldCustomerName: 'اسم العميل  ',
                placeholderName: 'مثال: كريم المنصور',
                fieldPhone: 'رقم الهاتف ',
                placeholderPhone: '+90 555 000 00 00',
                fieldAddress: 'عنوان التوصيل ',
                placeholderAddress: 'الحي، الشارع، رقم المبنى...',
                itemsCountLabel: 'عدد الأصناف',
                payableTotal: 'الإجمالي النهائي',
                confirmOrderBtn: 'تأكيد الطلب',
                orderSuccessBadge: 'تم استلام الطلب',
                orderSuccessTitle: 'تم تأكيد طلبك بنجاح!',
                orderSuccessMessage: 'بدأ مطبخ BUNORA بتحضير طلبك. تم حفظ تفاصيل الطلب في متصفحك للرجوع إليها في أي وقت.',
                orderNumberLabel: 'رقم الطلب',
                deliveryMethodLabel: 'طريقة الاستلام',
                orderDateLabel: 'التاريخ والوقت',
                viewPreviousOrdersBtn: 'عرض طلباتي السابقة',
                backToMenuBtn: 'العودة إلى القائمة',
                ordersEyebrow: 'سجل الطلبات المحفوظة محلياً',
                ordersSectionTitle: 'طلباتي السابقة',
                noOrdersTitle: 'لا توجد طلبات سابقة محفوظة حتى الآن',
                noOrdersSub: 'أضف أطباقك المفضلة من القائمة إلى السلة لإنشاء أول طلب لك.',
                browseMenuBtn: 'استعرض القائمة',
                orderStatusDemo: 'قيد التحضير (طلب تجريبي)',
                viewDetails: 'عرض التفاصيل',
                hideDetails: 'إخفاء التفاصيل',
                guestCustomer: 'عميل زائر',
                addedToast: 'تمت إضافة "{name}" إلى السلة!',
                footerDesc: 'تجربة البرغر الفاخرة — وصفات حرفية ومكونات طازجة بمعايير استثنائية.',
                footerDemoNote: 'موقع عرض تجريبي لعلامة BUNORA • جميع الطلبات محفوظة محلياً في متصفحك.'
            }
        };

        /* ------------------------------------------------------------------------
           3. EXACT FOOD CATEGORIES (ARABIC & TURKISH)
           ------------------------------------------------------------------------ */
        const CATEGORIES = [
            { id: 'all', name: { ar: 'الكل', tr: 'Tümü' } },
            { id: 'burgers', name: { ar: 'البرغر', tr: 'Burgerler' } },
            { id: 'chicken', name: { ar: 'الدجاج', tr: 'Tavuklar' } },
            { id: 'appetizers', name: { ar: 'المقبلات', tr: 'Atıştırmalıklar' } },
            { id: 'fries', name: { ar: 'البطاطس', tr: 'Patates' } },
            { id: 'combos', name: { ar: 'الوجبات الكاملة', tr: 'Menüler' } },
            { id: 'drinks', name: { ar: 'المشروبات', tr: 'İçecekler' } },
            { id: 'desserts', name: { ar: 'الحلويات', tr: 'Tatlılar' } },
            { id: 'sauces', name: { ar: 'الصلصات والإضافات', tr: 'Soslar ve Ekstralar' } }
        ];

        /* ------------------------------------------------------------------------
           4. MENU PRODUCTS DATA (EASY TO EDIT, ADD, OR REMOVE)
           ------------------------------------------------------------------------ */
        const COMMON_BURGER_SIZES = [
            { id: 'single', name: { ar: 'سينغل (١٦٠ غرام)', tr: 'Single (160g)' }, priceDelta: 0 },
            { id: 'double', name: { ar: 'دبل (٣٢٠ غرام)', tr: 'Double (320g)' }, priceDelta: 95 }
        ];

        const COMMON_FREE_ADDONS = [
            { id: 'pickles', name: { ar: 'مخلل خيار مقرمش', tr: 'Kıtır Salatalık Turşusu' } },
            { id: 'caramel-onion', name: { ar: 'بصل مكرمل', tr: 'Karamelize Soğan' } },
            { id: 'jalapeno', name: { ar: 'فلفل هالبينو', tr: 'Jalapeno Biberi' } },
            { id: 'lettuce-tomato', name: { ar: 'خس آيسبيرغ وطماطم', tr: 'Iceberg Marul & Domates' } }
        ];

        const COMMON_PAID_ADDONS = [
            { id: 'cheddar', name: { ar: 'شريحة جبن شيدر معتّق', tr: 'Ekstra Olgunlaştırılmış Cheddar' }, price: 35 },
            { id: 'beef-bacon', name: { ar: 'شرائح بيكون بقري مدخن', tr: 'Füme Dana Bacon' }, price: 55 },
            { id: 'truffle-aioli', name: { ar: 'صلصة الكمأة السوداء', tr: 'Trüflü Aioli Sos' }, price: 30 },
            { id: 'onion-rings-in', name: { ar: 'حلقات بصل مقرمشة داخل البرغر', tr: 'Çıtır Soğan Halkası' }, price: 35 }
        ];

        const PRODUCTS = [
            // --- BURGERS (البرغر / Burgerler) ---
            {
                id: 'burger-truffle-royale',
                category: 'burgers',
                name: { ar: 'بونورا ترافل رويال', tr: 'BUNORA Truffle Royale' },
                description: {
                    ar: 'شريحة لحم بقري معتّق مشوية على اللهب، جبن إيمنتال سويسري، فطر سوتيه بالزبدة ومايونيز الكمأة السوداء في خبز بريوش محمّص.',
                    tr: 'Alevde ızgara dinlendirilmiş dana köftesi, İsviçre Emmental peyniri, tereyağlı sote mantar ve siyah trüflü aioli.'
                },
                price: 365,
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
                sizes: COMMON_BURGER_SIZES,
                freeAddons: COMMON_FREE_ADDONS,
                paidAddons: COMMON_PAID_ADDONS
            },
            {
                id: 'burger-classic-smash',
                category: 'burgers',
                name: { ar: 'بونورا كلاسيك سماش', tr: 'BUNORA Classic Smash' },
                description: {
                    ar: 'لحم بقري سماش بحواف مقرمشة، جبن شيدر أحمر ذائب، بصل مكرمل، مخلل منزلي وصلصة بونورا السرية.',
                    tr: 'Çıtır kenarlı dana smash köfte, eritilmiş kırmızı cheddar, karamelize soğan, ev yapımı turşu ve BUNORA imza sos.'
                },
                price: 315,
                image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
                sizes: COMMON_BURGER_SIZES,
                freeAddons: COMMON_FREE_ADDONS,
                paidAddons: COMMON_PAID_ADDONS
            },
            {
                id: 'burger-smoky-bbq',
                category: 'burgers',
                name: { ar: 'سموكي باربكيو بيكون', tr: 'Smoky BBQ Bacon Burger' },
                description: {
                    ar: 'برغر بقري مدخن مع شرائح بيكون بقري مقرمش، حلقات بصل ذهبية، شيدر مدخن وصلصة باربكيو بالعسل.',
                    tr: 'Füme dana bacon, altın çıtır soğan halkaları, tütsülenmiş cheddar ve ballı isli barbekü sos.'
                },
                price: 355,
                image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
                sizes: COMMON_BURGER_SIZES,
                freeAddons: COMMON_FREE_ADDONS,
                paidAddons: COMMON_PAID_ADDONS
            },
            {
                id: 'burger-swiss-mushroom',
                category: 'burgers',
                name: { ar: 'مشروم سويس ميلت', tr: 'Mushroom Swiss Melt' },
                description: {
                    ar: 'لحم بقري طازج مغطى بمزيج الفطر البري المحمّص بالزعتر وجبن سويسري كريمي غني.',
                    tr: 'Taze kekik ile sotelenmiş yabani mantar karışımı ve eritilmiş İsviçre peyniri ile hazırlanan özel burger.'
                },
                price: 340,
                image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
                sizes: COMMON_BURGER_SIZES,
                freeAddons: COMMON_FREE_ADDONS,
                paidAddons: COMMON_PAID_ADDONS
            },

            // --- CHICKEN (الدجاج / Tavuklar) ---
            {
                id: 'chicken-crispy-brioche',
                category: 'chicken',
                name: { ar: 'كريسبي تشيكن بريوش', tr: 'Crispy Brioche Chicken' },
                description: {
                    ar: 'صدر دجاج متبّل باللبن الرائب ومقلي حتى القرمشة المثالية، سلطة كولسلو كريمية وصلصة خردل بالعسل.',
                    tr: 'Ayran marinasyonlu çıtır tavuk göğsü, kremalı coleslaw salatası ve ballı hardal sos.'
                },
                price: 285,
                image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
                sizes: [
                    { id: 'regular', name: { ar: 'عادي', tr: 'Standart' }, priceDelta: 0 },
                    { id: 'xl', name: { ar: 'حجم كبير XL', tr: 'XL Büyük Boy' }, priceDelta: 65 }
                ],
                freeAddons: COMMON_FREE_ADDONS,
                paidAddons: COMMON_PAID_ADDONS
            },
            {
                id: 'chicken-nashville-hot',
                category: 'chicken',
                name: { ar: 'ناشفيل هوت تشيكن', tr: 'Nashville Hot Chicken' },
                description: {
                    ar: 'فيليه دجاج مقرمش مغطى بزيت الفلفل الحار المدخن، مخلل شبت وصلصة رانش باردة لموازنة النكهة.',
                    tr: 'İsli acı biber yağı ile sırlanmış çıtır tavuk fileto, dereotlu turşu ve serinletici ranch sos.'
                },
                price: 295,
                image: 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?auto=format&fit=crop&w=800&q=80',
                sizes: [
                    { id: 'mild', name: { ar: 'حرارة متوسطة', tr: 'Orta Acı' }, priceDelta: 0 },
                    { id: 'fiery', name: { ar: 'حار جداً', tr: 'Ekstra Acı' }, priceDelta: 0 }
                ],
                freeAddons: COMMON_FREE_ADDONS,
                paidAddons: COMMON_PAID_ADDONS
            },
            {
                id: 'chicken-buttermilk-tenders',
                category: 'chicken',
                name: { ar: 'تندرز الدجاج المقرمش (٦ قطع)', tr: 'Buttermilk Crispy Tenders (6 Adet)' },
                description: {
                    ar: 'ست قطع من فيليه الدجاج الطري بتتبيلة الأعشاب المقرمشة تقدم مع صلصة الثوم المشوي.',
                    tr: 'Özel baharat karışımıyla kaplanmış 6 adet çıtır tavuk bonfile, köz sarımsaklı sos eşliğinde.'
                },
                price: 245,
                image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [{ id: 'lemon-wedge', name: { ar: 'شرائح ليمون طازج', tr: 'Taze Limon Dilimi' } }],
                paidAddons: [
                    { id: 'extra-dip-bbq', name: { ar: 'صلصة باربكيو مدخنة', tr: 'İsli BBQ Sos' }, price: 25 },
                    { id: 'extra-dip-ranch', name: { ar: 'صلصة رانش بالأعشاب', tr: 'Otlu Ranch Sos' }, price: 25 }
                ]
            },

            // --- APPETIZERS (المقبلات / Atıştırmalıklar) ---
            {
                id: 'app-onion-rings',
                category: 'appetizers',
                name: { ar: 'حلقات البصل الذهبية (٨ قطع)', tr: 'Altın Soğan Halkaları (8 Adet)' },
                description: {
                    ar: 'حلقات بصل طازجة مغلفة بعجينة مقرمشة خفيفة تقدم ساخنة مع صلصة كوكتيل مدخنة.',
                    tr: 'Hafif çıtır kaplamalı taze soğan halkaları, tütsülenmiş kokteyl sos ile.'
                },
                price: 135,
                image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [],
                paidAddons: [{ id: 'cheddar-cup', name: { ar: 'غموس شيدر دافئ', tr: 'Sıcak Cheddar Sos' }, price: 35 }]
            },
            {
                id: 'app-mozzarella-sticks',
                category: 'appetizers',
                name: { ar: 'أصابع الموزاريلا المقرمشة (٦ قطع)', tr: 'Çıtır Mozzarella Çubukları (6 Adet)' },
                description: {
                    ar: 'أصابع جبن موزاريلا مطاطية مغطاة بفتات الخبز الإيطالي والأوريغانو مع صلصة مارينارا دافئة.',
                    tr: 'İtalyan baharatlı çıtır kaplamalı mozzarella çubukları, sıcak marinara sos eşliğinde.'
                },
                price: 165,
                image: 'https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [],
                paidAddons: [{ id: 'truffle-cup', name: { ar: 'غموس الكمأة', tr: 'Trüflü Aioli Sos' }, price: 30 }]
            },
            {
                id: 'app-buffalo-wings',
                category: 'appetizers',
                name: { ar: 'أجنحة بافلو المدخنة (٨ قطع)', tr: 'Füme Buffalo Kanatlar (8 Adet)' },
                description: {
                    ar: 'أجنحة دجاج مشوية ومغلفة بصلصة بافلو الغنية بالزبدة مع رشة سمسم وبصل أخضر.',
                    tr: 'Tereyağlı buffalo sos ile harmanlanmış ızgara tavuk kanatları, taze soğan ve susam ile.'
                },
                price: 215,
                image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [{ id: 'celery-sticks', name: { ar: 'أعواد كرفس طازجة', tr: 'Taze Kereviz Sapı' } }],
                paidAddons: [{ id: 'blue-cheese', name: { ar: 'صلصة الجبن الأزرق', tr: 'Rokfor Peynirli Sos' }, price: 30 }]
            },

            // --- FRIES (البطاطس / Patates) ---
            {
                id: 'fries-sea-salt',
                category: 'fries',
                name: { ar: 'بطاطس بونورا المقرمشة بملح البحر', tr: 'Deniz Tuzlu Çıtır Patates' },
                description: {
                    ar: 'بطاطس طازجة مقطعة بقشرها ومقلية مرتين لقرمشة ذهبية مع رشة ملح البحر وإكليل الجبل.',
                    tr: 'Kabuklu kesim, çift kızartma tekniğiyle hazırlanan deniz tuzu ve biberiyeli çıtır patates.'
                },
                price: 115,
                image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
                sizes: [
                    { id: 'regular', name: { ar: 'حجم وسط', tr: 'Orta Boy' }, priceDelta: 0 },
                    { id: 'large', name: { ar: 'حجم كبير', tr: 'Büyük Boy' }, priceDelta: 30 }
                ],
                freeAddons: [{ id: 'cajun-spice', name: { ar: 'بهارات الكاجون', tr: 'Cajun Baharatı' } }],
                paidAddons: [{ id: 'cheddar-drizzle', name: { ar: 'صلصة شيدر ساخنة', tr: 'Sıcak Cheddar Sos' }, price: 35 }]
            },
            {
                id: 'fries-truffle-parmesan',
                category: 'fries',
                name: { ar: 'بطاطس الكمأة وجبن البارميزان', tr: 'Trüflü & Parmesanlı Patates' },
                description: {
                    ar: 'بطاطس ذهبية مقرمشة مع زيت الكمأة السوداء الفاخر، جبن بارميزان مبشور وبقدونس طازج.',
                    tr: 'Siyah trüf yağı, rendelenmiş olgun Parmesan peyniri ve taze maydanoz ile gurme patates.'
                },
                price: 165,
                image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
                sizes: [
                    { id: 'regular', name: { ar: 'حجم وسط', tr: 'Orta Boy' }, priceDelta: 0 },
                    { id: 'large', name: { ar: 'حجم كبير', tr: 'Büyük Boy' }, priceDelta: 35 }
                ],
                freeAddons: [],
                paidAddons: [{ id: 'extra-parmesan', name: { ar: 'بارميزان إضافي', tr: 'Ekstra Parmesan' }, price: 30 }]
            },
            {
                id: 'fries-loaded-cheddar',
                category: 'fries',
                name: { ar: 'بطاطس الشيدر والبيكون المدخن', tr: 'Cheddar & Füme Bacon Patates' },
                description: {
                    ar: 'مغطاة بصلصة جبن الشيدر الكريمية، قطع البيكون البقري المقرمش وفلفل الهالبينو.',
                    tr: 'Kremalı cheddar sos, çıtır füme dana bacon parçaları ve jalapeno dilimleri ile.'
                },
                price: 185,
                image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [{ id: 'no-jalapeno', name: { ar: 'بدون هالبينو', tr: 'Jalapenosuz' } }],
                paidAddons: []
            },

            // --- COMPLETE MEALS (الوجبات الكاملة / Menüler) ---
            {
                id: 'combo-signature-box',
                category: 'combos',
                name: { ar: 'وجبة بونورا سيجنتشر الكاملة', tr: 'BUNORA Signature Menü' },
                description: {
                    ar: 'برغر بونورا كلاسيك سماش + بطاطس بملح البحر + صلصة بونورا الخاصة + مشروب من اختيارك.',
                    tr: 'BUNORA Classic Smash Burger + Deniz Tuzlu Patates + İmza Sos + Seçeceğiniz İçecek.'
                },
                price: 420,
                image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=800&q=80',
                sizes: [
                    { id: 'single-menu', name: { ar: 'وجبة سينغل', tr: 'Single Menü' }, priceDelta: 0 },
                    { id: 'double-menu', name: { ar: 'وجبة دبل', tr: 'Double Menü' }, priceDelta: 90 }
                ],
                freeAddons: [
                    { id: 'drink-cola', name: { ar: 'مشروب: كولا حرفية', tr: 'İçecek: Artizan Kola' } },
                    { id: 'drink-lemonade', name: { ar: 'مشروب: ليموناضة بالنعناع', tr: 'İçecek: Naneli Limonata' } }
                ],
                paidAddons: COMMON_PAID_ADDONS
            },
            {
                id: 'combo-truffle-feast',
                category: 'combos',
                name: { ar: 'وجبة ترافل رويال الفاخرة', tr: 'Truffle Royale Gurme Menü' },
                description: {
                    ar: 'برغر ترافل رويال + بطاطس الكمأة والبارميزان + حلقات بصل (٤ قطع) + مشروب بارد.',
                    tr: 'BUNORA Truffle Royale + Trüflü Parmesanlı Patates + 4 Adet Soğan Halkası + İçecek.'
                },
                price: 495,
                image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80',
                sizes: [
                    { id: 'single-menu', name: { ar: 'وجبة سينغل', tr: 'Single Menü' }, priceDelta: 0 },
                    { id: 'double-menu', name: { ar: 'وجبة دبل', tr: 'Double Menü' }, priceDelta: 90 }
                ],
                freeAddons: [
                    { id: 'drink-cola', name: { ar: 'مشروب: كولا حرفية', tr: 'İçecek: Artizan Kola' } },
                    { id: 'drink-lemonade', name: { ar: 'مشروب: ليموناضة بالنعناع', tr: 'İçecek: Naneli Limonata' } }
                ],
                paidAddons: COMMON_PAID_ADDONS
            },
            {
                id: 'combo-crispy-chicken',
                category: 'combos',
                name: { ar: 'وجبة كريسبي تشيكن المتكاملة', tr: 'Crispy Chicken Tam Menü' },
                description: {
                    ar: 'برغر كريسبي تشيكن بريوش + بطاطس مقرمشة + صلصة رانش بالأعشاب + مشروب بارد.',
                    tr: 'Crispy Brioche Chicken + Çıtır Patates + Otlu Ranch Sos + Seçeceğiniz İçecek.'
                },
                price: 390,
                image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [
                    { id: 'drink-cola', name: { ar: 'مشروب: كولا حرفية', tr: 'İçecek: Artizan Kola' } },
                    { id: 'drink-lemonade', name: { ar: 'مشروب: ليموناضة بالنعناع', tr: 'İçecek: Naneli Limonata' } }
                ],
                paidAddons: COMMON_PAID_ADDONS
            },

            // --- DRINKS (المشروبات / İçecekler) ---
            {
                id: 'drink-mint-lemonade',
                category: 'drinks',
                name: { ar: 'ليموناضة بونورا بالنعناع الطازج', tr: 'Taze Naneli BUNORA Limonata' },
                description: {
                    ar: 'عصير ليمون طازج مع أوراق النعناع الخضراء ولمسة زهر البرتقال المنعشة.',
                    tr: 'Taze sıkılmış limon suyu, bahçe nanesi yaprakları ve ferahlatıcı narenciye dokunuşu.'
                },
                price: 85,
                image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
                sizes: [
                    { id: 'medium', name: { ar: 'وسط (٣٣٠ مل)', tr: 'Orta (330ml)' }, priceDelta: 0 },
                    { id: 'large', name: { ar: 'كبير (٥٠٠ مل)', tr: 'Büyük (500ml)' }, priceDelta: 20 }
                ],
                freeAddons: [{ id: 'extra-ice', name: { ar: 'ثلج إضافي', tr: 'Ekstra Buz' } }],
                paidAddons: []
            },
            {
                id: 'drink-craft-cola',
                category: 'drinks',
                name: { ar: 'كولا حرفية مثلجة', tr: 'Buz Gibi Artizan Kola' },
                description: {
                    ar: 'مشروب غازي منعش يقدم مثلجاً مع شريحة ليمون طازجة.',
                    tr: 'Taze limon dilimi eşliğinde buz gibi servis edilen ferahlatıcı içecek.'
                },
                price: 65,
                image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
                sizes: [
                    { id: 'classic', name: { ar: 'كلاسيك', tr: 'Klasik' }, priceDelta: 0 },
                    { id: 'zero', name: { ar: 'بدون سكر', tr: 'Şekersiz (Zero)' }, priceDelta: 0 }
                ],
                freeAddons: [],
                paidAddons: []
            },
            {
                id: 'drink-caramel-shake',
                category: 'drinks',
                name: { ar: 'ميلك شيك الكراميل المملح والفانيليا', tr: 'Tuzlu Karamelli Vanilya Shake' },
                description: {
                    ar: 'آيس كريم فانيليا مدغشقر مخفوق مع صلصة الكراميل المملح وكريمة مخفوقة.',
                    tr: 'Madagaskar vanilyalı dondurma, ev yapımı tuzlu karamel sos ve taze krema ile.'
                },
                price: 135,
                image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [{ id: 'no-whip', name: { ar: 'بدون كريمة مخفوقة', tr: 'Kremasız' } }],
                paidAddons: []
            },

            // --- DESSERTS (الحلويات / Tatlılar) ---
            {
                id: 'dessert-warm-brownie',
                category: 'desserts',
                name: { ar: 'براوني الشوكولاتة الدافئ مع الجيلاتو', tr: 'Sıcak Çikolatalı Brownie & Gelato' },
                description: {
                    ar: 'براوني شوكولاتة بلجيكية داكنة يقدم دافئاً مع كرة آيس كريم فانيليا وصوص شوكولاتة.',
                    tr: 'Belçika bitter çikolatalı sıcak brownie, bir top vanilyalı gelato ve çikolata sos eşliğinde.'
                },
                price: 165,
                image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [],
                paidAddons: [{ id: 'extra-gelato', name: { ar: 'كرة جيلاتو إضافية', tr: 'Ekstra Top Gelato' }, price: 40 }]
            },
            {
                id: 'dessert-san-sebastian',
                category: 'desserts',
                name: { ar: 'تشيز كيك سان سيباستيان', tr: 'San Sebastian Cheesecake' },
                description: {
                    ar: 'تشيز كيك كريمي مخبوز على الطريقة الإسبانية يقدم مع صلصة الشوكولاتة البلجيكية الدافئة.',
                    tr: 'Akışkan kıvamlı özel San Sebastian cheesecake, sıcak Belçika çikolatası sosu ile.'
                },
                price: 175,
                image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [],
                paidAddons: [{ id: 'pistachio-crumble', name: { ar: 'فستق عنتابي مجروش', tr: 'Antep Fıstığı Parçacıkları' }, price: 35 }]
            },
            {
                id: 'dessert-churros',
                category: 'desserts',
                name: { ar: 'تشوروز مقرمش بالقرفة والشوكولاتة', tr: 'Tarçınlı Çıtır Churros' },
                description: {
                    ar: 'أصابع تشوروز ذهبية مغطاة بسكر القرفة تقدم مع غموس الشوكولاتة الداكنة.',
                    tr: 'Tarçınlı şekerle kaplanmış sıcak çıtır churros, bitter çikolata dip sos ile.'
                },
                price: 145,
                image: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [],
                paidAddons: []
            },

            // --- SAUCES & EXTRAS (الصلصات والإضافات / Soslar ve Ekstralar) ---
            {
                id: 'sauce-bunora-signature',
                category: 'sauces',
                name: { ar: 'صلصة بونورا السرية المدخنة', tr: 'BUNORA İmza Tütsülenmiş Sos' },
                description: {
                    ar: 'مزيج الشيف الخاص من الأعشاب، البابريكا المدخنة ولمسة مخلل ناعم.',
                    tr: 'Şefin özel baharatları, isli paprika ve ince doğranmış turşu ile hazırlanan imza sos.'
                },
                price: 25,
                image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [],
                paidAddons: []
            },
            {
                id: 'sauce-black-truffle',
                category: 'sauces',
                name: { ar: 'صلصة أيولي الكمأة السوداء', tr: 'Siyah Trüflü Aioli Sos' },
                description: {
                    ar: 'أيولي كريمي غني بنكهة الكمأة السوداء الفاخرة مثالي للبرغر والبطاطس.',
                    tr: 'Burger ve patatesler için mükemmel uyum sağlayan yoğun siyah trüflü kremalı aioli.'
                },
                price: 30,
                image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [],
                paidAddons: []
            },
            {
                id: 'sauce-warm-cheddar',
                category: 'sauces',
                name: { ar: 'غموس جبن الشيدر المعتّق الدافئ', tr: 'Sıcak Olgunlaştırılmış Cheddar Dip' },
                description: {
                    ar: 'صلصة شيدر ساخنة وغنية مثالية للتغميس مع البطاطس والمقبلات.',
                    tr: 'Patates ve atıştırmalıklar için sıcak servis edilen yoğun cheddar peyniri sosu.'
                },
                price: 35,
                image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=800&q=80',
                sizes: [],
                freeAddons: [],
                paidAddons: []
            }
        ];

        /* ------------------------------------------------------------------------
           5. APPLICATION STATE
           ------------------------------------------------------------------------ */
        const savedLang = loadFromStorage(STORAGE_KEYS.LANG, 'tr');
        const state = {
            lang: savedLang === 'ar' ? 'ar' : 'tr',
            activeCategory: 'all',
            searchQuery: '',
            cart: loadFromStorage(STORAGE_KEYS.CART, []),
            orders: loadFromStorage(STORAGE_KEYS.ORDERS, []),
            selectedProduct: null,
            modalState: {
                sizeId: null,
                freeAddonIds: [],
                paidAddonIds: [],
                quantity: 1
            },
            checkoutMethod: 'delivery',
            expandedOrderNumbers: new Set()
        };

        /* ------------------------------------------------------------------------
           6. DOM REFERENCES
           ------------------------------------------------------------------------ */
        const dom = {
            html: document.documentElement,
            langButtons: document.querySelectorAll('[data-lang]'),
            mobileMenuBtn: document.getElementById('mobileMenuBtn'),
            mobileNav: document.getElementById('mobileNav'),
            categoryBar: document.getElementById('categoryBar'),
            menuSearchInput: document.getElementById('menuSearchInput'),
            clearSearchBtn: document.getElementById('clearSearchBtn'),
            menuResultsCount: document.getElementById('menuResultsCount'),
            productsGrid: document.getElementById('productsGrid'),
            menuEmptyState: document.getElementById('menuEmptyState'),
            resetFiltersBtn: document.getElementById('resetFiltersBtn'),
            // Product Modal
            productModalBackdrop: document.getElementById('productModalBackdrop'),
            closeProductModalBtn: document.getElementById('closeProductModalBtn'),
            modalProductImage: document.getElementById('modalProductImage'),
            modalProductCategory: document.getElementById('modalProductCategory'),
            modalProductName: document.getElementById('modalProductName'),
            modalProductDesc: document.getElementById('modalProductDesc'),
            modalUnitPrice: document.getElementById('modalUnitPrice'),
            modalSizesGroup: document.getElementById('modalSizesGroup'),
            modalSizesList: document.getElementById('modalSizesList'),
            modalFreeAddonsGroup: document.getElementById('modalFreeAddonsGroup'),
            modalFreeAddonsList: document.getElementById('modalFreeAddonsList'),
            modalPaidAddonsGroup: document.getElementById('modalPaidAddonsGroup'),
            modalPaidAddonsList: document.getElementById('modalPaidAddonsList'),
            modalQtyMinus: document.getElementById('modalQtyMinus'),
            modalQtyPlus: document.getElementById('modalQtyPlus'),
            modalQtyValue: document.getElementById('modalQtyValue'),
            modalAddToCartBtn: document.getElementById('modalAddToCartBtn'),
            modalTotalBtnPrice: document.getElementById('modalTotalBtnPrice'),
            // Cart Drawer
            openCartBtn: document.getElementById('openCartBtn'),
            cartBadge: document.getElementById('cartBadge'),
            cartBackdrop: document.getElementById('cartBackdrop'),
            closeCartBtn: document.getElementById('closeCartBtn'),
            cartDrawerCount: document.getElementById('cartDrawerCount'),
            cartItemsContainer: document.getElementById('cartItemsContainer'),
            cartEmptyState: document.getElementById('cartEmptyState'),
            cartDrawerFooter: document.getElementById('cartDrawerFooter'),
            cartTotalPrice: document.getElementById('cartTotalPrice'),
            proceedCheckoutBtn: document.getElementById('proceedCheckoutBtn'),
            // Checkout Modal
            checkoutModalBackdrop: document.getElementById('checkoutModalBackdrop'),
            closeCheckoutModalBtn: document.getElementById('closeCheckoutModalBtn'),
            checkoutFormStep: document.getElementById('checkoutFormStep'),
            checkoutSuccessStep: document.getElementById('checkoutSuccessStep'),
            methodCards: document.querySelectorAll('.method-card'),
            checkoutForm: document.getElementById('checkoutForm'),
            customerNameInput: document.getElementById('customerNameInput'),
            customerPhoneInput: document.getElementById('customerPhoneInput'),
            deliveryAddressGroup: document.getElementById('deliveryAddressGroup'),
            customerAddressInput: document.getElementById('customerAddressInput'),
            checkoutItemsCount: document.getElementById('checkoutItemsCount'),
            checkoutFinalTotal: document.getElementById('checkoutFinalTotal'),
            confirmedOrderNumber: document.getElementById('confirmedOrderNumber'),
            confirmedDeliveryMethod: document.getElementById('confirmedDeliveryMethod'),
            confirmedOrderDate: document.getElementById('confirmedOrderDate'),
            confirmedOrderTotal: document.getElementById('confirmedOrderTotal'),
            viewOrderHistoryBtn: document.getElementById('viewOrderHistoryBtn'),
            continueShoppingBtn: document.getElementById('continueShoppingBtn'),
            // Previous Orders
            navOrdersCount: document.getElementById('navOrdersCount'),
            ordersList: document.getElementById('ordersList'),
            ordersEmptyState: document.getElementById('ordersEmptyState'),
            // Toast
            toast: document.getElementById('toast')
        };

        /* ------------------------------------------------------------------------
           7. FORMATTING & TRANSLATION HELPERS
           ------------------------------------------------------------------------ */
        function t(key, vars = {}) {
            const dict = TRANSLATIONS[state.lang] || TRANSLATIONS.tr;
            let str = dict[key] || key;
            Object.keys(vars).forEach((varKey) => {
                str = str.replace(`{${varKey}}`, vars[varKey]);
            });
            return str;
        }

        function formatPrice(amount) {
            const numeric = Number(amount) || 0;
            return `${numeric.toLocaleString(state.lang === 'ar' ? 'ar-EG' : 'tr-TR')} ₺`;
        }

        function getCategoryName(categoryId) {
            const cat = CATEGORIES.find((c) => c.id === categoryId);
            return cat ? cat.name[state.lang] : '';
        }

        /* ------------------------------------------------------------------------
           8. LANGUAGE & RTL / LTR SWITCHING
           ------------------------------------------------------------------------ */
        function setLanguage(lang) {
            if (lang !== 'ar' && lang !== 'tr') return;
            state.lang = lang;
            saveToStorage(STORAGE_KEYS.LANG, lang);

            dom.html.lang = lang;
            dom.html.dir = lang === 'ar' ? 'rtl' : 'ltr';

            // Sync active state across all language buttons (Navbar & Hero)
            dom.langButtons.forEach((btn) => {
                const isSelected = btn.dataset.lang === lang;
                btn.classList.toggle('active', isSelected);
                btn.setAttribute('aria-pressed', String(isSelected));
            });

            // Translate static DOM elements
            document.querySelectorAll('[data-i18n]').forEach((el) => {
                const key = el.dataset.i18n;
                el.textContent = t(key);
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
                const key = el.dataset.i18nPlaceholder;
                el.placeholder = t(key);
            });

            // Re-render dynamic views without resetting cart or orders
            renderCategories();
            renderProducts();
            renderCart();
            renderPreviousOrders();

            if (state.selectedProduct && !dom.productModalBackdrop.hidden) {
                renderProductModalContent();
            }
        }

        /* ------------------------------------------------------------------------
           9. MENU FILTERING, SEARCH & RENDERING
           ------------------------------------------------------------------------ */
        function getFilteredProducts() {
            const query = state.searchQuery.trim().toLowerCase();

            return PRODUCTS.filter((product) => {
                const matchesCategory =
                    state.activeCategory === 'all' || product.category === state.activeCategory;

                if (!matchesCategory) return false;
                if (!query) return true;

                // Match against both Arabic and Turkish names & descriptions for seamless search
                const searchableText = [
                        product.name.tr,
                        product.name.ar,
                        product.description.tr,
                        product.description.ar
                    ]
                    .join(' ')
                    .toLowerCase();

                return searchableText.includes(query);
            });
        }

        function renderCategories() {
            dom.categoryBar.innerHTML = '';

            CATEGORIES.forEach((category) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `category-pill${state.activeCategory === category.id ? ' active' : ''}`;
                btn.setAttribute('role', 'tab');
                btn.setAttribute('aria-selected', String(state.activeCategory === category.id));
                btn.textContent = category.name[state.lang];

                btn.addEventListener('click', () => {
                    state.activeCategory = category.id;
                    renderCategories();
                    renderProducts();
                });

                dom.categoryBar.appendChild(btn);
            });
        }

        function renderProducts() {
            const filtered = getFilteredProducts();
            dom.menuResultsCount.textContent = t('resultsCount', { count: filtered.length });
            dom.productsGrid.innerHTML = '';

            if (filtered.length === 0) {
                dom.productsGrid.hidden = true;
                dom.menuEmptyState.hidden = false;
                return;
            }

            dom.productsGrid.hidden = false;
            dom.menuEmptyState.hidden = true;

            filtered.forEach((product) => {
                const card = document.createElement('article');
                card.className = 'product-card';
                card.tabIndex = 0;
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', product.name[state.lang]);

                card.innerHTML = `
        <div class="product-card-media">
          <img src="${product.image}" alt="${product.name[state.lang]}" loading="lazy" />
          <span class="product-card-badge">${getCategoryName(product.category)}</span>
        </div>
        <div class="product-card-body">
          <h3 class="product-card-title">${product.name[state.lang]}</h3>
          <p class="product-card-desc">${product.description[state.lang]}</p>
          <div class="product-card-footer">
            <span class="product-card-price">${formatPrice(product.price)}</span>
            <button type="button" class="product-card-btn">
              <span>+</span>
              <span>${t('customizeAdd')}</span>
            </button>
          </div>
        </div>
      `;

                const openHandler = () => openProductModal(product);
                card.addEventListener('click', openHandler);
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openHandler();
                    }
                });

                dom.productsGrid.appendChild(card);
            });
        }

        /* ------------------------------------------------------------------------
           10. PRODUCT DETAILS MODAL
           ------------------------------------------------------------------------ */
        function openProductModal(product) {
            state.selectedProduct = product;
            state.modalState = {
                sizeId: product.sizes && product.sizes.length > 0 ? product.sizes[0].id : null,
                freeAddonIds: [],
                paidAddonIds: [],
                quantity: 1
            };

            renderProductModalContent();
            dom.productModalBackdrop.hidden = false;
            document.body.classList.add('modal-open');
        }

        function closeProductModal() {
            dom.productModalBackdrop.hidden = true;
            state.selectedProduct = null;
            syncBodyScrollLock();
        }

        function calculateModalUnitPrice() {
            const product = state.selectedProduct;
            if (!product) return 0;

            let unitPrice = product.price;

            if (product.sizes && state.modalState.sizeId) {
                const selectedSize = product.sizes.find((s) => s.id === state.modalState.sizeId);
                if (selectedSize) {
                    unitPrice += selectedSize.priceDelta;
                }
            }

            if (product.paidAddons && state.modalState.paidAddonIds.length > 0) {
                state.modalState.paidAddonIds.forEach((addonId) => {
                    const found = product.paidAddons.find((a) => a.id === addonId);
                    if (found) {
                        unitPrice += found.price;
                    }
                });
            }

            return unitPrice;
        }

        function updateModalPriceDisplay() {
            const unitPrice = calculateModalUnitPrice();
            const total = unitPrice * state.modalState.quantity;
            dom.modalUnitPrice.textContent = formatPrice(unitPrice);
            dom.modalQtyValue.textContent = String(state.modalState.quantity);
            dom.modalTotalBtnPrice.textContent = formatPrice(total);
        }

        function renderProductModalContent() {
            const product = state.selectedProduct;
            if (!product) return;

            dom.modalProductImage.src = product.image;
            dom.modalProductImage.alt = product.name[state.lang];
            dom.modalProductCategory.textContent = getCategoryName(product.category);
            dom.modalProductName.textContent = product.name[state.lang];
            dom.modalProductDesc.textContent = product.description[state.lang];

            // Render Sizes
            if (product.sizes && product.sizes.length > 0) {
                dom.modalSizesGroup.hidden = false;
                dom.modalSizesList.innerHTML = '';

                product.sizes.forEach((size) => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    const isActive = state.modalState.sizeId === size.id;
                    btn.className = `size-option-btn${isActive ? ' active' : ''}`;
                    const deltaLabel = size.priceDelta > 0 ? `+${formatPrice(size.priceDelta)}` : formatPrice(0);
                    btn.innerHTML = `
          <strong>${size.name[state.lang]}</strong>
          <span>${deltaLabel}</span>
        `;
                    btn.addEventListener('click', () => {
                        state.modalState.sizeId = size.id;
                        renderProductModalContent();
                    });
                    dom.modalSizesList.appendChild(btn);
                });
            } else {
                dom.modalSizesGroup.hidden = true;
            }

            // Render Free Add-ons
            if (product.freeAddons && product.freeAddons.length > 0) {
                dom.modalFreeAddonsGroup.hidden = false;
                dom.modalFreeAddonsList.innerHTML = '';

                product.freeAddons.forEach((addon) => {
                    const isChecked = state.modalState.freeAddonIds.includes(addon.id);
                    const label = document.createElement('label');
                    label.className = `addon-item${isChecked ? ' selected' : ''}`;
                    label.innerHTML = `
          <span class="addon-item-left">
            <input type="checkbox" class="addon-checkbox" ${isChecked ? 'checked' : ''} />
            <span>${addon.name[state.lang]}</span>
          </span>
          <span class="addon-price-tag free">${t('freeLabel')}</span>
        `;

                    const checkbox = label.querySelector('input');
                    checkbox.addEventListener('change', () => {
                        if (checkbox.checked) {
                            state.modalState.freeAddonIds.push(addon.id);
                        } else {
                            state.modalState.freeAddonIds = state.modalState.freeAddonIds.filter((id) => id !== addon.id);
                        }
                        label.classList.toggle('selected', checkbox.checked);
                    });

                    dom.modalFreeAddonsList.appendChild(label);
                });
            } else {
                dom.modalFreeAddonsGroup.hidden = true;
            }

            // Render Paid Add-ons
            if (product.paidAddons && product.paidAddons.length > 0) {
                dom.modalPaidAddonsGroup.hidden = false;
                dom.modalPaidAddonsList.innerHTML = '';

                product.paidAddons.forEach((addon) => {
                    const isChecked = state.modalState.paidAddonIds.includes(addon.id);
                    const label = document.createElement('label');
                    label.className = `addon-item${isChecked ? ' selected' : ''}`;
                    label.innerHTML = `
          <span class="addon-item-left">
            <input type="checkbox" class="addon-checkbox" ${isChecked ? 'checked' : ''} />
            <span>${addon.name[state.lang]}</span>
          </span>
          <span class="addon-price-tag">+${formatPrice(addon.price)}</span>
        `;

                    const checkbox = label.querySelector('input');
                    checkbox.addEventListener('change', () => {
                        if (checkbox.checked) {
                            state.modalState.paidAddonIds.push(addon.id);
                        } else {
                            state.modalState.paidAddonIds = state.modalState.paidAddonIds.filter((id) => id !== addon.id);
                        }
                        label.classList.toggle('selected', checkbox.checked);
                        updateModalPriceDisplay();
                    });

                    dom.modalPaidAddonsList.appendChild(label);
                });
            } else {
                dom.modalPaidAddonsGroup.hidden = true;
            }

            updateModalPriceDisplay();
        }

        function addCurrentProductToCart() {
            const product = state.selectedProduct;
            if (!product) return;

            const selectedSizeObj =
                product.sizes && state.modalState.sizeId ?
                product.sizes.find((s) => s.id === state.modalState.sizeId) || null :
                null;

            const selectedFreeObjs = (product.freeAddons || []).filter((a) =>
                state.modalState.freeAddonIds.includes(a.id)
            );

            const selectedPaidObjs = (product.paidAddons || []).filter((a) =>
                state.modalState.paidAddonIds.includes(a.id)
            );

            const unitPrice = calculateModalUnitPrice();
            const sortedFreeIds = [...state.modalState.freeAddonIds].sort().join(',');
            const sortedPaidIds = [...state.modalState.paidAddonIds].sort().join(',');
            const itemKey = `${product.id}__${selectedSizeObj ? selectedSizeObj.id : 'nosize'}__${sortedFreeIds}__${sortedPaidIds}`;

            const existingIndex = state.cart.findIndex((item) => item.key === itemKey);

            if (existingIndex > -1) {
                state.cart[existingIndex].quantity += state.modalState.quantity;
            } else {
                state.cart.push({
                    key: itemKey,
                    productId: product.id,
                    name: product.name,
                    image: product.image,
                    size: selectedSizeObj ? { id: selectedSizeObj.id, name: selectedSizeObj.name } : null,
                    freeAddons: selectedFreeObjs.map((a) => ({ id: a.id, name: a.name })),
                    paidAddons: selectedPaidObjs.map((a) => ({ id: a.id, name: a.name, price: a.price })),
                    unitPrice,
                    quantity: state.modalState.quantity
                });
            }

            saveCart();
            renderCart();
            showToast(t('addedToast', { name: product.name[state.lang] }));
            closeProductModal();
        }

        /* ------------------------------------------------------------------------
           11. SHOPPING CART & LOCALSTORAGE PERSISTENCE
           ------------------------------------------------------------------------ */
        function saveCart() {
            saveToStorage(STORAGE_KEYS.CART, state.cart);
        }

        function getCartStats() {
            return state.cart.reduce(
                (acc, item) => {
                    acc.totalItems += item.quantity;
                    acc.totalPrice += item.unitPrice * item.quantity;
                    return acc;
                }, { totalItems: 0, totalPrice: 0 }
            );
        }

        function openCartDrawer() {
            renderCart();
            dom.cartBackdrop.hidden = false;
            document.body.classList.add('modal-open');
        }

        function closeCartDrawer() {
            dom.cartBackdrop.hidden = true;
            syncBodyScrollLock();
        }

        function changeCartItemQty(index, delta) {
            if (!state.cart[index]) return;
            const nextQty = state.cart[index].quantity + delta;
            if (nextQty <= 0) {
                state.cart.splice(index, 1);
            } else {
                state.cart[index].quantity = nextQty;
            }
            saveCart();
            renderCart();
        }

        function removeCartItem(index) {
            state.cart.splice(index, 1);
            saveCart();
            renderCart();
        }

        function formatItemCustomizations(item) {
            const parts = [];
            if (item.size && item.size.name) {
                parts.push(item.size.name[state.lang]);
            }
            if (item.freeAddons && item.freeAddons.length > 0) {
                parts.push(item.freeAddons.map((a) => a.name[state.lang]).join(', '));
            }
            if (item.paidAddons && item.paidAddons.length > 0) {
                parts.push(item.paidAddons.map((a) => `+ ${a.name[state.lang]}`).join(', '));
            }
            return parts.join(' • ');
        }

        function renderCart() {
            const { totalItems, totalPrice } = getCartStats();
            dom.cartBadge.textContent = String(totalItems);
            dom.cartDrawerCount.textContent = String(totalItems);
            dom.cartTotalPrice.textContent = formatPrice(totalPrice);

            if (state.cart.length === 0) {
                dom.cartItemsContainer.hidden = true;
                dom.cartDrawerFooter.hidden = true;
                dom.cartEmptyState.hidden = false;
                return;
            }

            dom.cartItemsContainer.hidden = false;
            dom.cartDrawerFooter.hidden = false;
            dom.cartEmptyState.hidden = true;
            dom.cartItemsContainer.innerHTML = '';

            state.cart.forEach((item, index) => {
                        const metaText = formatItemCustomizations(item);
                        const lineTotal = item.unitPrice * item.quantity;

                        const row = document.createElement('div');
                        row.className = 'cart-item-card';
                        row.innerHTML = `
        <img src="${item.image}" alt="${item.name[state.lang]}" class="cart-item-img" />
        <div class="cart-item-content">
          <div class="cart-item-top">
            <h4 class="cart-item-name">${item.name[state.lang]}</h4>
            <button type="button" class="cart-remove-btn" aria-label="Remove item">&times;</button>
          </div>
          ${metaText ? `<p class="cart-item-meta">${metaText}</p>` : ''}
          <div class="cart-item-bottom">
            <span class="cart-item-price">${formatPrice(lineTotal)}</span>
            <div class="cart-mini-stepper">
              <button type="button" class="cart-mini-btn minus" aria-label="Decrease">−</button>
              <span class="cart-mini-qty">${item.quantity}</span>
              <button type="button" class="cart-mini-btn plus" aria-label="Increase">+</button>
            </div>
          </div>
        </div>
      `;

      row.querySelector('.cart-remove-btn').addEventListener('click', () => removeCartItem(index));
      row.querySelector('.minus').addEventListener('click', () => changeCartItemQty(index, -1));
      row.querySelector('.plus').addEventListener('click', () => changeCartItemQty(index, 1));

      dom.cartItemsContainer.appendChild(row);
    });
  }

  /* ------------------------------------------------------------------------
     12. CHECKOUT PROCESS & DYNAMIC ORDER NUMBER GENERATION
     ------------------------------------------------------------------------ */
  function generateOrderNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateStamp = `${year}${month}${day}`;
    const prefix = `BUN-${dateStamp}-`;

    let maxSequence = 0;
    state.orders.forEach((order) => {
      if (typeof order.orderNumber === 'string' && order.orderNumber.startsWith(prefix)) {
        const seqPart = parseInt(order.orderNumber.slice(prefix.length), 10);
        if (!isNaN(seqPart) && seqPart > maxSequence) {
          maxSequence = seqPart;
        }
      }
    });

    const nextSeq = String(maxSequence + 1).padStart(3, '0');
    return `${prefix}${nextSeq}`;
  }

  function formatOrderDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString(state.lang === 'ar' ? 'ar-EG' : 'tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function setCheckoutMethod(method) {
    state.checkoutMethod = method;
    dom.methodCards.forEach((card) => {
      const isActive = card.dataset.method === method;
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-checked', String(isActive));
    });
    dom.deliveryAddressGroup.hidden = method !== 'delivery';
  }

  function openCheckoutModal() {
    if (state.cart.length === 0) return;

    const { totalItems, totalPrice } = getCartStats();
    dom.checkoutItemsCount.textContent = String(totalItems);
    dom.checkoutFinalTotal.textContent = formatPrice(totalPrice);

    dom.checkoutFormStep.hidden = false;
    dom.checkoutSuccessStep.hidden = true;
    setCheckoutMethod('delivery');

    closeCartDrawer();
    dom.checkoutModalBackdrop.hidden = false;
    document.body.classList.add('modal-open');
  }

  function closeCheckoutModal() {
    dom.checkoutModalBackdrop.hidden = true;
    syncBodyScrollLock();
  }

  function submitDemoOrder(event) {
    event.preventDefault();
    if (state.cart.length === 0) return;

    const { totalPrice } = getCartStats();
    const orderNumber = generateOrderNumber();
    const createdAt = new Date().toISOString();

    const newOrder = {
      orderNumber,
      items: state.cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        size: item.size,
        freeAddons: item.freeAddons,
        paidAddons: item.paidAddons,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        lineTotal: item.unitPrice * item.quantity
      })),
      totalAmount: totalPrice,
      createdAt,
      deliveryMethod: state.checkoutMethod,
      customerInfo: {
        name: dom.customerNameInput.value.trim(),
        phone: dom.customerPhoneInput.value.trim(),
        address: state.checkoutMethod === 'delivery' ? dom.customerAddressInput.value.trim() : ''
      },
      status: 'confirmed'
    };

    // Save order permanently in LocalStorage
    state.orders.unshift(newOrder);
    saveToStorage(STORAGE_KEYS.ORDERS, state.orders);

    // Clear active shopping cart
    state.cart = [];
    saveCart();
    renderCart();
    renderPreviousOrders();

    // Reset optional form fields
    dom.checkoutForm.reset();

    // Populate Confirmation Screen
    dom.confirmedOrderNumber.textContent = newOrder.orderNumber;
    dom.confirmedDeliveryMethod.textContent =
      newOrder.deliveryMethod === 'delivery' ? t('methodDelivery') : t('methodPickup');
    dom.confirmedOrderDate.textContent = formatOrderDateTime(newOrder.createdAt);
    dom.confirmedOrderTotal.textContent = formatPrice(newOrder.totalAmount);

    dom.checkoutFormStep.hidden = true;
    dom.checkoutSuccessStep.hidden = false;
  }

  /* ------------------------------------------------------------------------
     13. PREVIOUS ORDERS SECTION (طلباتي السابقة / Siparişlerim)
     ------------------------------------------------------------------------ */
  function renderPreviousOrders() {
    const count = state.orders.length;
    dom.navOrdersCount.textContent = String(count);
    dom.navOrdersCount.hidden = count === 0;

    if (count === 0) {
      dom.ordersList.hidden = true;
      dom.ordersEmptyState.hidden = false;
      return;
    }

    dom.ordersList.hidden = false;
    dom.ordersEmptyState.hidden = true;
    dom.ordersList.innerHTML = '';

    state.orders.forEach((order) => {
      const isExpanded = state.expandedOrderNumbers.has(order.orderNumber);
      const methodLabel =
        order.deliveryMethod === 'delivery' ? t('methodDelivery') : t('methodPickup');

      const card = document.createElement('article');
      card.className = 'order-card';

      const itemsHtml = order.items
        .map((item) => {
          const customText = formatItemCustomizations(item);
          return `
            <div class="order-item-row">
              <div class="order-item-left">
                <img src="${item.image}" alt="${item.name[state.lang]}" class="order-item-thumb" />
                <div class="order-item-info">
                  <strong>${item.quantity} &times; ${item.name[state.lang]}</strong>
                  ${customText ? `<span class="order-item-addons">${customText}</span>` : ''}
                </div>
              </div>
              <span class="order-item-price">${formatPrice(item.lineTotal)}</span>
            </div>
          `;
        })
        .join('');

      const customerNameDisplay =
        order.customerInfo && order.customerInfo.name ? order.customerInfo.name : t('guestCustomer');

      card.innerHTML = `
        <div class="order-card-top">
          <div class="order-id-group">
            <span class="order-number-tag">${order.orderNumber}</span>
            <span class="order-date-text">${formatOrderDateTime(order.createdAt)}</span>
          </div>

          <div class="order-meta-group">
            <span class="order-method-pill">${methodLabel}</span>
            <span class="order-status-pill">${t('orderStatusDemo')}</span>
            <span class="order-total-tag">${formatPrice(order.totalAmount)}</span>
            <button type="button" class="order-toggle-btn" aria-expanded="${String(isExpanded)}">
              ${isExpanded ? t('hideDetails') : t('viewDetails')}
            </button>
          </div>
        </div>

        <div class="order-details-panel" ${isExpanded ? '' : 'hidden'}>
          <div class="order-customer-summary">
            <span><strong>${customerNameDisplay}</strong></span>
            ${order.customerInfo && order.customerInfo.phone ? `<span>${order.customerInfo.phone}</span>` : ''}
            ${order.customerInfo && order.customerInfo.address ? `<span>${order.customerInfo.address}</span>` : ''}
          </div>
          ${itemsHtml}
        </div>
      `;

      const toggleBtn = card.querySelector('.order-toggle-btn');
      toggleBtn.addEventListener('click', () => {
        if (state.expandedOrderNumbers.has(order.orderNumber)) {
          state.expandedOrderNumbers.delete(order.orderNumber);
        } else {
          state.expandedOrderNumbers.add(order.orderNumber);
        }
        renderPreviousOrders();
      });

      dom.ordersList.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------------
     14. UI UTILITIES & EVENT LISTENERS
     ------------------------------------------------------------------------ */
  function syncBodyScrollLock() {
    const anyOpen =
      !dom.productModalBackdrop.hidden ||
      !dom.cartBackdrop.hidden ||
      !dom.checkoutModalBackdrop.hidden;
    document.body.classList.toggle('modal-open', anyOpen);
  }

  let toastTimer = null;
  function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toast.hidden = true;
    }, 2600);
  }

  function bindEvents() {
    // Language Switcher Buttons
    dom.langButtons.forEach((btn) => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    // Mobile Navigation Toggle
    dom.mobileMenuBtn.addEventListener('click', () => {
      const isHidden = dom.mobileNav.hidden;
      dom.mobileNav.hidden = !isHidden;
      dom.mobileMenuBtn.setAttribute('aria-expanded', String(isHidden));
    });

    dom.mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        dom.mobileNav.hidden = true;
        dom.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Real-Time Food Search
    dom.menuSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      dom.clearSearchBtn.hidden = state.searchQuery.length === 0;
      renderProducts();
    });

    dom.clearSearchBtn.addEventListener('click', () => {
      state.searchQuery = '';
      dom.menuSearchInput.value = '';
      dom.clearSearchBtn.hidden = true;
      renderProducts();
      dom.menuSearchInput.focus();
    });

    dom.resetFiltersBtn.addEventListener('click', () => {
      state.activeCategory = 'all';
      state.searchQuery = '';
      dom.menuSearchInput.value = '';
      dom.clearSearchBtn.hidden = true;
      renderCategories();
      renderProducts();
    });

    // Product Modal Controls
    dom.closeProductModalBtn.addEventListener('click', closeProductModal);
    dom.productModalBackdrop.addEventListener('click', (e) => {
      if (e.target === dom.productModalBackdrop) closeProductModal();
    });

    dom.modalQtyMinus.addEventListener('click', () => {
      if (state.modalState.quantity > 1) {
        state.modalState.quantity -= 1;
        updateModalPriceDisplay();
      }
    });

    dom.modalQtyPlus.addEventListener('click', () => {
      state.modalState.quantity += 1;
      updateModalPriceDisplay();
    });

    dom.modalAddToCartBtn.addEventListener('click', addCurrentProductToCart);

    // Cart Drawer Controls
    dom.openCartBtn.addEventListener('click', openCartDrawer);
    dom.closeCartBtn.addEventListener('click', closeCartDrawer);
    dom.cartBackdrop.addEventListener('click', (e) => {
      if (e.target === dom.cartBackdrop) closeCartDrawer();
    });

    // Checkout Modal Controls
    dom.proceedCheckoutBtn.addEventListener('click', openCheckoutModal);
    dom.closeCheckoutModalBtn.addEventListener('click', closeCheckoutModal);
    dom.checkoutModalBackdrop.addEventListener('click', (e) => {
      if (e.target === dom.checkoutModalBackdrop) closeCheckoutModal();
    });

    dom.methodCards.forEach((card) => {
      card.addEventListener('click', () => setCheckoutMethod(card.dataset.method));
    });

    dom.checkoutForm.addEventListener('submit', submitDemoOrder);

    dom.viewOrderHistoryBtn.addEventListener('click', () => {
      closeCheckoutModal();
    });

    dom.continueShoppingBtn.addEventListener('click', () => {
      closeCheckoutModal();
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    });

    // Global Escape Key Handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!dom.productModalBackdrop.hidden) closeProductModal();
        if (!dom.cartBackdrop.hidden) closeCartDrawer();
        if (!dom.checkoutModalBackdrop.hidden) closeCheckoutModal();
      }
    });
  }

  /* ------------------------------------------------------------------------
     15. INITIALIZATION
     ------------------------------------------------------------------------ */
  function init() {
    bindEvents();
    setLanguage(state.lang);
  }

  init();
})();