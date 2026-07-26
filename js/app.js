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

  /* ---------- Biblioteca de ícones SVG (estilo Lucide, traço fino) ---------- */

  /* Conteúdo interno de cada ícone; o wrapper é montado por icon(). */
  const ICON_PATHS = {
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'
  };

  /* Monta o SVG de um ícone. opts: { size, cls, fill } */
  function icon(nome, opts) {
    opts = opts || {};
    const size = opts.size || 20;
    const cls = 'ic' + (opts.cls ? ' ' + opts.cls : '');
    const fill = opts.fill || 'none';
    const stroke = opts.fill && opts.fill !== 'none' ? 'none' : 'currentColor';
    const sw = stroke === 'none' ? '' : ' stroke-width="2"';
    return (
      '<svg class="' + cls + '" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" ' +
      'fill="' + fill + '" stroke="' + stroke + '"' + sw +
      ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICON_PATHS[nome] || '') + '</svg>'
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

  /* Escapa aspas e sinais de marcação para uso seguro dentro de atributos */
  function attr(txt) {
    return String(txt == null ? '' : txt)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* Topo do cartão: foto real do prato ou, quando não existe foto adequada
     na pasta assets/img/, um bloco de cor sólida elegante com o nome. */
  function midiaDoItem(p) {
    const tag = '<span class="menu-tag">' + p.categoria + '</span>';
    if (p.foto) {
      return (
        '<div class="menu-card-media">' +
        '<img class="menu-card-img" src="assets/img/' + attr(p.foto) + '" ' +
        'alt="' + attr(p.fotoAlt) + '" width="480" height="360" ' +
        'loading="lazy" decoding="async" />' +
        tag +
        '</div>'
      );
    }
    return (
      '<div class="menu-card-media menu-card-cor" data-tom="' + attr(p.tom || p.tema) + '">' +
      '<span class="menu-card-cor-nome" aria-hidden="true">' + p.nome + '</span>' +
      tag +
      '</div>'
    );
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
        midiaDoItem(p) +
        '<div class="menu-card-body">' +
        '<div class="menu-card-head">' +
        '<h3>' + p.nome + '</h3>' +
        '<span class="menu-price">' + formatarBRL(p.preco) + '</span>' +
        '</div>' +
        '<p class="menu-desc">' + p.desc + '</p>' +
        '<button class="btn btn-primary btn-add" data-add="' + p.id + '">' +
        icon('plus', { size: 18 }) + 'Adicionar ao pedido</button>' +
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
        body.innerHTML = '<div class="cart-empty"><span class="cart-empty-ic" aria-hidden="true">' +
          icon('utensils', { size: 34 }) + '</span>' +
          '<p>Seu carrinho está vazio.</p><small>Adicione itens do cardápio para começar.</small></div>';
      } else {
        body.innerHTML = ids.map(function (id) {
          const item = itemPorId(id);
          if (!item) return '';
          const q = carrinho[id];
          return (
            '<div class="cart-item">' +
            '<div class="cart-item-info">' +
            '<strong>' + item.nome + '</strong>' +
            '<span class="cart-item-price">' + formatarBRL(item.preco) + '</span>' +
            '<div class="qty">' +
            '<button aria-label="Diminuir quantidade" data-dec="' + id + '">' + icon('minus', { size: 15 }) + '</button>' +
            '<span aria-live="polite">' + q + '</span>' +
            '<button aria-label="Aumentar quantidade" data-inc="' + id + '">' + icon('plus', { size: 15 }) + '</button>' +
            '<button class="cart-item-remove" aria-label="Remover item" data-rem="' + id + '">' + icon('trash', { size: 16 }) + '</button>' +
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
      return (
        '<figure class="gallery-card">' +
        '<img class="gallery-img" src="assets/img/' + g.img + '" alt="' + g.alt + '" ' +
        'width="480" height="360" loading="lazy" />' +
        '<figcaption>' + g.legenda + '</figcaption>' +
        '</figure>'
      );
    }).join('');
  }

  /* ---------- Depoimentos ---------- */

  function estrelas(n) {
    let s = '';
    for (let i = 0; i < 5; i++) {
      s += i < n
        ? icon('star', { size: 18, fill: 'currentColor', cls: 'star-fill' })
        : icon('star', { size: 18, fill: 'none', cls: 'star-empty' });
    }
    return s;
  }

  function montarDepoimentos() {
    const wrap = document.getElementById('testimonials');
    if (!wrap) return;
    wrap.innerHTML = DEPOIMENTOS.map(function (d) {
      return (
        '<blockquote class="testimonial">' +
        '<div class="stars" aria-label="Nota ' + d.nota + ' de 5">' + estrelas(d.nota) + '</div>' +
        '<p>“' + d.texto + '”</p>' +
        '<footer>' +
        '<img class="avatar" src="assets/img/pessoas/' + attr(d.foto) + '" ' +
        'alt="' + attr(d.fotoAlt) + '" width="96" height="96" ' +
        'loading="lazy" decoding="async" />' +
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

      feedback.innerHTML = '<span class="feedback-ic" aria-hidden="true">' + icon('check', { size: 18 }) +
        '</span> Reserva confirmada para <strong>' + reserva.nome +
        '</strong> em <strong>' + formatarData(reserva.data) + '</strong> às <strong>' +
        reserva.hora + '</strong> · ' + reserva.pessoas + ' pessoa(s).';
      feedback.className = 'form-feedback is-success';

      form.reset();
      if (dataInput) dataInput.min = dataInput.min; // mantém min
      document.getElementById('resPessoas').value = '2';
      toast('Reserva confirmada!');
    });
  }

  /* ---------- Tema claro/escuro ---------- */

  function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    const ico = document.querySelector('#themeToggle .theme-icon');
    if (ico) ico.innerHTML = tema === 'dark' ? icon('sun', { size: 20 }) : icon('moon', { size: 20 });
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
      toast('Pedido enviado à cozinha! Buon appetito');
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
