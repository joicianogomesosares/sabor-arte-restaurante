/* ============================================================
   app.js — Lógica do site Sabor & Arte
   Vanilla JS, sem módulos (funciona em file:// e GitHub Pages).
   ============================================================ */
(function () {
  'use strict';

  /* Chaves de armazenamento */
  const LS_CART = 'saborarte_carrinho';
  const LS_RESERVAS = 'saborarte_reservas';
  const LS_TEMA = 'saborarte_tema';

  /* Estado do carrinho: { [id]: quantidade } */
  let carrinho = carregarCarrinho();

  /* ---------- Utilidades ---------- */

  function formatarBRL(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function itemPorId(id) {
    return CARDAPIO.find(function (p) { return p.id === id; });
  }

  function carregarCarrinho() {
    try {
      const bruto = localStorage.getItem(LS_CART);
      return bruto ? JSON.parse(bruto) : {};
    } catch (e) {
      return {};
    }
  }

  function salvarCarrinho() {
    try {
      localStorage.setItem(LS_CART, JSON.stringify(carrinho));
    } catch (e) { /* localStorage indisponível — ignora silenciosamente */ }
  }

  /* Toast de notificação */
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () { el.hidden = true; }, 300);
    }, 2200);
  }

  /* ---------- Arte SVG por tema (sem imagens externas) ---------- */

  function arteSVG(tema) {
    switch (tema) {
      case 'massa':
        return svgWrap('grad-massa', [
          '<ellipse cx="60" cy="66" rx="42" ry="14" fill="rgba(0,0,0,.12)"/>',
          '<g fill="none" stroke="#f2c14e" stroke-width="3" stroke-linecap="round">',
          '<path d="M24 60 Q45 34 60 44 Q78 55 96 46"/>',
          '<path d="M26 66 Q48 44 62 52 Q80 62 94 54"/>',
          '<path d="M28 72 Q46 56 60 60 Q78 68 92 62"/>',
          '</g>',
          '<circle cx="52" cy="56" r="6" fill="#c0392b"/>',
          '<circle cx="74" cy="60" r="5" fill="#c0392b"/>',
          '<path d="M64 48 q5 -7 12 -3" stroke="#3f8f4f" stroke-width="3" fill="none" stroke-linecap="round"/>'
        ]);
      case 'pizza':
        return svgWrap('grad-pizza', [
          '<circle cx="60" cy="58" r="38" fill="#e8c48a"/>',
          '<circle cx="60" cy="58" r="30" fill="#c0392b"/>',
          '<circle cx="48" cy="50" r="6" fill="#fbe4c4"/>',
          '<circle cx="70" cy="52" r="7" fill="#fbe4c4"/>',
          '<circle cx="62" cy="70" r="6" fill="#fbe4c4"/>',
          '<path d="M52 44 q4 -6 10 -2" stroke="#3f8f4f" stroke-width="3" fill="none" stroke-linecap="round"/>',
          '<path d="M66 64 q4 -6 10 -2" stroke="#3f8f4f" stroke-width="3" fill="none" stroke-linecap="round"/>'
        ]);
      case 'sobremesa':
        return svgWrap('grad-sobremesa', [
          '<rect x="38" y="46" width="44" height="34" rx="5" fill="#6b4226"/>',
          '<rect x="38" y="46" width="44" height="12" rx="5" fill="#f3e2c7"/>',
          '<rect x="38" y="62" width="44" height="8" fill="#a9713f"/>',
          '<circle cx="60" cy="40" r="6" fill="#c0392b"/>',
          '<path d="M60 34 q3 -5 8 -4" stroke="#3f8f4f" stroke-width="2.5" fill="none" stroke-linecap="round"/>'
        ]);
      case 'bebida':
        return svgWrap('grad-bebida', [
          '<path d="M46 40 L74 40 L68 74 L52 74 Z" fill="rgba(255,255,255,.25)" stroke="#fff5e1" stroke-width="2"/>',
          '<path d="M49 50 L71 50 L67 70 L53 70 Z" fill="#7d1f2b" opacity="0.85"/>',
          '<line x1="60" y1="74" x2="60" y2="88" stroke="#fff5e1" stroke-width="3"/>',
          '<ellipse cx="60" cy="90" rx="12" ry="3" fill="#fff5e1"/>'
        ]);
      default: /* entrada */
        return svgWrap('grad-entrada', [
          '<ellipse cx="60" cy="64" rx="40" ry="12" fill="rgba(0,0,0,.12)"/>',
          '<rect x="30" y="52" width="60" height="12" rx="6" fill="#e0a86b"/>',
          '<circle cx="46" cy="52" r="7" fill="#c0392b"/>',
          '<circle cx="62" cy="52" r="7" fill="#c0392b"/>',
          '<circle cx="76" cy="52" r="6" fill="#c0392b"/>',
          '<path d="M50 44 q5 -7 12 -3" stroke="#3f8f4f" stroke-width="3" fill="none" stroke-linecap="round"/>'
        ]);
    }
  }

  /* Envolve os elementos num SVG com gradiente de fundo temático */
  function svgWrap(gradId, innerParts) {
    const cores = {
      'grad-massa': ['#fff3d6', '#f6d78a'],
      'grad-pizza': ['#ffe6c2', '#f0b46b'],
      'grad-sobremesa': ['#f6e2cf', '#d9a679'],
      'grad-bebida': ['#f3d9c0', '#c98b63'],
      'grad-entrada': ['#eef3d6', '#c7d68a']
    };
    const c = cores[gradId] || ['#eee', '#ccc'];
    return (
      '<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs><linearGradient id="' + gradId + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + c[0] + '"/>' +
      '<stop offset="100%" stop-color="' + c[1] + '"/></linearGradient></defs>' +
      '<rect width="120" height="100" fill="url(#' + gradId + ')"/>' +
      innerParts.join('') +
      '</svg>'
    );
  }

  /* ---------- Cardápio + filtros ---------- */

  let filtroAtivo = 'Todos';

  function montarFiltros() {
    const wrap = document.getElementById('menuFilters');
    if (!wrap) return;
    const todas = ['Todos'].concat(CATEGORIAS);
    wrap.innerHTML = todas.map(function (cat) {
      const ativo = cat === filtroAtivo;
      return (
        '<button class="filter-btn' + (ativo ? ' is-active' : '') + '" role="tab" ' +
        'aria-selected="' + ativo + '" data-cat="' + cat + '">' + cat + '</button>'
      );
    }).join('');

    wrap.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        filtroAtivo = btn.getAttribute('data-cat');
        montarFiltros();
        montarCardapio();
      });
    });
  }

  function montarCardapio() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    const itens = filtroAtivo === 'Todos'
      ? CARDAPIO
      : CARDAPIO.filter(function (p) { return p.categoria === filtroAtivo; });

    grid.innerHTML = itens.map(function (p) {
      return (
        '<article class="menu-card">' +
        '<div class="menu-card-art">' + arteSVG(p.tema) + '</div>' +
        '<div class="menu-card-body">' +
        '<div class="menu-card-head">' +
        '<h3>' + p.nome + '</h3>' +
        '<span class="menu-price">' + formatarBRL(p.preco) + '</span>' +
        '</div>' +
        '<span class="menu-tag">' + p.categoria + '</span>' +
        '<p class="menu-desc">' + p.desc + '</p>' +
        '<button class="btn btn-primary btn-add" data-add="' + p.id + '">Adicionar ao pedido</button>' +
        '</div>' +
        '</article>'
      );
    }).join('');

    grid.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        adicionarAoCarrinho(btn.getAttribute('data-add'));
      });
    });
  }

  /* ---------- Carrinho ---------- */

  function adicionarAoCarrinho(id) {
    carrinho[id] = (carrinho[id] || 0) + 1;
    salvarCarrinho();
    atualizarCarrinhoUI();
    const item = itemPorId(id);
    toast('“' + (item ? item.nome : 'Item') + '” adicionado ao pedido');
  }

  function alterarQtd(id, delta) {
    if (!carrinho[id]) return;
    carrinho[id] += delta;
    if (carrinho[id] <= 0) delete carrinho[id];
    salvarCarrinho();
    atualizarCarrinhoUI();
  }

  function removerItem(id) {
    delete carrinho[id];
    salvarCarrinho();
    atualizarCarrinhoUI();
  }

  function esvaziarCarrinho() {
    carrinho = {};
    salvarCarrinho();
    atualizarCarrinhoUI();
  }

  function totaisCarrinho() {
    let subtotal = 0;
    let qtd = 0;
    Object.keys(carrinho).forEach(function (id) {
      const item = itemPorId(id);
      if (!item) return;
      subtotal += item.preco * carrinho[id];
      qtd += carrinho[id];
    });
    const servico = subtotal * 0.10;
    return { subtotal: subtotal, servico: servico, total: subtotal + servico, qtd: qtd };
  }

  function atualizarCarrinhoUI() {
    const body = document.getElementById('cartBody');
    const t = totaisCarrinho();

    /* Contador no cabeçalho */
    const count = document.getElementById('cartCount');
    if (count) {
      count.textContent = String(t.qtd);
      count.classList.toggle('is-visible', t.qtd > 0);
    }

    /* Corpo do carrinho */
    if (body) {
      const ids = Object.keys(carrinho);
      if (ids.length === 0) {
        body.innerHTML = '<div class="cart-empty"><span aria-hidden="true">🍽️</span>' +
          '<p>Seu carrinho está vazio.</p><small>Adicione itens do cardápio para começar.</small></div>';
      } else {
        body.innerHTML = ids.map(function (id) {
          const item = itemPorId(id);
          if (!item) return '';
          const q = carrinho[id];
          return (
            '<div class="cart-item">' +
            '<div class="cart-item-art">' + arteSVG(item.tema) + '</div>' +
            '<div class="cart-item-info">' +
            '<strong>' + item.nome + '</strong>' +
            '<span class="cart-item-price">' + formatarBRL(item.preco) + '</span>' +
            '<div class="qty">' +
            '<button aria-label="Diminuir quantidade" data-dec="' + id + '">−</button>' +
            '<span aria-live="polite">' + q + '</span>' +
            '<button aria-label="Aumentar quantidade" data-inc="' + id + '">+</button>' +
            '<button class="cart-item-remove" aria-label="Remover item" data-rem="' + id + '">🗑️</button>' +
            '</div>' +
            '</div>' +
            '<div class="cart-item-sub">' + formatarBRL(item.preco * q) + '</div>' +
            '</div>'
          );
        }).join('');

        body.querySelectorAll('[data-inc]').forEach(function (b) {
          b.addEventListener('click', function () { alterarQtd(b.getAttribute('data-inc'), 1); });
        });
        body.querySelectorAll('[data-dec]').forEach(function (b) {
          b.addEventListener('click', function () { alterarQtd(b.getAttribute('data-dec'), -1); });
        });
        body.querySelectorAll('[data-rem]').forEach(function (b) {
          b.addEventListener('click', function () { removerItem(b.getAttribute('data-rem')); });
        });
      }
    }

    /* Totais */
    setText('cartSubtotal', formatarBRL(t.subtotal));
    setText('cartService', formatarBRL(t.servico));
    setText('cartTotal', formatarBRL(t.total));

    const checkout = document.getElementById('checkoutBtn');
    if (checkout) checkout.disabled = t.qtd === 0;
  }

  function setText(id, txt) {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  }

  /* Abrir/fechar drawer do carrinho */
  function abrirCarrinho() {
    document.getElementById('cartDrawer').classList.add('is-open');
    document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false');
    document.getElementById('cartOverlay').hidden = false;
    document.body.classList.add('no-scroll');
  }
  function fecharCarrinho() {
    document.getElementById('cartDrawer').classList.remove('is-open');
    document.getElementById('cartDrawer').setAttribute('aria-hidden', 'true');
    document.getElementById('cartOverlay').hidden = true;
    document.body.classList.remove('no-scroll');
  }

  /* ---------- Modal resumo do pedido ---------- */

  function abrirModalPedido() {
    const t = totaisCarrinho();
    if (t.qtd === 0) return;
    const resumo = document.getElementById('orderSummary');
    resumo.innerHTML =
      '<ul class="order-list">' +
      Object.keys(carrinho).map(function (id) {
        const item = itemPorId(id);
        if (!item) return '';
        const q = carrinho[id];
        return '<li><span>' + q + '× ' + item.nome + '</span><span>' +
          formatarBRL(item.preco * q) + '</span></li>';
      }).join('') +
      '</ul>' +
      '<div class="order-totals">' +
      '<div><span>Subtotal</span><span>' + formatarBRL(t.subtotal) + '</span></div>' +
      '<div><span>Taxa de serviço (10%)</span><span>' + formatarBRL(t.servico) + '</span></div>' +
      '<div class="order-grand"><span>Total</span><span>' + formatarBRL(t.total) + '</span></div>' +
      '</div>';
    document.getElementById('orderModal').hidden = false;
    document.body.classList.add('no-scroll');
  }

  function fecharModalPedido() {
    document.getElementById('orderModal').hidden = true;
    document.body.classList.remove('no-scroll');
  }

  /* ---------- Galeria ---------- */

  function montarGaleria() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = GALERIA.map(function (g) {
      const item = itemPorId(g.id);
      const tema = item ? item.tema : 'massa';
      return (
        '<figure class="gallery-card">' +
        '<div class="gallery-art">' + arteSVG(tema) + '</div>' +
        '<figcaption>' + g.legenda + '</figcaption>' +
        '</figure>'
      );
    }).join('');
  }

  /* ---------- Depoimentos ---------- */

  function estrelas(n) {
    let s = '';
    for (let i = 0; i < 5; i++) s += i < n ? '★' : '☆';
    return s;
  }

  function montarDepoimentos() {
    const wrap = document.getElementById('testimonials');
    if (!wrap) return;
    wrap.innerHTML = DEPOIMENTOS.map(function (d) {
      const iniciais = d.nome.split(' ').map(function (x) { return x[0]; }).slice(0, 2).join('');
      return (
        '<blockquote class="testimonial">' +
        '<div class="stars" aria-label="Nota ' + d.nota + ' de 5">' + estrelas(d.nota) + '</div>' +
        '<p>“' + d.texto + '”</p>' +
        '<footer><span class="avatar" aria-hidden="true">' + iniciais + '</span>' +
        '<span><strong>' + d.nome + '</strong><small>' + d.local + '</small></span></footer>' +
        '</blockquote>'
      );
    }).join('');
  }

  /* ---------- Reservas ---------- */

  function carregarReservas() {
    try {
      const bruto = localStorage.getItem(LS_RESERVAS);
      return bruto ? JSON.parse(bruto) : [];
    } catch (e) { return []; }
  }

  function salvarReservas(lista) {
    try { localStorage.setItem(LS_RESERVAS, JSON.stringify(lista)); } catch (e) {}
  }

  function formatarData(iso) {
    /* iso = "AAAA-MM-DD" -> "DD/MM/AAAA" sem depender de fuso */
    const partes = iso.split('-');
    if (partes.length !== 3) return iso;
    return partes[2] + '/' + partes[1] + '/' + partes[0];
  }

  function renderReservas() {
    const bloco = document.getElementById('reservasSalvas');
    const lista = document.getElementById('reservasLista');
    if (!bloco || !lista) return;
    const reservas = carregarReservas();
    if (reservas.length === 0) {
      bloco.hidden = true;
      return;
    }
    bloco.hidden = false;
    lista.innerHTML = reservas.map(function (r, i) {
      return (
        '<li class="reserva-item">' +
        '<div><strong>' + formatarData(r.data) + ' às ' + r.hora + '</strong>' +
        '<small>' + r.nome + ' · ' + r.pessoas + ' pessoa(s)</small></div>' +
        '<button class="reserva-cancelar" data-cancel="' + i + '" aria-label="Cancelar reserva">Cancelar</button>' +
        '</li>'
      );
    }).join('');

    lista.querySelectorAll('[data-cancel]').forEach(function (b) {
      b.addEventListener('click', function () {
        const idx = parseInt(b.getAttribute('data-cancel'), 10);
        const atuais = carregarReservas();
        atuais.splice(idx, 1);
        salvarReservas(atuais);
        renderReservas();
        toast('Reserva cancelada.');
      });
    });
  }

  /* Validação de campo individual; retorna true se válido */
  function validarCampo(input) {
    const grupo = input.closest('.field');
    const erroEl = grupo ? grupo.querySelector('.error-msg') : null;
    let msg = '';

    const val = (input.value || '').trim();

    if (input.hasAttribute('required') && !val) {
      msg = 'Este campo é obrigatório.';
    } else if (input.id === 'resNome' && val && val.length < 3) {
      msg = 'Informe o nome completo (mín. 3 letras).';
    } else if (input.id === 'resData' && val) {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const escolhida = new Date(val + 'T00:00:00');
      if (escolhida < hoje) msg = 'Escolha uma data a partir de hoje.';
    } else if (input.id === 'resPessoas' && val) {
      const n = parseInt(val, 10);
      if (isNaN(n) || n < 1 || n > 10) msg = 'Informe de 1 a 10 pessoas.';
    } else if (input.id === 'resTel' && val) {
      /* telefone opcional: se preenchido, exigir ao menos 8 dígitos */
      const digitos = val.replace(/\D/g, '');
      if (digitos.length < 8) msg = 'Telefone inválido.';
    }

    if (erroEl) erroEl.textContent = msg;
    input.classList.toggle('is-invalid', !!msg);
    return !msg;
  }

  function configurarReserva() {
    const form = document.getElementById('reserveForm');
    if (!form) return;

    /* Define data mínima = hoje */
    const dataInput = document.getElementById('resData');
    if (dataInput) {
      const hoje = new Date();
      const iso = hoje.getFullYear() + '-' +
        String(hoje.getMonth() + 1).padStart(2, '0') + '-' +
        String(hoje.getDate()).padStart(2, '0');
      dataInput.min = iso;
    }

    /* Validação em tempo real (blur) */
    form.querySelectorAll('input, select').forEach(function (el) {
      el.addEventListener('blur', function () { validarCampo(el); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const campos = form.querySelectorAll('input[required], select[required], #resTel');
      let ok = true;
      campos.forEach(function (c) { if (!validarCampo(c)) ok = false; });

      const feedback = document.getElementById('reserveFeedback');
      if (!ok) {
        feedback.textContent = 'Verifique os campos destacados e tente novamente.';
        feedback.className = 'form-feedback is-error';
        return;
      }

      const reserva = {
        nome: document.getElementById('resNome').value.trim(),
        data: document.getElementById('resData').value,
        hora: document.getElementById('resHora').value,
        pessoas: document.getElementById('resPessoas').value,
        telefone: document.getElementById('resTel').value.trim(),
        obs: document.getElementById('resObs').value.trim(),
        criadaEm: new Date().toISOString()
      };

      const reservas = carregarReservas();
      reservas.unshift(reserva);
      salvarReservas(reservas);
      renderReservas();

      feedback.innerHTML = '✅ Reserva confirmada para <strong>' + reserva.nome +
        '</strong> em <strong>' + formatarData(reserva.data) + '</strong> às <strong>' +
        reserva.hora + '</strong> · ' + reserva.pessoas + ' pessoa(s).';
      feedback.className = 'form-feedback is-success';

      form.reset();
      if (dataInput) dataInput.min = dataInput.min; // mantém min
      document.getElementById('resPessoas').value = '2';
      toast('Reserva confirmada! 🍷');
    });
  }

  /* ---------- Tema claro/escuro ---------- */

  function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    const icon = document.querySelector('#themeToggle .theme-icon');
    if (icon) icon.textContent = tema === 'dark' ? '☀️' : '🌙';
    try { localStorage.setItem(LS_TEMA, tema); } catch (e) {}
  }

  function configurarTema() {
    let tema;
    try { tema = localStorage.getItem(LS_TEMA); } catch (e) { tema = null; }
    if (!tema) {
      const prefereDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      tema = prefereDark ? 'dark' : 'light';
    }
    aplicarTema(tema);

    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        const atual = document.documentElement.getAttribute('data-theme');
        aplicarTema(atual === 'dark' ? 'light' : 'dark');
      });
    }
  }

  /* ---------- Navegação mobile + header scroll ---------- */

  function configurarNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        const aberto = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(aberto));
      });
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          menu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* Sombra no header ao rolar */
    const header = document.querySelector('.site-header');
    if (header) {
      const onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 20);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* ---------- Ligações de eventos gerais ---------- */

  function configurarEventos() {
    document.getElementById('cartButton').addEventListener('click', abrirCarrinho);
    document.getElementById('cartClose').addEventListener('click', fecharCarrinho);
    document.getElementById('cartOverlay').addEventListener('click', fecharCarrinho);
    document.getElementById('clearCartBtn').addEventListener('click', function () {
      esvaziarCarrinho();
      toast('Carrinho esvaziado.');
    });
    document.getElementById('checkoutBtn').addEventListener('click', function () {
      fecharCarrinho();
      abrirModalPedido();
    });

    document.getElementById('orderModalClose').addEventListener('click', fecharModalPedido);
    document.getElementById('orderConfirmBtn').addEventListener('click', function () {
      fecharModalPedido();
      esvaziarCarrinho();
      toast('Pedido enviado à cozinha! Buon appetito 🍝');
    });
    document.getElementById('orderModal').addEventListener('click', function (e) {
      if (e.target === this) fecharModalPedido();
    });

    /* Tecla ESC fecha carrinho e modal */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        fecharCarrinho();
        fecharModalPedido();
      }
    });

    /* Ano do rodapé */
    const ano = document.getElementById('ano');
    if (ano) ano.textContent = new Date().getFullYear();
  }

  /* ---------- Inicialização ---------- */

  document.addEventListener('DOMContentLoaded', function () {
    configurarTema();
    configurarNav();
    montarFiltros();
    montarCardapio();
    montarGaleria();
    montarDepoimentos();
    configurarReserva();
    renderReservas();
    configurarEventos();
    atualizarCarrinhoUI();
  });
})();
