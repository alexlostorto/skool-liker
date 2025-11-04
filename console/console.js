console.log("Skool Liker - Version anti-détection avec délais aléatoires");

// Configuration des délais (en millisecondes)
const config = {
    minDelay: 1000,        // Délai minimum entre les likes (1 seconde)
    maxDelay: 3000,        // Délai maximum entre les likes (3 secondes)
    pauseEvery: 5,         // Faire une pause tous les X likes
    pauseMinDuration: 3000, // Durée minimum de pause (3 secondes)
    pauseMaxDuration: 8000, // Durée maximum de pause (8 secondes)
    cycleDelay: 20000      // Délai entre chaque cycle complet (20 secondes)
};

let working = false;

// Fonction pour générer un délai aléatoire
function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
    console.log("🔍 Recherche des boutons like...");

    working = true;
    
    const likeButtons = document.querySelectorAll('button.styled__VoteButton-sc-1e3d9on-2');
    
    if (likeButtons.length === 0) {
        console.log("⚠️ Aucun bouton like trouvé sur cette page.");
        working = false;
        return;
    }

    console.log(`✓ ${likeButtons.length} boutons de vote trouvés\n`);

    let i = 0;
    let likedCount = 0;
    let alreadyLikedCount = 0;
    
    function clickButtons() {
        // Calculer le délai pour ce bouton (aléatoire)
        let currentDelay = getRandomDelay(config.minDelay, config.maxDelay);
        
        // Ajouter une pause plus longue tous les X likes
        if (likedCount > 0 && likedCount % config.pauseEvery === 0) {
            const pauseDuration = getRandomDelay(config.pauseMinDuration, config.pauseMaxDuration);
            console.log(`\n⏸️  Pause de ${(pauseDuration / 1000).toFixed(1)}s pour paraître naturel...\n`);
            currentDelay = pauseDuration;
        }
        
        setTimeout(function() {
            try {
                let likeButton = likeButtons[i];

                const originalBorder = likeButton.style.border;
                const originalBackground = likeButton.style.backgroundColor;
                
                likeButton.style.border = '3px solid red';
                likeButton.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                
                // Détection : Vérifier la présence de <rect> dans le SVG
                const svg = likeButton.querySelector('svg');
                const rects = svg ? svg.querySelectorAll('rect') : [];
                const isLiked = rects.length > 0;
                
                if (!isLiked) {
                    likeButton.click();
                    likedCount++;
                    
                    const nextDelay = i < likeButtons.length - 1 ? 
                        getRandomDelay(config.minDelay, config.maxDelay) : 0;
                    
                    console.log(`✓ Like ${likedCount} ajouté | Prochain dans ${(nextDelay / 1000).toFixed(1)}s`);
                    
                    setTimeout(() => {
                        likeButton.style.border = '3px solid green';
                        likeButton.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
                    }, 100);
                } else {
                    alreadyLikedCount++;
                    console.log(`⊘ Déjà liké (${alreadyLikedCount})`);
                    
                    likeButton.style.border = '3px solid orange';
                    likeButton.style.backgroundColor = 'rgba(255, 165, 0, 0.1)';
                }
                
                setTimeout(() => {
                    likeButton.style.border = originalBorder;
                    likeButton.style.backgroundColor = originalBackground;
                }, 600);
                
            } catch(err) {
                console.error(`❌ Erreur sur le bouton ${i + 1}:`, err);
            }
            
            i++;
            if (i < likeButtons.length) {
                clickButtons();
            } else {
                working = false;
                console.log(`\n${'═'.repeat(50)}`);
                console.log(`✅ CYCLE TERMINÉ!`);
                console.log(`   • ${likedCount} nouveaux likes ajoutés`);
                console.log(`   • ${alreadyLikedCount} déjà likés (ignorés)`);
                console.log(`   • ${likeButtons.length} boutons traités au total`);
                console.log(`\n⏳ Prochain cycle dans ${config.cycleDelay / 1000}s...`);
                console.log('═'.repeat(50) + '\n');
            }
        }, currentDelay);
    }

    clickButtons();
}

// Message de bienvenue avec configuration
console.log("\n" + '═'.repeat(50));
console.log("   🎯 SKOOL LIKER - MODE FURTIF ACTIVÉ");
console.log('═'.repeat(50));
console.log("\n📊 Configuration:");
console.log(`   • Délai entre likes: ${config.minDelay / 1000}s - ${config.maxDelay / 1000}s (aléatoire)`);
console.log(`   • Pause tous les ${config.pauseEvery} likes: ${config.pauseMinDuration / 1000}s - ${config.pauseMaxDuration / 1000}s`);
console.log(`   • Cycle complet tous les ${config.cycleDelay / 1000}s`);
console.log("\n🎨 Indicateurs visuels:");
console.log("   🔴 Rouge = Vérification en cours");
console.log("   🟢 Vert = Nouveau like ajouté");
console.log("   🟠 Orange = Déjà liké (ignoré)");
console.log('═'.repeat(50) + '\n');

// Démarrage initial
const initialDelay = getRandomDelay(2000, 5000);
console.log(`⏳ Démarrage dans ${(initialDelay / 1000).toFixed(1)}s...\n`);
setTimeout(main, initialDelay);

// Répéter automatiquement avec délai aléatoire
setInterval(function() {
    if (working) {return}
    console.log("🔄 Nouveau cycle démarré...\n");
    main();
}, config.cycleDelay);
