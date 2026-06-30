// ============================================================
//  CLÍNICAS PUC — app.js v2
// ============================================================

/* ── STATIC DATA ── */

const TURMAS = [
  { id:'T01', nome:'Odontologia Clínica I', periodo:'2026/1', horario:'Seg 07:30–12:30', equipes:['EQ-A','EQ-B','EQ-C'] },
  { id:'T02', nome:'Fisioterapia Avançada', periodo:'2026/1', horario:'Qua 13:00–17:30', equipes:['EQ-A','EQ-B'] },
  { id:'T03', nome:'Psicologia Clínica II', periodo:'2026/1', horario:'Sex 08:00–12:00', equipes:['EQ-A','EQ-B'] },
];

const EQUIPES = {
  'T01-EQ-A': [
    { id:'A01', nome:'Júlia Moreira',  box:'Box 01', status:'em_atendimento', procedimento:'Anamnese', paciente:'Ana Pereira', critico:false,
      nota:'Paciente relata dor espontânea na região inferior esquerda há 3 dias. Queixa principal: dor 8/10. Exame extraoral sem alterações. Exame intraoral revela profundidade de sondagem aumentada no dente 36...' },
    { id:'A02', nome:'Carlos Souza',   box:'Box 02', status:'em_atendimento', procedimento:'Profilaxia', paciente:'João Melo', critico:false,
      nota:'Realizada profilaxia supragengival completa. Placa bacteriana visível na face vestibular dos elementos 31 a 41. Paciente orientado sobre higienização...' },
    { id:'A03', nome:'Pedro Costa',    box:'Box 03', status:'critico',         procedimento:'Extração cirúrgica', paciente:'Cláudia Ramos', critico:true,
      nota:'PROCEDIMENTO CRÍTICO: Extração cirúrgica do dente 38 incluso. Bloqueio anestésico realizado. Aguardando supervisão presencial obrigatória do professor...' },
    { id:'A04', nome:'Luiza Ferreira', box:'Box 04', status:'aguardando',      procedimento:'Restauração', paciente:'Bruno Lima', critico:false, nota:'' },
    { id:'A05', nome:'Rafael Nunes',   box:'Box 05', status:'livre',           procedimento:'—', paciente:'—', critico:false, nota:'' },
  ],
  'T01-EQ-B': [
    { id:'A06', nome:'Mariana Lima',   box:'Box 06', status:'em_atendimento', procedimento:'Triagem', paciente:'Paulo Reis', critico:false, nota:'Triagem inicial. Paciente relatando sensibilidade dentária...' },
    { id:'A07', nome:'Diego Alves',    box:'Box 07', status:'aguardando',      procedimento:'Retorno', paciente:'Sandra Costa', critico:false, nota:'' },
    { id:'A08', nome:'Camila Rocha',   box:'Box 08', status:'critico',         procedimento:'Sutura', paciente:'Marcos Neto', critico:true, nota:'Sutura pós-extração em andamento no dente 46. Supervisão requerida.' },
  ],
  'T01-EQ-C': [
    { id:'A09', nome:'Felipe Torres',  box:'Box 09', status:'em_atendimento', procedimento:'Anamnese', paciente:'Rosa Carvalho', critico:false, nota:'Queixa principal: dor de dente há 2 semanas...' },
    { id:'A10', nome:'Ana Beatriz',    box:'Box 10', status:'livre',           procedimento:'—', paciente:'—', critico:false, nota:'' },
  ],
  'T02-EQ-A': [
    { id:'A11', nome:'Gabriela Santos',box:'Box 01', status:'em_atendimento', procedimento:'Fisioterapia Joelho', paciente:'Maria Santos', critico:false, nota:'Exercícios de mobilidade ativo-assistidos. Amplitude inicial 42°...' },
    { id:'A12', nome:'Thiago Melo',    box:'Box 02', status:'aguardando',      procedimento:'Avaliação Inicial', paciente:'José Oliveira', critico:false, nota:'' },
  ],
};

const PACIENTES_ALUNO = [
  { id:'P01', nome:'Ana Pereira',    idade:32, cpf:'031.***.***.09', especialidade:'Odontologia', motivo:'Triagem', horario:'07:30', box:'Box 01', professor:'Prof. Eduardo Borges', status:'hoje', prontuario_ok:true,
    historico:[
      { data:'30/06/2026', procedimento:'Anamnese + Exame Clínico', nota:'Dor dente 36 — cárie grau II', aluno:'Júlia Moreira', notas_sessao:[], exames:[] },
      { data:'15/04/2026', procedimento:'Restauração Resina — Dente 21', nota:'Restauração concluída com êxito', aluno:'Júlia Moreira', notas_sessao:[], exames:[] },
      { data:'10/02/2026', procedimento:'Profilaxia', nota:'Higienização completa', aluno:'Júlia Moreira', notas_sessao:[], exames:[] },
    ],
    dentes:{ 36:'t-pending', 21:'t-treat', 11:'t-treat', 46:'t-extract', 24:'t-treat' },
    evolucoes:[{ sessao:1, amp:42.00, forca:2.0 },{ sessao:2, amp:52.50, forca:2.5 },{ sessao:3, amp:61.00, forca:3.0 }],
    falta:false,
  },
  { id:'P02', nome:'João Melo',      idade:45, cpf:'027.***.***.54', especialidade:'Odontologia', motivo:'Retorno', horario:'09:00', box:'Box 02', professor:'Prof. Eduardo Borges', status:'hoje', prontuario_ok:false,
    historico:[{ data:'01/06/2026', procedimento:'Profilaxia', nota:'Placa removida, orientações dadas', aluno:'Júlia Moreira', notas_sessao:[], exames:[] }],
    dentes:{ 14:'t-treat', 45:'t-pending' }, evolucoes:[], falta:false,
  },
  { id:'P03', nome:'Cláudia Ramos',  idade:28, cpf:'059.***.***.71', especialidade:'Odontologia', motivo:'Procedimento cirúrgico', horario:'10:30', box:'Box 03', professor:'Prof. Eduardo Borges', status:'futuro', prontuario_ok:false,
    historico:[], dentes:{38:'t-pending'}, evolucoes:[], falta:false,
  },
  { id:'P04', nome:'Bruno Lima',     idade:61, cpf:'088.***.***.33', especialidade:'Fisioterapia', motivo:'Retorno', horario:'13:00', box:'Box 01 — Fisio', professor:'Profa. Ana Silva', status:'futuro', prontuario_ok:false,
    historico:[], dentes:{}, evolucoes:[{ sessao:1, amp:55.00, forca:3.0 }], falta:false,
  },
  { id:'P05', nome:'Maria Santos',   idade:37, cpf:'014.***.***.88', especialidade:'Fisioterapia', motivo:'Triagem inicial', horario:'14:30', box:'Box 02 — Fisio', professor:'Profa. Ana Silva', status:'passado', prontuario_ok:true,
    historico:[{ data:'20/06/2026', procedimento:'Avaliação Postural', nota:'Escoliose leve, protocolo iniciado', aluno:'Júlia Moreira', notas_sessao:[], exames:[] }],
    dentes:{}, evolucoes:[{ sessao:1, amp:38.00, forca:2.0 },{ sessao:2, amp:45.50, forca:2.5 }], falta:false,
  },
];

const CONSULTAS_AGENDA = [
  { id:'C01', data:'10/06/2026', dia:10, mes:'Jun', paciente:'Maria Santos', tipo:'Fisioterapia — Avaliação Postural', status:'passado', nota:8.5, prontuario:true },
  { id:'C02', data:'20/06/2026', dia:20, mes:'Jun', paciente:'José Oliveira', tipo:'Odontologia — Profilaxia', status:'passado', nota:9.0, prontuario:true },
  { id:'C03', data:'30/06/2026', dia:30, mes:'Jun', paciente:'Ana Pereira',   tipo:'Odontologia — Anamnese + Exame', status:'hoje',   nota:null, prontuario:false },
  { id:'C04', data:'07/07/2026', dia:7,  mes:'Jul', paciente:'João Melo',     tipo:'Odontologia — Restauração', status:'futuro', nota:null, prontuario:false },
  { id:'C05', data:'14/07/2026', dia:14, mes:'Jul', paciente:'Cláudia Ramos', tipo:'Odontologia — Extração Cirúrgica', status:'futuro', nota:null, prontuario:false },
];

const CONSULTAS_PACIENTE = [
  { id:'CP01', data:'30/06/2026', dia:30, mes:'Jun', hora:'09:00', tipo:'Odontologia', aluno:'Júlia Moreira', local:'Box 01', status:'tcle_pendente', professor:'Prof. Eduardo Borges' },
  { id:'CP02', data:'07/07/2026', dia:7,  mes:'Jul', hora:'10:00', tipo:'Fisioterapia', aluno:'Rafael Nunes', local:'Box 02 — Fisio', status:'confirmacao_pendente', professor:'Profa. Ana Silva' },
  { id:'CP03', data:'14/07/2026', dia:14, mes:'Jul', hora:'08:30', tipo:'Psicologia', aluno:'Carlos Souza', local:'Sala 3 — Psico', status:'confirmada', professor:'Prof. Maria Lima' },
];

/* ── STATE ── */
let state = {
  currentScreen: 'home',
  breadcrumbs: [],
  selectedTurma: null,
  selectedEquipe: null,
  selectedAluno: null,
  selectedPaciente: null,
  selectedConsulta: null,
  prontuarioAssinado: false,
  starValue: 0,
  autoSaveInterval: null,
  chartInstances: {},
};

/* ── NAVIGATION ── */
function navigate(screenId, breadcrumbItems=[]) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(screenId);
  if (el) el.classList.add('active');
  state.currentScreen = screenId;
  state.breadcrumbs = breadcrumbItems;
  renderBreadcrumb(breadcrumbItems);
  document.getElementById('app-content').scrollTop = 0;
}

function renderBreadcrumb(items) {
  const bar = document.getElementById('breadcrumb-bar');
  if (!items.length) { bar.classList.remove('visible'); return; }
  bar.classList.add('visible');
  bar.innerHTML = `<span class="bc-item" onclick="navigate('home')">🏠 Início</span>` +
    items.map((item, i) => {
      const isLast = i === items.length - 1;
      return `<span class="bc-sep">›</span>` +
        (isLast
          ? `<span class="bc-current">${item.label}</span>`
          : `<span class="bc-item" onclick="${item.fn}">${item.label}</span>`);
    }).join('');
}

function goHome() { navigate('home'); }

/* ── MODALS ── */
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
});

/* ── TABS ── */
function switchTab(groupId, tabId) {
  const g = document.getElementById(groupId);
  if (!g) return;
  g.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  g.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active', p.id === tabId));
}

/* ══════════════════════════════════════════════
   HU 01 / 02 / 03 — PROFESSOR FLOW
══════════════════════════════════════════════ */

/* Step 1: Listar turmas */
function openProfessor(mode) {
  state.profMode = mode; // 'supervisao' ou 'assinatura'
  const wrap = document.getElementById('turmas-list');
  wrap.innerHTML = TURMAS.map(t => `
    <div class="appt-card tr-link" onclick="openTurma('${t.id}')">
      <div class="appt-date-box" style="background:var(--blue-xlight)">
        <div style="font-size:13px;font-weight:800;color:var(--blue)">${t.id}</div>
        <div style="font-size:9px;color:var(--blue);font-weight:600">${t.periodo}</div>
      </div>
      <div class="appt-info">
        <div class="appt-title">${t.nome}</div>
        <div class="appt-sub">⏰ ${t.horario} &nbsp;|&nbsp; ${t.equipes.length} equipes</div>
      </div>
      <div class="appt-right">
        <span class="badge b-blue">${t.equipes.length} equipes</span>
        <span style="font-size:18px;color:var(--gray-300);margin-top:4px">›</span>
      </div>
    </div>`).join('');
  navigate('screen-turmas', [{ label: mode === 'assinatura' ? 'Assinatura Digital' : 'Supervisão de Equipe' }]);
}

/* Step 2: Listar equipes da turma */
function openTurma(turmaId) {
  state.selectedTurma = TURMAS.find(t => t.id === turmaId);
  const turma = state.selectedTurma;
  document.getElementById('equipes-turma-nome').textContent = turma.nome;
  document.getElementById('equipes-turma-sub').textContent = `${turma.horario} · ${turma.periodo}`;
  const wrap = document.getElementById('equipes-list');
  wrap.innerHTML = turma.equipes.map(eq => {
    const key = `${turmaId}-${eq}`;
    const alunos = EQUIPES[key] || [];
    const criticos = alunos.filter(a => a.critico).length;
    return `
    <div class="appt-card tr-link" onclick="openEquipe('${turmaId}','${eq}')">
      <div class="hu-icon ic-blue" style="margin-bottom:0;flex-shrink:0">👥</div>
      <div class="appt-info">
        <div class="appt-title">Equipe ${eq}</div>
        <div class="appt-sub">${alunos.length} alunos &nbsp;|&nbsp; ${alunos.filter(a=>a.status==='em_atendimento').length} em atendimento</div>
      </div>
      <div class="appt-right">
        ${criticos ? `<span class="badge b-red">⚠️ ${criticos} crítico${criticos>1?'s':''}</span>` : '<span class="badge b-green">✅ Normal</span>'}
        <span style="font-size:18px;color:var(--gray-300);margin-top:4px">›</span>
      </div>
    </div>`;
  }).join('');
  const modeLbl = state.profMode === 'assinatura' ? 'Assinatura Digital' : 'Supervisão de Equipe';
  navigate('screen-equipes', [
    { label: modeLbl, fn:`openProfessor('${state.profMode}')` },
    { label: turma.nome }
  ]);
}

/* Step 3: Listar alunos da equipe */
function openEquipe(turmaId, eqId) {
  state.selectedEquipe = eqId;
  const key = `${turmaId}-${eqId}`;
  const alunos = EQUIPES[key] || [];
  document.getElementById('alunos-equipe-nome').textContent = `${state.selectedTurma.nome} — Equipe ${eqId}`;
  document.getElementById('alunos-equipe-sub').textContent = `${state.selectedTurma.horario} · Prof. Eduardo Borges`;

  const criticos = alunos.filter(a=>a.critico);
  const alertWrap = document.getElementById('alunos-critico-alert');
  if (criticos.length) {
    alertWrap.style.display = 'flex';
    alertWrap.innerHTML = `<span class="alert-icon">⚠️</span><div><strong>Procedimento(s) crítico(s) exigindo supervisão presencial:</strong> ${criticos.map(a=>`${a.nome} — ${a.procedimento} (${a.box})`).join(' | ')}</div>`;
  } else alertWrap.style.display = 'none';

  const tbody = document.getElementById('alunos-tbody');
  tbody.innerHTML = alunos.map(a => {
    const statusBadge = a.critico ? '<span class="badge b-red">⚠️ Crítico</span>' :
      a.status === 'em_atendimento' ? '<span class="badge b-blue">🔵 Em atendimento</span>' :
      a.status === 'aguardando'     ? '<span class="badge b-yellow">⏳ Aguardando</span>' :
                                      '<span class="badge b-gray">⬜ Livre</span>';
    const actionBtn = state.profMode === 'assinatura'
      ? `<button class="btn btn-purple btn-sm" onclick="openAlunoAssinatura('${turmaId}','${eqId}','${a.id}')">✍️ Ver Prontuário</button>`
      : `<button class="btn btn-outline btn-sm" onclick="openAlunoDetalhe('${turmaId}','${eqId}','${a.id}')">👁️ Ver Nota</button>`;
    return `<tr>
      <td><strong>${a.nome}</strong></td>
      <td>${a.box}</td>
      <td>${a.procedimento}</td>
      <td>${a.paciente}</td>
      <td>${statusBadge}</td>
      <td>${actionBtn}</td>
    </tr>`;
  }).join('');

  const modeLbl = state.profMode === 'assinatura' ? 'Assinatura Digital' : 'Supervisão de Equipe';
  navigate('screen-alunos', [
    { label: modeLbl, fn:`openProfessor('${state.profMode}')` },
    { label: state.selectedTurma.nome, fn:`openTurma('${turmaId}')` },
    { label: `Equipe ${eqId}` }
  ]);
}

/* [HU 01] Step 4: Ver nota em tempo real do aluno */
function openAlunoDetalhe(turmaId, eqId, alunoId) {
  const key = `${turmaId}-${eqId}`;
  const aluno = (EQUIPES[key]||[]).find(a=>a.id===alunoId);
  if (!aluno) return;
  state.selectedAluno = aluno;

  document.getElementById('nota-aluno-nome').textContent = aluno.nome;
  document.getElementById('nota-aluno-box').textContent = `${aluno.box} · ${aluno.procedimento} · Paciente: ${aluno.paciente}`;

  const alertDiv = document.getElementById('nota-critico-alert');
  if (aluno.critico) {
    alertDiv.style.display = 'flex';
    alertDiv.innerHTML = `<span class="alert-icon">🚨</span><div><strong>Procedimento crítico em andamento!</strong> ${aluno.procedimento} — Supervisão presencial obrigatória.</div>`;
    alertDiv.className = 'alert a-critical mb-12';
  } else alertDiv.style.display = 'none';

  const noteEl = document.getElementById('nota-realtime-text');
  if (aluno.nota) {
    noteEl.innerHTML = `<div class="realtime-label"><span class="live-dot"></span> Atualizando em tempo real — delay &lt;3s</div>${aluno.nota}<span class="cursor"></span>`;
  } else {
    noteEl.innerHTML = `<span class="text-muted">Aluno ainda não iniciou o registro.</span>`;
  }

  navigate('screen-nota-realtime', [
    { label:'Supervisão de Equipe', fn:`openProfessor('supervisao')` },
    { label: state.selectedTurma.nome, fn:`openTurma('${turmaId}')` },
    { label: `Equipe ${eqId}`, fn:`openEquipe('${turmaId}','${eqId}')` },
    { label: aluno.nome }
  ]);
}

/* [HU 02] Ver prontuário para assinatura */
function openAlunoAssinatura(turmaId, eqId, alunoId) {
  const key = `${turmaId}-${eqId}`;
  const aluno = (EQUIPES[key]||[]).find(a=>a.id===alunoId);
  if (!aluno) return;
  state.selectedAluno = aluno;
  state.prontuarioAssinado = false;
  document.getElementById('pront-aluno').textContent = aluno.nome;
  document.getElementById('pront-paciente').textContent = aluno.paciente;
  document.getElementById('pront-box').textContent = aluno.box;
  document.getElementById('pront-texto').removeAttribute('readonly');
  document.getElementById('pront-texto').style.background = '';
  document.getElementById('pront-sign-status').innerHTML = '';
  document.getElementById('btn-liberar-saida').disabled = true;

  navigate('screen-assinatura', [
    { label:'Assinatura Digital', fn:`openProfessor('assinatura')` },
    { label: state.selectedTurma.nome, fn:`openTurma('${turmaId}')` },
    { label: `Equipe ${eqId}`, fn:`openEquipe('${turmaId}','${eqId}')` },
    { label: aluno.nome }
  ]);
}

/* [HU 02] Confirmar assinatura */
function confirmarAssinatura() {
  const pwd = document.getElementById('sign-pwd').value;
  if (!pwd) { alert('Informe a senha para assinar.'); return; }
  document.getElementById('pront-texto').setAttribute('readonly','true');
  document.getElementById('pront-texto').style.background = '#f9fafb';
  document.getElementById('pront-sign-status').innerHTML = `
    <div class="alert a-success">
      <span class="alert-icon">✅</span>
      <div>Prontuário assinado digitalmente em <strong>${new Date().toLocaleString('pt-BR')}</strong> por Prof. Eduardo Borges.
      <br><span class="locked-badge mt-8">🔒 Bloqueado para alterações</span></div>
    </div>`;
  document.getElementById('btn-liberar-saida').disabled = false;
  state.prontuarioAssinado = true;
  closeModal('modal-assinatura');
}

/* [HU 03] Publicar feedback */
function publicarFeedback() {
  const txt = document.getElementById('feedback-texto').value.trim();
  if (!txt) { alert('Escreva o feedback antes de publicar.'); return; }
  const list = document.getElementById('feedback-published-list');
  const turma = state.selectedTurma ? state.selectedTurma.nome : 'Turma';
  const item = document.createElement('div');
  item.className = 'alert a-success mb-12';
  item.innerHTML = `<span class="alert-icon">📣</span><div><strong>${turma} — ${new Date().toLocaleDateString('pt-BR')}</strong><p style="margin-top:4px">${txt}</p><span class="text-muted">15 alunos notificados via sistema + e-mail institucional.</span></div>`;
  list.prepend(item);
  document.getElementById('feedback-texto').value = '';
  closeModal('modal-feedback');
}

/* ══════════════════════════════════════════════
   HU 04 — AGENDA DO ALUNO
══════════════════════════════════════════════ */
function openAgenda() {
  renderAgenda();
  navigate('screen-agenda', [{ label:'Agenda e Logbook' }]);
}

function renderAgenda() {
  const list = document.getElementById('agenda-consultas');
  list.innerHTML = CONSULTAS_AGENDA.map(c => {
    const isPast   = c.status === 'passado';
    const isToday  = c.status === 'hoje';
    const isFuture = c.status === 'futuro';
    const statusBadge = isPast ? '<span class="badge b-green">✅ Concluído</span>' :
                        isToday ? '<span class="badge b-blue">📅 Hoje</span>' :
                                  '<span class="badge b-gray">📌 Agendado</span>';
    const gradeEl = isPast
      ? `<div class="grade-chip ${c.nota>=9?'gc-high':c.nota>=7?'gc-mid':'gc-low'}">${c.nota}</div>`
      : `<div class="grade-chip gc-none">—</div>`;
    const actions = isPast
      ? `<button class="btn btn-ghost btn-sm" onclick="alert('📄 Abrindo prontuário PDF de ${c.paciente}...')">📄 Ver PDF</button>
         <button class="btn btn-ghost btn-sm" onclick="exportarLogbook('PDF','${c.id}')">⬇️ Logbook</button>`
      : isToday
      ? `<button class="btn btn-primary btn-sm" onclick="alert('Abrindo atendimento ativo de ${c.paciente}...')">▶️ Iniciar</button>`
      : `<span class="text-muted" style="font-size:12px">Consulta em aberto</span>`;
    return `
    <div class="appt-card">
      <div class="appt-date-box">
        <div class="appt-day">${c.dia}</div>
        <div class="appt-mon">${c.mes}</div>
      </div>
      <div class="appt-info">
        <div class="appt-title">${c.paciente}</div>
        <div class="appt-sub">${c.tipo}</div>
      </div>
      <div class="appt-right">
        ${statusBadge}
        ${gradeEl}
        <div class="flex gap-8">${actions}</div>
      </div>
    </div>`;
  }).join('');
}

function exportarLogbook(fmt, consulta) {
  alert(`✅ Exportando histórico no formato ${fmt}.\nConteúdo: data, local, tipo de procedimento, nota do professor.\nFiltros aplicados: semestre e disciplina selecionados.`);
}

function filtrarAgenda() {
  const sem = document.getElementById('filtro-sem').value;
  const disc = document.getElementById('filtro-disc').value;
  alert(`Filtrando por: Semestre ${sem || 'todos'} | Disciplina: ${disc || 'todas'}`);
}

/* ══════════════════════════════════════════════
   HU 05 — DASHBOARD DE DESEMPENHO
══════════════════════════════════════════════ */
function openDashboard() {
  navigate('screen-dashboard', [{ label:'Dashboard de Desempenho' }]);
  setTimeout(initChartDashboard, 50);
}

function initChartDashboard() {
  const canvas = document.getElementById('chart-dash');
  if (!canvas || canvas._init) return;
  canvas._init = true;
  if (state.chartInstances['dash']) state.chartInstances['dash'].destroy();
  state.chartInstances['dash'] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Anamnese','Ex. Clínico','Profilaxia','Restauração','Extração','Radiografia','Sutura'],
      datasets: [
        { label:'Realizados', data:[8,5,3,2,1,4,0], backgroundColor:'#2563a8', borderRadius:5 },
        { label:'Obrigatórios', data:[10,8,5,5,2,6,2], backgroundColor:'#bfdbfe', borderRadius:5 },
      ]
    },
    options: { responsive:true, maintainAspectRatio:false,
      plugins:{legend:{position:'top'}}, scales:{y:{beginAtZero:true,max:12}} }
  });
}

function renderDashboardNotas() {
  const tbody = document.getElementById('dash-notas-tbody');
  tbody.innerHTML = CONSULTAS_AGENDA.map(c => {
    const gradeEl = c.nota !== null
      ? `<div class="grade-chip ${c.nota>=9?'gc-high':c.nota>=7?'gc-mid':'gc-low'}">${c.nota}</div>`
      : `<div class="grade-chip gc-none">Pendente</div>`;
    const status = c.status === 'passado' ? '<span class="badge b-green">Nota fechada</span>' : '<span class="badge b-gray">Em aberto</span>';
    return `<tr><td>${c.data}</td><td>${c.paciente}</td><td>${c.tipo}</td><td>${status}</td><td>${gradeEl}</td></tr>`;
  }).join('');
}

/* ══════════════════════════════════════════════
   HU 06/07/08/09 — LISTA DE PACIENTES DO ALUNO
══════════════════════════════════════════════ */
function openPacientesList(huTarget) {
  state.huTarget = huTarget;
  const titles = { hu06:'Histórico Odontológico', hu07:'Sessão Psicoterapêutica', hu08:'Evolução Fisioterapia', hu09:'Gestão de Faltas' };
  document.getElementById('patients-list-title').textContent = titles[huTarget] || 'Pacientes';
  document.getElementById('patients-list-subtitle').textContent = 'Selecione um paciente para acessar o histórico e registrar evoluções';

  const list = document.getElementById('pacientes-lista');
  list.innerHTML = PACIENTES_ALUNO.map(p => {
    const statusBadge = p.status === 'hoje' ? '<span class="badge b-blue">📅 Hoje</span>' :
      p.status === 'futuro' ? '<span class="badge b-gray">📌 Futuro</span>' :
      '<span class="badge b-green">✅ Passado</span>';
    return `
    <div class="patient-item" onclick="openPacienteDetalhe('${p.id}')">
      <div class="patient-avatar">🧑</div>
      <div class="patient-info">
        <div class="patient-name">${p.nome}</div>
        <div class="patient-meta">📍 ${p.box} · 👨‍🏫 ${p.professor} · ${p.especialidade}</div>
      </div>
      <div class="patient-right">
        <div class="patient-time">${p.horario}</div>
        ${statusBadge}
        <div style="font-size:12px;color:var(--gray-500);margin-top:2px">${p.motivo}</div>
      </div>
    </div>`;
  }).join('');

  navigate('screen-pacientes-list', [{ label: titles[huTarget] }]);
}

/* ══════════════════════════════════════════════
   DETALHE DO PACIENTE (base HU 06-09)
══════════════════════════════════════════════ */
function openPacienteDetalhe(pacId) {
  const p = PACIENTES_ALUNO.find(x => x.id === pacId);
  if (!p) return;
  state.selectedPaciente = p;

  const titles = { hu06:'Histórico Odontológico', hu07:'Sessão Psicoterapêutica', hu08:'Evolução Fisioterapia', hu09:'Gestão de Faltas' };
  const ht = state.huTarget;

  // Header
  document.getElementById('pd-nome').textContent = p.nome;
  document.getElementById('pd-meta').textContent = `${p.idade} anos · CPF ${p.cpf} · ${p.especialidade}`;
  document.getElementById('pd-tags').innerHTML = `
    <span class="pd-tag">📍 ${p.box}</span>
    <span class="pd-tag">👨‍🏫 ${p.professor}</span>
    <span class="pd-tag">⏰ ${p.horario}</span>
    <span class="pd-tag">${p.motivo}</span>`;

  // Histórico timeline
  renderHistoricoTimeline(p);

  // Notas de sessão existentes
  renderNotasSessao(p);

  // Evolução chart
  setTimeout(() => initChartEvolucao(p), 80);

  // HU 09 - Falta
  const faltaSection = document.getElementById('pd-falta-section');
  faltaSection.style.display = ht === 'hu09' ? 'block' : 'none';
  const faltaStatus = document.getElementById('pd-falta-status');
  if (p.falta) {
    faltaStatus.innerHTML = '<div class="badge b-red">❌ Falta registrada</div>';
  } else {
    faltaStatus.innerHTML = '';
  }

  // Tabs por HU
  const tabMap = { hu06:'tab-odonto', hu07:'tab-sessao', hu08:'tab-evolucao', hu09:'tab-historico' };
  const defaultTab = tabMap[ht] || 'tab-historico';
  ['tab-historico','tab-odonto','tab-sessao','tab-evolucao'].forEach(tid => {
    document.getElementById(tid)?.classList.remove('active');
    document.querySelector(`[data-tab="${tid}"]`)?.classList.remove('active');
  });
  document.getElementById(defaultTab)?.classList.add('active');
  document.querySelector(`[data-tab="${defaultTab}"]`)?.classList.add('active');

  // [HU 06] Odontograma
  buildOdontograma(p);

  navigate('screen-paciente-detalhe', [
    { label: titles[ht], fn:`openPacientesList('${ht}')` },
    { label: p.nome }
  ]);
}

function renderHistoricoTimeline(p) {
  const el = document.getElementById('pd-timeline');
  if (!p.historico.length) {
    el.innerHTML = '<li class="tl-item"><div class="tl-dot ic-blue">📋</div><div class="tl-content"><strong>Sem histórico</strong><p>Nenhum registro anterior.</p></div></li>';
    return;
  }
  el.innerHTML = p.historico.map(h => `
    <li class="tl-item">
      <div class="tl-dot ic-blue">📋</div>
      <div class="tl-content">
        <strong>${h.data} — ${h.procedimento}</strong>
        <p>${h.nota}</p>
        ${h.notas_sessao && h.notas_sessao.length ? `<div class="badge b-purple mt-8">🔐 ${h.notas_sessao.length} nota(s) de sessão</div>` : ''}
        ${h.exames && h.exames.length ? `<div class="badge b-teal mt-8">📎 ${h.exames.length} exame(s) anexado(s)</div>` : ''}
      </div>
    </li>`).join('');
}

function renderNotasSessao(p) {
  const wrap = document.getElementById('pd-notas-sessao-list');
  const allNotas = p.historico.flatMap(h => h.notas_sessao || []);
  if (!allNotas.length) {
    wrap.innerHTML = '<div class="text-muted" style="padding:12px 0">Nenhuma anotação de sessão registrada.</div>';
    return;
  }
  wrap.innerHTML = allNotas.map(n => `
    <div class="alert a-info mb-12">
      <span class="alert-icon">🔐</span>
      <div><strong>${n.data}</strong> — <span class="autosave-pill">AES-256 criptografado</span><p style="margin-top:6px">${n.texto}</p></div>
    </div>`).join('');
}

/* [HU 07] Salvar nota de sessão */
function salvarNotaSessao() {
  const txt = document.getElementById('sessao-nota-texto').value.trim();
  if (!txt) { alert('Escreva as anotações antes de salvar.'); return; }
  const p = state.selectedPaciente;
  if (!p.historico.length) p.historico.unshift({ data: new Date().toLocaleDateString('pt-BR'), procedimento:'Sessão atual', nota:'', notas_sessao:[], exames:[] });
  p.historico[0].notas_sessao.push({ data: new Date().toLocaleDateString('pt-BR'), texto: txt });
  document.getElementById('sessao-nota-texto').value = '';
  renderNotasSessao(p);
  closeModal('modal-nota-sessao');
  const okEl = document.getElementById('sessao-saved-ok');
  okEl.style.display = 'flex';
  setTimeout(() => okEl.style.display='none', 3000);
}

/* [HU 08] Salvar evolução */
function salvarEvolucao() {
  const amp   = parseFloat(document.getElementById('evo-amp').value);
  const forca = parseFloat(document.getElementById('evo-forca').value);
  if (isNaN(amp)||isNaN(forca)) { alert('Preencha os valores.'); return; }
  const p = state.selectedPaciente;
  p.evolucoes.push({ sessao: p.evolucoes.length+1, amp:parseFloat(amp.toFixed(2)), forca:parseFloat(forca.toFixed(2)) });
  closeModal('modal-evolucao');
  setTimeout(() => initChartEvolucao(p), 80);
  if (amp < 55) {
    document.getElementById('evo-alert').className = 'alert a-danger';
    document.getElementById('evo-alert').innerHTML = '<span class="alert-icon">⚠️</span><div><strong>Alerta:</strong> Amplitude abaixo do esperado. Supervisão recomendada.</div>';
    document.getElementById('evo-alert').style.display = 'flex';
  } else {
    document.getElementById('evo-alert').className = 'alert a-success';
    document.getElementById('evo-alert').innerHTML = `<span class="alert-icon">✅</span><div>Evolução registrada: ${amp.toFixed(2)}° · Força ${forca.toFixed(2)}/5</div>`;
    document.getElementById('evo-alert').style.display = 'flex';
  }
}

function initChartEvolucao(p) {
  const canvas = document.getElementById('chart-evolucao');
  if (!canvas) return;
  if (state.chartInstances['evo']) state.chartInstances['evo'].destroy();
  if (!p.evolucoes.length) return;
  state.chartInstances['evo'] = new Chart(canvas, {
    type:'line',
    data:{
      labels: p.evolucoes.map(e=>`Sessão ${e.sessao}`),
      datasets:[
        { label:'Amplitude (°)', data:p.evolucoes.map(e=>e.amp), borderColor:'#2563a8', backgroundColor:'rgba(37,99,168,.1)', tension:.4, fill:true, pointRadius:5 },
        { label:'Força (0–5)', data:p.evolucoes.map(e=>e.forca), borderColor:'#16a34a', backgroundColor:'rgba(22,163,74,.08)', tension:.4, fill:true, pointRadius:5, yAxisID:'y2' },
      ]
    },
    options:{ responsive:true, maintainAspectRatio:false,
      scales:{ y:{beginAtZero:true,max:180}, y2:{position:'right',beginAtZero:true,max:5,grid:{drawOnChartArea:false}} } }
  });
}

/* [HU 06] Odontograma */
function buildOdontograma(p) {
  const upper = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
  const lower = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
  const status = p.dentes || {};
  function row(teeth) {
    return '<div class="tooth-row">' + teeth.map(n => {
      const s = status[n] || '';
      return `<div class="tooth ${s}" onclick="detalharDente(${n})" title="Dente ${n}"><span style="font-size:14px">🦷</span><span class="tooth-num">${n}</span></div>`;
    }).join('') + '</div>';
  }
  const el = document.getElementById('pd-odontograma');
  if (el) el.innerHTML = row(upper) + '<div style="height:10px"></div>' + row(lower);
}

function detalharDente(n) {
  document.getElementById('dente-modal-title').textContent = `Dente ${n} — Histórico de Intervenções`;
  document.getElementById('dente-modal-body').innerHTML = `
    <div class="alert a-info"><span class="alert-icon">ℹ️</span><div>Registro de intervenções no dente ${n}</div></div>
    <table><thead><tr><th>Data</th><th>Procedimento</th><th>Aluno</th><th>Status</th></tr></thead>
    <tbody><tr><td>30/06/2026</td><td>Restauração composta</td><td>Júlia Moreira</td><td><span class="badge b-green">Concluído</span></td></tr>
    <tr><td>15/04/2026</td><td>Profilaxia</td><td>Carlos Souza</td><td><span class="badge b-green">Concluído</span></td></tr></tbody></table>`;
  openModal('modal-dente');
}

/* [HU 09] Registrar falta */
function registrarFalta() {
  const p = state.selectedPaciente;
  if (!p) return;
  p.falta = true;
  document.getElementById('pd-falta-status').innerHTML = '<div class="badge b-red">❌ Falta registrada</div>';
  document.getElementById('falta-relatorio-wrap').style.display = 'block';
  alert(`Falta de ${p.nome} registrada. Professor ${p.professor} notificado automaticamente. Relatório de Atividade Substitutiva aberto.`);
}

/* ══════════════════════════════════════════════
   HU 10 — PACIENTE — TCLE GOV.BR
══════════════════════════════════════════════ */
function openTCLE() {
  renderConsultasPaciente();
  navigate('screen-tcle', [{ label:'Minhas Consultas — TCLE' }]);
}

function renderConsultasPaciente() {
  const list = document.getElementById('consultas-paciente-list');
  list.innerHTML = CONSULTAS_PACIENTE.map(c => {
    const statusBadge = c.status === 'tcle_pendente'         ? '<span class="badge b-red">📝 Assinatura TCLE pendente</span>' :
                        c.status === 'confirmacao_pendente'  ? '<span class="badge b-yellow">⏳ Confirmação pendente</span>' :
                                                               '<span class="badge b-green">✅ Confirmada</span>';
    const actionBtn = c.status !== 'confirmada'
      ? `<button class="btn btn-primary btn-sm" onclick="openConsultaTCLE('${c.id}')">📝 Acessar</button>`
      : `<button class="btn btn-ghost btn-sm" onclick="alert('Consulta confirmada! Nenhuma ação necessária.')">👁️ Detalhes</button>`;
    return `
    <div class="appt-card">
      <div class="appt-date-box">
        <div class="appt-day">${c.dia}</div>
        <div class="appt-mon">${c.mes}</div>
      </div>
      <div class="appt-info">
        <div class="appt-title">${c.tipo}</div>
        <div class="appt-sub">⏰ ${c.hora} · 🧑‍⚕️ ${c.aluno} · 📍 ${c.local}</div>
      </div>
      <div class="appt-right">
        ${statusBadge}
        ${actionBtn}
      </div>
    </div>`;
  }).join('');
}

function openConsultaTCLE(consultaId) {
  const c = CONSULTAS_PACIENTE.find(x=>x.id===consultaId);
  if (!c) return;
  state.selectedConsulta = c;
  document.getElementById('tcle-consulta-info').innerHTML = `
    <div class="flex-between">
      <div><div class="appt-title">${c.tipo}</div><div class="appt-sub">⏰ ${c.hora} · 🧑‍⚕️ ${c.aluno} · 📍 ${c.local} · 👨‍🏫 ${c.professor}</div></div>
      <span class="badge b-red">📝 TCLE Pendente</span>
    </div>`;
  document.getElementById('tcle-resultado').innerHTML = '';
  navigate('screen-consulta-tcle', [
    { label:'Minhas Consultas', fn:`openTCLE()` },
    { label:`Consulta ${c.tipo} — ${c.dia}/${c.mes}` }
  ]);
}

function confirmarTCLE() {
  const c = state.selectedConsulta;
  if (!c) return;
  c.status = 'confirmada';
  closeModal('modal-govbr');
  document.getElementById('tcle-resultado').innerHTML = `
    <div class="alert a-success">
      <span class="alert-icon">✅</span>
      <div>
        <strong>TCLE assinado e validado com sucesso!</strong><br>
        Assinatura via GOV.BR em ${new Date().toLocaleString('pt-BR')}.<br>
        Hash SHA-256: <code style="font-size:11px">a3f2c1d4e5...8f9e</code><br>
        <span class="badge b-green mt-8">✅ Consulta Confirmada</span>
        <button class="btn btn-ghost btn-sm mt-8" onclick="alert('Baixando PDF assinado...')">⬇️ Baixar PDF Assinado</button>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════
   HEADER PROFILE SWITCH
══════════════════════════════════════════════ */
const profiles = {
  professor:      { name:'Prof. Eduardo Borges', initials:'EB', role:'Professor Supervisor',   av:'av-blue',   section:'professor' },
  aluno:          { name:'Júlia Moreira',        initials:'JM', role:'Aluno Estagiário',       av:'av-green',  section:'aluno' },
  paciente:       { name:'João da Silva',        initials:'JS', role:'Paciente — Comunidade',  av:'av-purple', section:'paciente' },
  administrativo: { name:'Vitor Admin',          initials:'VA', role:'Administrativo',         av:'av-teal',   section:'admin' },
};

let currentProfile = 'professor';

function setProfile(key) {
  currentProfile = key;
  const p = profiles[key];
  document.getElementById('user-initials').textContent = p.initials;
  document.getElementById('user-initials').className   = `avatar ${p.av}`;
  document.getElementById('user-name').textContent     = p.name;
  document.getElementById('user-role').textContent     = p.role;
  document.querySelectorAll('.header-nav-btn').forEach(b => b.classList.toggle('active', b.dataset.profile===key));
  goHome();
}

/* ══════════════════════════════════════════════
   STARS
══════════════════════════════════════════════ */
function setStar(val, groupId) {
  state.starValue = val;
  document.querySelectorAll(`#${groupId} .star`).forEach((s,i) => s.classList.toggle('lit', i<val));
}

/* ══════════════════════════════════════════════
   AUTOSAVE SIMULATION [HU 07]
══════════════════════════════════════════════ */
function startAutoSave(inputId, labelId) {
  if (state.autoSaveInterval) clearInterval(state.autoSaveInterval);
  state.autoSaveInterval = setInterval(() => {
    const lbl = document.getElementById(labelId);
    if (lbl) lbl.textContent = `Salvo automaticamente às ${new Date().toLocaleTimeString('pt-BR')} (AES-256)`;
  }, 8000);
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setProfile('professor');
  renderDashboardNotas();
  navigate('home');
  document.querySelectorAll('.header-nav-btn').forEach(b => {
    b.addEventListener('click', () => setProfile(b.dataset.profile));
  });
});
