document.addEventListener('DOMContentLoaded', () => {
    const recipeGrid = document.getElementById('recipe-grid');
    const modal = document.getElementById('recipe-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalRecipeName = document.getElementById('modal-recipe-name');
    const modalRecipeContent = document.getElementById('modal-recipe-content');
    
    console.log('Modal element:', modal);
    console.log('Close button element:', closeModalBtn);

    function formatRecipeText(text) {
        let processedText = text
            .replace(/\*\*(Ingredientes Mágicos:)\*\*/g, '%%SECTION_BREAK%%<h3>$1</h3>')
            .replace(/\*\*(Passo a Passo Encantado:)\*\*/g, '%%SECTION_BREAK%%<h3>$1</h3>');

        const sections = processedText.split('%%SECTION_BREAK%%');
        let finalHtml = '';

        for (const section of sections) {
            if (section.startsWith('<h3>Ingredientes Mágicos:</h3>')) {
                const content = section.substring('<h3>Ingredientes Mágicos:</h3>'.length);
                const items = content.trim().split('\n').filter(line => line.trim()).map(line => `<li>${line.replace(/^[*\-]\s*/, '').trim()}</li>`).join('');
                finalHtml += `<h3 class="text-2xl font-bold text-pink-400 mt-4 mb-2">Ingredientes Mágicos:</h3><ul class="list-disc list-inside space-y-1">${items}</ul>`;
            } else if (section.startsWith('<h3>Passo a Passo Encantado:</h3>')) {
                const content = section.substring('<h3>Passo a Passo Encantado:</h3>'.length);
                const items = content.trim().split('\n').filter(line => line.trim()).map(line => `<li>${line.replace(/^[*\-]\s*/, '').trim()}</li>`).join('');
                finalHtml += `<h3 class="text-2xl font-bold text-pink-400 mt-4 mb-2">Passo a Passo Encantado:</h3><ol class="list-decimal list-inside space-y-2">${items}</ol>`;
            }
        }
        
        return finalHtml || '<p class="text-center text-gray-500">Não foi possível formatar a receita. Tente novamente! 😔</p>';
    }

    async function generateRecipe(recipeName) {
        modalRecipeContent.innerHTML = `<div class="flex flex-col items-center justify-center p-8"><div class="loader w-12 h-12 rounded-full"></div><p class="text-center text-gray-500 animate-pulse mt-4 text-lg">A magia está a acontecer...</p></div>`;

        const prompt = `Por favor, cria uma receita simples e deliciosa para ${recipeName}. A receita deve ser escrita num estilo 'kawaii', muito fofo, encorajador e fácil de seguir por principiantes. Usa emojis para a deixar mais divertida. O output deve estar em Markdown e usar os seguintes títulos exatamente: '**Ingredientes Mágicos:**' e '**Passo a Passo Encantado:**'. Os ingredientes e os passos devem ser listas com marcadores (*).`;
        
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
            const result = await response.json();
            if (result.candidates && result.candidates[0].content?.parts?.length > 0) {
                const rawText = result.candidates[0].content.parts[0].text;
                modalRecipeContent.innerHTML = formatRecipeText(rawText);
            } else {
                throw new Error('A resposta da API não continha o conteúdo esperado.');
            }
        } catch (error) {
            console.error("Erro ao chamar a API Gemini:", error);
            modalRecipeContent.innerHTML = '<p class="text-center text-red-500 font-bold p-8">Oops! A magia falhou. Por favor, tenta novamente. ✨</p>';
        }
    }

    function showModal(recipeName) {
        modalRecipeName.textContent = recipeName;
        modalRecipeContent.innerHTML = '';
        modal.classList.remove('modal-hidden');
        modal.classList.add('modal-visible');
        generateRecipe(recipeName);
    }

    function closeModal() {
        console.log('Função closeModal foi chamada');
        console.log('Modal antes:', modal.className);
        modal.classList.add('modal-hidden');
        modal.classList.remove('modal-visible');
        console.log('Modal depois:', modal.className);
    }

    recipeGrid.addEventListener('click', (event) => {
        const target = event.target.closest('.view-recipe-btn');
        if (target) {
            event.preventDefault();
            const recipeName = target.dataset.recipeName;
            showModal(recipeName);
        }
    });

    closeModalBtn.addEventListener('click', (event) => {
        console.log('Clicou no botão fechar');
        event.preventDefault();
        event.stopPropagation();
        closeModal();
    });
    
    modal.addEventListener('click', (event) => {
        console.log('Clicou no modal, target:', event.target);
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Adicionar evento de teclado para fechar com a tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.classList.contains('modal-hidden')) {
            console.log('Tecla ESC pressionada, fechando modal');
            closeModal();
        }
    });
    
    // Expondo a função closeModal globalmente para poder ser chamada pelo HTML
    window.closeModal = closeModal;
});
