// Mendapatkan elemen DOM
const conversionType = document.getElementById('conversion-type');
const inputValue = document.getElementById('input-value');
const inputUnit = document.getElementById('input-unit');
const resultElement = document.getElementById('result');
const resultUnitElement = document.getElementById('result-unit');

// Data konversi lengkap
const conversionData = {
    'mph-kmh': {
        factor: 1.60934,
        fromUnit: 'mph',
        toUnit: 'km/h',
        fromLabel: 'Mil per Jam',
        toLabel: 'Kilometer per Jam'
    },
    'kmh-mph': {
        factor: 1/1.60934,
        fromUnit: 'km/h',
        toUnit: 'mph',
        fromLabel: 'Kilometer per Jam',
        toLabel: 'Mil per Jam'
    },
    'knots-kmh': {
        factor: 1.852,
        fromUnit: 'knots',
        toUnit: 'km/h',
        fromLabel: 'Knots',
        toLabel: 'Kilometer per Jam'
    },
    'kmh-knots': {
        factor: 1/1.852,
        fromUnit: 'km/h',
        toUnit: 'knots',
        fromLabel: 'Kilometer per Jam',
        toLabel: 'Knots'
    },
    'feet-meters': {
        factor: 0.3048,
        fromUnit: 'feet',
        toUnit: 'm',
        fromLabel: 'Feet',
        toLabel: 'Meter'
    },
    'meters-feet': {
        factor: 1/0.3048,
        fromUnit: 'm',
        toUnit: 'feet',
        fromLabel: 'Meter',
        toLabel: 'Feet'
    },
    'km-meters': {
        factor: 1000,
        fromUnit: 'km',
        toUnit: 'm',
        fromLabel: 'Kilometer',
        toLabel: 'Meter'
    },
    'meters-km': {
        factor: 0.001,
        fromUnit: 'm',
        toUnit: 'km',
        fromLabel: 'Meter',
        toLabel: 'Kilometer'
    },
    'miles-km': {
        factor: 1.60934,
        fromUnit: 'mil',
        toUnit: 'km',
        fromLabel: 'Mil',
        toLabel: 'Kilometer'
    },
    'km-miles': {
        factor: 1/1.60934,
        fromUnit: 'km',
        toUnit: 'mil',
        fromLabel: 'Kilometer',
        toLabel: 'Mil'
    },
    'inches-cm': {
        factor: 2.54,
        fromUnit: 'inci',
        toUnit: 'cm',
        fromLabel: 'Inci',
        toLabel: 'Sentimeter'
    },
    'cm-inches': {
        factor: 1/2.54,
        fromUnit: 'cm',
        toUnit: 'inci',
        fromLabel: 'Sentimeter',
        toLabel: 'Inci'
    },
    'celsius-fahrenheit': {
        convert: (value) => (value * 9/5) + 32,
        fromUnit: '°C',
        toUnit: '°F',
        fromLabel: 'Celsius',
        toLabel: 'Fahrenheit'
    },
    'fahrenheit-celsius': {
        convert: (value) => (value - 32) * 5/9,
        fromUnit: '°F',
        toUnit: '°C',
        fromLabel: 'Fahrenheit',
        toLabel: 'Celsius'
    }
};

// Fungsi untuk memperbarui tampilan unit
function updateUnitDisplay() {
    const conversion = conversionType.value;
    const conversionInfo = conversionData[conversion];
    
    if (conversionInfo) {
        inputUnit.textContent = conversionInfo.fromUnit;
    }
}

// Fungsi utama untuk melakukan konversi
function performConversion() {
    const value = parseFloat(inputValue.value) || 0;
    const conversion = conversionType.value;
    const conversionInfo = conversionData[conversion];
    let result = 0;
    
    if (!conversionInfo) return;
    
    if (conversionInfo.convert) {
        result = conversionInfo.convert(value);
    } else {
        result = value * conversionInfo.factor;
    }
    
    // Menampilkan hasil dengan 2 angka di belakang koma
    resultElement.textContent = result.toFixed(2);
    resultUnitElement.textContent = conversionInfo.toUnit;
    
    // Update unit display
    updateUnitDisplay();
}

// Event listener untuk update real-time
conversionType.addEventListener('change', function() {
    performConversion();
    updateUnitDisplay();
});

inputValue.addEventListener('input', performConversion);

// Validasi input untuk mencegah nilai negatif pada suhu
inputValue.addEventListener('change', function() {
    const conversion = conversionType.value;
    if ((conversion === 'celsius-fahrenheit' || conversion === 'fahrenheit-celsius') && this.value < -273.15) {
        this.value = -273.15;
        performConversion();
    }
});

// Inisialisasi dengan nilai default
updateUnitDisplay();
performConversion();

// Tambahkan efek ketikan pada input
inputValue.addEventListener('focus', function() {
    this.parentElement.style.boxShadow = '0 0 0 3px rgba(44, 128, 255, 0.1)';
});

inputValue.addEventListener('blur', function() {
    this.parentElement.style.boxShadow = 'none';
});