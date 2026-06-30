document.addEventListener('DOMContentLoaded', function () {


  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var navLinks = document.getElementById('navLinks');

  var servicosDetails = document.querySelector('header details');
  var servicosDropdown = document.querySelector('header .dropdown');

  // ---------- Abrir/fechar o menu principal ----------
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');

      // Anima o ícone do hamburguer para "X"
      hamburgerBtn.classList.toggle('is-active');

      // Atualiza atributo de acessibilidade
      hamburgerBtn.setAttribute('aria-expanded', isOpen);

      // Se o menu for fechado, fecha também o dropdown de Serviços
      if (!isOpen && servicosDetails) {
        servicosDetails.removeAttribute('open');
      }
    });
  }

  if (servicosDetails) {
    servicosDetails.addEventListener('toggle', function () {
      var isOpen = servicosDetails.open;
      var summary = servicosDetails.querySelector('summary');
      if (summary) {
        summary.setAttribute('aria-expanded', isOpen);
      }
    });
  }

  // BUSCA INTELIGENTE: redireciona por palavra-chave   //
  
  var searchForm = document.getElementById('searchForm');
  var searchInput = document.getElementById('searchInput');

  // Cada item do array representa: a página de destino e
  // as palavras-chave que, se encontradas no texto digitado,
  // levam o cliente direto para essa página.
  var searchRoutes = [
    {
      page: 'contato.html',
      keywords: ['fale conosco', 'contato', 'falar com', 'atendimento', 'whatsapp', 'telefone']
    },
    {
      page: 'orcamento.html',
      keywords: ['orçamento', 'orcamento', 'preço', 'preco', 'quanto custa', 'valor']
    },
    {
      page: 'manutencao.html',
      keywords: ['manutenção', 'manutencao', 'conserto', 'reparo', 'assistencia', 'assistência']
    },
    {
      page: 'compra.html',
      keywords: ['comprar', 'compra', 'produto', 'produtos', 'loja', 'catálogo', 'catalogo']
    },
    {
      page: 'quemSomos.html',
      keywords: ['quem somos', 'sobre nós', 'sobre nos', 'empresa', 'história', 'historia']
    },
    {
      page: 'avaliacoes.html',
      keywords: ['avaliações', 'avaliacoes', 'avaliação', 'avaliacao', 'reviews']
    }
  ];

  // Função que verifica se o texto digitado bate com alguma palavra-chave
  // e retorna a página de destino correspondente (ou null se não encontrar)
  function buscarPaginaPorPalavraChave(texto) {
    var textoNormalizado = texto.trim().toLowerCase();

    for (var i = 0; i < searchRoutes.length; i++) {
      var rota = searchRoutes[i];

      for (var j = 0; j < rota.keywords.length; j++) {
        // .includes() verifica se a palavra-chave está contida no texto digitado
        // (não precisa ser exatamente igual, ex: "quero falar contato" também funciona)
        if (textoNormalizado.includes(rota.keywords[j])) {
          return rota.page;
        }
      }
    }

    return null; // nenhuma palavra-chave encontrada
  }

  // Intercepta o envio do formulário de busca
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault(); // impede o envio padrão do formulário

      var textoDigitado = searchInput.value;

      if (textoDigitado.trim() === '') {
        return; // não faz nada se o campo estiver vazio
      }

      var paginaEncontrada = buscarPaginaPorPalavraChave(textoDigitado);

      if (paginaEncontrada) {
        // Encontrou uma palavra-chave correspondente: redireciona direto
        window.location.href = paginaEncontrada;
      } else {
        // Nenhuma palavra-chave bateu: exibe um aviso simples ao cliente
        alert('Não encontramos nenhuma página para "' + textoDigitado + '". Tente palavras como: orçamento, manutenção, comprar, contato.');
      }
    });
  }
});
