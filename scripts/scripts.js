document.addEventListener("DOMContentLoaded", function () {
        let currentLocation = window.location.pathname.split("/").pop(); // Obtiene el nombre del archivo actual
        let navLinks = document.querySelectorAll(".nav a"); // Selecciona todos los enlaces del nav
    
        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentLocation) {
                link.classList.add("active"); // Agrega la clase "active" si coincide con la URL
            }
        });
    });


    function searchPage(event) {
        event.preventDefault();
        let query = document.getElementById("searchInput").value.toLowerCase().trim();
    
        let sections = {
            "home": "index.html",
            "inicio": "index.html",
            "proyectos": "Proyects.html",
            "proyects": "Proyects.html",
            "developers": "Developers.html",
            "devs": "Developers.html",
            "quienes somos": "descripcion.html",
            "descripcion": "descripcion.html",
            "login": "Login.html",
            "registro": "registro.html",
            "signup": "registro.html"
        };
    
        // Si hay coincidencia exacta
        if (sections[query]) {
            window.location.href = sections[query];
            return;
        }
    
        // Búsqueda predictiva basada en similitud
        let bestMatch = null;
        let bestScore = Infinity;
    
        Object.keys(sections).forEach(section => {
            let score = levenshteinDistance(query, section);
            if (score < bestScore) {
                bestScore = score;
                bestMatch = section;
            }
        });
    
        // Si la mejor coincidencia está cerca del input del usuario, redirigir
        if (bestScore <= 3) { // Ajusta el umbral de similitud (3 permite errores leves)
            window.location.href = sections[bestMatch];
        } else {
            alert("Sección no encontrada. Intenta con: Home, Proyectos, Developers, Quienes somos, Login, Registro.");
        }
    }
    
    // Función para calcular la distancia de Levenshtein (búsqueda difusa)
    function levenshteinDistance(a, b) {
        let tmp;
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        if (a.length > b.length) tmp = a, a = b, b = tmp;
    
        let row = Array(a.length + 1).fill(0).map((_, i) => i);
    
        for (let i = 1; i <= b.length; i++) {
            let prev = i;
            for (let j = 1; j <= a.length; j++) {
                let val = row[j - 1];
                if (b[i - 1] !== a[j - 1]) {
                    val = Math.min(row[j - 1] + 1, Math.min(prev + 1, row[j] + 1));
                }
                row[j - 1] = prev;
                prev = val;
            }
            row[a.length] = prev;
        }
    
        return row[a.length];
    }
    
    
    