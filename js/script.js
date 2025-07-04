document.addEventListener('DOMContentLoaded', () => {
    const recipeGrid = document.getElementById('recipe-grid');
    const modal = document.getElementById('recipe-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalRecipeName = document.getElementById('modal-recipe-name');
    const modalRecipeContent = document.getElementById('modal-recipe-content');
    
    console.log('Modal element:', modal);
    console.log('Close button element:', closeModalBtn);

    // Inicializar navegação de receitas
    const recipeScroller = document.querySelector('.recipe-scroller');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const pageIndicator = document.querySelector('.page-indicator');
    
    // Variáveis de controle da paginação
    let currentPage = 0;
    let totalPages = 1;
    
    // Configurar navegação após o carregamento completo da página
    window.addEventListener('load', () => {
        // Determinar o número total de páginas
        const recipes = document.querySelectorAll('#recipe-grid > div');
        totalPages = Math.ceil(recipes.length / 6);
        
        // Atualizar o indicador de páginas
        updatePageIndicator();
        
        // Configurar os botões de navegação
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentPage > 0) {
                    currentPage--;
                    updatePageDisplay();
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages - 1) {
                    currentPage++;
                    updatePageDisplay();
                }
            });
        }
        
        // Configuração inicial
        updatePageDisplay();
    });

    // Atualiza a exibição da página atual
    function updatePageDisplay() {
        // Atualiza o indicador de página
        updatePageIndicator();
        
        // Determina quais receitas mostrar
        const recipes = document.querySelectorAll('#recipe-grid > div');
        const recipesPerPage = 6;
        const startIndex = currentPage * recipesPerPage;
        const endIndex = startIndex + recipesPerPage;
        
        // Atualiza a visibilidade das receitas
        recipes.forEach((recipe, index) => {
            if (index >= startIndex && index < endIndex) {
                recipe.style.display = 'flex';
            } else {
                recipe.style.display = 'none';
            }
        });
        
        // Atualiza o estado dos botões
        if (prevButton) {
            prevButton.disabled = currentPage === 0;
            prevButton.classList.toggle('opacity-50', currentPage === 0);
            prevButton.classList.toggle('cursor-not-allowed', currentPage === 0);
        }
        
        if (nextButton) {
            nextButton.disabled = currentPage === totalPages - 1;
            nextButton.classList.toggle('opacity-50', currentPage === totalPages - 1);
            nextButton.classList.toggle('cursor-not-allowed', currentPage === totalPages - 1);
        }
    }
    
    // Atualiza o indicador de página
    function updatePageIndicator() {
        if (pageIndicator) {
            pageIndicator.textContent = `Página ${currentPage + 1}/${totalPages}`;
        }
    }

    // Função para exibir receitas estáticas pré-definidas quando o usuário não fornece API key
    function showStaticRecipe(recipeName) {
        const staticRecipes = {
            'Brigadeiro': {
                ingredients: [
                    "1 lata de leite condensado (395g) 🍬",
                    "3 colheres (sopa) de chocolate em pó 🍫",
                    "1 colher (sopa) de manteiga sem sal 🧈",
                    "1 pitadinha de sal 🧂",
                    "Chocolate granulado para decorar 🌈"
                ],
                steps: [
                    "Em uma panela antiaderente, coloque o leite condensado, o chocolate em pó, a manteiga e o salzinho ✨",
                    "Misture tudo com carinho antes de levar ao fogo para os ingredientes ficarem amiguinhos 💕",
                    "Leve ao fogo médio-baixo, mexendo sem parar com uma colher de pau (parece uma dança!) 💃",
                    "Continue mexendo por cerca de 10-15 minutinhos, até a massa desgrudar do fundo da panela 🕐",
                    "O ponto certo é quando você passa a colher e consegue ver o fundo da panela por alguns segundos ✨",
                    "Despeje a massa em um prato untado com manteiga e deixe esfriar completamente 🧊",
                    "Depois que esfriar, passe um pouquinho de manteiga nas mãos para não grudar 👐",
                    "Faça bolinhas pequenas (do tamanho que seu coração mandar!) 🍫",
                    "Passe as bolinhas no chocolate granulado, cobrindo toda a superfície 🌈",
                    "Coloque cada brigadeirinho em forminhas de papel coloridas 🌸",
                    "Se conseguir esperar, leve à geladeira por 30 minutinhos antes de servir (quase impossível resistir!) 💖"
                ]
            },
            'Pão de Mel': {
                ingredients: [
                    "2 xícaras de farinha de trigo ✨",
                    "1 xícara de mel puro 🍯",
                    "1/2 xícara de açúcar mascavo 🍭",
                    "1 xícara de leite morno 🥛",
                    "2 colheres (sopa) de manteiga derretida 🧈",
                    "1 ovo 🥚",
                    "1 colher (sopa) de chocolate em pó 🍫",
                    "1 colher (sopa) de canela em pó 🌰",
                    "1 colher (chá) de cravo em pó 🌱",
                    "1 colher (chá) de bicarbonato de sódio 🧪",
                    "Para a cobertura: 200g de chocolate meio amargo derretido 🍫"
                ],
                steps: [
                    "Em uma tigela grande, misture a farinha, o chocolate em pó, a canela, o cravo e o bicarbonato - todas as coisinhas sequinhas! 🌸",
                    "Em outra tigela, bata o ovo com o açúcar mascavo até ficar fofinho como nuvem ☁️",
                    "Adicione o mel, o leite morno e a manteiga derretida, mexendo com carinho para fazer uma mistura mágica 🪄",
                    "Aos poucos, vá incorporando os ingredientes secos à mistura molhada, mexendo com delicadeza 🧁",
                    "A massa ficará bem molinha e perfumada - não se preocupe, é assim mesmo! 💕",
                    "Despeje a massa em uma forma retangular forrada com papel manteiga 📝",
                    "Asse em forno preaquecido a 180°C por aproximadamente 20-25 minutinhos encantados 🧚‍♀️",
                    "Espete um palito para verificar se está assado - deve sair limpo e feliz! 🧪",
                    "Deixe esfriar completamente antes de cortar em quadradinhos ou retângulos 🍯",
                    "Derreta o chocolate em banho-maria ou no micro-ondas com cuidadinho 🍫",
                    "Mergulhe cada pedacinho de pão de mel no chocolate derretido, cobrindo completamente 🧁",
                    "Coloque em uma grade para o excesso de chocolate escorrer e a casquinha ficar crocante 🌟",
                    "Deixe secar completamente antes de servir ou guardar em um potinho fechado 🎁",
                    "Estes paezinhos de mel duram até 5 dias guardados... mas vão sumir bem antes disso! 😉"
                ]
            },
            'Cupcake': {
                ingredients: [
                    "2 xícaras de farinha de trigo peneirada ✨",
                    "1 xícara de açúcar 🍭",
                    "2 ovos grandes 🥚",
                    "1/2 xícara de manteiga ou óleo vegetal 🧈",
                    "3/4 xícara de leite 🥛",
                    "1 colher de sopa de fermento em pó 🧁",
                    "1 colher de chá de essência de baunilha 🌼",
                    "Pitadinha de sal 🧂",
                    "Corante alimentício de sua cor preferida (opcional) 🌈",
                    "Confeitos coloridos para decoração 🎉"
                ],
                steps: [
                    "Preaqueça o forninho a 180°C e coloque forminhas de papel nas cavidades da forma de cupcake 📝",
                    "Em uma tigela grande, misture a farinha, o açúcar e o sal com muito carinho 🧁",
                    "Em outra tigela, bata os ovos e adicione a manteiga derretida (ou óleo), o leite e a essência de baunilha 🥚",
                    "Combine delicadamente os ingredientes secos e molhados, misturando até ficar homogêneo 🌸",
                    "Se quiser cupcakes coloridos, adicione algumas gotinhas de corante agora! 🌈",
                    "Por último, coloque o fermento e misture apenas o suficiente para incorporar ✨",
                    "Distribua a massa nas forminhas até 2/3 da capacidade 🧁",
                    "Asse por 18-20 minutinhos ou até que, ao espetar um palito, ele saia limpinho 🧪",
                    "Deixe esfriar completamente antes de decorar com cobertura e confeitos 🎉",
                    "Faça com muito amor e divirta-se preparando esses cupcakes mágicos! 💕"
                ]
            },
            'Cookie': {
                ingredients: [
                    "1 xícara de manteiga em temperatura ambiente 🧈",
                    "1 xícara de açúcar (metade refinado, metade mascavo para ficar mais fofinho) 🍭",
                    "2 ovos lindos ��",
                    "1 colherinha de essência de baunilha 🌼",
                    "2 1/2 xícaras de farinha de trigo 🌾",
                    "1 colher de chá de fermento em pó ✨",
                    "1/2 colher de chá de sal 🧂",
                    "1 xícara de gotas de chocolate (ou mais, se você for como eu!) 🍫",
                    "1/2 xícara de nozes picadinhas (opcional) 🌰"
                ],
                steps: [
                    "Bata a manteiga com os açúcares até ficar cremosinho e fofo (tipo nuvem, sabe?) 🧈",
                    "Acrescente os ovinhos um de cada vez, batendo bem após cada adição 🥚",
                    "Adicione a baunilha e misture até ficar perfumado e irresistível 🌸",
                    "Em outra tigela, misture a farinha, o fermento e o sal 📝",
                    "Vá adicionando aos pouquinhos a mistura seca aos ingredientes molhados, mexendo com amor 🌈",
                    "Junte as gotinhas de chocolate e as nozes, misturando delicadamente 🍫",
                    "Faça bolinhas do tamanho que seu coração mandar e coloque-as numa assadeira forrada com papel manteiga 🍪",
                    "Deixe um espacinho entre elas porque vão crescer e fazer amizade no forno 💞",
                    "Asse em forno preaquecido a 180°C por 10-12 minutinhos (o segredo é tirar quando ainda parecerem um pouquinho moles!) ✨",
                    "Deixe esfriar... ou não! Cookies quentinhos com chocolate derretido são um abraço para a alma! 💝"
                ]
            },
            'Bolo de Cenoura': {
                ingredients: [
                    "3 cenouras médias, descascadas e raladas 🥕",
                    "4 ovos 🥚",
                    "1 xícara de óleo vegetal 🧴",
                    "2 xícaras de açúcar 🍭",
                    "2 xícaras de farinha de trigo ✨",
                    "1 colher de sopa de fermento em pó 🧁",
                    "1 pitadinha de sal 🧂",
                    "Para cobertura: 4 colheres de sopa de chocolate em pó 🍫",
                    "Para cobertura: 2 colheres de sopa de manteiga 🧈",
                    "Para cobertura: 1 xícara de açúcar 🍬",
                    "Para cobertura: 1/2 xícara de leite 🥛"
                ],
                steps: [
                    "No seu liquidificador mágico, bata as cenouras, os ovos e o óleo até ficar bem lisinho 🥕",
                    "Em uma tigela grande e fofa, misture o açúcar, a farinha e o sal 🍭",
                    "Despeje a mistura do liquidificador e incorpore tudo com movimentos leves e carinhosos 💫",
                    "Por último, adicione o fermento e misture apenas o suficiente para ele dizer olá para os outros ingredientes ✨",
                    "Despeje em uma forma untada e enfarinhada com muito amor 💝",
                    "Asse em forno preaquecido a 180°C por aproximadamente 40 minutinhos mágicos 🧁",
                    "Para a cobertura dos sonhos: em uma panelinha, misture o chocolate em pó, a manteiga, o açúcar e o leite 🍫",
                    "Leve ao fogo médio, mexendo sem parar como se estivesse dançando, até começar a borbulhar e engrossar 🧪",
                    "Despeje a cobertura sobre o bolo ainda quentinho para ela derreter e abraçar cada pedacinho 🍰",
                    "Espere esfriar se você conseguir resistir! (Eu nunca consigo!) 💖"
                ]
            },
            'Pudim': {
                ingredients: [
                    "Para o caramelo: 1 xícara de açúcar 🍭",
                    "Para o caramelo: 1/3 xícara de água 💧",
                    "3 ovos inteiros 🥚",
                    "1 lata de leite condensado 🥛",
                    "2 medidas (da lata) de leite integral ��",
                    "1 colher de chá de essência de baunilha 🌼"
                ],
                steps: [
                    "Primeiro vamos fazer o caramelinho mágico: em uma panela, derreta o açúcar até ficar douradinho e brilhante ✨",
                    "Com muito cuidado, adicione a água (vai borbulhar!) e mexa até dissolver completamente 💫",
                    "Despeje esse caramelo em uma forma de pudim e gire para cobrir todo o fundo e laterais. Depois reserve 🍯",
                    "No seu liquidificador feliz, bata todos os ingredientes do pudim até ficar bem lisinho e fofo 🌟",
                    "Despeje essa mistura na forma caramelizada com muito carinho 💝",
                    "Cubra com papel alumínio para dar um abracinho protetor 🤗",
                    "Coloque a forma dentro de uma assadeira maior com água quente (banho-maria) 💦",
                    "Leve para assar em forno preaquecido a 180°C por cerca de 45-50 minutinhos encantados 🧁",
                    "O pudim estará pronto quando estiver firme, mas ainda com aquele balancinho alegre no meio! 💃",
                    "Deixe esfriar completamente e leve para a geladeira por pelo menos 4 horinhas (ou a noite toda para ficar ainda mais gostoso) 🌙",
                    "Na hora de servir, passe uma faquinha nas bordas e vire com confiança em um prato! 🍮"
                ]
            }
        };
        
        // Obter a receita estática correspondente ao nome selecionado
        const recipe = staticRecipes[recipeName] || {
            ingredients: ["Ingredientes não disponíveis para esta receita sem API key."],
            steps: ["Passos não disponíveis para esta receita sem API key."]
        };
        
        // Formatar a receita estática em HTML
        let html = `
            <div class="recipe-static-content">
                <div class="mb-4">
                    <h3 class="text-2xl font-bold text-pink-400 mt-4 mb-2">Ingredientes Mágicos:</h3>
                    <ul class="list-disc list-inside space-y-1">
                        ${recipe.ingredients.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-pink-400 mt-4 mb-2">Passo a Passo Encantado:</h3>
                    <ol class="list-decimal list-inside space-y-2">
                        ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                <div class="mt-6 p-4 bg-pink-50 rounded-lg">
                    <p class="text-sm text-gray-600">Estas são receitas pré-definidas. Para receitas personalizadas, use a API Gemini.</p>
                    <p class="text-sm text-gray-600 mt-2">
                        <a href="https://ai.google.dev/" target="_blank" class="text-pink-500 underline">Saiba mais sobre a API Gemini</a>
                    </p>
                </div>
            </div>
        `;
        
        modalRecipeContent.innerHTML = html;
    }

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
    
    // Função para tratar erros da API
    function handleApiError(error, recipeName) {
        // Verificar se é um erro de API key inválida
        if (error.message.includes('API key') || error.message.includes('403')) {
            modalRecipeContent.innerHTML = `
                <div class="text-center p-6">
                    <p class="text-red-500 font-bold mb-4">Oops! Parece que a chave API é inválida.</p>
                    <div class="bg-pink-50 p-4 rounded-xl text-left mb-4">
                        <h3 class="font-bold text-lg mb-2 text-pink-600">Como obter uma chave API:</h3>
                        <ol class="list-decimal list-inside space-y-2 text-gray-700">
                            <li>Visite <a href="https://ai.google.dev/" target="_blank" class="text-blue-500 underline">Google AI Studio</a></li>
                            <li>Faça login com sua conta Google</li>
                            <li>Navegue até as configurações da API</li>
                            <li>Crie uma nova chave de API</li>
                            <li>Copie a chave e insira quando solicitada</li>
                        </ol>
                    </div>
                    <div class="flex justify-between mt-4">
                        <button id="retry-api-key" class="bg-[#FF7A95] text-white py-2 px-4 rounded-full font-semibold">Tentar com API</button>
                        <button id="use-static-recipe" class="bg-gray-200 text-gray-700 py-2 px-4 rounded-full font-semibold">Usar receita estática</button>
                    </div>
                </div>
            `;
            // Adicionar event listeners para os botões
            setTimeout(() => {
                const retryBtn = document.getElementById('retry-api-key');
                const staticBtn = document.getElementById('use-static-recipe');
                if (retryBtn) {
                    retryBtn.addEventListener('click', () => generateRecipe(recipeName));
                }
                if (staticBtn) {
                    staticBtn.addEventListener('click', () => showStaticRecipe(recipeName));
                }
            }, 100);
        } else {
            modalRecipeContent.innerHTML = '<p class="text-center text-red-500 font-bold p-8">Oops! A magia falhou. Por favor, tenta novamente. ✨</p>';
        }
    }

    // Função para solicitar API key usando nosso próprio modal
    function customPrompt(message, callback) {
        const apiKeyModal = document.getElementById('api-key-modal');
        const apiKeyInput = document.getElementById('api-key-input');
        const submitBtn = document.getElementById('api-key-submit');
        const cancelBtn = document.getElementById('api-key-cancel');
        
        // Limpar input anterior
        apiKeyInput.value = '';
        
        // Mostrar o modal
        apiKeyModal.classList.remove('modal-hidden');
        apiKeyModal.classList.add('modal-visible');
        
        // Focar no input
        setTimeout(() => apiKeyInput.focus(), 100);
        
        // Função para validar se o botão confirmar deve estar habilitado
        function validateApiKey() {
            const value = apiKeyInput.value.trim();
            const validationMessage = document.getElementById('api-key-validation-message');
            
            if (value) {
                submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                submitBtn.disabled = false;
                validationMessage.textContent = "API key pronta para uso";
                validationMessage.classList.remove('text-pink-600');
                validationMessage.classList.add('text-green-600');
            } else {
                submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
                submitBtn.disabled = true;
                validationMessage.textContent = "O botão Confirmar será habilitado após inserir a API key";
                validationMessage.classList.remove('text-green-600');
                validationMessage.classList.add('text-pink-600');
            }
        }
        
        // Configurar o botão para alternar a visibilidade da senha
        const togglePasswordVisibility = document.getElementById('toggle-password-visibility');
        if (togglePasswordVisibility) {
            togglePasswordVisibility.addEventListener('click', function() {
                const showIcon = this.querySelector('.eye-icon-show');
                const hideIcon = this.querySelector('.eye-icon-hide');
                
                if (apiKeyInput.type === 'password') {
                    apiKeyInput.type = 'text';
                    showIcon.classList.add('hidden');
                    hideIcon.classList.remove('hidden');
                } else {
                    apiKeyInput.type = 'password';
                    showIcon.classList.remove('hidden');
                    hideIcon.classList.add('hidden');
                }
            });
        }
        
        // Aplicar estado inicial do botão
        validateApiKey();
        
        // Adicionar listener para validar o input enquanto digita
        apiKeyInput.addEventListener('input', validateApiKey);
        
        // Configurar eventos
        submitBtn.onclick = function() {
            const value = apiKeyInput.value.trim();
            if (value) {
                apiKeyModal.classList.add('modal-hidden');
                apiKeyModal.classList.remove('modal-visible');
                callback(value);
            }
        };
        
        cancelBtn.onclick = function() {
            apiKeyModal.classList.add('modal-hidden');
            apiKeyModal.classList.remove('modal-visible');
            callback('');  // Valor vazio indica cancelamento
        };
        
        // Permitir pressionar Enter para confirmar
        apiKeyInput.onkeypress = function(e) {
            if (e.key === 'Enter' && apiKeyInput.value.trim()) {
                submitBtn.click();
            }
        };
    }
    
    async function generateRecipe(recipeName) {
        // Mostrar indicador de carregamento enquanto aguarda entrada do usuário
        modalRecipeContent.innerHTML = `<div class="flex flex-col items-center justify-center p-8"><div class="loader w-12 h-12 rounded-full"></div><p class="text-center text-gray-500 animate-pulse mt-4 text-lg">Aguardando configuração...</p></div>`;

        const recipePrompt = `Por favor, cria uma receita simples e deliciosa para ${recipeName}. A receita deve ser escrita num estilo 'kawaii', muito fofo, encorajador e fácil de seguir por principiantes. Usa emojis para a deixar mais divertida. O output deve estar em Markdown e usar os seguintes títulos exatamente: '**Ingredientes Mágicos:**' e '**Passo a Passo Encantado:**'. Os ingredientes e os passos devem ser listas com marcadores (*).`;
        
        const payload = { contents: [{ role: "user", parts: [{ text: recipePrompt }] }] };
        
        // Usar nosso modal personalizado para solicitar a API key
        customPrompt("Por favor, insira sua chave de API do Google Gemini", async (apiKey) => {
            // Se o usuário cancelar ou não fornecer uma chave, mostrar conteúdo estático
            if (!apiKey) {
                showStaticRecipe(recipeName);
                return;
            }
            
            // Mostrar indicador de carregamento para geração da receita
            modalRecipeContent.innerHTML = `<div class="flex flex-col items-center justify-center p-8"><div class="loader w-12 h-12 rounded-full"></div><p class="text-center text-gray-500 animate-pulse mt-4 text-lg">A magia está a acontecer...</p></div>`;
            
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            // Tentar gerar a receita
            try {
                const response = await fetch(apiUrl, { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify(payload) 
                });
                
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
                handleApiError(error, recipeName);
            }
        });
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
