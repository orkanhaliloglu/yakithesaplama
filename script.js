document.addEventListener('DOMContentLoaded', () => {
    // Select Inputs
    const distanceValInput = document.getElementById('distance-val');
    const distancePeriodSelect = document.getElementById('distance-period');

    const petrolModelSelect = document.getElementById('petrol-model');
    const petrolImg = document.getElementById('petrol-img');
    const petrolConsumptionInput = document.getElementById('petrol-consumption');
    const petrolPriceInput = document.getElementById('petrol-price');
    // --- NEW LOGIC: FUEL TYPE SELECTION (Petrol/Diesel) ---
    const fuelTypeRadios = document.getElementsByName('fuel-type');
    
    // Manual Update: 30 March 2026
    const manualPrices = {
        petrol: 62.40,
        diesel: 74.65
    };

    const updateFuelType = () => {
        const type = document.querySelector('input[name="fuel-type"]:checked').value;
        if (type === 'petrol') {
            petrolPriceInput.value = manualPrices.petrol.toFixed(2);
            petrolHint.textContent = 'Benzin (Kurşunsuz 95)';
            resPetrolTitle.textContent = 'Benzinli Araç';
        } else {
            petrolPriceInput.value = manualPrices.diesel.toFixed(2);
            petrolHint.textContent = 'Motorin (V/Max Diesel)';
            resPetrolTitle.textContent = 'Dizel Araç';
        }
        calculate();
    };

    Array.from(fuelTypeRadios).forEach(radio => {
        radio.addEventListener('change', updateFuelType);
    });

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
        input.addEventListener('change', calculate);
    });

    // Initial setup
    initSelects();
    updateFuelType(); // Set initial prices
    calculate();
});
