/* main.js */


// 1. On attend que la page HTML (le DOM) soit complètement chargée
// Avant de tenter de manipuler le DOM, on s'assure qu'il existe.
document.addEventListener('DOMContentLoaded', () => {
   
    // Message de vérification dans la console F12
    console.log('Le DOM est prêt. Lancement du fetch...');


    // 2. On lance la requête (asynchrone) pour lire le fichier data.json
    fetch('http://127.0.0.1:8000/api/status')
        .then(response => response.json()) // 3. On convertit la réponse en objet JSON
        .then(data => {
            // 4. Cette partie s'exécute quand les données sont arrivées
            console.log('Données reçues :', data);

            // 5. MISE À JOUR DU SERVEUR (SRV-01)
            const serveurElement = document.getElementById('statut-serveur-principal');
            serveurElement.textContent = data.srv01;

            // --- Couleur selon le statut ---
            if (data.srv01 === 'En Ligne') {
                serveurElement.style.color = 'green';
            } else {
                serveurElement.style.color = 'red';
            }

            // 6. MISE À JOUR DE LA CAMÉRA (CAM-01)
            const cameraElement = document.getElementById('statut-camera-1');
            cameraElement.textContent = data.cam01;

            // --- Couleur selon le statut ---
            if (data.cam01 === 'Allumée') {
                cameraElement.style.color = 'green';
            } else {
                cameraElement.style.color = 'red';
            }


            // 7. MISE À JOUR DU PARE-FEU (FW-01)
            const firewallElement = document.getElementById('statut-pare-feu');
            firewallElement.textContent = data.fw01;

            // --- Couleur selon le statut ---
            if (data.fw01 === 'En Ligne') {
                firewallElement.style.color = 'green';
            } else {
                firewallElement.style.color = 'red';
            }
        });
    

        // --- BOUTON DE BASCULE JOUR / NUIT ---
    const toggleBtn = document.getElementById('toggle-theme');
    const body = document.body;

    // Si l'utilisateur a déjà choisi un thème, on le charge
    if (localStorage.getItem('theme') === 'nuit') {
        body.classList.add('nuit');
        toggleBtn.textContent = '☀️ Mode Jour';
    }

    // Quand on clique sur le bouton
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('nuit');

        if (body.classList.contains('nuit')) {
            toggleBtn.textContent = '☀️ Mode Jour';
            localStorage.setItem('theme', 'nuit');
        } else {
            toggleBtn.textContent = '🌙 Mode Nuit';
            localStorage.setItem('theme', 'jour');
        }
    });


    // Ce message s'affichera AVANT "Données reçues"
    console.log('Fin du script principal (Le fetch est parti, mais pas encore revenu)');
});