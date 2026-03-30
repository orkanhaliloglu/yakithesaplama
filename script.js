document.addEventListener('DOMContentLoaded', () => {
    // Select Inputs
    const distanceValInput = document.getElementById('distance-val');
    const distancePeriodSelect = document.getElementById('distance-period');

    const petrolModelSelect = document.getElementById('petrol-model');
    const petrolImg = document.getElementById('petrol-img');
    const petrolConsumptionInput = document.getElementById('petrol-consumption');
    const petrolPriceInput = document.getElementById('petrol-price');
    const btnFetchPetrol = document.getElementById('btn-fetch-petrol');
    const petrolHint = document.getElementById('petrol-hint');

    const evModelSelect = document.getElementById('ev-model');
    const evImg = document.getElementById('ev-img');
    const evConsumptionInput = document.getElementById('ev-consumption');
    const evPriceInput = document.getElementById('ev-price');
    const evChargeRadios = document.getElementsByName('ev-charge-type');
    const evHint = document.getElementById('ev-hint');

    const btnExportPdf = document.getElementById('btn-export-pdf');

    // Select Output Elements
    const petrolKmCostDisplay = document.querySelector('#petrol-km-cost span');
    const evKmCostDisplay = document.querySelector('#ev-km-cost span');

    const resPetrolTitle = document.getElementById('res-petrol-title');
    const resPetrolDay = document.getElementById('res-petrol-day');
    const resPetrolMonth = document.getElementById('res-petrol-month');
    const resPetrolYear = document.getElementById('res-petrol-year');

    const resEvTitle = document.getElementById('res-ev-title');
    const resEvDay = document.getElementById('res-ev-day');
    const resEvMonth = document.getElementById('res-ev-month');
    const resEvYear = document.getElementById('res-ev-year');

    const yearlySavingsDisplay = document.getElementById('yearly-savings');
    const savingsHighlightLabel = document.querySelector('#savings-highlight p');

    // --- CAR DATABASE ---
    const carData = {
        petrol: [
            { id: "golf", name: "VW Golf 1.5 TSI", cons: 6.5, img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop" },
            { id: "egea", name: "Fiat Egea 1.4 Fire", cons: 7.5, img: "https://images.unsplash.com/photo-1620067347909-bc3f9ea325fa?w=800&auto=format&fit=crop" },
            { id: "corolla", name: "Toyota Corolla 1.5", cons: 6.2, img: "https://images.unsplash.com/photo-1629897048514-3dd7414bc6ce?w=800&auto=format&fit=crop" },
            { id: "megane", name: "Renault Megane 1.3 TCe", cons: 6.8, img: "https://images.unsplash.com/photo-1632822435889-49772bf2eb76?w=800&auto=format&fit=crop" },
            { id: "passat", name: "VW Passat 1.5 TSI", cons: 6.8, img: "https://images.unsplash.com/photo-1609520778163-a1cdbaddbc87?w=800&auto=format&fit=crop" },
            { id: "civic", name: "Honda Civic 1.5 VTEC", cons: 7.2, img: "https://images.unsplash.com/photo-1605810731210-9280dce68b44?w=800&auto=format&fit=crop" },
            { id: "clio", name: "Renault Clio 1.0 TCe", cons: 5.8, img: "https://images.unsplash.com/photo-1616422285623-14bf9162ab27?w=800&auto=format&fit=crop" },
            { id: "qashqai", name: "Nissan Qashqai 1.3 DIG-T", cons: 7.4, img: "https://images.unsplash.com/photo-1698651800040-d9c025da2c88?w=800&auto=format&fit=crop" },
            { id: "tucson", name: "Hyundai Tucson 1.6 T-GDI", cons: 8.5, img: "https://images.unsplash.com/photo-1643213009572-887413bbedea?w=800&auto=format&fit=crop" },
            { id: "custom_p", name: "➕ Farklı / Kendi Aracım", cons: 7.0, img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop" }
        ],
        ev: [
            { id: "modely", name: "Tesla Model Y", cons: 16.5, img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop" },
            { id: "togg", name: "Togg T10X", cons: 18.0, img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop" },
            { id: "ioniq5", name: "Hyundai Ioniq 5", cons: 17.5, img: "https://images.unsplash.com/photo-1676233499421-4d92ee2194ff?w=800&auto=format&fit=crop" },
            { id: "taycan", name: "Porsche Taycan", cons: 22.0, img: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&auto=format&fit=crop" },
            { id: "bmwi4", name: "BMW i4 eDrive40", cons: 17.8, img: "https://images.unsplash.com/photo-1650346387082-fdbb34baee1a?w=800&auto=format&fit=crop" },
            { id: "megane_etech", name: "Renault Megane E-Tech", cons: 15.5, img: "https://images.unsplash.com/photo-1703276685836-e0e6443bdcde?w=800&auto=format&fit=crop" },
            { id: "id4", name: "VW ID.4", cons: 18.2, img: "https://images.unsplash.com/photo-1621616719810-738fd52f8ce6?w=800&auto=format&fit=crop" },
            { id: "kona_ev", name: "Hyundai Kona EV", cons: 15.0, img: "https://images.unsplash.com/photo-1698242488057-0a2a1a89c938?w=800&auto=format&fit=crop" },
            { id: "custom_e", name: "➕ Farklı / Kendi Aracım", cons: 16.0, img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop" }
        ]
    };

    // Populate Select Boxes
    const initSelects = () => {
        carData.petrol.forEach(car => {
            const opt = document.createElement('option');
            opt.value = car.id;
            opt.textContent = car.name;
            petrolModelSelect.appendChild(opt);
        });
        carData.ev.forEach(car => {
            const opt = document.createElement('option');
            opt.value = car.id;
            opt.textContent = car.name;
            evModelSelect.appendChild(opt);
        });

        // Setup Initial Selection Images
        updateCarSelection('petrol');
        updateCarSelection('ev');
    };

    const updateCarSelection = (type) => {
        if (type === 'petrol') {
            const selectedId = petrolModelSelect.value;
            const car = carData.petrol.find(c => c.id === selectedId);
            if (car) {
                petrolImg.src = car.img;
                petrolConsumptionInput.value = car.cons;
            }
        } else {
            const selectedId = evModelSelect.value;
            const car = carData.ev.find(c => c.id === selectedId);
            if (car) {
                evImg.src = car.img;
                evConsumptionInput.value = car.cons;
            }
        }
    };

    // Number Formatter (TRY Currency)
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    // Calculate Function
    const calculate = () => {
        // Parse values
        let distanceVal = Math.max(0, parseFloat(distanceValInput.value) || 0);
        const period = distancePeriodSelect.value;

        let dailyKm = distanceVal;
        if (period === 'weekly') dailyKm = distanceVal / 7;
        else if (period === 'monthly') dailyKm = distanceVal / 30;
        else if (period === 'yearly') dailyKm = distanceVal / 365;

        const petrolConsumption = Math.max(0, parseFloat(petrolConsumptionInput.value) || 0);
        const petrolPrice = Math.max(0, parseFloat(petrolPriceInput.value) || 0);

        const evConsumption = Math.max(0, parseFloat(evConsumptionInput.value) || 0);
        const evPrice = Math.max(0, parseFloat(evPriceInput.value) || 0);

        // Base Cost per KM Calculations
        // Petrol cost = (Liters per 100km * Price per Liter) / 100
        const petrolCostPerKm = (petrolConsumption * petrolPrice) / 100;

        // EV cost = (kWh per 100km * Price per kWh) / 100
        const evCostPerKm = (evConsumption * evPrice) / 100;

        // Update KM Cost displays
        petrolKmCostDisplay.textContent = formatCurrency(petrolCostPerKm);
        evKmCostDisplay.textContent = formatCurrency(evCostPerKm);

        // Time period calculations

        // Daily
        const petrolDay = petrolCostPerKm * dailyKm;
        const evDay = evCostPerKm * dailyKm;

        // Monthly (Assuming 30 days)
        const petrolMonth = petrolDay * 30;
        const evMonth = evDay * 30;

        // Yearly (Assuming 365 days)
        const petrolYear = petrolDay * 365;
        const evYear = evDay * 365;

        // Update Titles
        const petrolSelectedCar = carData.petrol.find(c => c.id === petrolModelSelect.value);
        const evSelectedCar = carData.ev.find(c => c.id === evModelSelect.value);

        resPetrolTitle.textContent = petrolSelectedCar ? petrolSelectedCar.name : 'Benzinli Araç';
        resEvTitle.textContent = evSelectedCar ? evSelectedCar.name : 'Elektrikli Araç';

        // Render detailed costs
        resPetrolDay.textContent = formatCurrency(petrolDay);
        resPetrolMonth.textContent = formatCurrency(petrolMonth);
        resPetrolYear.textContent = formatCurrency(petrolYear);

        resEvDay.textContent = formatCurrency(evDay);
        resEvMonth.textContent = formatCurrency(evMonth);
        resEvYear.textContent = formatCurrency(evYear);

        // Calculate and Render Savings (Yearly)
        const savingsYear = petrolYear - evYear;

        // Animation effect when updating numbers
        yearlySavingsDisplay.style.opacity = '0.5';
        setTimeout(() => {
            yearlySavingsDisplay.style.opacity = '1';
            yearlySavingsDisplay.textContent = formatCurrency(Math.abs(savingsYear));
        }, 150);

        if (savingsYear > 0) {
            yearlySavingsDisplay.className = 'positive';
            savingsHighlightLabel.textContent = 'Yıllık Tasarruf (Elektrikli ile)';
        } else if (savingsYear < 0) {
            yearlySavingsDisplay.className = 'negative';
            savingsHighlightLabel.textContent = 'Yıllık Zarar (Elektrikli ile)';
        } else {
            yearlySavingsDisplay.className = '';
            savingsHighlightLabel.textContent = 'Maliyetler Eşit';
        }
    };

    // --- NEW LOGIC: EV Charge Type Selection ---
    const updateEvPrice = () => {
        const type = document.querySelector('input[name="ev-charge-type"]:checked').value;
        if (type === 'ac') {
            evPriceInput.value = '2.50';
            evHint.textContent = 'Evden AC Şarj için ortalama: ~2.50₺ (Şebeke tarifesi)';
        } else {
            evPriceInput.value = '9.00';
            evHint.textContent = 'Hızlı DC Şarj için ortalama: ~9.00₺ (İstasyon tarifesi)';
        }
        calculate();
    };

    Array.from(evChargeRadios).forEach(radio => {
        radio.addEventListener('change', updateEvPrice);
    });

    // --- NEW LOGIC: FUEL TYPE SELECTION (Petrol/Diesel) ---
    let cachedPrices = { petrol: null, diesel: null };
    const fuelTypeRadios = document.getElementsByName('fuel-type');
    
    const updateFuelType = () => {
        const type = document.querySelector('input[name="fuel-type"]:checked').value;
        if (type === 'petrol') {
            if (cachedPrices.petrol) {
                petrolPriceInput.value = cachedPrices.petrol.toFixed(2);
                petrolHint.textContent = `Güncel benzin fiyatı (OPET): ${cachedPrices.petrol.toFixed(2)}₺`;
            } else {
                petrolPriceInput.value = '42.50';
                petrolHint.textContent = 'Varsayılan benzin fiyatı.';
            }
            resPetrolTitle.textContent = 'Benzinli Araç';
        } else {
            if (cachedPrices.diesel) {
                petrolPriceInput.value = cachedPrices.diesel.toFixed(2);
                petrolHint.textContent = `Güncel motorin fiyatı (OPET): ${cachedPrices.diesel.toFixed(2)}₺`;
            } else {
                petrolPriceInput.value = '43.00';
                petrolHint.textContent = 'Varsayılan motorin fiyatı.';
            }
            resPetrolTitle.textContent = 'Dizel Araç';
        }
        calculate();
    };

    Array.from(fuelTypeRadios).forEach(radio => {
        radio.addEventListener('change', updateFuelType);
    });

    // --- NEW LOGIC: Fetch Fuel Prices from OPET (via AllOrigins Proxy) ---
    const fetchFuelPrices = async () => {
        btnFetchPetrol.textContent = 'Yükleniyor...';
        btnFetchPetrol.disabled = true;

        try {
            const targetUrl = 'https://api.opet.com.tr/api/fuelprices/allprices';
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

            const response = await fetch(proxyUrl);
            const data = await response.json();

            if (!data.contents) throw new Error('No content received');
            
            const allPrices = JSON.parse(data.contents);
            
            // Find İstanbul Avrupa
            const istanbulAvrupa = allPrices.find(p => p.provinceName === 'İSTANBUL AVRUPA');
            
            if (istanbulAvrupa && istanbulAvrupa.prices) {
                const petrolData = istanbulAvrupa.prices.find(f => f.name === 'Kurşunsuz Benzin 95');
                const dieselData = istanbulAvrupa.prices.find(f => f.name === 'Motorin UltraForce');
                
                if (petrolData) cachedPrices.petrol = petrolData.amount;
                if (dieselData) cachedPrices.diesel = dieselData.amount;
                
                // Update the current input if price is successfully fetched
                updateFuelType();
            } else {
                throw new Error('İstanbul Avrupa data not found');
            }

        } catch (error) {
            console.error('Fetch Error:', error);
            petrolHint.textContent = 'Fiyat çekilemedi. Lütfen manuel giriniz.';
        } finally {
            btnFetchPetrol.textContent = 'Fiyatları Güncelle';
            btnFetchPetrol.disabled = false;
        }
    };

    btnFetchPetrol.addEventListener('click', fetchFuelPrices);

    // --- NEW LOGIC: PDF Export ---
    btnExportPdf.addEventListener('click', () => {
        const element = document.getElementById('export-content');
        const opt = {
            margin: 0.5,
            filename: 'yakit-karsilastirma-raporu.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, backgroundColor: '#0f172a' },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        // Temporarily hide the PDF button from the export
        btnExportPdf.style.display = 'none';

        html2pdf().set(opt).from(element).save().then(() => {
            btnExportPdf.style.display = 'block';
        });
    });

    // Handle Car Select Changes
    petrolModelSelect.addEventListener('change', () => {
        updateCarSelection('petrol');
        calculate();
    });

    evModelSelect.addEventListener('change', () => {
        updateCarSelection('ev');
        calculate();
    });

    // Add event listeners to all inputs for real-time calculation
    const inputs = [
        distanceValInput, distancePeriodSelect,
        petrolConsumptionInput, petrolPriceInput,
        evConsumptionInput, evPriceInput
    ];

    inputs.forEach(input => {
        input.addEventListener('input', calculate);

        // Also trigger on change for cases where user uses up/down arrows
        input.addEventListener('change', calculate);
    });

    // Initial setup
    initSelects();
    calculate();
    fetchFuelPrices();
});
